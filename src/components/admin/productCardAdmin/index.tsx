"use client"

import { Product } from "@/types"
import { IconPencil } from "@tabler/icons-react";
import Image from "next/image";
import { EditProductModal } from "../editProductModal";
import { useState } from "react";

type ProductCardAdminProps = {
    product: Product;
}

export const ProductCardAdmin = ({product}: ProductCardAdminProps) => {
    const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);

    const handleIsModalVisible = () => {
        setIsModalVisible(true);
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
                            <IconPencil onClick={handleIsModalVisible} className="w-10 h-10 p-2 border rounded-full border-black" />
                        </div>
                    </div>
    )
}