import { Suspense } from 'react'
import Order from '@/components/pages/Order'

export const metadata = {
    title: 'Place Order - ColorFarmers | Scholars Photostat Centre',
    description: 'Place your printing order online. Upload files and choose your specifications.',
}

export default function OrderPage() {
    return (
        <Suspense fallback={<div className="pt-20 min-h-screen flex items-center justify-center">Loading order form...</div>}>
            <Order />
        </Suspense>
    )
}
