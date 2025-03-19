"use client"

import { CreateCategoryModal } from "@/components/admin";
import { Category } from "@/types";
import { IconCircleDashedPlus, IconTrash } from "@tabler/icons-react";
import { getCategories, deleteCategoryById } from "@/services/categoryService";
import { useEffect, useState } from "react";
import Image from "next/image";
import AlertDialogDelete from "@/components/shared/alertDialogDelete";

export const AdminCategoriesPanel = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (categoryId: string) => {
        try {
            const res = await deleteCategoryById(categoryId);
            if (!res) return alert("Failed to delete category");
            setCategories(categories.filter(category => category._id !== categoryId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="p-6 bg-zinc-700 text-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Categorías</h2>
                <button 
                    onClick={() => setIsModalVisible(true)} 
                    className="p-4 gap-1 bg-blue-600 flex items-center justify-center rounded-2xl text-zinc-200 hover:bg-blue-700 duration-200">
                    <IconCircleDashedPlus className="w-6 h-6" /> Agregar
                </button>
            </div>
           {isModalVisible && <CreateCategoryModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div 
                        key={category._id} 
                        className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-lg shadow-md">
                        <div className="flex items-center gap-4">
                            <Image 
                                src={category.imageURL} 
                                alt={category.name} 
                                height={80} 
                                width={80} 
                                className="rounded-full" 
                            /> 
                            <h2 className="text-xl font-semibold">{category.name}</h2>
                        </div>
                        <AlertDialogDelete onConfirm={() => handleDeleteCategory(category._id || "")}>
                            <IconTrash className="w-10 h-10 p-2 text-red-600 hover:text-red-300 transition" />
                        </AlertDialogDelete>
                    </div>
                ))}
            </div>
        </section>
    );
};