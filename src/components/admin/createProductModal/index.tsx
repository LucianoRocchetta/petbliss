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

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      console.log(formDataToSend.get("variants"));

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
      className={`z-50 overflow-scroll w-full h-full text-zinc-800 bg-zinc-50 fixed top-0 right-0 p-6 border-zinc-600 border-l transform ${
        isModalVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Crear producto</h2>
        <IconX className="w-8 h-8" onClick={() => setIsModalVisible(false)} />
      </div>

      <form className="space-y-2">
        <div>
          <div className="flex items-center">
            <div>
              <h2>Imagen</h2>
              <input
                type="file"
                onChange={handleImageChange}
                className="p-2 border rounded-2xl w-full text-zinc-800"
              />
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
          </div>
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
            <h2>Descripción</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              className="p-2 border rounded-2xl w-full text-zinc-800"
            />
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
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold mt-4">Variantes</h2>
          <div className="border p-4 rounded-2xl mt-2 bg-white flex flex-col gap-5">
            <div className="flex flex-col gap-2 w-3/4">
              <label>Peso (kg)</label>
              <input
                type="text"
                name="weight"
                onChange={handleCurrentVariantChange}
                value={currentVariant.weight}
                required
                className="p-2 border rounded-2xl"
              />
              <label>Costo</label>
              <input
                type="text"
                name="cost"
                onChange={handleCurrentVariantChange}
                required
                className="p-2 border rounded-2xl"
                value={currentVariant.cost}
              />
              <label>Porcentaje de ganancia</label>
              <input
                type="text"
                name="profit"
                onChange={handleCurrentVariantChange}
                value={currentVariant.profit}
                required
                className="p-2 border rounded-2xl"
              />
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2">Con descuento</label>
                <input
                  type="checkbox"
                  name="onSale"
                  checked={currentVariant.onSale}
                  className="p-2 border rounded-2xl"
                  onChange={(e) => {
                    setIsDiscountVisible(e.target.checked);
                    handleCurrentVariantChange(e);
                  }}
                />
                {isDiscountVisible && (
                  <input
                    type="text"
                    placeholder="Descuento"
                    name="discount"
                    value={currentVariant.discount}
                    className="p-2 border rounded-2xl"
                    required
                    onChange={handleCurrentVariantChange}
                  />
                )}
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="px-4 py-2 bg-green-600 text-white rounded-2xl"
              >
                Agregar variante
              </button>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {formData.variants.map((variant, index) => (
                <div
                  key={index}
                  className=" justify-between p-2 border rounded-2xl mt-2"
                >
                  <div className="flex flex-col">
                    <span>{`Peso: ${variant.weight}kg`}</span>
                    <span>{`Costo: ${variant.cost}`}</span>
                    <span>{`Porcentaje de ganancia: ${variant.profit}%`}</span>
                    {variant.discount > 0 && (
                      <span>{`Descuento: ${variant.discount}%`}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="p-2 bg-red-600 text-zinc-200 rounded-2xl"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-2xl"
        onClick={handleSubmit}
      >
        Crear Producto
      </button>
    </div>
  );
};
