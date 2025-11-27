'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { signup, isLoggedIn } = useAuth()
    const { success, error: showError } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (isLoggedIn()) {
            router.push('/')
        }
    }, [isLoggedIn, router])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            showError('Passwords do not match!')
            return
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long!')
            return
        }

        setLoading(true)

        const result = await signup(name, email, password)

        if (result.success) {
            success('Account created successfully! Welcome to ColorFarmers!')
            router.push('/')
        } else {
            showError(result.error || 'Signup failed. Please try again.')
        }

        setLoading(false)
    }

    return (
        <div className="pt-20 min-h-screen">
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom">
                    <div className="max-w-md mx-auto">
                        <div className="card">
                            <div className="text-center mb-8">
                                <div className="text-5xl mb-4">✨</div>
                                <h1 className="text-3xl font-display font-bold mb-2">
                                    Create Your <span className="gradient-text">Account</span>
                                </h1>
                                <p className="text-gray-600">Join ColorFarmers today!</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="input-field"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="input-field"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Creating Account...' : 'Sign Up'} 🚀
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-primary-600 font-semibold hover:underline">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup
