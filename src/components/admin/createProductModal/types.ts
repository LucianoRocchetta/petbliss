import { ProductDTO, ProductType } from "@/types";

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

export type CreateProductModalProps = {
  setIsModalVisible: (isModalVisible: boolean) => void;
  isModalVisible: boolean;
};

export type CreateProductPresentationalProps = {
  // Data
  formData: ProductDTO;
  categories: string[];
  brands: string[];
  suppliers: SupplierOption[];
  productType: ProductType;
  currentVariant: CurrentVariant;
  currentSupplier: CurrentSupplier;
  calculatedPrice: number;

  // Handlers
  onClose: () => void;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onProductTypeChange: (type: ProductType) => void;
  onCurrentVariantChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrentSupplierChange: (supplier: CurrentSupplier) => void;
  onAddSupplier: () => void;
  onRemoveSupplier: (index: number) => void;
  onAddVariant: () => void;
  onRemoveVariant: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCheckboxChange: (field: "byOrder" | "isFeatured", checked: boolean) => void;
};
