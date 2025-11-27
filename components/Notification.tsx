'use client'

import { useNotification, NotificationType } from '@/contexts/NotificationContext'

const Notification = () => {
    const { notifications, removeNotification } = useNotification()

    if (notifications.length === 0) return null

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'success':
                return '✅'
            case 'error':
                return '❌'
            case 'warning':
                return '⚠️'
            case 'info':
            default:
                return 'ℹ️'
        }
    }

    const getColors = (type: NotificationType) => {
        switch (type) {
            case 'success':
                return 'bg-green-500 border-green-600'
            case 'error':
                return 'bg-red-500 border-red-600'
            case 'warning':
                return 'bg-yellow-500 border-yellow-600'
            case 'info':
            default:
                return 'bg-blue-500 border-blue-600'
        }
    }

    return (
        <div className="fixed top-24 right-4 z-[9999] space-y-3 max-w-md">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`${getColors(notification.type)} text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 flex items-start space-x-3 animate-slide-in-right`}
                >
                    <span className="text-2xl flex-shrink-0">{getIcon(notification.type)}</span>
                    <p className="flex-1 font-medium">{notification.message}</p>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="flex-shrink-0 text-white hover:text-gray-200 transition-colors ml-2"
                        aria-label="Close notification"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Notification
