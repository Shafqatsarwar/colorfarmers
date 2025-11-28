// Email notification system using EmailJS
import emailjs from 'emailjs-com'
import { Review } from './db'

// Initialize EmailJS (these should be in .env.local)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_id'
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_id'
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key'
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com'

interface EmailTemplateParams {
    to_email: string
    to_name: string
    subject: string
    message: string
    [key: string]: unknown
}

interface EmailResponse {
    success: boolean
    response?: any
    error?: any
}

// Send email notification
export const sendEmail = async (templateParams: EmailTemplateParams): Promise<EmailResponse> => {
    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        )
        return { success: true, response }
    } catch (error) {
        console.error('Email send error:', error)
        return { success: false, error }
    }
}

// Send order confirmation to customer
export const sendOrderConfirmation = async (order: any): Promise<EmailResponse> => {
    const templateParams: EmailTemplateParams = {
        to_email: order.email || order.userEmail,
        to_name: order.userName,
        subject: 'Order Confirmation - ColorFarmers',
        message: `
Dear ${order.userName},

Thank you for your order! We have received your order and will process it shortly.

Order Details:
- Order ID: ${order.id}
- Product: ${order.productName || 'Custom Order'}
- Quantity: ${order.quantity}
- City: ${order.city}
- Status: ${order.status}

We will notify you once your order is ready.

Best regards,
ColorFarmers - Scholars Photostat Centre
        `.trim(),
    }

    return await sendEmail(templateParams)
}

// Send new order notification to admin
export const sendNewOrderNotification = async (order: any): Promise<EmailResponse> => {
    const templateParams: EmailTemplateParams = {
        to_email: ADMIN_EMAIL,
        to_name: 'Admin',
        subject: 'New Order Received - ColorFarmers',
        message: `
New order received!

Order Details:
- Order ID: ${order.id}
- Customer: ${order.userName}
- Email: ${order.email || order.userEmail}
- Phone: ${order.phone || order.userPhone}
- Product: ${order.productName || 'Custom Order'}
- Product ID: ${order.productId || 'N/A'}
- Quantity: ${order.quantity}
- City: ${order.city}, ${order.country}
- Address: ${order.address || 'N/A'}
- Special Instructions: ${order.instructions || 'None'}

Please process this order as soon as possible.
        `.trim(),
    }

    return await sendEmail(templateParams)
}

// Send order status update to customer
export const sendOrderStatusUpdate = async (order: any, newStatus: string): Promise<EmailResponse> => {
    const templateParams: EmailTemplateParams = {
        to_email: order.email || order.userEmail,
        to_name: order.userName,
        subject: `Order Status Update - ColorFarmers`,
        message: `
Dear ${order.userName},

Your order status has been updated.

Order ID: ${order.id}
New Status: ${newStatus}

${newStatus === 'completed' ? 'Your order is ready for pickup/delivery!' : ''}
${newStatus === 'processing' ? 'We are currently processing your order.' : ''}
${newStatus === 'cancelled' ? 'Your order has been cancelled. Please contact us for more information.' : ''}

Best regards,
ColorFarmers - Scholars Photostat Centre
        `.trim(),
    }

    return await sendEmail(templateParams)
}

// Send new review notification to admin
export const sendNewReviewNotification = async (review: any): Promise<EmailResponse> => {
    const templateParams: EmailTemplateParams = {
        to_email: ADMIN_EMAIL,
        to_name: 'Admin',
        subject: 'New Review Submitted - ColorFarmers',
        message: `
New review submitted!

Review Details:
- Review ID: ${review.id}
- Customer: ${review.userName}
- Product: ${review.productName || 'General Review'}
- Rating: ${review.rating}/5
- Comment: ${review.comment}

Please review and approve/reject this review.
        `.trim(),
    }

    return await sendEmail(templateParams)
}

// Send review approval notification to customer
export const sendReviewApprovalNotification = async (review: Review): Promise<EmailResponse> => {
    const templateParams: EmailTemplateParams = {
        to_email: review.userEmail,
        to_name: review.userName,
        subject: 'Review Approved - ColorFarmers',
        message: `
Dear ${review.userName},

Thank you for your review! Your review has been approved and is now visible on our website.

Your Review:
Rating: ${review.rating}/5
Comment: ${review.comment}

We appreciate your feedback!

Best regards,
ColorFarmers - Scholars Photostat Centre
        `.trim(),
    }

    return await sendEmail(templateParams)
}

// Generic email sender
export const sendCustomEmail = async (
    to: string,
    subject: string,
    message: string,
    toName: string = 'Customer'
): Promise<EmailResponse> => {
    const templateParams: EmailTemplateParams = {
        to_email: to,
        to_name: toName,
        subject,
        message,
    }

    return await sendEmail(templateParams)
}
