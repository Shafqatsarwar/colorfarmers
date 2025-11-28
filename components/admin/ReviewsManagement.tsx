'use client'

import { useState, useEffect } from 'react'
import { reviewsDB, initializeDatabase, Review } from '@/lib/db'
import { useNotification } from '@/contexts/NotificationContext'
import { sendReviewApprovalNotification } from '@/lib/email'
import AdminLayout from '@/components/admin/AdminLayout'

const AdminReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [filter, setFilter] = useState('all')
    const { success, error: showError } = useNotification()

    useEffect(() => {
        initializeDatabase()
        loadReviews()
    }, [])

    const loadReviews = () => {
        const allReviews = reviewsDB.getAll()
        setReviews(allReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    }

    const handleApprove = async (reviewId: string) => {
        try {
            const review = reviewsDB.update(reviewId, { approved: true })
            if (review) {
                await sendReviewApprovalNotification(review)
                success('Review approved successfully!')
                loadReviews()
            }
        } catch (error) {
            showError('Failed to approve review.')
        }
    }

    const handleReject = (reviewId: string) => {
        if (confirm('Are you sure you want to reject/delete this review?')) {
            reviewsDB.delete(reviewId)
            success('Review deleted successfully!')
            loadReviews()
        }
    }

    const renderStars = (rating: number) => {
        return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
    }

    const filteredReviews = filter === 'all'
        ? reviews
        : filter === 'approved'
            ? reviews.filter(r => r.approved === true)
            : reviews.filter(r => r.approved !== true)

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="card">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h2 className="text-2xl font-bold">Reviews Management</h2>
                            <p className="text-gray-600">Approve or reject customer reviews</p>
                        </div>
                        <div className="flex space-x-2">
                            {['all', 'pending', 'approved'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filter === status
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-xl font-bold mb-4">
                        {filter === 'all' ? 'All Reviews' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Reviews`} ({filteredReviews.length})
                    </h3>

                    {filteredReviews.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">⭐</div>
                            <p className="text-gray-600">No reviews found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredReviews.map((review) => (
                                <div
                                    key={review.id}
                                    className={`p-6 border-2 rounded-lg transition-colors ${review.approved
                                        ? 'border-green-200 bg-green-50'
                                        : 'border-yellow-200 bg-yellow-50'
                                        }`}
                                >
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${review.approved
                                                    ? 'bg-green-200 text-green-800'
                                                    : 'bg-yellow-200 text-yellow-800'
                                                    }`}>
                                                    {review.approved ? '✅ Approved' : '⏳ Pending'}
                                                </span>
                                                <span className="text-2xl">
                                                    {renderStars(review.rating)}
                                                </span>
                                            </div>

                                            <div className="mb-4">
                                                <p className="font-semibold text-gray-800 text-lg mb-1">
                                                    {review.userName}
                                                </p>
                                                {review.userEmail && (
                                                    <p className="text-sm text-gray-600">{review.userEmail}</p>
                                                )}
                                                {review.productName && (
                                                    <p className="text-sm text-gray-600">Product: {review.productName}</p>
                                                )}
                                            </div>

                                            <div className="p-4 bg-white rounded-lg">
                                                <p className="text-gray-800">{review.comment}</p>
                                            </div>

                                            <p className="text-sm text-gray-500 mt-3">
                                                Submitted on {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>

                                        <div className="flex flex-col space-y-2 lg:ml-4">
                                            {!review.approved && (
                                                <button
                                                    onClick={() => handleApprove(review.id)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                >
                                                    ✅ Approve
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleReject(review.id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminReviews
