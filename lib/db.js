// Simple localStorage-based database for ColorFarmers
// This can be upgraded to a real database later

const DB_KEYS = {
    PRODUCTS: 'colorfarmers_products',
    ORDERS: 'colorfarmers_orders',
    REVIEWS: 'colorfarmers_reviews',
    USERS: 'colorfarmers_users',
}

// Helper to check if we're in browser
const isBrowser = typeof window !== 'undefined'

// Generic CRUD operations
class LocalDB {
    constructor(key) {
        this.key = key
    }

    getAll() {
        if (!isBrowser) return []
        const data = localStorage.getItem(this.key)
        return data ? JSON.parse(data) : []
    }

    getById(id) {
        const items = this.getAll()
        return items.find(item => item.id === id)
    }

    create(item) {
        const items = this.getAll()
        const newItem = {
            ...item,
            id: item.id || Date.now().toString(),
            createdAt: item.createdAt || new Date().toISOString(),
        }
        items.push(newItem)
        this.saveAll(items)
        return newItem
    }

    update(id, updates) {
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

    delete(id) {
        const items = this.getAll()
        const filtered = items.filter(item => item.id !== id)
        this.saveAll(filtered)
        return filtered.length < items.length
    }

    saveAll(items) {
        if (!isBrowser) return
        localStorage.setItem(this.key, JSON.stringify(items))
    }

    clear() {
        if (!isBrowser) return
        localStorage.removeItem(this.key)
    }
}

// Database instances
export const productsDB = new LocalDB(DB_KEYS.PRODUCTS)
export const ordersDB = new LocalDB(DB_KEYS.ORDERS)
export const reviewsDB = new LocalDB(DB_KEYS.REVIEWS)
export const usersDB = new LocalDB(DB_KEYS.USERS)

// Initialize with sample data if empty
export const initializeDatabase = () => {
    if (!isBrowser) return

    // Initialize products if empty
    if (productsDB.getAll().length === 0) {
        const sampleProducts = [
            {
                articleNumber: 'TP001',
                name: 'Thesis Printing & Binding',
                description: 'Complete thesis printing and hard binding service',
                price: 500,
                category: 'thesis',
                images: [],
            },
            {
                articleNumber: 'WC001',
                name: 'Premium Wedding Cards',
                description: 'Elegant wedding invitation cards with custom design',
                price: 50,
                category: 'invites',
                images: [],
            },
            {
                articleNumber: 'MG001',
                name: 'Printed Mugs',
                description: 'Custom printed ceramic mugs',
                price: 250,
                category: 'giveaways',
                images: [],
            },
        ]
        sampleProducts.forEach(product => productsDB.create(product))
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
export const getProductByArticleNumber = (articleNumber) => {
    const products = productsDB.getAll()
    return products.find(p => p.articleNumber === articleNumber)
}

export const getOrdersByUser = (userId) => {
    const orders = ordersDB.getAll()
    return orders.filter(o => o.userId === userId)
}

export const getOrdersByStatus = (status) => {
    const orders = ordersDB.getAll()
    return orders.filter(o => o.status === status)
}

export const getApprovedReviews = () => {
    const reviews = reviewsDB.getAll()
    return reviews.filter(r => r.approved === true)
}

export const getPendingReviews = () => {
    const reviews = reviewsDB.getAll()
    return reviews.filter(r => r.approved === false || r.approved === undefined)
}

export const getUserByEmail = (email) => {
    const users = usersDB.getAll()
    return users.find(u => u.email === email)
}

export const authenticateUser = (email, password) => {
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
