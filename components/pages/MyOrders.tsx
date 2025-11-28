'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { getOrdersByUser, initializeDatabase, Order } from '@/lib/db'

const MyOrders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const { user, isLoggedIn } = useAuth()
    const router = useRouter()

    const loadOrders = useCallback(() => {
        if (user) {
            const userOrders = getOrdersByUser(user.id)
            setOrders(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        }
        setLoading(false)
    }, [user])

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/login')
            return
        }

        initializeDatabase()
        loadOrders()
    }, [isLoggedIn, loadOrders, router])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300'
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-300'
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-300'
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-300'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return '⏳'
            case 'processing':
                return '⚙️'
            case 'completed':
                return '✅'
            case 'cancelled':
                return '❌'
            default:
                return '📦'
        }
    }

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-xl text-gray-600">Loading your orders...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-20 min-h-screen">
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <div className="text-5xl mb-4">📦</div>
                        <h1 className="text-4xl font-display font-bold mb-4">
                            My <span className="gradient-text">Orders</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Track and manage all your orders
                        </p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="card">
                                <div className="text-6xl mb-4">📭</div>
                                <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
                                <p className="text-gray-600 mb-6">
                                    You haven't placed any orders yet. Start ordering now!
                                </p>
                                <a href="/order" className="btn-primary inline-block">
                                    Place Your First Order 🚀
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="card hover:scale-[1.02] transition-transform duration-300">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                Order #{order.id.slice(-8)}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div className={`mt-2 md:mt-0 px-4 py-2 rounded-full border-2 font-semibold inline-flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                                            <span>{getStatusIcon(order.status)}</span>
                                            <span className="capitalize">{order.status}</span>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Service Type</p>
                                            <p className="font-semibold text-gray-800">{order.productName || order.serviceType}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Quantity</p>
                                            <p className="font-semibold text-gray-800">{order.quantity}</p>
                                        </div>
                                        {order.productId && (
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Product ID</p>
                                                <p className="font-semibold text-gray-800">{order.productId}</p>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Delivery Location</p>
                                            <p className="font-semibold text-gray-800">{order.city}, {order.country}</p>
                                        </div>
                                        {order.phone && (
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Contact</p>
                                                <p className="font-semibold text-gray-800">{order.phone}</p>
                                            </div>
                                        )}
                                        {order.instructions && (
                                            <div className="md:col-span-2">
                                                <p className="text-sm text-gray-600 mb-1">Special Instructions</p>
                                                <p className="text-gray-800">{order.instructions}</p>
                                            </div>
                                        )}
                                    </div>

                                    {order.status === 'pending' && (
                                        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                                            <p className="text-sm text-yellow-800">
                                                ⏳ Your order is pending. We'll start processing it soon!
                                            </p>
                                        </div>
                                    )}
                                    {order.status === 'processing' && (
                                        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                                            <p className="text-sm text-blue-800">
                                                ⚙️ Your order is being processed. We'll notify you when it's ready!
                                            </p>
                                        </div>
                                    )}
                                    {order.status === 'completed' && (
                                        <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-400 rounded">
                                            <p className="text-sm text-green-800">
                                                ✅ Your order is ready! Please contact us for pickup/delivery.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default MyOrders
