import { Product } from "@/types"
import { IconPencil } from "@tabler/icons-react";
import Image from "next/image";

type ProductCardAdminProps = {
    product: Product;
}

export const ProductCardAdmin = ({product}: ProductCardAdminProps) => {
    return (
        <div key={product.name} className="border rounded-2xl border-gray-300 bg-zinc-50 p-4">
                        <div className="flex justify-center items-center mb-4">
                            <Image src={"/images/product.png"} alt={product.name} width={250} height={250} />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">{product.name}</h3>
                                <p>${product.price}</p>
                            </div>
                            <IconPencil className="w-10 h-10 p-2 border rounded-full border-black" />
                        </div>
                    </div>
    )
}