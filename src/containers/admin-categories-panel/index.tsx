"use client"

import { CreateCategoryModal } from "@/components/admin"
import { Category } from "@/types"
import { IconCircleDashedPlus, IconTrash } from "@tabler/icons-react"
import { getCategories } from "@/services/categoryService"
import { useEffect, useState } from "react"
import { deleteCategoryById } from "@/services/categoryService"
import Image from "next/image"

export const AdminCategoriesPanel = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const res = await getCategories();

                setCategories(res)
    
            } catch (error) {
                console.error(error)
            }

        }
        getAllCategories();
    }, [])

    const handleIsModalVisible = () => {
        setIsModalVisible(true);
    }

    const handleDeleteCategory = async (categoryId: string) => {
        try {
            const res = await deleteCategoryById(categoryId);

            if(!res) alert("Failed to delete category by ID");
            alert("Category deleted successfully")
        } catch (error) {
            console.log(error)
        }
    }
 
    return (
        <section>
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Categorias</h2>
            

            <button onClick={handleIsModalVisible} className="p-2 bg-blue-500 flex items-center justify-center gap-2 rounded-2xl text-white">
                <IconCircleDashedPlus className="w-8 h-8"/>
                Agregar
            </button>

           
        </div>
        <CreateCategoryModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
        <div className="grid grid-cols-1">
                {categories.map((category) => (
                    <div key={category._id} className="p-5 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-4">
                        <Image src={category.imageURL} alt={category.name} height={100} width={100} className="rounded-full border border-gray-200" />
                        <h2 className="text-2xl font-semibold">{category.name}</h2>
                        </div>
                        <IconTrash onClick={() => {handleDeleteCategory(category._id ? category._id : "")}} className="w-10 h-10 p-2 border rounded-full border-black text-gray-50 bg-red-500" />
                </div>
                ))}
            </div>
       </section>
    )
}