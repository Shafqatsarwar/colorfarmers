'use client'

import { useEffect, useState } from 'react'

const Reviews = () => {
    const [reviews] = useState([
        {
            id: 1,
            name: 'Dr. Ahmed Hassan',
            role: 'University Professor',
            rating: 5,
            comment: 'Excellent service for thesis printing! Fast, professional, and high quality. Been using their services for 10 years.',
            date: '2025-11-20',
            verified: true,
        },
        {
            id: 2,
            name: 'Sarah Khan',
            role: 'Event Planner',
            rating: 5,
            comment: 'Amazing work on our wedding cards! The design team was creative and delivery was on time. Highly recommended! 💕',
            date: '2025-11-18',
            verified: true,
        },
        {
            id: 3,
            name: 'Muhammad Ali',
            role: 'Business Owner',
            rating: 5,
            comment: 'Best printing services in Lahore! We order all our business stationery from Scholars. Quality is top-notch.',
            date: '2025-11-15',
            verified: true,
        },
        {
            id: 4,
            name: 'Fatima Zahra',
            role: 'Student',
            rating: 5,
            comment: 'Very affordable rates for students. Got my entire thesis printed and bound beautifully. Thank you! 📚',
            date: '2025-11-10',
            verified: true,
        },
        {
            id: 5,
            name: 'Imran Malik',
            role: 'Corporate Client',
            rating: 5,
            comment: 'Professional service for our company\'s printing needs. Always reliable and quick turnaround time.',
            date: '2025-11-05',
            verified: true,
        },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        rating: 5,
        comment: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create email content
        const emailSubject = `New Review Submission - ${formData.rating} Stars`;
        const emailBody = `New Review Received:

Name: ${formData.name}
Email: ${formData.email}
Role: ${formData.role}
Rating: ${formData.rating}/5 Stars

Review:
${formData.comment}

Date: ${new Date().toLocaleDateString()}

Please review and approve this review for publication on the website.`;

        // Send email notification
        window.location.href = `mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com'}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Show success message
        setShowSuccess(true);

        // Reset form
        setFormData({
            name: '',
            email: '',
            role: '',
            rating: 5,
            comment: '',
        });

        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
    };

    const renderStars = (rating) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                    >
                        ⭐
                    </span>
                ))}
            </div>
        );
    };

    const averageRating = (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    ).toFixed(1);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Customer <span className="gradient-text">Reviews</span> ⭐
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        See what our valued customers have to say about our services!
                    </p>
                    <div className="flex justify-center items-center space-x-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold gradient-text mb-2">{averageRating}</div>
                            <div className="flex justify-center mb-2">{renderStars(Math.round(averageRating))}</div>
                            <p className="text-gray-600">Based on {reviews.length} reviews</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        What Our <span className="gradient-text">Customers Say</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="card group hover:scale-105 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h3 className="font-bold text-lg">{review.name}</h3>
                                            {review.verified && (
                                                <span className="text-primary-500" title="Verified Customer">
                                                    ✓
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">{review.role}</p>
                                    </div>
                                </div>
                                <div className="mb-4">{renderStars(review.rating)}</div>
                                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(review.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Submit Review Form */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="card-gradient">
                            <h2 className="text-3xl font-display font-bold text-center mb-4">
                                <span className="gradient-text">Share Your Experience</span> 📝
                            </h2>
                            <p className="text-center text-gray-600 mb-8">
                                We'd love to hear from you! Your feedback helps us improve our services.
                            </p>

                            {showSuccess && (
                                <div className="bg-green-100 border-2 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-6 animate-slide-down">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">✅</span>
                                        <div>
                                            <p className="font-semibold">Thank you for your review!</p>
                                            <p className="text-sm">
                                                Your review has been submitted and will be published after admin approval.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                            Email Address *
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
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Role/Profession
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="input-field"
                                        placeholder="e.g., Student, Business Owner, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Rating *
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className="text-4xl transition-transform hover:scale-110"
                                            >
                                                <span
                                                    className={
                                                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }
                                                >
                                                    ⭐
                                                </span>
                                            </button>
                                        ))}
                                        <span className="text-lg font-semibold text-gray-700">
                                            {formData.rating}/5
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Review *
                                    </label>
                                    <textarea
                                        value={formData.comment}
                                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                        className="textarea-field"
                                        rows="5"
                                        placeholder="Tell us about your experience with our services..."
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full btn-primary">
                                    Submit Review 🚀
                                </button>

                                <p className="text-sm text-gray-600 text-center">
                                    * Required fields. Your review will be published after admin approval.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="section-padding bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
                        Trusted by <span className="gradient-text">100+ Organizations</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            'University of Punjab',
                            'LUMS',
                            'ITU',
                            'UHS',
                            'WAPDA',
                            'National Bank',
                            'Beaconhouse',
                            'PepsiCola International',
                        ].map((client, index) => (
                            <div
                                key={index}
                                className="card-gradient text-center p-4 hover:scale-105 transition-transform duration-300"
                            >
                                <p className="font-semibold text-gray-700">{client}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Experience the Difference! 🌟
                    </h2>
                    <p className="text-xl mb-8">
                        Join thousands of satisfied customers. Start your order today!
                    </p>
                    <a
                        href="/start-today"
                        className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Get Started Now 🚀
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Reviews;
