import { ProductDTO } from "@/types";

// ========== OPCIONES DE SELECT ==========

export const PRODUCT_TYPE_OPTIONS = [
  { value: "food", label: "Alimento" },
  { value: "accessory", label: "Accesorio" },
  { value: "snack", label: "Snack/Premio" },
  { value: "medicine", label: "Medicina" },
  { value: "hygiene", label: "Higiene" },
  { value: "toy", label: "Juguete" },
  { value: "other", label: "Otro" },
] as const;

export const TARGET_ANIMAL_OPTIONS = [
  { value: "dog", label: "Perro" },
  { value: "cat", label: "Gato" },
  { value: "both", label: "Perro y Gato" },
  { value: "bird", label: "Ave" },
  { value: "fish", label: "Pez" },
  { value: "reptile", label: "Reptil" },
  { value: "rodent", label: "Roedor" },
  { value: "all", label: "Todos" },
] as const;

export const WEIGHT_UNIT_OPTIONS = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "lb", label: "lb" },
] as const;

export const SNACK_WEIGHT_UNIT_OPTIONS = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "units", label: "unidades" },
] as const;

export const VOLUME_UNIT_OPTIONS = [
  { value: "ml", label: "ml" },
  { value: "L", label: "L" },
  { value: "oz", label: "oz" },
] as const;

export const SIZE_OPTIONS = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
] as const;

export const ACCESSORY_SIZE_OPTIONS = [
  ...SIZE_OPTIONS,
  { value: "XXL", label: "XXL" },
  { value: "universal", label: "Universal" },
] as const;

export const AGE_RANGE_OPTIONS = [
  { value: "puppy", label: "Cachorro" },
  { value: "junior", label: "Junior" },
  { value: "adult", label: "Adulto" },
  { value: "senior", label: "Senior" },
  { value: "all", label: "Todos" },
] as const;

export const SPECIAL_DIET_OPTIONS = [
  { value: "none", label: "Ninguna" },
  { value: "light", label: "Light" },
  { value: "hypoallergenic", label: "Hipoalergénico" },
  { value: "grain-free", label: "Sin granos" },
  { value: "organic", label: "Orgánico" },
] as const;

export const TEXTURE_OPTIONS = [
  { value: "soft", label: "Suave" },
  { value: "crunchy", label: "Crujiente" },
  { value: "chewy", label: "Masticable" },
  { value: "mixed", label: "Mixto" },
] as const;

export const PRESENTATION_OPTIONS = [
  { value: "tablet", label: "Tableta" },
  { value: "capsule", label: "Cápsula" },
  { value: "liquid", label: "Líquido" },
  { value: "powder", label: "Polvo" },
  { value: "injection", label: "Inyección" },
  { value: "topical", label: "Tópico" },
] as const;

export const HYGIENE_SUBTYPE_OPTIONS = [
  { value: "shampoo", label: "Shampoo" },
  { value: "conditioner", label: "Acondicionador" },
  { value: "wipes", label: "Toallitas" },
  { value: "dental", label: "Dental" },
  { value: "ear-cleaner", label: "Limpiador de oídos" },
  { value: "other", label: "Otro" },
] as const;

export const AVAILABILITY_OPTIONS = [
  { value: "true", label: "Disponible" },
  { value: "false", label: "No disponible" },
] as const;

// ========== TEMPLATES ==========

export const FORM_DATA_TEMPLATE: ProductDTO = {
  productType: "food",
  targetAnimal: "all",
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

export const BASE_VARIANT_TEMPLATE = {
  price: 0,
  discount: 0,
  profit: 0,
  onSale: false,
  stock: 0,
  suppliers: [],
};

export const CURRENT_SUPPLIER_TEMPLATE = {
  supplier: "",
  cost: 0,
  isPreferred: false,
};

// ========== ESTILOS COMUNES ==========

export const INPUT_CLASS = "p-2 border rounded-2xl w-full";
export const CHECKBOX_CLASS = "flex items-center gap-2";
