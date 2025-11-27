'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const pathname = usePathname()
    const { user, logout, isAdmin } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
        setShowUserMenu(false)
    }, [pathname])

    const navLinks = [
        { name: 'Home', path: '/', icon: '🏠' },
        { name: 'About Us', path: '/about', icon: 'ℹ️' },
        { name: 'Order Now', path: '/order', icon: '📦' },
        { name: 'Rates', path: '/rates', icon: '💰' },
        { name: 'Reviews', path: '/reviews', icon: '⭐' },
    ]

    const handleLogout = () => {
        logout()
        setShowUserMenu(false)
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-lg shadow-lg'
                : 'bg-white/80 backdrop-blur-md'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20 px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            📄
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-display font-bold gradient-text">
                                ColorFarmers
                            </h1>
                            <p className="text-xs text-gray-600">Scholars Photostat Centre</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${pathname === link.path
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span>{link.icon}</span>
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        {/* User Menu / Auth Buttons */}
                        {user ? (
                            <div className="relative ml-4">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <span>👤</span>
                                    <span>{user.name}</span>
                                    <span className="text-xs">▼</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                                        {isAdmin() && (
                                            <Link
                                                href="/admin"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                🔧 Admin Panel
                                            </Link>
                                        )}
                                        <Link
                                            href="/my-orders"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            📦 My Orders
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 ml-4">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-lg font-medium text-primary-600 hover:bg-primary-50 transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`block h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            />
                            <span
                                className={`block h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                                    }`}
                            />
                            <span
                                className={`block h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[600px] pb-4' : 'max-h-0'
                        }`}
                >
                    <div className="px-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-3 ${pathname === link.path
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span>{link.name}</span>
                            </Link>
                        ))}

                        {/* Mobile Auth Links */}
                        {user ? (
                            <>
                                <div className="border-t-2 border-gray-200 my-2 pt-2">
                                    <div className="px-4 py-2 text-sm text-gray-600">
                                        Logged in as <strong>{user.name}</strong>
                                    </div>
                                </div>
                                {isAdmin() && (
                                    <Link
                                        href="/admin"
                                        className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3"
                                    >
                                        <span className="text-xl">🔧</span>
                                        <span>Admin Panel</span>
                                    </Link>
                                )}
                                <Link
                                    href="/my-orders"
                                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3"
                                >
                                    <span className="text-xl">📦</span>
                                    <span>My Orders</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-300 flex items-center space-x-3"
                                >
                                    <span className="text-xl">🚪</span>
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="border-t-2 border-gray-200 my-2 pt-2" />
                                <Link
                                    href="/login"
                                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300"
                                >
                                    🔐 Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                                >
                                    ✨ Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
