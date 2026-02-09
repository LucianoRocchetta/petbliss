import { Product, ProductDTO, ProductType } from "@/types";

// Importar tipos compartidos desde @/types
export type {
  SupplierOption,
  CurrentSupplier,
  CurrentVariant,
  VariantFieldProps,
  ValidationResult,
} from "@/types";

// Re-importar para uso local
import type {
  SupplierOption,
  CurrentSupplier,
  CurrentVariant,
} from "@/types";

// ========== TIPOS ESPECÍFICOS DEL MÓDULO ==========

// Props para el modal de edición de variante
export type EditVariantModalProps = {
  isOpen: boolean;
  variant: CurrentVariant;
  variantIndex: number;
  productType: ProductType;
  suppliers: SupplierOption[];
  calculatedPrice: number;
  onClose: () => void;
  onVariantChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCurrentSupplierChange: (supplier: CurrentSupplier) => void;
  onAddSupplier: () => void;
  onRemoveSupplier: (index: number) => void;
  onSave: () => void;
  currentSupplier: CurrentSupplier;
};

// Props para el Container
export type EditProductModalProps = {
  product: Product;
  setIsModalVisible: (isModalVisible: boolean) => void;
  isModalVisible: boolean;
};

// Props para el componente presentacional principal
export type EditProductPresentationalProps = {
  // Data
  formData: ProductDTO;
  categories: string[];
  brands: string[];
  suppliers: SupplierOption[];
  productType: ProductType;

  // Variant editing state
  isEditingVariant: boolean;
  editingVariant: CurrentVariant | null;
  editingVariantIndex: number | null;
  currentSupplier: CurrentSupplier;
  calculatedPrice: number;

  // New variant state
  isAddingVariant: boolean;
  newVariant: CurrentVariant;
  newVariantSupplier: CurrentSupplier;
  newVariantCalculatedPrice: number;

  // Handlers - General
  onClose: () => void;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onCheckboxChange: (field: "byOrder" | "isFeatured", checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;

  // Handlers - Edit Variant
  onEditVariant: (index: number) => void;
  onCancelEditVariant: () => void;
  onEditingVariantChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onEditSupplierChange: (supplier: CurrentSupplier) => void;
  onAddEditSupplier: () => void;
  onRemoveEditSupplier: (index: number) => void;
  onSaveVariant: () => void;
  onRemoveVariant: (index: number) => void;

  // Handlers - New Variant
  onStartAddVariant: () => void;
  onCancelAddVariant: () => void;
  onNewVariantChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNewVariantSupplierChange: (supplier: CurrentSupplier) => void;
  onAddNewVariantSupplier: () => void;
  onRemoveNewVariantSupplier: (index: number) => void;
  onConfirmAddVariant: () => void;
};
