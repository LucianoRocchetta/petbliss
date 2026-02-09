// ========== TIPOS BASE ==========
export type Supplier = {
  _id?: string;
  name: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  notes?: string;
  isActive?: boolean;
  website?: string;
  taxId?: string;
  paymentTerms?: string;
  minimumOrder?: number;
  deliveryTime?: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type VariantSupplier = {
  supplier: string | Supplier;
  cost: number;
  isPreferred: boolean;
};

// ========== TIPOS DE PRODUCTOS ==========
export type ProductType =
  | "food"
  | "accessory"
  | "snack"
  | "medicine"
  | "hygiene"
  | "toy"
  | "other";
export type TargetAnimal =
  | "dog"
  | "cat"
  | "bird"
  | "fish"
  | "reptile"
  | "rodent"
  | "both"
  | "all";

// Base para todas las variantes
export type BaseVariant = {
  _id?: string;
  sku?: string;
  price: number;
  discountedPrice: number;
  profit: number;
  discount: number;
  onSale: boolean;
  stock: number;
  suppliers: VariantSupplier[];
};

// ========== VARIANTES ESPECÍFICAS ==========
export type FoodVariant = BaseVariant & {
  variantType: "FoodVariant";
  weight: number;
  weightUnit: "kg" | "g" | "lb";
  flavor?: string;
  ageRange: "puppy" | "junior" | "adult" | "senior" | "all";
  specialDiet: "none" | "light" | "hypoallergenic" | "grain-free" | "organic";
};

export type AccessoryVariant = BaseVariant & {
  variantType: "AccessoryVariant";
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "universal";
  color?: string;
  material?: string;
};

export type SnackVariant = BaseVariant & {
  variantType: "SnackVariant";
  weight: number;
  weightUnit: "kg" | "g" | "units";
  flavor?: string;
  texture: "soft" | "crunchy" | "chewy" | "mixed";
};

export type MedicineVariant = BaseVariant & {
  variantType: "MedicineVariant";
  dosage: string;
  presentation:
    | "tablet"
    | "capsule"
    | "liquid"
    | "powder"
    | "injection"
    | "topical";
  quantity: number;
  requiresPrescription: boolean;
};

export type HygieneVariant = BaseVariant & {
  variantType: "HygieneVariant";
  volume?: number;
  volumeUnit: "ml" | "L" | "oz";
  scent?: string;
  productSubtype:
    | "shampoo"
    | "conditioner"
    | "wipes"
    | "dental"
    | "ear-cleaner"
    | "other";
};

export type ToyVariant = BaseVariant & {
  variantType: "ToyVariant";
  size: "XS" | "S" | "M" | "L" | "XL";
  material?: string;
  isInteractive: boolean;
};

export type GenericVariant = BaseVariant & {
  variantType: "GenericVariant";
  variantName: string;
  specifications?: Record<string, any>;
};

// Union type de todas las variantes
export type ProductVariant =
  | FoodVariant
  | AccessoryVariant
  | SnackVariant
  | MedicineVariant
  | HygieneVariant
  | ToyVariant
  | GenericVariant;

// ========== PRODUCTO PRINCIPAL ==========
export type Product = {
  _id?: string;
  productType: ProductType;
  brand: Brand;
  name: string;
  imageURL: string;
  available: boolean;
  category: Category;
  byOrder: boolean;
  isFeatured: boolean;
  description: string;
  targetAnimal: TargetAnimal;
  variants: ProductVariant[];
  createdAt?: Date;
  updatedAt?: Date;
};

// ========== DTOs PARA CREAR/ACTUALIZAR ==========
export type BaseVariantDTO = {
  sku?: string;
  price: number;
  discount: number;
  profit: number;
  onSale: boolean;
  stock?: number;
  suppliers: {
    supplier: string;
    cost: number;
    isPreferred: boolean;
  }[];
};

export type FoodVariantDTO = BaseVariantDTO & {
  weight: number;
  weightUnit: "kg" | "g" | "lb";
  flavor?: string;
  ageRange: "puppy" | "junior" | "adult" | "senior" | "all";
  specialDiet: "none" | "light" | "hypoallergenic" | "grain-free" | "organic";
};

export type AccessoryVariantDTO = BaseVariantDTO & {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "universal";
  color?: string;
  material?: string;
};

export type SnackVariantDTO = BaseVariantDTO & {
  weight: number;
  weightUnit: "kg" | "g" | "units";
  flavor?: string;
  texture: "soft" | "crunchy" | "chewy" | "mixed";
};

export type MedicineVariantDTO = BaseVariantDTO & {
  dosage: string;
  presentation:
    | "tablet"
    | "capsule"
    | "liquid"
    | "powder"
    | "injection"
    | "topical";
  quantity: number;
  requiresPrescription: boolean;
};

export type HygieneVariantDTO = BaseVariantDTO & {
  volume?: number;
  volumeUnit: "ml" | "L" | "oz";
  scent?: string;
  productSubtype:
    | "shampoo"
    | "conditioner"
    | "wipes"
    | "dental"
    | "ear-cleaner"
    | "other";
};

export type ToyVariantDTO = BaseVariantDTO & {
  size: "XS" | "S" | "M" | "L" | "XL";
  material?: string;
  isInteractive: boolean;
};

export type GenericVariantDTO = BaseVariantDTO & {
  variantName: string;
  specifications?: Record<string, any>;
};

export type ProductVariantDTO =
  | FoodVariantDTO
  | AccessoryVariantDTO
  | SnackVariantDTO
  | MedicineVariantDTO
  | HygieneVariantDTO
  | ToyVariantDTO
  | GenericVariantDTO;

export type ProductDTO = {
  _id?: string;
  productType: ProductType;
  name: string;
  brand: string;
  category: string;
  imageURL: string;
  available: boolean;
  byOrder: boolean;
  isFeatured: boolean;
  description: string;
  targetAnimal: TargetAnimal;
  variants: ProductVariantDTO[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  variant: number;
};

export type Brand = {
  _id?: string;
  name: string;
  slug?: string;
  imageURL: string;
};

export type Category = {
  _id?: string;
  name: string;
  imageURL: string;
};

// ========== TIPOS COMPARTIDOS PARA MODALES DE PRODUCTO ==========

/**
 * Opción de proveedor para selects
 */
export type SupplierOption = {
  _id: string;
  name: string;
};

/**
 * Proveedor actual en edición/creación de variante
 */
export type CurrentSupplier = {
  supplier: string;
  cost: number;
  isPreferred: boolean;
};

/**
 * Variante actual en edición/creación
 */
export type CurrentVariant = BaseVariantDTO & Record<string, any>;

/**
 * Props para componentes de campos de variante
 */
export type VariantFieldProps = {
  currentVariant: CurrentVariant;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

/**
 * Resultado de validación de variante
 */
export type ValidationResult = {
  isValid: boolean;
  message?: string;
};