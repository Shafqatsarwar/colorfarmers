'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { ordersDB, productsDB, initializeDatabase, Product } from '@/lib/db'
import { sendOrderConfirmation, sendNewOrderNotification } from '@/lib/email'

const Order = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        productId: '',
        serviceType: '',
        quantity: 1,
        instructions: '',
        city: '',
        country: 'Pakistan',
        address: '',
    })
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const { user, isLoggedIn } = useAuth()
    const { success, error: showError } = useNotification()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        initializeDatabase()
        setProducts(productsDB.getAll())

        // Pre-fill form if user is logged in
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
            }))
        }

        // Pre-fill product ID from URL params
        const productId = searchParams.get('productId')
        if (productId) {
            setFormData(prev => ({ ...prev, productId }))
        }
    }, [user, searchParams])

    const serviceTypes = [
        'Thesis Printing & Binding',
        'Wedding Cards',
        'Photocopy',
        'Digital Printing',
        'Custom Printing',
        'Binding Services',
        'Giveaways & Gifts',
        'Educational Material',
        'Other',
    ]

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Find product name if product ID is provided
            let productName = formData.serviceType
            if (formData.productId) {
                const product = products.find(p => p.id === formData.productId || p.articleNumber === formData.productId)
                if (product) {
                    productName = product.name
                }
            }

            // Create order
            const order = ordersDB.create({
                userId: user?.id || null,
                userName: formData.name,
                email: formData.email,
                phone: formData.phone,
                productId: formData.productId || null,
                productName,
                serviceType: formData.serviceType,
                quantity: Number(formData.quantity),
                instructions: formData.instructions,
                city: formData.city,
                country: formData.country,
                address: formData.address,
                status: 'pending',
            })

            // Send email notifications
            await sendOrderConfirmation(order)
            await sendNewOrderNotification(order)

            success('Order placed successfully! Check your email for confirmation.')

            // Reset form
            setFormData({
                name: user?.name || '',
                email: user?.email || '',
                phone: '',
                productId: '',
                serviceType: '',
                quantity: 1,
                instructions: '',
                city: '',
                country: 'Pakistan',
                address: '',
            })

            // Redirect to orders page if logged in
            if (isLoggedIn()) {
                setTimeout(() => router.push('/my-orders'), 2000)
            }
        } catch (error) {
            console.error('Order error:', error)
            showError('Failed to place order. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="pt-20 min-h-screen">
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="text-5xl mb-4">📦</div>
                            <h1 className="text-4xl font-display font-bold mb-4">
                                Place Your <span className="gradient-text">Order</span>
                            </h1>
                            <p className="text-xl text-gray-600">
                                Fill out the form below and we'll get back to you shortly!
                            </p>
                        </div>

                        <div className="card">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                                        <span>👤</span>
                                        <span>Personal Information</span>
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="input-field"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="input-field"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone / WhatsApp Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="+92 300 1234567"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                                        <span>📋</span>
                                        <span>Order Details</span>
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Service Type *
                                            </label>
                                            <select
                                                id="serviceType"
                                                name="serviceType"
                                                value={formData.serviceType}
                                                onChange={handleChange}
                                                className="input-field"
                                                required
                                            >
                                                <option value="">Select a service</option>
                                                {serviceTypes.map(service => (
                                                    <option key={service} value={service}>{service}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="productId" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Product ID / Article Number (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="productId"
                                                name="productId"
                                                value={formData.productId}
                                                onChange={handleChange}
                                                className="input-field"
                                                placeholder="e.g., TP001"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Quantity *
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            className="input-field"
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="instructions" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Special Instructions (Optional)
                                        </label>
                                        <textarea
                                            id="instructions"
                                            name="instructions"
                                            value={formData.instructions}
                                            onChange={handleChange}
                                            className="textarea-field"
                                            rows={4}
                                            placeholder="Any special requirements or notes..."
                                        />
                                    </div>
                                </div>

                                {/* Delivery Information */}
                                <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                                        <span>📍</span>
                                        <span>Delivery Information</span>
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="input-field"
                                                placeholder="Lahore"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                id="country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="input-field"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Delivery Address (Optional)
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="textarea-field"
                                            rows={3}
                                            placeholder="Full delivery address (if delivery is required)"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
                                >
                                    {loading ? 'Placing Order...' : 'Place Order'} 🚀
                                </button>

                                {!isLoggedIn() && (
                                    <p className="text-center text-sm text-gray-600">
                                        Have an account?{' '}
                                        <a href="/login" className="text-primary-600 font-semibold hover:underline">
                                            Login
                                        </a>{' '}
                                        to track your orders
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Order
