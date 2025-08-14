"use client";

import React, { useEffect, useState } from "react";
import { Product, ProductDTO, ProductVariantDTO } from "@/types";
import { IconX } from "@tabler/icons-react";
import { updateProductById } from "@/services/productService";
import { getCategoriesNames } from "@/services/categoryService";
import { getBrandNames } from "@/services/brandService";
import { calculateFinalPrice, formatPrice } from "@/utils";
import { toast } from "sonner";
import { getSuppliersNames } from "@/services/supplierService";

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
  const [suppliers, setSuppliers] = useState<string[]>([]);
  const [isDiscountVisible, setIsDiscountVisible] = useState<boolean>(false);
  const [brands, setBrands] = useState<string[]>([]);

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

    const fetchSuppliersNames = async () => {
      try {
        const res = await getSuppliersNames();

        const suppliersNames = res.map(
          (supplier: { _id: string; name: string }) => supplier.name
        );

        setSuppliers(suppliersNames);
      } catch (error) {
        console.error("Failed to fetch suppliers names");
      }
    };

    fetchBrandsNames();
    fetchCategoriesNames();
    fetchSuppliersNames();
  }, []);

  const formDataTemplate = {
    _id: product._id,
    name: product.name,
    brand: product.brand.name,
    imageURL: product.imageURL,
    available: product.available,
    isFeatured: product.isFeatured,
    variants: product.variants,
    byOrder: product.byOrder,
    category: product.category.name,
    description: product.description,
  };

  const [currentVariant, setCurrentVariant] = useState<ProductVariantDTO>({
    weight: 0,
    cost: 0,
    profit: 0,
    discount: 0,
    onSale: false,
    supplier: "",
  });

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

  const handleVariantChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let parsedValue: string | number | boolean = value;

    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      parsedValue = e.target.checked;
    } else if (
      name === "weight" ||
      name === "cost" ||
      name === "profit" ||
      name === "discount"
    ) {
      parsedValue = Number(value);
    }

    const updatedVariants = [...formData.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [name]: parsedValue,
    };

    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleCurrentVariantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let parsedValue: string | number | boolean = value;

    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      parsedValue = e.target.checked;
    }

    if (type === "number") {
      parsedValue = Number(parsedValue);
    }

    setCurrentVariant((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const addVariant = () => {
    if (
      !currentVariant.weight ||
      !currentVariant.cost ||
      !currentVariant.profit ||
      !currentVariant.supplier
    ) {
      toast.warning("Campos de variante incompletos");
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
      supplier: "",
    });
    setIsDiscountVisible(false);
  };

  const removeVariant = (index: number) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedData = {
        _id: formData._id,
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
    <div
      className={
        "z-50 w-full overflow-y-auto lg:flex h-full text-zinc-800 bg-zinc-800/80 fixed top-0 right-0 lg:p-6"
      }
    >
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
            <div className="grid grid-cols-4 gap-4">
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
              <div>
                <label>Proveedor</label>
                <select
                  name="supplier"
                  value={currentVariant.supplier}
                  onChange={handleCurrentVariantChange}
                  className="p-2 border rounded-2xl w-full"
                >
                  <option value="" disabled>
                    Selecciona un proveedor
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier} value={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
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
                <div
                  key={index}
                  className="p-3 border rounded-2xl shadow space-y-2"
                >
                  <div>
                    <label>Proveedor</label>
                    <select
                      name="supplier"
                      value={variant.supplier}
                      onChange={(e) => handleVariantChange(index, e)}
                      className="p-1 border rounded w-full"
                    >
                      <option value="" disabled>
                        Selecciona un proveedor
                      </option>
                      {suppliers.map((supplier) => (
                        <option key={supplier} value={supplier}>
                          {supplier}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Peso (kg)</label>
                    <input
                      type="text"
                      name="weight"
                      value={variant.weight}
                      onChange={(e) => handleVariantChange(index, e)}
                      className="p-1 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label>Costo</label>
                    <input
                      type="text"
                      name="cost"
                      value={variant.cost}
                      onChange={(e) => handleVariantChange(index, e)}
                      className="p-1 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label>Ganancia (%)</label>
                    <input
                      type="text"
                      name="profit"
                      value={variant.profit}
                      onChange={(e) => handleVariantChange(index, e)}
                      className="p-1 border rounded w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Con descuento</label>
                    <input
                      type="checkbox"
                      name="onSale"
                      checked={variant.onSale}
                      onChange={(e) => handleVariantChange(index, e)}
                    />
                  </div>
                  {variant.onSale && (
                    <div>
                      <label>Descuento (%)</label>
                      <input
                        type="text"
                        name="discount"
                        value={variant.discount}
                        onChange={(e) => handleVariantChange(index, e)}
                        className="p-1 border rounded w-full"
                      />
                    </div>
                  )}
                  <h2 className="font-bold">Precio final:</h2>
                  <p>
                    {formatPrice(
                      calculateFinalPrice(
                        variant.cost,
                        variant.profit,
                        variant.discount
                      )
                    )}
                  </p>
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
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl"
              onClick={handleSubmit}
            >
              Modificar producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
