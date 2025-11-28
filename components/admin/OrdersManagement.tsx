'use client'

import { useState, useEffect } from 'react'
import { ordersDB, initializeDatabase, Order } from '@/lib/db'
import { useNotification } from '@/contexts/NotificationContext'
import { sendOrderStatusUpdate } from '@/lib/email'
import AdminLayout from '@/components/admin/AdminLayout'

const AdminOrders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [filter, setFilter] = useState('all')
    const { success, error: showError } = useNotification()

    useEffect(() => {
        initializeDatabase()
        loadOrders()
    }, [])

    const loadOrders = () => {
        const allOrders = ordersDB.getAll()
        setOrders(allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    }

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const order = ordersDB.update(orderId, { status: newStatus })
            if (order) {
                await sendOrderStatusUpdate(order, newStatus)
                success(`Order status updated to ${newStatus}!`)
                loadOrders()
            }
        } catch (error) {
            showError('Failed to update order status.')
        }
    }

    const handleDelete = (orderId: string) => {
        if (confirm('Are you sure you want to delete this order?')) {
            ordersDB.delete(orderId)
            success('Order deleted successfully!')
            loadOrders()
        }
    }

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

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter)

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="card">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h2 className="text-2xl font-bold">Orders Management</h2>
                            <p className="text-gray-600">View and manage all orders</p>
                        </div>
                        <div className="flex space-x-2">
                            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filter === status
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-xl font-bold mb-4">
                        {filter === 'all' ? 'All Orders' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Orders`} ({filteredOrders.length})
                    </h3>

                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-gray-600">No orders found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                                >
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                                                    #{order.id.slice(-8)}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(order.status)}`}>
                                                    {order.status.toUpperCase()}
                                                </span>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Customer</p>
                                                    <p className="font-semibold text-gray-800">{order.userName}</p>
                                                    <p className="text-sm text-gray-600">{order.email}</p>
                                                    <p className="text-sm text-gray-600">{order.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Service</p>
                                                    <p className="font-semibold text-gray-800">{order.productName || order.serviceType}</p>
                                                    {order.productId && (
                                                        <p className="text-sm text-gray-600">ID: {order.productId}</p>
                                                    )}
                                                    <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Location</p>
                                                    <p className="font-semibold text-gray-800">{order.city}, {order.country}</p>
                                                    {order.address && (
                                                        <p className="text-sm text-gray-600">{order.address}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Order Date</p>
                                                    <p className="font-semibold text-gray-800">
                                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            {order.instructions && (
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-600 mb-1">Special Instructions:</p>
                                                    <p className="text-gray-800">{order.instructions}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-2 lg:ml-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className="input-field text-sm"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminOrders
