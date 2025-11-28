'use client'

import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const Chatbot = ({ onClose }) => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [faqs, setFaqs] = useState([])
    const messagesEndRef = useRef(null)

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
                content: 'السلام علیکم (Assalamualaikum)! 👋\n\nWelcome to Scholars Photostat Centre! How can I help you today? Feel free to ask about our services, pricing, or anything else! 📄🖨️',
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

        const userMessage = { role: 'user', content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

            if (!apiKey) {
                throw new Error('API key not configured')
            }

            const genAI = new GoogleGenerativeAI(apiKey)
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

            // Create context with FAQ information
            const faqContext = faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')

            const systemPrompt = `You are a helpful assistant for Scholars Photostat Centre, a professional printing and photocopy service in Lahore, Pakistan, established in 1987. 

Our services include:
- Photocopy (color & B/W)
- Computer Printouts
- Thesis Printing & Binding (Loop, Spiral, Ring, Tape, Hard, Cover Print, Embossing, Paper)
- Wedding Cards, Birthday Cards, Event Cards
- Custom Printing on Mugs, Plates, Tiles, Fabric, Cushions, T-Shirts, Caps
- Large Format Printing (up to 44" x 200")
- Scanning & Archiving Services
- Educational Materials (Master, B.Sc, F.Sc, O/A-Levels)
- Shields, Trophies, Certificates

Contact: Muslim Town Mor, Beside Jamia Asharfia, 147-Ferozepur Road, Lahore
Phone: 042-37503264-5, Mobile: 0300-4251833
Email: ${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infoscholars@yahoo.com'}

Here are our FAQs:
${faqContext}

Please provide helpful, friendly, and accurate responses. Use emojis occasionally to make the conversation engaging. Keep responses concise but informative.`

            const chat = model.startChat({
                history: [
                    {
                        role: 'user',
                        parts: [{ text: systemPrompt }],
                    },
                    {
                        role: 'model',
                        parts: [{ text: 'I understand. I will help customers with information about Scholars Photostat Centre services, pricing, and general inquiries.' }],
                    },
                ],
            })

            const result = await chat.sendMessage(input)
            const response = await result.response
            const text = response.text()

            setMessages((prev) => [...prev, { role: 'assistant', content: text }])
        } catch (error) {
            console.error('Error:', error)
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: "I apologize, but I'm having trouble connecting right now. Please contact us directly at 0300-4251833 or infoscholars@yahoo.com for immediate assistance! 📞",
                },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="fixed bottom-24 right-6 z-40 w-full max-w-md animate-slide-up">
            {/* Chat Window - 3/4 screen height */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden" style={{ height: '75vh', maxHeight: '600px' }}>
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl">
                            🤖
                        </div>
                        <div>
                            <h3 className="font-semibold">Scholars Assistant</h3>
                            <p className="text-xs text-white/80">Online • Ready to help</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                                        : 'bg-white text-gray-800 shadow-md'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                                <div className="flex space-x-2">
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
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
