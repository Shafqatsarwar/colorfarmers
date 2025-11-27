'use client'

import Link from 'next/link'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Start Today', path: '/start-today' },
        { name: 'Rates', path: '/rates' },
    ]

    const services = [
        'Photocopy & Printing',
        'Thesis Binding',
        'Wedding Cards',
        'Custom Printing',
        'Large Format Printing',
        'Educational Materials',
    ]

    const contactInfo = {
        address: 'Muslim Town Mor, Beside Jamia Asharfia, 147-Ferozepur Road, Lahore',
        phone: '042-37503264-5',
        mobile: '0300-4251833',
        email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com',
    }

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923004251833'

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="container-custom px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                📄
                            </div>
                            <div>
                                <h3 className="text-white font-display font-bold text-lg">ColorFarmers</h3>
                                <p className="text-xs text-gray-400">Since 1987</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Professional photocopy, printing, and digital imaging services. Serving the nation with quality and excellence for over 35 years.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-10 h-10 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                                📘
                            </a>
                            <a href="#" className="w-10 h-10 bg-accent-500 hover:bg-accent-600 rounded-full flex items-center justify-center transition-colors">
                                🐦
                            </a>
                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors">
                                💬
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-display font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        href={link.path}
                                        className="text-sm hover:text-primary-400 transition-colors flex items-center space-x-2"
                                    >
                                        <span className="text-primary-500">▸</span>
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/reviews"
                                    className="text-sm hover:text-primary-400 transition-colors flex items-center space-x-2"
                                >
                                    <span className="text-primary-500">▸</span>
                                    <span>Reviews</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm hover:text-primary-400 transition-colors flex items-center space-x-2"
                                >
                                    <span className="text-primary-500">▸</span>
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-display font-semibold text-lg mb-4">Our Services</h4>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={index} className="text-sm flex items-center space-x-2">
                                    <span className="text-secondary-400">✓</span>
                                    <span>{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-display font-semibold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-2">
                                <span className="text-accent-400 mt-1">📍</span>
                                <span className="text-wrap">{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-accent-400">📞</span>
                                <a href={`tel:${contactInfo.phone}`} className="hover:text-primary-400 transition-colors">
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-accent-400">📱</span>
                                <a href={`tel:${contactInfo.mobile}`} className="hover:text-primary-400 transition-colors">
                                    {contactInfo.mobile}
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-accent-400">✉️</span>
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary-400 transition-colors">
                                    {contactInfo.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container-custom px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © ExcellenceLinks {currentYear}. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
