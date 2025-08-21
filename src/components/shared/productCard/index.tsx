import { Product } from "@/types";
import { IconReport, IconShoppingCart } from "@tabler/icons-react";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/utils";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, openCart } = useCartStore();
  const [activeVariant, setActiveVariant] = useState<number>(0);

  const handleAddItem = () => {
    addItem({ product: product, quantity: 1, variant: activeVariant });
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
        <div className="w-64 h-64 overflow-hidden relative">
          <Image
            src={product.imageURL}
            alt={product.name}
            width={250}
            height={250}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-3/4">
          <h3 className="text-xl font-semibold ">{product.name}</h3>
          <div className="flex gap-2 my-2">
            {product.variants.map((variant, index) => {
              const isActive = index === activeVariant;

              return (
                <p
                  key={index}
                  onClick={() => setActiveVariant(index)}
                  className={`p-2 rounded-2xl cursor-pointer duration-75 ${
                    isActive
                      ? "bg-blue-500 text-zinc-200"
                      : "border-zinc-800 border"
                  } hover:bg-blue-500 hover:text-zinc-200 hover:border-none`}
                >
                  {variant.weight}kg
                </p>
              );
            })}
          </div>
          {product.variants[activeVariant]?.discount > 0 ? (
            <div className="flex mt-2 flex-col">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium line-through">
                  ${formatPrice(product.variants[activeVariant]?.price)}
                </p>

                <p className="font-medium text-green-700">
                  -{product.variants[activeVariant]?.discount}%
                </p>
              </div>
              <p className="text-xl text-zinc-800 font-extrabold">
                ${formatPrice(product.variants[activeVariant]?.discountedPrice)}
              </p>
            </div>
          ) : (
            <p className="text-xl font-bold mt-2">
              ${formatPrice(product.variants[activeVariant]?.price)}
            </p>
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
