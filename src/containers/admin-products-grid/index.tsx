"use client"

import { Grid } from "@/components/shared/grid";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import { CreateProductModal } from "@/components/admin";
import { deleteAllProducts } from "@/services/productService";

export const AdminProductsGrid = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);

    const handleKeywordChange = useCallback(
        debounce((value: string) => {
            setKeyword(value);
        }, 1000), []
    )

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleKeywordChange(e.target.value);
    }

    const handleDeleteProductsButton = async () => {
        try {
            await deleteAllProducts();
            alert('Products successfully deleted');
        } catch (error) {
            alert('Error deleting products');
        }
    }

    const handleIsModalVisible = () => {
        setIsModalVisible(true);
    }

    return (
        <section >
            <h2 className="text-2xl font-bold">Productos</h2>
            <div className="flex items-center justify-between mb-5">
            <input 
            className="p-2 border rounded-2xl border-gray-400 w-3/4" 
            placeholder="Busqueda"
            onChange={onInputChange}>
            </input>
                <button onClick={handleIsModalVisible} className="p-2 bg-blue-500 flex items-center justify-center gap-2 rounded-2xl text-white">
                    <IconCircleDashedPlus className="w-8 h-8"/>
                    Agregar
                </button>
            </div>
            
            <Grid keyword={keyword} columns={4}/>
            <CreateProductModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>

            <div className="bg-red-300 p-5 rounded-2xl mt-10">
                <h2 className="text-2xl font-bold">Danger zone</h2> 
                <button onClick={handleDeleteProductsButton} className="bg-red-500 text-white rounded-2xl p-2">Eliminar todo</button>
            </div>
        </section>
    )
}