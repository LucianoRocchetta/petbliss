"use client";

import React, { useEffect, useState } from "react";
import { createProduct } from "@/services/productService";
import { IconX } from "@tabler/icons-react";
import { getCategoriesNames } from "@/services/categoryService";
import { getBrandNames } from "@/services/brandService";
import { ProductDTO, ProductVariantDTO } from "@/types";

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
    imageURL: "",
    available: true,
    byOrder: false,
    category: "",
    isFeatured: false,
    description: "",
    variants: [],
  };

  const [currentVariant, setCurrentVariant] = useState<ProductVariantDTO>({
    weight: 0,
    cost: 0,
    profit: 0,
    discount: 0,
    onSale: false,
  });
  const [formData, setFormData] = useState<ProductDTO>(formDataTemplate);
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

  const handleCurrentVariantChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === "checkbox" ? checked : value;
    setCurrentVariant((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(parsedValue) : parsedValue,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const addVariant = () => {
    if (
      !currentVariant.weight ||
      !currentVariant.cost ||
      !currentVariant.profit
    ) {
      alert("Campos de variante obligatiorios");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, currentVariant],
    }));

    setCurrentVariant({
      weight: 0,
      cost: 0,
      profit: 0,
      discount: 0,
      onSale: false,
    });
    setIsDiscountVisible(false);
  };

  const removeVariant = (index: number) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", String(formData.description));
      formDataToSend.append("available", String(formData.available));
      formDataToSend.append("byOrder", String(formData.byOrder));
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("variants", JSON.stringify(formData.variants));
      formDataToSend.append("isFeatured", String(formData.isFeatured));

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
      className={`z-50 w-full lg:flex h-full text-zinc-800 bg-zinc-800/80 fixed top-0 right-0 p-6 border-zinc-600 border-l transform ${
        isModalVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex w-full lg:w-3/4 flex-col mx-auto bg-zinc-50 p-5 rounded-2xl overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Crear Producto</h2>
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
                <h2>Imagen</h2>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="p-2 border rounded-2xl w-full text-zinc-800"
                />
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
            <h3 className="text-lg font-semibold mb-4">Variantes</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Peso (kg)</label>
                <input
                  type="text"
                  name="weight"
                  value={currentVariant.weight}
                  onChange={handleCurrentVariantChange}
                  className="p-2 border rounded-2xl w-full"
                />
              </div>
              <div>
                <label>Costo</label>
                <input
                  type="text"
                  name="cost"
                  value={currentVariant.cost}
                  onChange={handleCurrentVariantChange}
                  className="p-2 border rounded-2xl w-full"
                />
              </div>
              <div>
                <label>Ganancia (%)</label>
                <input
                  type="text"
                  name="profit"
                  value={currentVariant.profit}
                  onChange={handleCurrentVariantChange}
                  className="p-2 border rounded-2xl w-full"
                />
              </div>
              <div className="col-span-2 flex items-center gap-2 mt-2">
                <label>Con descuento</label>
                <input
                  type="checkbox"
                  name="onSale"
                  checked={currentVariant.onSale}
                  onChange={(e) => {
                    setIsDiscountVisible(e.target.checked);
                    handleCurrentVariantChange(e);
                  }}
                />
                {isDiscountVisible && (
                  <input
                    type="text"
                    placeholder="Descuento (%)"
                    name="discount"
                    value={currentVariant.discount}
                    onChange={handleCurrentVariantChange}
                    className="p-2 border rounded-2xl w-32"
                  />
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-2xl"
            >
              Agregar variante
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {formData.variants.map((variant, index) => (
                <div key={index} className="p-3 border rounded-2xl shadow">
                  <p>Peso: {variant.weight}kg</p>
                  <p>Costo: {variant.cost}</p>
                  <p>Ganancia: {variant.profit}%</p>
                  {variant.discount > 0 && (
                    <p>Descuento: {variant.discount}%</p>
                  )}
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded-2xl text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl"
              onClick={handleSubmit}
            >
              Crear producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
