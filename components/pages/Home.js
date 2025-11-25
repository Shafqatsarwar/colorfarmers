'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const Home = () => {
    const [stats] = useState([
        { icon: '📅', value: '35+', label: 'Years of Service' },
        { icon: '🏢', value: '100+', label: 'Corporate Clients' },
        { icon: '😊', value: '50,000+', label: 'Happy Customers' },
        { icon: '🖨️', value: '24/7', label: 'Service Available' },
    ])

    const services = [
        { icon: '📄', title: 'Photocopy & Printing', desc: 'Color & B/W printing services', color: 'from-primary-400 to-primary-600' },
        { icon: '📚', title: 'Thesis Binding', desc: 'Professional binding solutions', color: 'from-secondary-400 to-secondary-600' },
        { icon: '💍', title: 'Wedding Cards', desc: 'Custom invitation designs', color: 'from-accent-400 to-accent-600' },
        { icon: '☕', title: 'Custom Printing', desc: 'Mugs, T-shirts, and more', color: 'from-pink-400 to-pink-600' },
        { icon: '🗺️', title: 'Large Format', desc: 'Up to 44" x 200" printing', color: 'from-purple-400 to-purple-600' },
        { icon: '🎓', title: 'Educational Material', desc: 'Study materials & notes', color: 'from-indigo-400 to-indigo-600' },
    ]

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923004251833'

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-fade-in">
                            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                                🎉 Serving Since 1987
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                                Professional{' '}
                                <span className="gradient-text">Printing & Imaging</span>{' '}
                                Services
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Welcome to Scholars Photostat Centre - Your trusted partner for all printing, photocopy, binding, and digital imaging needs. Quality service delivered with excellence for over 35 years! 🖨️✨
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/start-today" className="btn-primary">
                                    Get Started Today 🚀
                                </Link>
                                <Link href="/rates" className="btn-outline">
                                    View Our Rates 💰
                                </Link>
                            </div>
                        </div>
                        <div className="relative animate-slide-up">
                            <div className="bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200 rounded-3xl p-8 shadow-2xl">
                                <div className="bg-white rounded-2xl p-6 space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-3xl">
                                            📄
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl">Quick Service</h3>
                                            <p className="text-gray-600">Same-day delivery available</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl text-center">
                                            <div className="text-3xl mb-2">🖨️</div>
                                            <p className="font-semibold text-primary-700">High Quality</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-4 rounded-xl text-center">
                                            <div className="text-3xl mb-2">⚡</div>
                                            <p className="font-semibold text-secondary-700">Fast Service</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-4 rounded-xl text-center">
                                            <div className="text-3xl mb-2">💰</div>
                                            <p className="font-semibold text-accent-700">Best Prices</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl text-center">
                                            <div className="text-3xl mb-2">🏆</div>
                                            <p className="font-semibold text-pink-700">Trusted</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="card-gradient text-center transform hover:scale-105 transition-transform duration-300"
                            >
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Our <span className="gradient-text">Services</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Comprehensive printing and imaging solutions for all your needs 🎨
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="card group hover:scale-105 transition-all duration-300"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/rates" className="btn-primary">
                            View All Services & Rates 📋
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-display font-bold">
                                Why Choose <span className="gradient-text">Scholars?</span>
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { icon: '⭐', title: 'Trusted Since 1987', desc: 'Over 35 years of excellence in printing services' },
                                    { icon: '🏢', title: 'Corporate Trusted', desc: 'Serving 100+ institutions including universities and banks' },
                                    { icon: '🚀', title: 'Latest Technology', desc: 'State-of-the-art equipment for best quality' },
                                    { icon: '💯', title: 'Quality Assured', desc: 'We guarantee satisfaction on every order' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="text-3xl">{item.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 rounded-3xl p-8">
                            <div className="bg-white rounded-2xl p-8 shadow-xl">
                                <h3 className="text-2xl font-bold mb-6 text-center">Major Clients Include:</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {[
                                        'University of Punjab',
                                        'LUMS',
                                        'ITU',
                                        'UHS',
                                        'WAPDA',
                                        'National Bank',
                                        'Beaconhouse',
                                        'And 100+ more...',
                                    ].map((client, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <span className="text-primary-500">✓</span>
                                            <span className="font-medium">{client}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Ready to Get Started? 🎯
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Contact us today for a free quote or visit our shop for immediate service!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=Hello! I'm interested in your services.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            WhatsApp Us 💬
                        </a>
                        <Link
                            href="/contact"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
                        >
                            Contact Us 📞
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
