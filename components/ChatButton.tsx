'use client'

import { useState } from 'react'
import Chatbot from './Chatbot'

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center text-white text-2xl hover:scale-110 animate-bounce-slow"
                aria-label="Open chat"
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {/* Chatbot Component */}
            {isOpen && <Chatbot onClose={() => setIsOpen(false)} />}
        </>
    )
}

export default ChatButton
