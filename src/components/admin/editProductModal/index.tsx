"use client";

import React, { useEffect, useState } from "react";
import { Product, ProductDTO, ProductType } from "@/types";
import { IconX } from "@tabler/icons-react";
import { updateProductById } from "@/services/productService";
import { getCategoriesNames } from "@/services/categoryService";
import { getBrandNames } from "@/services/brandService";
import { formatPrice } from "@/utils";
import { toast } from "sonner";
import { getSuppliersNames } from "@/services/supplierService";
import { formatVariantName } from "@/utils/productHelpers";

interface EditProductModal {
  product: Product;
  setIsModalVisible: (isModalVisible: boolean) => void;
  isModalVisible: boolean;
}

export const EditProductModal = ({
  product,
  setIsModalVisible,
  isModalVisible,
}: EditProductModal) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          getCategoriesNames(),
          getBrandNames(),
        ]);

        setCategories(categoriesRes.map((c: { name: string }) => c.name));
        setBrands(brandsRes.map((b: { name: string }) => b.name));
      } catch (error) {
        console.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState<ProductDTO>({
    _id: product._id,
    productType: product.productType,
    targetAnimal: product.targetAnimal,
    name: product.name,
    brand: product.brand.name,
    imageURL: product.imageURL,
    available: product.available,
    isFeatured: product.isFeatured,
    variants: product.variants,
    byOrder: product.byOrder,
    category: product.category.name,
    description: product.description,
  });

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedData = {
        _id: formData._id,
        productType: formData.productType,
        targetAnimal: formData.targetAnimal,
        brand: formData.brand,
        name: formData.name,
        variants: formData.variants,
        isFeatured: formData.isFeatured,
        imageURL: formData.imageURL,
        category: formData.category,
        byOrder: formData.byOrder,
        description: formData.description,
        available: formData.available,
      };

      const res = await updateProductById(updatedData);

      if (res) {
        toast.success("Producto modificado correctamente");
        setIsModalVisible(false);
      }
    } catch (error) {
      toast.error("Error al modificar el producto");
    }
  };

  return (
    <div className="z-50 w-full overflow-y-auto lg:flex h-full text-zinc-800 bg-zinc-800/80 fixed top-0 right-0 lg:p-6">
      <div className="flex w-full lg:w-3/4 flex-col mx-auto bg-zinc-50 p-5 lg:rounded-2xl overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Modificar Producto</h2>
          <IconX
            className="w-8 h-8 cursor-pointer"
            onClick={() => setIsModalVisible(false)}
          />
        </div>

        <form className="space-y-6">
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="text-lg font-semibold mb-4">Información general</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Tipo de producto</label>
                <input
                  value={formData.productType}
                  disabled
                  className="p-2 border rounded-2xl w-full bg-gray-100"
                  title="El tipo de producto no se puede cambiar"
                />
              </div>
              <div>
                <label>Animal objetivo</label>
                <select
                  name="targetAnimal"
                  value={formData.targetAnimal}
                  onChange={handleFormChange}
                  className="p-2 border rounded-2xl w-full"
                >
                  <option value="dog">Perro</option>
                  <option value="cat">Gato</option>
                  <option value="both">Perro y Gato</option>
                  <option value="bird">Ave</option>
                  <option value="fish">Pez</option>
                  <option value="reptile">Reptil</option>
                  <option value="rodent">Roedor</option>
                  <option value="all">Todos</option>
                </select>
              </div>
              <div>
                <label>Nombre del producto</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="p-2 border rounded-2xl w-full"
                />
              </div>
              <div>
                <label>Marca</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleFormChange}
                  className="p-2 border rounded-2xl w-full"
                >
                  <option value="" disabled>
                    Selecciona una marca
                  </option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label>Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="p-2 border rounded-2xl w-full"
                />
              </div>
              <div>
                <label>Categoría</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="p-2 border rounded-2xl w-full"
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Disponibilidad</label>
                <select
                  name="available"
                  value={String(formData.available)}
                  onChange={handleFormChange}
                  className="p-2 border rounded-2xl w-full"
                >
                  <option value="true">Disponible</option>
                  <option value="false">No disponible</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="byOrder"
                  checked={formData.byOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, byOrder: e.target.checked })
                  }
                />
                <label>Por encargo</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                />
                <label>Destacado</label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="text-lg font-semibold mb-4">Variantes existentes</h3>
            <p className="text-sm text-gray-600 mb-4">
              Nota: Para modificar variantes, es recomendable eliminar el
              producto y crearlo nuevamente con las variantes correctas.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* {formData.variants.map((variant, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-2xl shadow space-y-2 bg-gray-50"
                >
                  <p className="font-semibold text-sm">
                    {formatVariantName(formData.productType, variant)}
                  </p>
                  <p className="text-sm">Stock: {variant.stock}</p>
                  <p className="text-sm">
                    Precio: ${formatPrice(variant.discountedPrice)}
                  </p>
                  {variant.onSale && (
                    <p className="text-sm text-red-600">
                      Descuento: {variant.discount}%
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Proveedores: {variant.suppliers.length}
                  </p>
                </div>
              ))} */}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalVisible(false)}
              className="px-6 py-3 bg-gray-400 text-white rounded-2xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl"
              onClick={handleSubmit}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
