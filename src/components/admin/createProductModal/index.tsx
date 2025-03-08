"use client"

import React, { useState } from "react"
import { createProduct } from "@/services/productService"
import { Product } from "@/types"
import { IconX } from "@tabler/icons-react"

interface CreateProductModalProps {
    setIsModalVisible: (isModalVisible: Boolean) => void,
    isModalVisible: Boolean
}

export const CreateProductModal = ({setIsModalVisible, isModalVisible}: CreateProductModalProps) => {

    const formDataTemplate = {
        name: "",
        price: 0,
        imageURL: "/public/images/product.png",
        stock: 0,
        category: "",
        description: ""
    }

    const [formData, setFormData] = useState<Product>(formDataTemplate)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            const res = await createProduct(formData);

            if (res) {
                alert("Product created")
                setFormData(formDataTemplate)
                setIsModalVisible(false);
            } else {
                alert("Failed to create product")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        isModalVisible && (
        <div className="bg-white absolute inset-0 p-6 rounded-2xl shadow-lg border-gray-400 border">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-4">Crear producto</h2>
            <IconX className="w-8 h-8" onClick={() => setIsModalVisible(false)}/>
            </div>

            <form>
                <div>
                    <h2>Nombre del producto</h2>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl border-gray-400 w-full"
                    />
                </div>
                <div>
                    <h2>Precio</h2>
                    <input 
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl border-gray-400 w-full"
                    />
                </div>
                <div>
                    <h2>Stock</h2>
                    <input 
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl border-gray-400 w-full"
                    />
                </div>
                <div>
                    <h2>Categoría</h2>
                    <input 
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl border-gray-400 w-full"
                    />
                </div>
                <div>
                    <h2>Descripción</h2>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl border-gray-400 w-full"
                    />
                </div>
            </form>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSubmit}>
                    Crear Producto
            </button>
        </div>
    ));
}