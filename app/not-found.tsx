import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
            <div className="text-center px-4">
                <div className="text-9xl mb-4">🔍</div>
                <h1 className="text-6xl font-display font-bold mb-4">
                    <span className="gradient-text">404</span>
                </h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist. Let's get you back on track!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="btn-primary"
                    >
                        🏠 Go Home
                    </Link>
                    <Link
                        href="/contact"
                        className="btn-outline"
                    >
                        📞 Contact Us
                    </Link>
                </div>
            </div>
        </div>
    )
}
