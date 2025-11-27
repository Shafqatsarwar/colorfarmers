'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type NotificationType = 'info' | 'success' | 'error' | 'warning'

export interface Notification {
    id: string
    message: string
    type: NotificationType
    duration: number
}

interface NotificationContextType {
    notifications: Notification[]
    addNotification: (message: string, type?: NotificationType, duration?: number) => string
    removeNotification: (id: string) => void
    success: (message: string, duration?: number) => string
    error: (message: string, duration?: number) => string
    warning: (message: string, duration?: number) => string
    info: (message: string, duration?: number) => string
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType)

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const addNotification = useCallback((message: string, type: NotificationType = 'info', duration: number = 5000): string => {
        const id = Date.now().toString()
        const notification: Notification = { id, message, type, duration }

        setNotifications(prev => [...prev, notification])

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, duration)
        }

        return id
    }, [])

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }, [])

    const success = useCallback((message: string, duration?: number) => {
        return addNotification(message, 'success', duration)
    }, [addNotification])

    const error = useCallback((message: string, duration?: number) => {
        return addNotification(message, 'error', duration)
    }, [addNotification])

    const warning = useCallback((message: string, duration?: number) => {
        return addNotification(message, 'warning', duration)
    }, [addNotification])

    const info = useCallback((message: string, duration?: number) => {
        return addNotification(message, 'info', duration)
    }, [addNotification])

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                success,
                error,
                warning,
                info,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}
