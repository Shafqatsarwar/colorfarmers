'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { authenticateUser, getUserByEmail, usersDB } from '@/lib/db'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in (from localStorage)
        const storedUser = localStorage.getItem('colorfarmers_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const authenticatedUser = authenticateUser(email, password)
        if (authenticatedUser) {
            setUser(authenticatedUser)
            localStorage.setItem('colorfarmers_user', JSON.stringify(authenticatedUser))
            return { success: true, user: authenticatedUser }
        }
        return { success: false, error: 'Invalid email or password' }
    }

    const signup = async (name, email, password) => {
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
            role: 'customer',
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

    const updateUser = (updates) => {
        if (!user) return

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
