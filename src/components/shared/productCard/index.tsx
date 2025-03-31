import { Product } from "@/types";
import { IconReport, IconShoppingCart } from "@tabler/icons-react";
import useCartStore from "@/store/cartStore";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, openCart } = useCartStore();

  const handleAddItem = () => {
    addItem({ product: product, quantity: 1 });
    openCart();
  };

  return (
    <div
      key={product.name}
      className={`relative border rounded-2xl bg-zinc-200 text-zinc-900 p-4 transition-opacity duration-300 hover:shadow-lg hover:shadow-zinc-900 ${
        !product.available ? "opacity-50 grayscale" : ""
      }`}
    >
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
          {product.discount > 0 ? (
            <div className="flex items-center gap-2">
              <p className="line-through">${product.price}</p>
              <p className="text-red-600">${product.discountedPrice}</p>
            </div>
          ) : (
            <p>${product.price}</p>
          )}
        </div>
        {product.available ? (
          <IconShoppingCart
            onClick={() => handleAddItem()}
            className="w-10 h-10 p-2 border rounded-full border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200 duration-75 cursor-pointer"
          />
        ) : (
          <p className="text-red-600">No disponible</p>
        )}
      </div>
      <div className="flex items-center justify-between absolute top-0 right-0 w-full p-4">
        {product.discount > 0 ? (
          <div className="bg-red-600/90 p-1 rounded-2xl text-zinc-200 items-center justify-center">
            <p className="font-bold">-{product.discount}%</p>
          </div>
        ) : (
          ""
        )}
        {product.byOrder ? (
          <div className="flex gap-1 bg-blue-600/90 p-1 rounded-2xl text-zinc-200 items-center justify-center">
            <IconReport className="w-8 h-8 text-zinc-200" />
            <p className="font-bold">Por encargo</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
