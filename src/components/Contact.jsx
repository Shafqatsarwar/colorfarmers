'use client'

import { useEffect, useState } from 'react'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailSubject = `Contact Form: ${formData.subject || 'General Inquiry'}`;
        const emailBody = `New Contact Form Submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}

Date: ${new Date().toLocaleString()}`;

        window.location.href = `mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com'}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        setShowSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        setTimeout(() => setShowSuccess(false), 5000);
    };

    const contactMethods = [
        {
            icon: '📞',
            title: 'Phone',
            details: ['042-37503264', '042-37503265'],
            action: 'tel:042-37503264',
            color: 'from-primary-400 to-primary-600',
        },
        {
            icon: '📱',
            title: 'Mobile',
            details: ['0300-4251833'],
            action: 'tel:0300-4251833',
            color: 'from-secondary-400 to-secondary-600',
        },
        {
            icon: '✉️',
            title: 'Email',
            details: ['infoscholars@yahoo.com'],
            action: 'mailto:infoscholars@yahoo.com',
            color: 'from-accent-400 to-accent-600',
        },
        {
            icon: '💬',
            title: 'WhatsApp',
            details: ['0300-4251833'],
            action: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923004251833'}`,
            color: 'from-green-400 to-green-600',
        },
    ];

    const businessHours = [
        { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Saturday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Sunday', hours: 'Closed' },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Get in <span className="gradient-text">Touch</span> 📞
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're here to help! Reach out to us through any of the following methods.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactMethods.map((method, index) => (
                            <a
                                key={index}
                                href={method.action}
                                target={method.action.startsWith('http') ? '_blank' : undefined}
                                rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="card group hover:scale-105 transition-all duration-300 text-center"
                            >
                                <div
                                    className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                >
                                    {method.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                                {method.details.map((detail, idx) => (
                                    <p key={idx} className="text-gray-600 font-medium">
                                        {detail}
                                    </p>
                                ))}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <div className="card-gradient">
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    <span className="gradient-text">Send Us a Message</span> ✉️
                                </h2>

                                {showSuccess && (
                                    <div className="bg-green-100 border-2 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-6 animate-slide-down">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">✅</span>
                                            <div>
                                                <p className="font-semibold">Message sent successfully!</p>
                                                <p className="text-sm">We'll get back to you as soon as possible.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
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

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="input-field"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="input-field"
                                                placeholder="03XX-XXXXXXX"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="input-field"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="textarea-field"
                                            rows="5"
                                            placeholder="Tell us more about your inquiry..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="w-full btn-primary">
                                        Send Message 🚀
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* Address */}
                            <div className="card">
                                <div className="text-4xl mb-4">📍</div>
                                <h3 className="text-2xl font-bold mb-4">Visit Our Shop</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Muslim Town Mor, Beside Jamia Asharfia<br />
                                    147-Ferozepur Road<br />
                                    Lahore, Pakistan
                                </p>
                                <a
                                    href="https://maps.google.com/?q=Muslim+Town+Mor+Ferozepur+Road+Lahore"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline inline-block"
                                >
                                    Get Directions 🗺️
                                </a>
                            </div>

                            {/* Business Hours */}
                            <div className="card">
                                <div className="text-4xl mb-4">🕐</div>
                                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                                <div className="space-y-3">
                                    {businessHours.map((schedule, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                        >
                                            <span className="font-semibold text-gray-700">{schedule.day}</span>
                                            <span className="text-primary-600 font-medium">{schedule.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="card bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white">
                                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">✅</span>
                                        <span>35+ Years of Experience</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">✅</span>
                                        <span>100+ Corporate Clients</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">✅</span>
                                        <span>Fast Turnaround Time</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">✅</span>
                                        <span>Competitive Pricing</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">✅</span>
                                        <span>Quality Guaranteed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (Placeholder) */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Find Us on <span className="gradient-text">Map</span> 🗺️
                    </h2>
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 rounded-2xl p-8 text-center">
                            <div className="bg-white rounded-xl p-12 shadow-lg">
                                <div className="text-6xl mb-4">📍</div>
                                <h3 className="text-2xl font-bold mb-4">Location Map</h3>
                                <p className="text-gray-600 mb-6">
                                    Muslim Town Mor, Beside Jamia Asharfia, 147-Ferozepur Road, Lahore
                                </p>
                                <a
                                    href="https://maps.google.com/?q=Muslim+Town+Mor+Ferozepur+Road+Lahore"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-block"
                                >
                                    Open in Google Maps 🌐
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Ready to Start Your Project? 🚀
                    </h2>
                    <p className="text-xl mb-8">
                        Contact us today and experience the best printing services in Lahore!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923004251833'}?text=Hello! I'd like to discuss my printing needs.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            WhatsApp Us Now 💬
                        </a>
                        <a
                            href="tel:042-37503264"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
                        >
                            Call Us 📞
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
