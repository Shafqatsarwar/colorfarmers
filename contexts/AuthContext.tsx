'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authenticateUser, getUserByEmail, usersDB, User } from '@/lib/db'

interface AuthContextType {
    user: Omit<User, 'password'> | null
    loading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; user?: Omit<User, 'password'>; error?: string }>
    signup: (name: string, email: string, password: string) => Promise<{ success: boolean; user?: Omit<User, 'password'>; error?: string }>
    logout: () => void
    updateUser: (updates: Partial<User>) => void
    isAdmin: () => boolean
    isLoggedIn: () => boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Omit<User, 'password'> | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in (from localStorage)
        const storedUser = localStorage.getItem('colorfarmers_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        const authenticatedUser = authenticateUser(email, password)
        if (authenticatedUser) {
            setUser(authenticatedUser)
            localStorage.setItem('colorfarmers_user', JSON.stringify(authenticatedUser))
            return { success: true, user: authenticatedUser }
        }
        return { success: false, error: 'Invalid email or password' }
    }

    const signup = async (name: string, email: string, password: string) => {
        // Check if user already exists
        const existingUser = getUserByEmail(email)
        if (existingUser) {
            return { success: false, error: 'User already exists with this email' }
        }

        // Create new user
        const newUser = usersDB.create({
            name,
            email,
            password, // In production, hash this
            role: 'user',
        })

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = newUser

        setUser(userWithoutPassword)
        localStorage.setItem('colorfarmers_user', JSON.stringify(userWithoutPassword))

        return { success: true, user: userWithoutPassword }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('colorfarmers_user')
    }

    const updateUser = (updates: Partial<User>) => {
        if (!user || !user.id) return

        const updatedUser = usersDB.update(user.id, updates)
        if (updatedUser) {
            const { password: _, ...userWithoutPassword } = updatedUser
            setUser(userWithoutPassword)
            localStorage.setItem('colorfarmers_user', JSON.stringify(userWithoutPassword))
        }
    }

    const isAdmin = () => {
        return user?.role === 'admin'
    }

    const isLoggedIn = () => {
        return !!user
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                updateUser,
                isAdmin,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
