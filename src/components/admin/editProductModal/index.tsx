"use client"

import React, { useState } from "react"
import { Product } from "@/types"
import { IconX } from "@tabler/icons-react"
import { updateProductById } from "@/services/productService"

interface EditProductModal {
    product: Product,
    setIsModalVisible: (isModalVisible: Boolean) => void,
    isModalVisible: Boolean
}

export const EditProductModal = ({product, setIsModalVisible, isModalVisible}: EditProductModal) => {

    const formDataTemplate = {
        _id: product._id,
        name: product.name,
        price: product.price,
        imageURL: product.imageURL,
        stock: product.stock,
        category: product.category,
        description: product.description
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
            const updatedData = {
                _id: formData._id,
                name: formData.name,
                price: formData.price,
                imageURL: formData.imageURL,
                category: formData.category,
                description: formData.description,
                stock: formData.stock
            }

            const res = await updateProductById(updatedData)

        }
        catch (error) {
            alert("Error updating product")
        }
    }

    return (
        isModalVisible && (
        <div className="z-50 w-full h-full bg-zinc-800 absolute lg:w-1/4 lg:top-0 lg:right-0 p-6 border-zinc-600 border-l">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-4">Editar producto</h2>
            <IconX className="w-8 h-8" onClick={() => setIsModalVisible(false)}/>
            </div>

            <form>
                <div>
                    <h2>Nombre del producto</h2>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl text-zinc-800 w-full"
                    />
                </div>
                <div>
                    <h2>Precio</h2>
                    <input 
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl text-zinc-800 w-full"
                    />
                </div>
                <div>
                    <h2>Stock</h2>
                    <input 
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl text-zinc-800 w-full"
                    />
                </div>
                <div>
                    <h2>Categoría</h2>
                    <input 
                        name="category"
                        value={formData.category ? formData.category.name : ""}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl text-zinc-800 w-full"
                    />
                </div>
                <div>
                    <h2>Descripción</h2>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl text-zinc-800 w-full"
                    />
                </div>
                <div>
          </div>
            </form>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSubmit}>
                    Modificar producto
            </button>
        </div>
    ));
}