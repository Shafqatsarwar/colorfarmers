'use client'

import Link from 'next/link'

const StartToday = () => {
    const steps = [
        {
            number: '01',
            title: 'Choose Service',
            description: 'Select from our wide range of printing and imaging services.',
            icon: '📋'
        },
        {
            number: '02',
            title: 'Place Order',
            description: 'Fill out the order form with your requirements and files.',
            icon: '✍️'
        },
        {
            number: '03',
            title: 'Processing',
            description: 'We process your order with high-quality equipment.',
            icon: '⚙️'
        },
        {
            number: '04',
            title: 'Delivery',
            description: 'Pick up your order or get it delivered to your doorstep.',
            icon: '🚚'
        }
    ]

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Start Your Project <span className="gradient-text">Today</span> 🚀
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Professional printing services are just a few clicks away. Fast, reliable, and high quality.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/order" className="btn-primary text-lg">
                            Place Order Now 📄
                        </Link>
                        <Link href="/rates" className="btn-outline text-lg bg-white">
                            View Rates 💰
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-3xl font-display font-bold text-center mb-12">
                        How It <span className="gradient-text">Works</span> 🛠️
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="card relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                                <div className="absolute -right-4 -top-4 text-8xl font-bold text-gray-100 group-hover:text-primary-50 transition-colors">
                                    {step.number}
                                </div>
                                <div className="relative z-10">
                                    <div className="text-4xl mb-4">{step.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display font-bold mb-6">
                                Why Choose <span className="gradient-text">ColorFarmers?</span> 🌟
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                        ⚡
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Fast Turnaround</h3>
                                        <p className="text-gray-600">We understand deadlines. Get your prints when you need them.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                        💎
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Premium Quality</h3>
                                        <p className="text-gray-600">State-of-the-art equipment for crisp, clear, and vibrant prints.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                        🤝
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Expert Support</h3>
                                        <p className="text-gray-600">Our experienced team is here to help you with any printing challenge.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                            <p className="text-gray-600 mb-6">
                                Create an account to track your orders, save your preferences, and get exclusive discounts.
                            </p>
                            <Link href="/signup" className="block w-full btn-primary text-center mb-4">
                                Create Free Account ✨
                            </Link>
                            <p className="text-center text-sm text-gray-500">
                                Already have an account? <Link href="/login" className="text-primary-600 font-semibold hover:underline">Login here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StartToday
