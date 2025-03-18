"use client"

import React, { useEffect, useState } from "react"
import { Product, ProductDTO } from "@/types"
import { IconX } from "@tabler/icons-react"
import { updateProductById } from "@/services/productService"
import { getCategoriesNames } from "@/services/categoryService"

interface EditProductModal {
    product: Product,
    setIsModalVisible: (isModalVisible: Boolean) => void,
    isModalVisible: Boolean
}

export const EditProductModal = ({product, setIsModalVisible, isModalVisible}: EditProductModal) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
            const fetchCategoriesNames = async () => {
                try {
                    const res = await getCategoriesNames();
        
                    const categoryNames = res.map((category: { name: string }) => category.name); // Only use names
        
                    setCategories(categoryNames);
                } catch (error) {
                    console.error("Failed to fetch categories names");
                }
            }
            fetchCategoriesNames();
    }, []);

    const formDataTemplate = {
        _id: product._id,
        name: product.name,
        price: product.price,
        imageURL: product.imageURL,
        available: product.available,
        category: product.category.name,
        description: product.description
    }

    const [formData, setFormData] = useState<ProductDTO>(formDataTemplate);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                available: formData.available,
            }

            const res = await updateProductById(updatedData);
        }
        catch (error) {
            alert("Error updating product");
        }
    }

    return (
        isModalVisible && (
            <div className="z-50 w-full h-full bg-zinc-800 fixed lg:w-1/4 lg:top-0 lg:right-0 p-6 border-zinc-600 border-l">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold mb-4">Editar producto</h2>
                    <IconX className="w-8 h-8" onClick={() => setIsModalVisible(false)} />
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
                        <h2>Disponibilidad</h2>
                        <select
                            name="available"
                            value={String(formData.available)}
                            onChange={handleFormChange}
                            className="p-2 border rounded-2xl w-full text-zinc-800"
                        >
                            <option value="true">Disponible</option>
                            <option value="false">No disponible</option>
                        </select>
                    </div>
                    <div>
                        <h2>Categoría</h2>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleFormChange}
                            className="p-2 border rounded-2xl w-full text-zinc-800"
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Sin categorias</option>
                            )}
                        </select>
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
                </form>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSubmit}>
                    Modificar producto
                </button>
            </div>
        )
    );
}
