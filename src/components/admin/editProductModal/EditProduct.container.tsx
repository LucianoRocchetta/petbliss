"use client";

import { getBrandNames } from "@/services/brandService";
import { getCategoriesNames } from "@/services/categoryService";
import { updateProductById } from "@/services/productService";
import { getSuppliersNames } from "@/services/supplierService";
import { ProductDTO } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { EditProduct } from "./EditProduct";
import {
  CurrentSupplier,
  CurrentVariant,
  EditProductModalProps,
  SupplierOption,
} from "./types";
import {
  CURRENT_SUPPLIER_TEMPLATE,
  calculateVariantPrice,
  createFormDataFromProduct,
  getInitialVariant,
  prepareEditedVariantForSave,
  productVariantToCurrentVariant,
  validateVariant,
} from "./utils";

export const EditProductModal = ({
  product,
  setIsModalVisible,
  isModalVisible,
}: EditProductModalProps) => {
  // ========== DATA STATES ==========
  const [categories, setCategories] = useState<string[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  // ========== FORM STATES ==========
  const productType = product.productType;
  const [formData, setFormData] = useState<ProductDTO>(() =>
    createFormDataFromProduct(product)
  );

  // ========== EDIT VARIANT STATES ==========
  const [isEditingVariant, setIsEditingVariant] = useState(false);
  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(null);
  const [editingVariant, setEditingVariant] = useState<CurrentVariant | null>(null);
  const [editSupplier, setEditSupplier] = useState<CurrentSupplier>(CURRENT_SUPPLIER_TEMPLATE);

  // ========== ADD VARIANT STATES ==========
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [newVariant, setNewVariant] = useState<CurrentVariant>(getInitialVariant(productType));
  const [newVariantSupplier, setNewVariantSupplier] = useState<CurrentSupplier>(CURRENT_SUPPLIER_TEMPLATE);

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

  // ========== GENERAL HANDLERS ==========
  const handleClose = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "available" ? value === "true" : value,
      }));
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (field: "byOrder" | "isFeatured", checked: boolean) => {
      setFormData((prev) => ({ ...prev, [field]: checked }));
    },
    []
  );

  // ========== EDIT VARIANT HANDLERS ==========
  const handleEditVariant = useCallback((index: number) => {
    const variant = formData.variants[index];
    const currentVariant = productVariantToCurrentVariant(variant);
    setEditingVariantIndex(index);
    setEditingVariant(currentVariant);
    setEditSupplier(CURRENT_SUPPLIER_TEMPLATE);
    setIsEditingVariant(true);
  }, [formData.variants]);

  const handleCancelEditVariant = useCallback(() => {
    setIsEditingVariant(false);
    setEditingVariantIndex(null);
    setEditingVariant(null);
    setEditSupplier(CURRENT_SUPPLIER_TEMPLATE);
  }, []);

  const handleEditingVariantChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      let parsedValue: string | number | boolean = value;

      if (e.target instanceof HTMLInputElement && type === "checkbox") {
        parsedValue = e.target.checked;
      } else if (type === "number") {
        parsedValue = Number(value);
      }

      setEditingVariant((prev) =>
        prev ? { ...prev, [name]: parsedValue } : prev
      );
    },
    []
  );

  const handleEditSupplierChange = useCallback((supplier: CurrentSupplier) => {
    setEditSupplier(supplier);
  }, []);

  const handleAddEditSupplier = useCallback(() => {
    if (!editSupplier.supplier || editSupplier.cost <= 0) {
      toast.warning("Complete los datos del proveedor");
      return;
    }

    const supplierObj = suppliers.find((s) => s._id === editSupplier.supplier);
    if (!supplierObj) {
      toast.error("Proveedor no encontrado");
      return;
    }

    const supplierExists = editingVariant?.suppliers.some(
      (s) => s.supplier === supplierObj._id
    );

    if (supplierExists) {
      toast.warning("Este proveedor ya fue agregado a esta variante");
      return;
    }

    setEditingVariant((prev) =>
      prev
        ? {
            ...prev,
            suppliers: [
              ...prev.suppliers,
              {
                supplier: supplierObj._id,
                cost: editSupplier.cost,
                isPreferred: editSupplier.isPreferred,
              },
            ],
          }
        : prev
    );

    setEditSupplier(CURRENT_SUPPLIER_TEMPLATE);
    toast.success(`Proveedor ${supplierObj.name} agregado`);
  }, [editSupplier, suppliers, editingVariant?.suppliers]);

  const handleRemoveEditSupplier = useCallback((index: number) => {
    setEditingVariant((prev) =>
      prev
        ? {
            ...prev,
            suppliers: prev.suppliers.filter((_, i) => i !== index),
          }
        : prev
    );
  }, []);

  const handleSaveVariant = useCallback(() => {
    if (!editingVariant || editingVariantIndex === null) return;

    const validation = validateVariant(editingVariant, productType);
    if (!validation.isValid) {
      toast.warning(validation.message);
      return;
    }

    const preparedVariant = prepareEditedVariantForSave(editingVariant, productType);

    setFormData((prev) => {
      const newVariants = [...prev.variants];
      newVariants[editingVariantIndex] = preparedVariant;
      return { ...prev, variants: newVariants };
    });

    handleCancelEditVariant();
    toast.success("Variante actualizada");
  }, [editingVariant, editingVariantIndex, productType, handleCancelEditVariant]);

  const handleRemoveVariant = useCallback((index: number) => {
    if (formData.variants.length === 1) {
      toast.warning("El producto debe tener al menos una variante");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
    toast.success("Variante eliminada");
  }, [formData.variants.length]);

  // ========== ADD VARIANT HANDLERS ==========
  const handleStartAddVariant = useCallback(() => {
    setNewVariant(getInitialVariant(productType));
    setNewVariantSupplier(CURRENT_SUPPLIER_TEMPLATE);
    setIsAddingVariant(true);
  }, [productType]);

  const handleCancelAddVariant = useCallback(() => {
    setIsAddingVariant(false);
    setNewVariant(getInitialVariant(productType));
    setNewVariantSupplier(CURRENT_SUPPLIER_TEMPLATE);
  }, [productType]);

  const handleNewVariantChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      let parsedValue: string | number | boolean = value;

      if (e.target instanceof HTMLInputElement && type === "checkbox") {
        parsedValue = e.target.checked;
      } else if (type === "number") {
        parsedValue = Number(value);
      }

      setNewVariant((prev) => ({ ...prev, [name]: parsedValue }));
    },
    []
  );

  const handleNewVariantSupplierChange = useCallback((supplier: CurrentSupplier) => {
    setNewVariantSupplier(supplier);
  }, []);

  const handleAddNewVariantSupplier = useCallback(() => {
    if (!newVariantSupplier.supplier || newVariantSupplier.cost <= 0) {
      toast.warning("Complete los datos del proveedor");
      return;
    }

    const supplierObj = suppliers.find((s) => s._id === newVariantSupplier.supplier);
    if (!supplierObj) {
      toast.error("Proveedor no encontrado");
      return;
    }

    const supplierExists = newVariant.suppliers.some(
      (s) => s.supplier === supplierObj._id
    );

    if (supplierExists) {
      toast.warning("Este proveedor ya fue agregado a esta variante");
      return;
    }

    setNewVariant((prev) => ({
      ...prev,
      suppliers: [
        ...prev.suppliers,
        {
          supplier: supplierObj._id,
          cost: newVariantSupplier.cost,
          isPreferred: newVariantSupplier.isPreferred,
        },
      ],
    }));

    setNewVariantSupplier(CURRENT_SUPPLIER_TEMPLATE);
    toast.success(`Proveedor ${supplierObj.name} agregado`);
  }, [newVariantSupplier, suppliers, newVariant.suppliers]);

  const handleRemoveNewVariantSupplier = useCallback((index: number) => {
    setNewVariant((prev) => ({
      ...prev,
      suppliers: prev.suppliers.filter((_, i) => i !== index),
    }));
  }, []);

  const handleConfirmAddVariant = useCallback(() => {
    const validation = validateVariant(newVariant, productType);
    if (!validation.isValid) {
      toast.warning(validation.message);
      return;
    }

    const preparedVariant = prepareEditedVariantForSave(newVariant, productType);

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, preparedVariant],
    }));

    handleCancelAddVariant();
    toast.success("Variante agregada");
  }, [newVariant, productType, handleCancelAddVariant]);

  // ========== SUBMIT ==========
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.name || !formData.brand || !formData.category) {
        toast.error("Complete los campos obligatorios");
        return;
      }

      if (formData.variants.length === 0) {
        toast.error("El producto debe tener al menos una variante");
        return;
      }

      try {
        const res = await updateProductById(formData);

        if (res) {
          toast.success("Producto modificado correctamente");
          setIsModalVisible(false);
        }
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Error al modificar el producto");
      }
    },
    [formData, setIsModalVisible]
  );

  // ========== CALCULATED VALUES ==========
  const calculatedPrice = editingVariant ? calculateVariantPrice(editingVariant) : 0;
  const newVariantCalculatedPrice = calculateVariantPrice(newVariant);

  // ========== RENDER ==========
  if (!isModalVisible) return null;

  return (
    <EditProduct
      // Data
      formData={formData}
      categories={categories}
      brands={brands}
      suppliers={suppliers}
      productType={productType}
      // Variant editing state
      isEditingVariant={isEditingVariant}
      editingVariant={editingVariant}
      editingVariantIndex={editingVariantIndex}
      currentSupplier={editSupplier}
      calculatedPrice={calculatedPrice}
      // New variant state
      isAddingVariant={isAddingVariant}
      newVariant={newVariant}
      newVariantSupplier={newVariantSupplier}
      newVariantCalculatedPrice={newVariantCalculatedPrice}
      // Handlers - General
      onClose={handleClose}
      onFormChange={handleFormChange}
      onCheckboxChange={handleCheckboxChange}
      onSubmit={handleSubmit}
      // Handlers - Edit Variant
      onEditVariant={handleEditVariant}
      onCancelEditVariant={handleCancelEditVariant}
      onEditingVariantChange={handleEditingVariantChange}
      onEditSupplierChange={handleEditSupplierChange}
      onAddEditSupplier={handleAddEditSupplier}
      onRemoveEditSupplier={handleRemoveEditSupplier}
      onSaveVariant={handleSaveVariant}
      onRemoveVariant={handleRemoveVariant}
      // Handlers - New Variant
      onStartAddVariant={handleStartAddVariant}
      onCancelAddVariant={handleCancelAddVariant}
      onNewVariantChange={handleNewVariantChange}
      onNewVariantSupplierChange={handleNewVariantSupplierChange}
      onAddNewVariantSupplier={handleAddNewVariantSupplier}
      onRemoveNewVariantSupplier={handleRemoveNewVariantSupplier}
      onConfirmAddVariant={handleConfirmAddVariant}
    />
  );
};
