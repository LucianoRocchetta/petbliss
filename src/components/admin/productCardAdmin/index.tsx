"use client";

import { Product } from "@/types";
import { IconPencil, IconTrash, IconReport } from "@tabler/icons-react";
import Image from "next/image";
import { EditProductModal } from "../editProductModal";
import { deleteProductById } from "@/services/productService";
import { useState } from "react";
import AlertDialogDelete from "@/components/shared/alertDialogDelete";
import { formatPrice } from "@/utils";

type ProductCardAdminProps = {
  product: Product;
};

export const ProductCardAdmin = ({ product }: ProductCardAdminProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activeVariant, setActiveVariant] = useState<number>(0);

  const handleIsModalVisible = () => {
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await deleteProductById(productId);

      if (!res) {
        alert("Failed to delete product");
        return;
      }
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isModalVisible && (
        <EditProductModal
          product={product}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      <div
        key={product.name}
        className="relative border rounded-2xl bg-zinc-200 text-zinc-900 p-4 hover:shadow-lg hover:shadow-zinc-900"
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
          <div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <div className="flex gap-2 ">
              {product.variants.map((variant, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => setActiveVariant(index)}
                    className="p-2 rounded-2xl bg-blue-600 text-zinc-200 cursor-pointer hover:bg-blue-700 duration-75"
                  >
                    {variant.weight}kg
                  </p>
                );
              })}
            </div>
            <p className={!product.category ? "text-red-600" : ""}>
              {product.category ? product.category.name : "Sin categoria"}
            </p>
            <p
              className={!product.available ? "text-red-600" : "text-green-600"}
            >
              {!product.available ? "No disponible" : `Disponible`}
            </p>
            <div>
              {product.variants[activeVariant].discount > 0 ? (
                <div className="flex mt-2 flex-col">
                  <p className="text-sm font-bold line-through">
                    ${formatPrice(product.variants[activeVariant].price)}
                  </p>
                  <p className="text-xl text-red-600">
                    $
                    {formatPrice(
                      product.variants[activeVariant].discountedPrice
                    )}
                  </p>
                </div>
              ) : (
                <p className="text-xl font-bold mt-2">
                  ${formatPrice(product.variants[activeVariant].price)}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <IconPencil
              onClick={handleIsModalVisible}
              className="w-10 h-10 p-2 border rounded-full text-zinc-800 border-zinc-800"
            />
            <AlertDialogDelete
              onConfirm={() => handleDeleteProduct(product._id ?? "")}
            >
              <IconTrash className="w-10 h-10 p-2 rounded-full text-zinc-200 bg-red-600" />
            </AlertDialogDelete>
          </div>
        </div>
        <div className="flex items-center justify-between absolute top-0 right-0 w-full p-4">
          {product.variants[activeVariant].discount > 0 ? (
            <div className="bg-red-600/90 p-1 rounded-2xl text-zinc-200 items-center justify-center">
              <p className="font-bold">
                -{product.variants[activeVariant].discount}%
              </p>
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
    </>
  );
};
