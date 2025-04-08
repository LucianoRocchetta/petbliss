"use client";

import React, { useEffect, useState } from "react";
import { Product, ProductDTO } from "@/types";
import { IconX } from "@tabler/icons-react";
import { updateProductById } from "@/services/productService";
import { getCategoriesNames } from "@/services/categoryService";
import { getBrandNames } from "@/services/brandService";

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
  const [isDiscountVisible, setIsDiscountVisible] = useState<boolean>(
    product.onSale
  );

  useEffect(() => {
    const fetchCategoriesNames = async () => {
      try {
        const res = await getCategoriesNames();

        const categoryNames = res.map(
          (category: { name: string }) => category.name
        );

        setCategories(categoryNames);
      } catch (error) {
        console.error("Failed to fetch categories names");
      }
    };

    const fetchBrandsNames = async () => {
      try {
        const res = await getBrandNames();

        const brandNames = res.map((brand: { name: string }) => brand.name);

        setBrands(brandNames);
      } catch (error) {
        console.error("Failed to fetch brands names");
      }
    };

    fetchBrandsNames();
    fetchCategoriesNames();
  }, []);

  const formDataTemplate = {
    _id: product._id,
    name: product.name,
    cost: product.cost,
    brand: product.brand.name,
    imageURL: product.imageURL,
    available: product.available,
    profit: product.profit,
    onSale: product.onSale,
    discount: product.discount,
    byOrder: product.byOrder,
    category: product.category.name,
    description: product.description,
  };

  const [formData, setFormData] = useState<ProductDTO>(formDataTemplate);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const updatedData = {
        _id: formData._id,
        brand: formData.brand,
        name: formData.name,
        cost: formData.cost,
        profit: formData.profit,
        onSale: formData.onSale,
        discount: formData.discount,
        imageURL: formData.imageURL,
        category: formData.category,
        byOrder: formData.byOrder,
        description: formData.description,
        available: formData.available,
      };

      console.log(updatedData);

      const res = await updateProductById(updatedData);

      if (res) {
        alert("Product updated");
        setIsModalVisible(false);
      }
    } catch (error) {
      alert("Error updating product");
    }
  };

  return (
    <div
      className={`z-50 overflow-scroll w-full h-full bg-zinc-800 fixed lg:w-1/4 top-0 right-0 p-6 border-zinc-600 border-l transform transition-all duration-300 ease-in-out ${
        isModalVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Editar producto</h2>
        <IconX className="w-8 h-8" onClick={() => setIsModalVisible(false)} />
      </div>

      <form className="space-y-2">
        <div>
          <h2>Marca</h2>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl w-full text-zinc-800"
          >
            <option value="" disabled>
              Selecciona una marca
            </option>
            {brands.length > 0 ? (
              brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))
            ) : (
              <option disabled>Sin marcas</option>
            )}
          </select>
        </div>
        <div>
          <h2>Nombre del producto</h2>
          <input
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl text-zinc-800 w-full"
          />
        </div>
        <div>
          <h2>Costo</h2>
          <input
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl text-zinc-800 w-full"
          />
        </div>
        <div>
          <h2>Porcentaje de ganancia</h2>
          <input
            name="profit"
            type="number"
            value={formData.profit}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl w-full text-zinc-800"
          />
        </div>
        <div>
          <h2>Disponibilidad</h2>
          <select
            name="available"
            value={String(formData.available)}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl w-full text-zinc-800"
          >
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
          </select>
        </div>
        <div className="flex items-center gap-5">
          <h2>Con descuento</h2>
          <div>
            <input
              type="checkbox"
              name="onSale"
              checked={formData.onSale}
              onChange={(e) => {
                setFormData({ ...formData, onSale: e.target.checked });
                setIsDiscountVisible(e.target.checked);
              }}
              className="mr-2"
            />
            <label htmlFor="onSale">Sí</label>
          </div>
        </div>
        {isDiscountVisible && (
          <div>
            <h2>Descuento</h2>
            <input
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleFormChange}
              className="p-2 border rounded-2xl w-full text-zinc-800"
            />
          </div>
        )}
        <div className="flex items-center gap-5">
          <h2>Por encargo</h2>
          <div>
            <input
              type="checkbox"
              name="byOrder"
              checked={formData.byOrder}
              onChange={(e) =>
                setFormData({ ...formData, byOrder: e.target.checked })
              }
              className="mr-2"
            />
            <label htmlFor="byOrder">Sí</label>
          </div>
        </div>
        <div>
          <h2>Categoría</h2>
          <select
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl w-full text-zinc-800"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option disabled>Sin categorias</option>
            )}
          </select>
        </div>
        <div>
          <h2>Descripción</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl text-zinc-800 w-full"
          />
        </div>
      </form>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Modificar producto
      </button>
    </div>
  );
};
