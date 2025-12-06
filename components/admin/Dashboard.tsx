'use client'

import { useState, useEffect } from 'react'
import { ordersDB, reviewsDB, productsDB, usersDB, initializeDatabase, getOrdersByStatus, getPendingReviews } from '@/lib/db'
import AdminLayout from '@/components/admin/AdminLayout'

interface Stats {
    totalOrders: number
    pendingOrders: number
    completedOrders: number
    totalProducts: number
    totalReviews: number
    pendingReviews: number
    totalUsers: number
}

interface StatCard {
    title: string
    value: number
    icon: string
    color: string
    link: string
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<Stats>({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalProducts: 0,
        totalReviews: 0,
        pendingReviews: 0,
        totalUsers: 0,
    })

    useEffect(() => {
        initializeDatabase()
        loadStats()
    }, [])

    const loadStats = () => {
        const allOrders = ordersDB.getAll()
        const pendingOrders = getOrdersByStatus('pending')
        const completedOrders = getOrdersByStatus('completed')
        const allProducts = productsDB.getAll()
        const allReviews = reviewsDB.getAll()
        const pendingReviews = getPendingReviews()
        const allUsers = usersDB.getAll()

        setStats({
            totalOrders: allOrders.length,
            pendingOrders: pendingOrders.length,
            completedOrders: completedOrders.length,
            totalProducts: allProducts.length,
            totalReviews: allReviews.length,
            pendingReviews: pendingReviews.length,
            totalUsers: allUsers.length,
        })
    }

    const statCards: StatCard[] = [
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: '🛒',
            color: 'from-blue-400 to-blue-600',
            link: '/admin/orders',
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: '⏳',
            color: 'from-yellow-400 to-yellow-600',
            link: '/admin/orders',
        },
        {
            title: 'Completed Orders',
            value: stats.completedOrders,
            icon: '✅',
            color: 'from-green-400 to-green-600',
            link: '/admin/orders',
        },
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: '📦',
            color: 'from-purple-400 to-purple-600',
            link: '/admin/products',
        },
        {
            title: 'Total Reviews',
            value: stats.totalReviews,
            icon: '⭐',
            color: 'from-pink-400 to-pink-600',
            link: '/admin/reviews',
        },
        {
            title: 'Pending Reviews',
            value: stats.pendingReviews,
            icon: '📝',
            color: 'from-orange-400 to-orange-600',
            link: '/admin/reviews',
        },
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: '👥',
            color: 'from-indigo-400 to-indigo-600',
            link: '#',
        },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
                    <p className="text-gray-600">
                        Welcome to your admin dashboard. Here's a quick overview of your business.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((stat, index) => (
                        <a
                            key={index}
                            href={stat.link}
                            className="card group hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                    <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
                                </div>
                                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card">
                        <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                            <span>📊</span>
                            <span>Quick Actions</span>
                        </h3>
                        <div className="space-y-3">
                            <a href="/admin/products" className="block px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                                ➕ Add New Product
                            </a>
                            <a href="/admin/orders" className="block px-4 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                                📦 View All Orders
                            </a>
                            <a href="/admin/reviews" className="block px-4 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                                ⭐ Manage Reviews
                            </a>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                            <span>ℹ️</span>
                            <span>System Information</span>
                        </h3>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span>Storage Type:</span>
                                <span className="font-semibold">LocalStorage</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span>Email Service:</span>
                                <span className="font-semibold">EmailJS</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span>Framework:</span>
                                <span className="font-semibold">Next.js 15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard
