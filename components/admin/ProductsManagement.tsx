'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { productsDB, initializeDatabase, Product } from '@/lib/db'
import { useNotification } from '@/contexts/NotificationContext'
import AdminLayout from '@/components/admin/AdminLayout'

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [formData, setFormData] = useState({
        articleNumber: '',
        name: '',
        description: '',
        price: '',
        category: '',
    })
    const { success, error: showError } = useNotification()

    useEffect(() => {
        initializeDatabase()
        loadProducts()
    }, [])

    const loadProducts = () => {
        setProducts(productsDB.getAll())
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        try {
            if (editingProduct) {
                productsDB.update(editingProduct.id, {
                    ...formData,
                    price: parseFloat(formData.price),
                })
                success('Product updated successfully!')
            } else {
                productsDB.create({
                    ...formData,
                    price: parseFloat(formData.price),
                    images: [],
                })
                success('Product added successfully!')
            }

            resetForm()
            loadProducts()
        } catch (error) {
            showError('Failed to save product. Please try again.')
        }
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setFormData({
            articleNumber: product.articleNumber,
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
        })
        setShowForm(true)
    }

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            productsDB.delete(id)
            success('Product deleted successfully!')
            loadProducts()
        }
    }

    const resetForm = () => {
        setFormData({
            articleNumber: '',
            name: '',
            description: '',
            price: '',
            category: '',
        })
        setEditingProduct(null)
        setShowForm(false)
    }

    const categories = [
        'thesis',
        'invites',
        'giveaways',
        'copyshop',
        'binding',
        'education',
        'online',
        'custom',
        'offset',
        'outdoor',
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="card">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Products Management</h2>
                            <p className="text-gray-600">Add, edit, or remove products</p>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="btn-primary"
                        >
                            {showForm ? '✕ Cancel' : '➕ Add Product'}
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="card">
                        <h3 className="text-xl font-bold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Article Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="articleNumber"
                                        value={formData.articleNumber}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="e.g., TP001"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="e.g., Thesis Printing"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="textarea-field"
                                    rows="3"
                                    placeholder="Product description..."
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Price (Rs.) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="e.g., 500"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="input-field"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button type="submit" className="btn-primary">
                                    {editingProduct ? '💾 Update Product' : '➕ Add Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn-outline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="card">
                    <h3 className="text-xl font-bold mb-4">All Products ({products.length})</h3>
                    {products.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-gray-600">No products yet. Add your first product!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                                                    {product.articleNumber}
                                                </span>
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                    {product.category}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-1">
                                                {product.name}
                                            </h4>
                                            <p className="text-gray-600 mb-2">{product.description}</p>
                                            <p className="text-xl font-bold text-primary-600">
                                                Rs. {product.price}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2 ml-4">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminProducts
