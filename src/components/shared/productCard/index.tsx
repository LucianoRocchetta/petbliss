import { Product } from "@/types"
import { IconShoppingCart } from "@tabler/icons-react";
import Image from "next/image";

type ProductCardProps = {
    product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
    return (
        <div key={product.name} className={`border rounded-2xl bg-zinc-200 text-zinc-900 p-4 transition-opacity duration-300 ${
            !product.available ? "opacity-50 grayscale" : ""
        }`}>
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
                            {
                                (product.available) ? <IconShoppingCart className="w-10 h-10 p-2 border rounded-full border-zinc-800" /> : <p className="text-red-600">No disponible</p>
                            }
                            
                        </div>
                    </div>
    )
}