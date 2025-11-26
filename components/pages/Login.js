'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, isLoggedIn } = useAuth()
    const { success, error: showError } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (isLoggedIn()) {
            router.push('/')
        }
    }, [isLoggedIn, router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const result = await login(email, password)

        if (result.success) {
            success('Login successful! Welcome back!')
            router.push('/')
        } else {
            showError(result.error || 'Login failed. Please try again.')
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
                                <div className="text-5xl mb-4">🔐</div>
                                <h1 className="text-3xl font-display font-bold mb-2">
                                    Welcome <span className="gradient-text">Back!</span>
                                </h1>
                                <p className="text-gray-600">Login to your ColorFarmers account</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Logging in...' : 'Login'} 🚀
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link href="/signup" className="text-primary-600 font-semibold hover:underline">
                                        Sign up here
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-700 text-center">
                                    <strong>Demo Credentials:</strong><br />
                                    Email: admin@colorfarmers.com<br />
                                    Password: admin123
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
