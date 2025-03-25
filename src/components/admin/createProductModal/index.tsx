"use client";

import React, { useEffect, useState } from "react";
import { createProduct } from "@/services/productService";
import { IconX } from "@tabler/icons-react";
import { getCategoriesNames } from "@/services/categoryService";
import { getBrandNames } from "@/services/brandService";

interface CreateProductModalProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  isModalVisible: boolean;
}

export const CreateProductModal = ({
  setIsModalVisible,
  isModalVisible,
}: CreateProductModalProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isDiscountVisible, setIsDiscountVisible] = useState<boolean>(false);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategoriesNames = async () => {
      try {
        const res = await getCategoriesNames();

        const categoryNames = res.map(
          (category: { _id: string; name: string }) => category.name
        );

        setCategories(categoryNames);
      } catch (error) {
        console.error("Failed to fetch categories names");
      }
    };

    const fetchBrandsNames = async () => {
      try {
        const res = await getBrandNames();

        const brandNames = res.map(
          (brand: { _id: string; name: string }) => brand.name
        );

        setBrands(brandNames);
      } catch (error) {
        console.error("Failed to fetch brands names");
      }
    };

    fetchBrandsNames();
    fetchCategoriesNames();
  }, []);

  const formDataTemplate = {
    brand: "",
    name: "",
    cost: 0,
    profit: 0,
    imageURL: "",
    available: "true",
    discount: 0,
    onSale: false,
    byOrder: false,
    category: "",
    description: "",
  };

  const [formData, setFormData] = useState(formDataTemplate);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("cost", String(formData.cost));
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", String(formData.description));
      formDataToSend.append("available", String(formData.available));
      formDataToSend.append("onSale", String(formData.onSale));
      formDataToSend.append("profit", String(formData.profit));
      formDataToSend.append("discount", String(formData.discount || 0));
      formDataToSend.append("byOrder", String(formData.byOrder));
      formDataToSend.append("brand", formData.brand);

      console.log(formDataToSend);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const res = await createProduct(formDataToSend);

      if (res) {
        alert("Product created");
        setFormData(formDataTemplate);
        setIsModalVisible(false);
      } else {
        alert("Failed to create product");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      className={`z-50 overflow-scroll w-full h-full bg-zinc-800 fixed lg:w-1/4 top-0 right-0 p-6 border-zinc-600 border-l transform ${
        isModalVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Crear producto</h2>
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
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2>Nombre del producto</h2>
          <input
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl w-full text-zinc-800"
          />
        </div>
        <div>
          <h2>Costo</h2>
          <input
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl w-full text-zinc-800"
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
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2>Descripción</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl w-full text-zinc-800"
          />
        </div>
        <div>
          <h2>Imagen</h2>
          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 border rounded-2xl w-full text-zinc-800"
          />
        </div>
      </form>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Crear Producto
      </button>
    </div>
  );
};
