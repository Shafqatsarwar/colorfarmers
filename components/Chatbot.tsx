'use client'

import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
    role: 'user' | 'assistant' | 'model'
    content: string
}

interface FAQ {
    question: string
    answer: string
}

interface ChatbotProps {
    onClose: () => void
}

const Chatbot = ({ onClose }: ChatbotProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Load FAQs
        fetch('/FAQ.json')
            .then((res) => res.json())
            .then((data) => setFaqs(data.faqs))
            .catch((err) => console.error('Error loading FAQs:', err))

        // Initial greeting
        setMessages([
            {
                role: 'assistant',
                content: 'السلام علیکم! 👋\n\nWelcome to Scholars Photostat Centre! How can I help you? 📄',
            },
        ])
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = { role: 'user', content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

            if (!apiKey) {
                throw new Error('GEMINI_API_KEY_NOT_CONFIGURED')
            }

            const genAI = new GoogleGenerativeAI(apiKey)
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

            const faqContext = faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')

            const systemPrompt = `You are a helpful assistant for Scholars Photostat Centre in Lahore, Pakistan. 

Our services: Photocopy, Printing, Thesis Binding, Wedding Cards, Custom Printing, Large Format Printing.

Contact: 042-37503264-5, Mobile: 0300-4251833
Email: ${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com'}

FAQs:
${faqContext}

Provide helpful, friendly responses. Keep them concise.`

            const chat = model.startChat({
                history: [
                    {
                        role: 'user',
                        parts: [{ text: systemPrompt }],
                    },
                    {
                        role: 'model',
                        parts: [{ text: 'I understand. I will help customers with information about Scholars Photostat Centre.' }],
                    },
                ],
            })

            const result = await chat.sendMessage(input)
            const response = await result.response
            const text = response.text()

            setMessages((prev) => [...prev, { role: 'assistant', content: text }])
        } catch (error: any) {
            console.error('❌ Chatbot Error:', error)

            let errorMessage = "I apologize, but I'm having trouble connecting. Please contact us at 0300-4251833! 📞"

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: errorMessage,
                },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="fixed bottom-20 right-4 z-40 w-full max-w-sm animate-slide-up">
            {/* Chat Window - Compact */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-xl border border-gray-200 overflow-hidden" style={{ height: '450px' }}>
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-lg">
                            🤖
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Scholars Assistant</h3>
                            <p className="text-xs text-white/80">Online</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="h-[calc(100%-120px)] overflow-y-auto p-3 space-y-3">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-xl px-3 py-2 ${message.role === 'user'
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                                    : 'bg-white text-gray-800 shadow-sm'
                                    }`}
                            >
                                <p className="text-xs whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-xl px-3 py-2 shadow-sm">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce animation-delay-200"></div>
                                    <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce animation-delay-400"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-white border-t border-gray-200">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-xs"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="w-9 h-9 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatbot
