"use client";

import { Product, ProductVariant } from "@/types";
import { IconPencil, IconTrash, IconReport } from "@tabler/icons-react";
import Image from "next/image";
import { EditProductModal } from "../editProductModal";
import { deleteProductById } from "@/services/productService";
import { useState } from "react";
import AlertDialogDelete from "@/components/shared/alertDialogDelete";
import { formatPrice } from "@/utils";
import { formatVariantName } from "@/utils/productHelpers";
import { toast } from "sonner";

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
        toast.error("Error al eliminar el producto");
        return;
      }
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  const getVariantLabel = (variant: ProductVariant) => {
    return formatVariantName(product.productType, variant);
  };

  const getSupplierInfo = (variant: any) => {
    if (!variant.suppliers || variant.suppliers.length === 0) {
      return "Sin proveedor";
    }
    const preferredSupplier = variant.suppliers.find((s: any) => s.isPreferred);
    const supplier = preferredSupplier || variant.suppliers[0];
    const supplierName =
      typeof supplier.supplier === "object"
        ? supplier.supplier.name
        : "Proveedor";
    return `${supplierName} ${preferredSupplier ? "⭐" : ""}`;
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
        key={product._id}
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
            <h3 className="text-2xl font-semibold tracking-wide text-gray-800">
              {product.name}
            </h3>
            <div className="flex gap-2 flex-wrap max-w-md">
            
                {product.variants.map((variant, index) => {
                  const isActive = index === activeVariant;
                  return (
                    <p
                      key={variant._id}
                      onClick={() => setActiveVariant(index)}
                      className={`p-2 rounded-2xl text-xs cursor-pointer duration-75 ${
                        isActive
                          ? "bg-blue-600 text-zinc-200"
                          : "bg-blue-400 text-zinc-100"
                      } hover:bg-blue-700`}
                    >
                      {getVariantLabel(variant)}
                    </p>
                  );
                })}
           
            </div>
            <p className="text-sm font-bold mt-2">
              {getSupplierInfo(product.variants[activeVariant])}
            </p>
            <p className="text-xs text-gray-600">
              Stock: {product.variants[activeVariant]?.stock || 0}
            </p>
            <p className={!product.category ? "text-red-600" : ""}>
              {product.category ? product.category.name : "Sin categoria"}
            </p>
            <p
              className={!product.available ? "text-red-600" : "text-green-600"}
            >
              {!product.available ? "No disponible" : `Disponible`}
            </p>
            <div>
              {product.variants[activeVariant]?.discount > 0 ? (
                <div className="flex mt-2 flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-zinc-400 line-through">
                      ${formatPrice(product.variants[activeVariant]?.price)}
                    </p>
                  </div>
                  <p className="text-2xl text-zinc-800 font-extrabold">
                    $
                    {formatPrice(
                      product.variants[activeVariant]?.discountedPrice
                    )}
                  </p>
                </div>
              ) : (
                <p className="text-xl font-bold mt-2">
                  ${formatPrice(product.variants[activeVariant]?.price)}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <IconPencil
              onClick={handleIsModalVisible}
              className="w-10 h-10 p-2 border rounded-full text-zinc-800 border-zinc-800 cursor-pointer hover:bg-zinc-800 hover:text-zinc-200"
            />
            <AlertDialogDelete
              onConfirm={() => handleDeleteProduct(product._id ?? "")}
            >
              <IconTrash className="w-10 h-10 p-2 rounded-full text-zinc-200 bg-red-600 cursor-pointer hover:bg-red-700" />
            </AlertDialogDelete>
          </div>
        </div>
        {product.variants[activeVariant]?.discount > 0 ? (
          <div className="flex items-center bg-red-400/15 rounded-t-2xl absolute top-0 right-0 w-full p-2">
            <div className="bg-red-500 p-1 rounded-2xl flex items-center content-center">
              <p className="font-bold text-2xl text-zinc-200">
                {product.variants[activeVariant]?.discount}%{" "}
                <span className="font-normal text-sm">OFF</span>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center justify-end absolute top-0 right-0 w-full p-2">
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
