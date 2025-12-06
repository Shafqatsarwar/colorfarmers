'use client'

import { useEffect, ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminLayoutProps {
    children: ReactNode
}

interface AdminLink {
    name: string
    path: string
    icon: string
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { user, isAdmin } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/')
        }
    }, [isAdmin, router])

    if (!isAdmin()) {
        return null
    }

    const adminLinks: AdminLink[] = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Products', path: '/admin/products', icon: '📦' },
        { name: 'Orders', path: '/admin/orders', icon: '🛒' },
        { name: 'Reviews', path: '/admin/reviews', icon: '⭐' },
    ]

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container-custom py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold mb-2">
                        Admin <span className="gradient-text">Panel</span> 🔧
                    </h1>
                    <p className="text-gray-600">Welcome back, {user?.name}!</p>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card space-y-2">
                            {adminLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-primary-50 hover:text-primary-600 flex items-center space-x-3"
                                >
                                    <span className="text-xl">{link.icon}</span>
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                            <Link
                                href="/"
                                className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 text-gray-600 flex items-center space-x-3 border-t-2 border-gray-200 mt-4 pt-4"
                            >
                                <span className="text-xl">🏠</span>
                                <span>Back to Website</span>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
