// Simple localStorage-based database for ColorFarmers
// This can be upgraded to a real database later

export interface Product {
    id?: string
    articleNumber: string
    name: string
    description: string
    price: number
    category: string
    images: string[]
    createdAt?: string
    updatedAt?: string
}

export interface Order {
    id?: string
    userId?: string
    userName: string
    userEmail?: string
    userPhone?: string
    email?: string
    phone?: string
    items?: OrderItem[]
    totalAmount?: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    notes?: string
    productName?: string
    productId?: string
    serviceType?: string
    quantity?: number
    city?: string
    country?: string
    address?: string
    instructions?: string
    createdAt?: string
    updatedAt?: string
}

export interface OrderItem {
    productId: string
    productName: string
    quantity: number
    price: number
}

export interface Review {
    id?: string
    userId?: string
    userName: string
    userEmail: string
    productName?: string
    rating: number
    comment: string
    approved: boolean
    createdAt?: string
    updatedAt?: string
}

export interface User {
    id?: string
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
    createdAt?: string
    updatedAt?: string
}

const DB_KEYS = {
    PRODUCTS: 'colorfarmers_products',
    ORDERS: 'colorfarmers_orders',
    REVIEWS: 'colorfarmers_reviews',
    USERS: 'colorfarmers_users',
}

// Helper to check if we're in browser
const isBrowser = typeof window !== 'undefined'

// Generic CRUD operations
class LocalDB<T extends { id?: string; createdAt?: string; updatedAt?: string }> {
    private key: string

    constructor(key: string) {
        this.key = key
    }

    getAll(): T[] {
        if (!isBrowser) return []
        const data = localStorage.getItem(this.key)
        return data ? JSON.parse(data) : []
    }

    getById(id: string): T | undefined {
        const items = this.getAll()
        return items.find(item => item.id === id)
    }

    create(item: T): T {
        const items = this.getAll()
        const newItem: T = {
            ...item,
            id: item.id || Date.now().toString(),
            createdAt: item.createdAt || new Date().toISOString(),
        }
        items.push(newItem)
        this.saveAll(items)
        return newItem
    }

