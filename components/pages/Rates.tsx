'use client'

import { useState, useEffect } from 'react'
import { productsDB, initializeDatabase, Product } from '@/lib/db'
import Link from 'next/link'

const Rates = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        initializeDatabase()
        // Load products from DB
        const dbProducts = productsDB.getAll()
        setProducts(dbProducts)
    }, [])

    // Static categories definition
    const categories = [
        { id: 'thesis', name: 'Thesis Point', icon: '📚', color: 'from-primary-400 to-primary-600' },
        { id: 'invites', name: 'Invites & Cards', icon: '💌', color: 'from-pink-400 to-pink-600' },
        { id: 'giveaways', name: 'Giveaways & Gifts', icon: '🎁', color: 'from-secondary-400 to-secondary-600' },
        { id: 'copyshop', name: 'Copy Shop', icon: '🖨️', color: 'from-accent-400 to-accent-600' },
        { id: 'binding', name: 'Bindings', icon: '📖', color: 'from-purple-400 to-purple-600' },
        { id: 'education', name: 'Educational', icon: '🎓', color: 'from-indigo-400 to-indigo-600' },
        { id: 'online', name: 'Online Services', icon: '💻', color: 'from-green-400 to-green-600' },
        { id: 'custom', name: 'Custom Items', icon: '🏆', color: 'from-yellow-400 to-yellow-600' },
        { id: 'offset', name: 'Offset Print', icon: '🎨', color: 'from-red-400 to-red-600' },
        { id: 'outdoor', name: 'Outdoor Print', icon: '🖼️', color: 'from-teal-400 to-teal-600' },
    ]

    // Merge static services with DB products if needed, or just use DB products
    // For this implementation, we'll primarily use the DB products but fall back to some defaults if empty
    // To make it fully dynamic, we should rely on DB. 
    // However, to keep the rich UI, let's map DB products to these categories.

    const getCategoryProducts = (categoryId: string) => {
        return products.filter(p => p.category === categoryId)
    }

    const filteredCategories = activeCategory === 'all'
        ? categories
        : categories.filter(c => c.id === activeCategory)

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Our <span className="gradient-text">Rates & Services</span> 💰
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Competitive pricing for all your printing and imaging needs.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white sticky top-20 z-30 shadow-md">
                <div className="container-custom">
                    <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${activeCategory === 'all'
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All Services
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 flex items-center space-x-2 ${activeCategory === category.id
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCategories.map((category) => {
                            const categoryProducts = getCategoryProducts(category.id)

                            // Only show categories that have products or if we are in 'all' view showing empty placeholders?
                            // Let's show all categories but indicate if empty

                            return (
                                <div
                                    key={category.id}
                                    className="card group hover:scale-105 transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:rotate-12 transition-transform duration-300`}
                                        >
                                            {category.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold">{category.name}</h3>
                                    </div>

                                    <div className="space-y-3">
                                        {categoryProducts.length > 0 ? (
                                            categoryProducts.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <div>
                                                        <span className="text-gray-700 font-medium block">{product.name}</span>
                                                        <span className="text-xs text-gray-500">{product.articleNumber}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-primary-600 font-bold block">
                                                            Rs. {product.price}
                                                        </span>
                                                        <Link
                                                            href={`/order?productId=${product.articleNumber}`}
                                                            className="text-xs text-secondary-600 hover:underline"
                                                        >
                                                            Order Now
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic text-sm">No products listed yet.</p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Don't see what you need? 🧐
                    </h2>
                    <p className="text-xl mb-8">
                        We offer custom printing solutions. Contact us for a quote!
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Contact Us 📞
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Rates
