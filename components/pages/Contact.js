'use client'

import { useState } from 'react'
import { sendCustomEmail } from '@/lib/email'
import { useNotification } from '@/contexts/NotificationContext'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)
    const { success, error: showError } = useNotification()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Send email to admin
            await sendCustomEmail(
                process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com',
                `Contact Form: ${formData.subject}`,
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
                'Admin'
            )

            success('Message sent successfully! We will get back to you soon.')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            showError('Failed to send message. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const contactInfo = [
        {
            icon: '📍',
            title: 'Visit Us',
            content: 'Scholars Photostat Centre, Main Ferozepur Road, Lahore',
            link: 'https://maps.google.com/?q=Scholars+Photostat+Centre+Lahore'
        },
        {
            icon: '📞',
            title: 'Call Us',
            content: '+92 300 4251833',
            link: 'tel:+923004251833'
        },
        {
            icon: '💬',
            title: 'WhatsApp',
            content: '+92 300 4251833',
            link: 'https://wa.me/923004251833'
        },
        {
            icon: '✉️',
            title: 'Email Us',
            content: 'infoscholars@yahoo.com',
            link: 'mailto:infoscholars@yahoo.com'
        }
    ]

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Get in <span className="gradient-text">Touch</span> 📞
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions? We're here to help! Reach out to us through any of the following channels.
                    </p>
                </div>
            </section>

            {/* Contact Info Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card group hover:scale-105 transition-all duration-300 text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                                <p className="text-gray-600">{info.content}</p>
                            </a>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <div className="card">
                            <h2 className="text-2xl font-bold mb-6">Send us a Message ✉️</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="Inquiry about..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="textarea-field"
                                        rows="5"
                                        placeholder="How can we help you?"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'Send Message'} 🚀
                                </button>
                            </form>
                        </div>

                        {/* Map or Additional Info */}
                        <div className="space-y-6">
                            <div className="card h-[400px] p-0 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.562832267986!2d74.3193!3d31.5068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMwJzI0LjUiTiA3NMKwMTknMDkuNSJF!5e0!3m2!1sen!2s!4v1635760000000!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                                <h3 className="text-xl font-bold mb-2">Business Hours 🕒</h3>
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span>Monday - Saturday</span>
                                        <span>9:00 AM - 9:00 PM</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Sunday</span>
                                        <span>Closed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
