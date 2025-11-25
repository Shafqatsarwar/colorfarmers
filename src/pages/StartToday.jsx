'use client'

import { useEffect, useState } from 'react'

const StartToday = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleWhatsApp = () => {
        const message = `Hello! I'm ${formData.name || 'interested in your services'}.\n\nService: ${formData.service || 'General Inquiry'}\nPhone: ${formData.phone || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\n\nMessage: ${formData.message || 'I would like to know more about your services.'}`;
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923004251833';
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleEmail = () => {
        const subject = `Service Inquiry - ${formData.service || 'General'}`;
        const body = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nService Interested: ${formData.service}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const steps = [
        {
            number: '1',
            icon: '📝',
            title: 'Fill the Form',
            desc: 'Provide your details and service requirements',
            color: 'from-primary-400 to-primary-600',
        },
        {
            number: '2',
            icon: '💬',
            title: 'Contact Us',
            desc: 'Reach out via WhatsApp or Email',
            color: 'from-secondary-400 to-secondary-600',
        },
        {
            number: '3',
            icon: '📄',
            title: 'Submit Your Files',
            desc: 'Send us your documents or designs',
            color: 'from-accent-400 to-accent-600',
        },
        {
            number: '4',
            icon: '🚚',
            title: 'Receive Your Order',
            desc: 'Get delivery or pickup from our shop',
            color: 'from-pink-400 to-pink-600',
        },
    ];

    const services = [
        'Photocopy & Printing',
        'Thesis Binding',
        'Wedding/Event Cards',
        'Custom Printing (Mugs, T-Shirts, etc.)',
        'Large Format Printing',
        'Educational Materials',
        'Scanning & Archiving',
        'Other Services',
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Start Your <span className="gradient-text">Order Today!</span> 🚀
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Getting started is easy! Follow these simple steps to place your order and experience our exceptional service.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="card text-center group hover:scale-105 transition-all duration-300">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {step.number}
                                    </div>
                                    <div className="text-4xl mb-3">{step.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.desc}</p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-3xl text-gray-300">
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="card-gradient">
                            <h2 className="text-3xl font-display font-bold text-center mb-8">
                                <span className="gradient-text">Get in Touch</span> 📞
                            </h2>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="input-field"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="input-field"
                                            placeholder="03XX-XXXXXXX"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="input-field"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Service Required *
                                    </label>
                                    <select
                                        value={formData.service}
                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        className="input-field"
                                        required
                                    >
                                        <option value="">Select a service...</option>
                                        {services.map((service, index) => (
                                            <option key={index} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Additional Details
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="textarea-field"
                                        rows="4"
                                        placeholder="Tell us more about your requirements..."
                                    ></textarea>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleWhatsApp}
                                        className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <span>💬</span>
                                        <span>Continue with WhatsApp</span>
                                    </button>
                                    <button
                                        onClick={handleEmail}
                                        className="flex-1 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <span>✉️</span>
                                        <span>Send via Email</span>
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 text-center">
                                    * Required fields. We'll respond within 24 hours! ⚡
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Contact Options */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Other Ways to <span className="gradient-text">Connect</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <a
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923004251833'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card text-center group hover:scale-105 transition-all duration-300"
                        >
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💬</div>
                            <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                            <p className="text-gray-600 mb-3">Quick response guaranteed</p>
                            <p className="text-primary-600 font-semibold">0300-4251833</p>
                        </a>

                        <a
                            href="tel:042-37503264"
                            className="card text-center group hover:scale-105 transition-all duration-300"
                        >
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📞</div>
                            <h3 className="text-xl font-bold mb-2">Phone</h3>
                            <p className="text-gray-600 mb-3">Call us directly</p>
                            <p className="text-secondary-600 font-semibold">042-37503264-5</p>
                        </a>

                        <a
                            href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com'}`}
                            className="card text-center group hover:scale-105 transition-all duration-300"
                        >
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">✉️</div>
                            <h3 className="text-xl font-bold mb-2">Email</h3>
                            <p className="text-gray-600 mb-3">Send us an email</p>
                            <p className="text-accent-600 font-semibold text-sm">infoscholars@yahoo.com</p>
                        </a>
                    </div>
                </div>
            </section>

            {/* Visit Us Section */}
            <section className="section-padding bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Or Visit Us Directly! 📍
                    </h2>
                    <p className="text-xl mb-4">
                        Muslim Town Mor, Beside Jamia Asharfia<br />
                        147-Ferozepur Road, Lahore
                    </p>
                    <p className="text-lg mb-8">
                        Open Monday - Saturday: 9:00 AM - 8:00 PM
                    </p>
                    <a
                        href="https://maps.google.com/?q=Muslim+Town+Mor+Ferozepur+Road+Lahore"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Get Directions 🗺️
                    </a>
                </div>
            </section>
        </div>
    );
};

export default StartToday;
