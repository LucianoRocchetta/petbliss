"use client"

import { Product } from "@/types"
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { EditProductModal } from "../editProductModal";
import { deleteProductById } from "@/services/productService";
import { useState } from "react";

type ProductCardAdminProps = {
    product: Product;
}

export const ProductCardAdmin = ({product}: ProductCardAdminProps) => {
    const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);

    const handleIsModalVisible = () => {
        setIsModalVisible(true);
    }

    const handleDeleteProduct = async (productId: string) => {
        try {
            const res = await deleteProductById(productId);

            if(!res) {
                alert("Failed to delete product");
                return;
            }
            alert("Product deleted successfully") 
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div key={product.name} className="border rounded-2xl border-gray-300 bg-zinc-50 p-4 z-20">
            <EditProductModal product={product} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
            <div className="flex justify-center items-center mb-4">
                <div className="w-64 h-64 overflow-hidden">
                    <Image
                        src={product.imageURL}
                        alt={product.name}
                        width={250}
                        height={250}
                        className="object-cover w-full h-full"
                    />
                </div>
                    </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                                <p>${product.price}</p>
                            </div>
                            <div className="flex gap-2">
                            <IconPencil onClick={handleIsModalVisible} className="w-10 h-10 p-2 border rounded-full border-black" />
                            <IconTrash onClick={() => {handleDeleteProduct(product._id ? product._id : "")}} className="w-10 h-10 p-2 border rounded-full border-black text-gray-50 bg-red-500" />
                            </div>
                        </div>
                    </div>
    )
}