"use client"

import React, { useState } from "react"
import { Category} from "@/types"
import { IconX } from "@tabler/icons-react"
import { createCategory } from "@/services/categoryService"

interface CreateCategoryModalProps {
    setIsModalVisible: (isModalVisible: Boolean) => void,
    isModalVisible: Boolean
}

export const CreateCategoryModal = ({setIsModalVisible, isModalVisible}: CreateCategoryModalProps) => {

    const formDataTemplate = {
        name: "",
        imageURL: "",
    }

    const [formData, setFormData] = useState<Category>(formDataTemplate)
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImageFile(file);
        }
      };

    const handleSubmit = async (e: React.FormEvent) => {
        try {

            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);

            if (imageFile) {
                formDataToSend.append("image", imageFile);
            }

            const res = await createCategory(formDataToSend);

            if (res) {
                alert("Category created")
                setFormData(formDataTemplate)
                setIsModalVisible(false);
            } else {
                alert("Failed to create category")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        isModalVisible && (
        <div className="z-20 w-full h-full bg-zinc-800 absolute lg:w-1/4 lg:top-0 lg:right-0 p-6 border-zinc-600 border-l">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-4">Crear Categoria</h2>
            <IconX className="w-8 h-8" onClick={() => setIsModalVisible(false)}/>
            </div>

            <form>
                <div>
                    <h2>Nombre de la categoria</h2>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="p-2 border rounded-2xl text-zinc-800 w-full"
                    />
                </div>
                <div>
                <h2>Imagen</h2>
                <input
                type="file"
                onChange={handleImageChange}
                className="p-2 border rounded-2xl text-zinc-800 w-full"
                />
            </div>
            </form>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSubmit}>
                    Crear Categoria
            </button>
        </div>
    ));
}