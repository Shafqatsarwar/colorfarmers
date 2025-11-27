import './globals.css'
import { Inter, Outfit } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatButton from '@/components/ChatButton'
import Notification from '@/components/Notification'
import { AuthProvider } from '@/contexts/AuthContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { ReactNode } from 'react'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
})

export const metadata = {
    title: 'ColorFarmers - Scholars Photostat Centre | Professional Printing Services Since 1987',
    description: 'Scholars Photostat Centre - Serving since 1987. Professional photocopy, printing, binding, and digital imaging services in Lahore.',
    keywords: 'photocopy, printing, binding, thesis printing, wedding cards, digital printing, Lahore',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="min-h-screen flex flex-col">
                <AuthProvider>
                    <NotificationProvider>
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                        <ChatButton />
                        <Notification />
                    </NotificationProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
