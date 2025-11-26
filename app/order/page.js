import { Suspense } from 'react'
import Order from '@/components/pages/Order'

export const metadata = {
    title: 'Place Order - ColorFarmers | Scholars Photostat Centre',
    description: 'Place your printing order with ColorFarmers. Fast, reliable, and professional printing services in Lahore.',
}

export default function OrderPage() {
    return (
        <Suspense fallback={
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-xl text-gray-600">Loading order form...</p>
                </div>
            </div>
        }>
            <Order />
        </Suspense>
    )
}
