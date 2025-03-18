import { Product } from "@/types"
import { IconReport, IconShoppingCart } from "@tabler/icons-react";
import useCartStore from "@/store/cartStore";
import Image from "next/image";

type ProductCardProps = {
    product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
    const { addItem } = useCartStore();

    return (
        <div key={product.name} className={`relative border rounded-2xl bg-zinc-200 text-zinc-900 p-4 transition-opacity duration-300 ${
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
                                (product.available) ? <IconShoppingCart onClick={() => addItem({product: product, quantity: 0})} className="w-10 h-10 p-2 border rounded-full border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200 duration-75 cursor-pointer" /> : <p className="text-red-600">No disponible</p>
                            }
                        </div>
                        {
                                    product.byOrder ? (
                                        <div className="absolute top-0 left-4 w-1/2 flex gap-2 bg-blue-600/90 p-1 mt-2 rounded-2xl text-zinc-200 items-center justify-center">
                                            <IconReport className="w-8 h-8 text-zinc-200"/>
                                            <p className="font-bold">Por encargo</p>
                                        </div>
                                    ) : ""
                                }
                    </div>
    )
}