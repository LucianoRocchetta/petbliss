import { ProductDTO, ProductType, BaseVariantDTO } from "@/types";

// ========== TIPOS DEL MÓDULO ==========

export type SupplierOption = {
  _id: string;
  name: string;
};

export type CurrentSupplier = {
  supplier: string;
  cost: number;
  isPreferred: boolean;
};

export type CurrentVariant = BaseVariantDTO & Record<string, any>;

export type VariantFieldProps = {
  currentVariant: CurrentVariant;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export type CreateProductModalProps = {
  setIsModalVisible: (isModalVisible: boolean) => void;
  isModalVisible: boolean;
};

// Props para el componente presentacional
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
