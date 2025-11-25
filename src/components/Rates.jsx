'use client'

import { useEffect, useState } from 'react'

const Rates = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const serviceCategories = [
        {
            id: 'thesis',
            name: 'Thesis Point',
            icon: '📚',
            color: 'from-primary-400 to-primary-600',
            services: [
                { name: 'Printout (B/W)', price: 'From Rs. 3/page' },
                { name: 'Printout (Color)', price: 'From Rs. 15/page' },
                { name: 'Photocopy (B/W)', price: 'From Rs. 2/page' },
                { name: 'Photocopy (Color)', price: 'From Rs. 10/page' },
                { name: 'Spiral Binding', price: 'From Rs. 50' },
                { name: 'Hard Binding', price: 'From Rs. 300' },
                { name: 'Composing & Formatting', price: 'Contact for quote' },
                { name: 'PDF Conversion', price: 'From Rs. 100' },
                { name: 'CD Writing', price: 'From Rs. 50' },
            ],
        },
        {
            id: 'invites',
            name: 'Invites & Cards',
            icon: '💌',
            color: 'from-pink-400 to-pink-600',
            services: [
                { name: 'Wedding Cards (Standard)', price: 'From Rs. 15/card' },
                { name: 'Wedding Cards (Premium)', price: 'From Rs. 50/card' },
                { name: 'Birthday Cards', price: 'From Rs. 10/card' },
                { name: 'Event Cards', price: 'From Rs. 8/card' },
                { name: 'Custom Design', price: 'From Rs. 500' },
            ],
        },
        {
            id: 'giveaways',
            name: 'Giveaways & Gifts',
            icon: '🎁',
            color: 'from-secondary-400 to-secondary-600',
            services: [
                { name: 'Printed Mugs', price: 'From Rs. 250' },
                { name: 'Printed Plates', price: 'From Rs. 300' },
                { name: 'Printed Tiles', price: 'From Rs. 200' },
                { name: 'Fabric Printing', price: 'Contact for quote' },
                { name: 'Cushion/Pillow Printing', price: 'From Rs. 400' },
                { name: 'Leather Accessories', price: 'From Rs. 300' },
                { name: 'Key Chains', price: 'From Rs. 100' },
                { name: 'T-Shirts (Round/Dress)', price: 'From Rs. 500' },
                { name: 'Caps', price: 'From Rs. 300' },
                { name: 'Coats', price: 'Contact for quote' },
            ],
        },
        {
            id: 'copyshop',
            name: 'Copy Shop',
            icon: '🖨️',
            color: 'from-accent-400 to-accent-600',
            services: [
                { name: 'Photocopy (B/W)', price: 'From Rs. 2/page' },
                { name: 'Photocopy (Color)', price: 'From Rs. 10/page' },
                { name: 'Computer Printouts', price: 'From Rs. 3/page' },
                { name: 'Large Format Printing (44")', price: 'From Rs. 100/sqft' },
                { name: 'CAD Printing', price: 'Contact for quote' },
                { name: 'Design & Posters', price: 'From Rs. 500' },
                { name: 'Maps Printing', price: 'Contact for quote' },
                { name: 'Scanning Services', price: 'From Rs. 5/page' },
                { name: 'Archiving Services', price: 'Contact for quote' },
            ],
        },
        {
            id: 'binding',
            name: 'Bindings',
            icon: '📖',
            color: 'from-purple-400 to-purple-600',
            services: [
                { name: 'Loop Binding', price: 'From Rs. 30' },
                { name: 'Spiral Binding', price: 'From Rs. 50' },
                { name: 'Ring Binding', price: 'From Rs. 40' },
                { name: 'Tape Binding', price: 'From Rs. 60' },
                { name: 'Simple Hard Binding', price: 'From Rs. 300' },
                { name: 'Cover Print Binding', price: 'From Rs. 400' },
                { name: 'Embossing Binding', price: 'From Rs. 500' },
                { name: 'Paper Binding', price: 'From Rs. 25' },
            ],
        },
        {
            id: 'education',
            name: 'Educational Material',
            icon: '🎓',
            color: 'from-indigo-400 to-indigo-600',
            services: [
                { name: 'M.Sc Mathematics', price: 'Contact for availability' },
                { name: 'M.A Library Sciences', price: 'Contact for availability' },
                { name: 'M.Sc Statistics', price: 'Contact for availability' },
                { name: 'M.Sc Sports Sciences', price: 'Contact for availability' },
                { name: 'M.A Islamiat', price: 'Contact for availability' },
                { name: 'B.Sc Mathematics', price: 'Contact for availability' },
                { name: 'F.Sc Mathematics', price: 'Contact for availability' },
                { name: 'O-Levels Materials', price: 'Contact for availability' },
                { name: 'A-Levels Materials', price: 'Contact for availability' },
                { name: 'Question Papers & Notes', price: 'From Rs. 50' },
            ],
        },
        {
            id: 'online',
            name: 'Online Services',
            icon: '💻',
            color: 'from-green-400 to-green-600',
            services: [
                { name: 'Account Creation', price: 'Free' },
                { name: 'Account Recharge', price: 'Min. Rs. 500' },
                { name: 'File Upload & Order', price: 'As per service' },
                { name: 'Home Delivery (Lahore)', price: 'From Rs. 100' },
            ],
        },
        {
            id: 'custom',
            name: 'Custom Items',
            icon: '🏆',
            color: 'from-yellow-400 to-yellow-600',
            services: [
                { name: 'Crystal Shields', price: 'From Rs. 1,500' },
                { name: 'Glass Trophies', price: 'From Rs. 1,200' },
                { name: 'Acrylic Awards', price: 'From Rs. 800' },
                { name: 'Wooden Plaques', price: 'From Rs. 1,000' },
                { name: 'Certificates Printing', price: 'From Rs. 50' },
                { name: 'Photo Frames', price: 'From Rs. 300' },
                { name: 'Desktop Items', price: 'From Rs. 400' },
                { name: 'Wall Mount Items', price: 'From Rs. 600' },
            ],
        },
        {
            id: 'offset',
            name: 'Offset & Digital Print',
            icon: '🎨',
            color: 'from-red-400 to-red-600',
            services: [
                { name: 'Letterhead (1000 pcs)', price: 'From Rs. 3,000' },
                { name: 'Name Cards (100 pcs)', price: 'From Rs. 500' },
                { name: 'Brochures', price: 'From Rs. 5/piece' },
                { name: 'Flyers', price: 'From Rs. 3/piece' },
                { name: 'Posters (A3)', price: 'From Rs. 50' },
                { name: 'Buntings', price: 'Contact for quote' },
                { name: 'Invoice/Bill Books', price: 'From Rs. 300' },
                { name: 'Customized Stationery', price: 'Contact for quote' },
                { name: 'Hand Bags', price: 'From Rs. 20' },
                { name: 'Envelopes', price: 'From Rs. 2' },
            ],
        },
        {
            id: 'outdoor',
            name: 'Outdoor Printing',
            icon: '🖼️',
            color: 'from-teal-400 to-teal-600',
            services: [
                { name: 'Flex Printing', price: 'From Rs. 80/sqft' },
                { name: 'Signage Printing', price: 'Contact for quote' },
                { name: 'Standees', price: 'From Rs. 1,500' },
                { name: 'Banners', price: 'From Rs. 500' },
                { name: 'Vinyl Printing', price: 'From Rs. 100/sqft' },
                { name: 'One Vision', price: 'Contact for quote' },
                { name: 'Transparent Printing', price: 'Contact for quote' },
                { name: 'Canvas Printing', price: 'From Rs. 150/sqft' },
            ],
        },
    ];

    const filteredCategories =
        activeCategory === 'all'
            ? serviceCategories
            : serviceCategories.filter((cat) => cat.id === activeCategory);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Our <span className="gradient-text">Rates & Services</span> 💰
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Competitive pricing for all your printing and imaging needs. Bulk discounts available!
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
                        {serviceCategories.map((category) => (
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
                        {filteredCategories.map((category) => (
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
                                    {category.services.map((service, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-gray-700 font-medium flex-1">{service.name}</span>
                                            <span className="text-primary-600 font-semibold text-sm ml-2 text-right">
                                                {service.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bulk Discount Notice */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl p-8 text-white text-center shadow-2xl">
                            <div className="text-5xl mb-4">🎉</div>
                            <h2 className="text-3xl font-display font-bold mb-4">Special Discounts Available!</h2>
                            <p className="text-lg mb-6">
                                We offer special rates for bulk orders, corporate clients, and regular customers. Contact us for a customized quote!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923004251833'}?text=Hello! I'd like to inquire about bulk discounts.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Get Custom Quote 💬
                                </a>
                                <a
                                    href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com'}?subject=Bulk Order Inquiry`}
                                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
                                >
                                    Email Us ✉️
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Notes */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-display font-bold text-center mb-8">
                            <span className="gradient-text">Important Information</span> ℹ️
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="card">
                                <div className="text-3xl mb-3">📝</div>
                                <h3 className="text-xl font-bold mb-2">Pricing Notes</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start space-x-2">
                                        <span className="text-primary-500 mt-1">•</span>
                                        <span>Prices are subject to change based on material and quantity</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="text-primary-500 mt-1">•</span>
                                        <span>Bulk orders receive special discounts</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="text-primary-500 mt-1">•</span>
                                        <span>Custom designs may have additional charges</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="card">
                                <div className="text-3xl mb-3">⚡</div>
                                <h3 className="text-xl font-bold mb-2">Delivery Times</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start space-x-2">
                                        <span className="text-secondary-500 mt-1">•</span>
                                        <span>Standard orders: 24-48 hours</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="text-secondary-500 mt-1">•</span>
                                        <span>Rush service available for urgent orders</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="text-secondary-500 mt-1">•</span>
                                        <span>Same-day service for simple printing jobs</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Ready to Place Your Order? 🚀
                    </h2>
                    <p className="text-xl mb-8">
                        Contact us today for the best printing solutions in Lahore!
                    </p>
                    <a
                        href="/start-today"
                        className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Start Your Order Now 📄
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Rates;
