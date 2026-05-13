"use client";

import { getBrandNames } from "@/services/brandService";
import { getCategoriesNames } from "@/services/categoryService";
import { createProduct } from "@/services/productService";
import { getSuppliersNames } from "@/services/supplierService";
import { ProductDTO, ProductType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { CreateProduct } from "./CreateProduct";
import {
  CreateProductModalProps,
  CurrentSupplier,
  CurrentVariant,
  SupplierOption,
} from "./types";
import {
  calculateVariantPrice,
  CURRENT_SUPPLIER_TEMPLATE,
  FORM_DATA_TEMPLATE,
  getInitialVariant,
  prepareVariantForSave,
  validateVariant,
} from "./utils";

export const CreateProductModal = ({
  setIsModalVisible,
  isModalVisible,
}: CreateProductModalProps) => {
  // ========== DATA STATES ==========
  const [categories, setCategories] = useState<string[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  // ========== FORM STATES ==========
  const [productType, setProductType] = useState<ProductType>("food");
  const [formData, setFormData] = useState<ProductDTO>(FORM_DATA_TEMPLATE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<CurrentVariant>(
    getInitialVariant("food")
  );
  const [currentSupplier, setCurrentSupplier] = useState<CurrentSupplier>(
    CURRENT_SUPPLIER_TEMPLATE
  );

  // ========== DATA FETCHING ==========
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes, suppliersRes] = await Promise.all([
          getCategoriesNames(),
          getBrandNames(),
          getSuppliersNames(),
        ]);

        setCategories(categoriesRes.map((c: { name: string }) => c.name));
        setBrands(brandsRes.map((b: { name: string }) => b.name));
        setSuppliers(suppliersRes);
      } catch (error) {
        console.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Reset variant when product type changes
  useEffect(() => {
    setCurrentVariant(getInitialVariant(productType));
    setFormData((prev) => ({ ...prev, productType, variants: [] }));
  }, [productType]);

  // ========== HANDLERS ==========
  const handleClose = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  const handleFormChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleProductTypeChange = useCallback((type: ProductType) => {
    setProductType(type);
  }, []);

  const handleCurrentVariantChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      let parsedValue: string | number | boolean = value;

      if (e.target instanceof HTMLInputElement && type === "checkbox") {
        parsedValue = e.target.checked;
      } else if (type === "number") {
        parsedValue = Number(value);
      }

      setCurrentVariant((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));
    },
    []
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
      }
    },
    []
  );

  const handleCurrentSupplierChange = useCallback(
    (supplier: CurrentSupplier) => {
      setCurrentSupplier(supplier);
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (field: "byOrder" | "isFeatured", checked: boolean) => {
      setFormData((prev) => ({ ...prev, [field]: checked }));
    },
    []
  );

  // ========== SUPPLIER HANDLERS ==========
  const handleAddSupplier = useCallback(() => {
    if (!currentSupplier.supplier || currentSupplier.cost <= 0) {
      toast.warning("Complete los datos del proveedor");
      return;
    }

    const supplierObj = suppliers.find(
      (s) => s._id === currentSupplier.supplier
    );
    if (!supplierObj) {
      toast.error("Proveedor no encontrado");
      return;
    }

    const supplierExists = currentVariant.suppliers.some(
      (s) => s.supplier === supplierObj._id
    );

    if (supplierExists) {
      toast.warning("Este proveedor ya fue agregado a esta variante");
      return;
    }

    setCurrentVariant((prev) => ({
      ...prev,
      suppliers: [
        ...prev.suppliers,
        {
          supplier: supplierObj._id,
          cost: currentSupplier.cost,
          isPreferred: currentSupplier.isPreferred,
        },
      ],
    }));

    setCurrentSupplier(CURRENT_SUPPLIER_TEMPLATE);
    toast.success(`Proveedor ${supplierObj.name} agregado`);
  }, [currentSupplier, suppliers, currentVariant.suppliers]);

  const handleRemoveSupplier = useCallback((index: number) => {
    setCurrentVariant((prev) => ({
      ...prev,
      suppliers: prev.suppliers.filter((_, i) => i !== index),
    }));
  }, []);

  // ========== VARIANT HANDLERS ==========
  const handleAddVariant = useCallback(() => {
    const validation = validateVariant(currentVariant, productType);
    if (!validation.isValid) {
      toast.warning(validation.message);
      return;
    }

    const variantToAdd = prepareVariantForSave(currentVariant);

    setFormData((prev) => {
      const newVariants = [...prev.variants, variantToAdd];
      return {
        ...prev,
        variants: newVariants,
      };
    });

    setCurrentVariant(getInitialVariant(productType));
    toast.success("Variante agregada");
  }, [currentVariant, productType]);

  const handleRemoveVariant = useCallback((index: number) => {
    setFormData((prev) => {
      const newVariants = prev.variants.filter((_, i) => i !== index);
    
      return {
        ...prev,
        variants: newVariants,
      };
    });
  }, []);

  // ========== SUBMIT ==========
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.name || !formData.brand || !formData.category) {
        toast.error("Complete los campos obligatorios");
        return;
      }

      if (formData.variants.length === 0) {
        toast.error("Agregue al menos una variante");
        return;
      }

      if (!imageFile) {
        toast.error("Seleccione una imagen");
        return;
      }

      setSubmitting(true);

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("description", String(formData.description));
        formDataToSend.append("available", String(formData.available));
        formDataToSend.append("byOrder", String(formData.byOrder));
        formDataToSend.append("brand", formData.brand);
        formDataToSend.append("productType", formData.productType);
        formDataToSend.append("targetAnimal", formData.targetAnimal);

        const variantsJSON = JSON.stringify(formData.variants);
        formDataToSend.append("variants", variantsJSON);

        formDataToSend.append("isFeatured", String(formData.isFeatured));
        formDataToSend.append("image", imageFile);

        const res = await createProduct(formDataToSend);

        if (res) {
          toast.success("Producto creado correctamente");
          setFormData(FORM_DATA_TEMPLATE);
          setImageFile(null);
          setIsModalVisible(false);
        }
      } catch (error) {
        console.error("❌ [SUBMIT] Error:", error);
        toast.error("Error al crear el producto");
      } finally {
        setSubmitting(false);
      }
    },
    [formData, imageFile, setIsModalVisible]
  );

  // ========== CALCULATED VALUES ==========
  const calculatedPrice = calculateVariantPrice(currentVariant);

  // ========== RENDER ==========
  if (!isModalVisible) return null;

  return (
    <CreateProduct
      // Data
      formData={formData}
      categories={categories}
      brands={brands}
      suppliers={suppliers}
      productType={productType}
      currentVariant={currentVariant}
      currentSupplier={currentSupplier}
      calculatedPrice={calculatedPrice}
      submitting={submitting}
      // Handlers
      onClose={handleClose}
      onFormChange={handleFormChange}
      onProductTypeChange={handleProductTypeChange}
      onCurrentVariantChange={handleCurrentVariantChange}
      onImageChange={handleImageChange}
      onCurrentSupplierChange={handleCurrentSupplierChange}
      onAddSupplier={handleAddSupplier}
      onRemoveSupplier={handleRemoveSupplier}
      onAddVariant={handleAddVariant}
      onRemoveVariant={handleRemoveVariant}
      onSubmit={handleSubmit}
      onCheckboxChange={handleCheckboxChange}
    />
  );
};
