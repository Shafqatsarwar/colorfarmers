'use client'

import { useState, useEffect, FormEvent } from 'react'
import { reviewsDB, initializeDatabase, getApprovedReviews, Review } from '@/lib/db'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import { sendNewReviewNotification } from '@/lib/email'

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user } = useAuth()
    const { success, error: showError } = useNotification()

    useEffect(() => {
        initializeDatabase()
        loadReviews()
    }, [])

    const loadReviews = () => {
        const approvedReviews = getApprovedReviews()
        setReviews(approvedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!user) {
            showError('Please login to submit a review!')
            return
        }

        setIsSubmitting(true)

        try {
            const review = reviewsDB.create({
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                rating: Number(newReview.rating),
                comment: newReview.comment,
                approved: false // Requires admin approval
            })

            await sendNewReviewNotification(review)

            success('Review submitted successfully! It will be visible after admin approval.')
            setNewReview({ rating: 5, comment: '' })
        } catch (error) {
            console.error(error)
            showError('Failed to submit review. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderStars = (rating: number) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Customer <span className="gradient-text">Reviews</span> ⭐
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See what our valued customers have to say about our services.
                    </p>
                </div>
            </section>

            {/* Reviews List */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="card hover:scale-105 transition-transform duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {review.userName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{review.userName}</h3>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-yellow-400 text-lg">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic">"{review.comment}"</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Submit Review Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom max-w-2xl">
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-6 text-center">Write a Review ✍️</h2>

                        {!user ? (
                            <div className="text-center py-6">
                                <p className="text-gray-600 mb-4">Please login to write a review.</p>
                                <a href="/login" className="btn-primary inline-block">Login Now</a>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Rating
                                    </label>
                                    <div className="flex space-x-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className={`text-3xl transition-transform hover:scale-110 ${star <= newReview.rating ? 'grayscale-0' : 'grayscale opacity-30'
                                                    }`}
                                            >
                                                ⭐
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Review
                                    </label>
                                    <textarea
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                        className="textarea-field"
                                        rows={4}
                                        placeholder="Share your experience with us..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'} 🚀
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Reviews