    update(id: string, updates: Partial<T>): T | null {
        const items = this.getAll()
        const index = items.findIndex(item => item.id === id)
        if (index === -1) return null

        items[index] = {
            ...items[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        }
        this.saveAll(items)
        return items[index]
    }

    delete(id: string): boolean {
        const items = this.getAll()
        const filtered = items.filter(item => item.id !== id)
        this.saveAll(filtered)
        return filtered.length < items.length
    }

    saveAll(items: T[]): void {
        if (!isBrowser) return
        localStorage.setItem(this.key, JSON.stringify(items))
    }

    clear(): void {
        if (!isBrowser) return
        localStorage.removeItem(this.key)
    }
}

// Database instances
export const productsDB = new LocalDB<Product>(DB_KEYS.PRODUCTS)
export const ordersDB = new LocalDB<Order>(DB_KEYS.ORDERS)
export const reviewsDB = new LocalDB<Review>(DB_KEYS.REVIEWS)
export const usersDB = new LocalDB<User>(DB_KEYS.USERS)

// Initialize with sample data if empty
export const initializeDatabase = (): void => {
    if (!isBrowser) return

    // Initialize products if empty
    if (productsDB.getAll().length === 0) {
        const sampleProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
            // Thesis & Binding
            {
                articleNumber: 'TH001',
                name: 'Thesis Printing (B&W)',
                description: 'High-quality black and white laser printing for thesis on 80gsm paper.',
                price: 15,
                category: 'thesis',
                images: [],
            },
            {
                articleNumber: 'TH002',
                name: 'Thesis Printing (Color)',
                description: 'Vibrant color laser printing for thesis charts and images on 100gsm paper.',
                price: 45,
                category: 'thesis',
                images: [],
            },
            {
                articleNumber: 'TH003',
                name: 'Hard Binding (Gold Lettering)',
                description: 'Premium hard binding with gold foil lettering on spine and front.',
                price: 1200,
                category: 'binding',
                images: [],
            },
            {
                articleNumber: 'TH004',
                name: 'Spiral Binding',
                description: 'Durable plastic spiral binding with transparent sheet cover.',
                price: 150,
                category: 'binding',
                images: [],
            },

            // Invites & Cards
            {
                articleNumber: 'IV001',
                name: 'Wedding Invitation Card (Classic)',
                description: 'Traditional design wedding card with envelope.',
                price: 85,
                category: 'invites',
                images: [],
            },
            {
                articleNumber: 'IV002',
                name: 'Wedding Invitation Card (Luxury)',
                description: 'Laser-cut luxury wedding card with premium textured paper.',
                price: 250,
                category: 'invites',
                images: [],
            },
            {
                articleNumber: 'IV003',
                name: 'Birthday Invitation Card',
                description: 'Colorful and fun birthday invitation cards.',
                price: 40,
                category: 'invites',
                images: [],
            },

            // Giveaways & Gifts
            {
                articleNumber: 'GA001',
                name: 'Custom Printed Mug',
                description: 'Ceramic mug with your custom photo or logo.',
                price: 650,
                category: 'giveaways',
                images: [],
            },
            {
                articleNumber: 'GA002',
                name: 'Magic Mug',
                description: 'Heat-sensitive mug that reveals design when hot.',
                price: 950,
                category: 'giveaways',
                images: [],
            },
            {
                articleNumber: 'GA003',
                name: 'Custom Keychain (Acrylic)',
                description: 'Acrylic keychain with double-sided printing.',
                price: 200,
                category: 'giveaways',
                images: [],
            },
            {
                articleNumber: 'GA004',
                name: 'Printed T-Shirt',
                description: 'Sublimation printed polyester t-shirt.',
                price: 1200,
                category: 'giveaways',
                images: [],
            },

            // Copy Shop
            {
                articleNumber: 'CS001',
                name: 'Photocopy (A4 B&W)',
                description: 'Standard A4 black and white photocopy.',
                price: 10,
                category: 'copyshop',
                images: [],
            },
            {
                articleNumber: 'CS002',
                name: 'Color Photocopy (A4)',
                description: 'High-quality A4 color photocopy.',
                price: 40,
                category: 'copyshop',
                images: [],
            },
            {
                articleNumber: 'CS003',
                name: 'Scanning (A4)',
                description: 'High-resolution document scanning.',
                price: 20,
                category: 'copyshop',
                images: [],
            },

            // Offset Printing
            {
                articleNumber: 'OF001',
                name: 'Business Cards (1000 pcs)',
                description: 'Standard visiting cards, 300gsm card with lamination.',
                price: 2500,
                category: 'offset',
                images: [],
            },
            {
                articleNumber: 'OF002',
                name: 'Letterheads (1000 pcs)',
                description: 'Company letterheads on 100gsm bond paper.',
                price: 4500,
                category: 'offset',
                images: [],
            },
            {
                articleNumber: 'OF003',
                name: 'Flyers (A5 - 1000 pcs)',
                description: 'Promotional flyers on 128gsm art paper.',
                price: 6000,
                category: 'offset',
                images: [],
            },

            // Outdoor Print
            {
                articleNumber: 'OD001',
                name: 'Flex Banner (per sq ft)',
                description: 'Standard flex printing for banners and hoardings.',
                price: 45,
                category: 'outdoor',
                images: [],
            },
            {
                articleNumber: 'OD002',
                name: 'Star Flex (per sq ft)',
                description: 'High-quality star flex for backlit boards.',
                price: 85,
                category: 'outdoor',
                images: [],
            },
            {
                articleNumber: 'OD003',
                name: 'Vinyl Sticker (per sq ft)',
                description: 'Adhesive vinyl printing for glass and walls.',
                price: 120,
                category: 'outdoor',
                images: [],
            },

            // Custom Items
            {
                articleNumber: 'CU001',
                name: 'Custom Shield/Award',
                description: 'Wooden or crystal shield with custom engraving.',
                price: 1500,
                category: 'custom',
                images: [],
            },
            {
                articleNumber: 'CU002',
                name: 'ID Card with Ribbon',
                description: 'Plastic ID card with printed ribbon and holder.',
                price: 350,
                category: 'custom',
                images: [],
            },
        ]
        sampleProducts.forEach(product => productsDB.create(product as Product))
    }

    // Initialize admin user if no users exist
    if (usersDB.getAll().length === 0) {
        usersDB.create({
            name: 'Admin',
            email: 'admin@colorfarmers.com',
            password: 'admin123', // In production, this should be hashed
            role: 'admin',
        })
    }
}

// Helper functions
export const getProductByArticleNumber = (articleNumber: string): Product | undefined => {
    const products = productsDB.getAll()
    return products.find(p => p.articleNumber === articleNumber)
}

export const getOrdersByUser = (userId: string): Order[] => {
    const orders = ordersDB.getAll()
    return orders.filter(o => o.userId === userId)
}

export const getOrdersByStatus = (status: Order['status']): Order[] => {
    const orders = ordersDB.getAll()
    return orders.filter(o => o.status === status)
}

export const getApprovedReviews = (): Review[] => {
    const reviews = reviewsDB.getAll()
    return reviews.filter(r => r.approved === true)
}

export const getPendingReviews = (): Review[] => {
    const reviews = reviewsDB.getAll()
    return reviews.filter(r => r.approved === false || r.approved === undefined)
}

export const getUserByEmail = (email: string): User | undefined => {
    const users = usersDB.getAll()
    return users.find(u => u.email === email)
}

export const authenticateUser = (email: string, password: string): Omit<User, 'password'> | null => {
    const user = getUserByEmail(email)
    if (!user) return null

    // In production, compare hashed passwords
    if (user.password === password) {
        // Don't return password
        const { password: _, ...userWithoutPassword } = user
        return userWithoutPassword
    }
    return null
}
