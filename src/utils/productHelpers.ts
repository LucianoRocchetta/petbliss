/**
 * Helpers para trabajar con el nuevo sistema de productos
 *
 * Este archivo contiene funciones auxiliares para facilitar
 * la creación, validación y manipulación de productos y variantes
 */

import {
  ProductType,
  ProductVariantDTO,
  BaseVariantDTO,
  CurrentVariant,
  CurrentSupplier,
  ValidationResult,
} from "@/types";
import { BASE_VARIANT_TEMPLATE } from "./constants";

/**
 * Calcula el precio con descuento basado en el precio y el porcentaje de descuento
 */
export const calculateDiscountedPrice = (
  price: number,
  discount: number
): number => {
  if (discount <= 0) return price;
  return Math.round(price * (1 - discount / 100));
};

/**
 * Calcula el precio de venta basado en el costo y el porcentaje de ganancia
 */
export const calculatePrice = (
  cost: number,
  profitPercentage: number
): number => {
  return Math.round(cost * (1 + profitPercentage / 100));
};

/**
 * Calcula el porcentaje de ganancia basado en el costo y el precio
 */
export const calculateProfitPercentage = (
  cost: number,
  price: number
): number => {
  if (cost <= 0) return 0;
  return Math.round(((price - cost) / cost) * 100);
};

/**
 * Valida que una variante tenga todos los campos base requeridos
 */
export const validateBaseVariant = (
  variant: Partial<BaseVariantDTO>
): string[] => {
  const errors: string[] = [];

  if (!variant.price || variant.price <= 0) {
    errors.push("El precio debe ser mayor a 0");
  }

  if (
    variant.discount !== undefined &&
    (variant.discount < 0 || variant.discount > 100)
  ) {
    errors.push("El descuento debe estar entre 0 y 100");
  }

  if (variant.profit !== undefined && variant.profit < 0) {
    errors.push("La ganancia no puede ser negativa");
  }

  if (!variant.suppliers || variant.suppliers.length === 0) {
    errors.push("Debe haber al menos un proveedor");
  }

  return errors;
};

/**
 * Valida si un producto de tipo alimento tiene todos los campos requeridos
 */
export const validateFoodVariant = (variant: any): string[] => {
  const errors = validateBaseVariant(variant);

  if (!variant.weight || variant.weight <= 0) {
    errors.push("El peso debe ser mayor a 0");
  }

  if (!variant.weightUnit) {
    errors.push("La unidad de peso es requerida");
  }

  if (!variant.ageRange) {
    errors.push("El rango de edad es requerido");
  }

  return errors;
};

/**
 * Valida si un producto de tipo accesorio tiene todos los campos requeridos
 */
export const validateAccessoryVariant = (variant: any): string[] => {
  const errors = validateBaseVariant(variant);

  if (!variant.size) {
    errors.push("El talle es requerido para accesorios");
  }

  return errors;
};

/**
 * Valida si un producto de tipo snack tiene todos los campos requeridos
 */
export const validateSnackVariant = (variant: any): string[] => {
  const errors = validateBaseVariant(variant);

  if (!variant.weight || variant.weight <= 0) {
    errors.push("El peso debe ser mayor a 0");
  }

  if (!variant.texture) {
    errors.push("La textura es requerida");
  }

  return errors;
};

/**
 * Valida si un producto de tipo medicina tiene todos los campos requeridos
 */
export const validateMedicineVariant = (variant: any): string[] => {
  const errors = validateBaseVariant(variant);

  if (!variant.dosage) {
    errors.push("La dosis es requerida");
  }

  if (!variant.presentation) {
    errors.push("La presentación es requerida");
  }

  if (!variant.quantity || variant.quantity <= 0) {
    errors.push("La cantidad debe ser mayor a 0");
  }

  return errors;
};

/**
 * Valida si un producto de tipo juguete tiene todos los campos requeridos
 */
export const validateToyVariant = (variant: any): string[] => {
  const errors = validateBaseVariant(variant);

  if (!variant.size) {
    errors.push("El tamaño es requerido para juguetes");
  }

  return errors;
};

/**
 * Valida una variante según el tipo de producto
 */
export const validateVariantByType = (
  productType: ProductType,
  variant: any
): string[] => {
  switch (productType) {
    case "food":
      return validateFoodVariant(variant);
    case "accessory":
      return validateAccessoryVariant(variant);
    case "snack":
      return validateSnackVariant(variant);
    case "medicine":
      return validateMedicineVariant(variant);
    case "toy":
      return validateToyVariant(variant);
    case "hygiene":
    case "other":
      return validateBaseVariant(variant);
    default:
      return ["Tipo de producto no válido"];
  }
};

/**
 * Obtiene el proveedor preferido de una variante
 */
export const getPreferredSupplier = (variant: any) => {
  if (!variant.suppliers || variant.suppliers.length === 0) return null;

  const preferred = variant.suppliers.find((s: any) => s.isPreferred);
  return preferred || variant.suppliers[0];
};

/**
 * Calcula el costo promedio de una variante considerando todos los proveedores
 */
export const getAverageCost = (variant: any): number => {
  if (!variant.suppliers || variant.suppliers.length === 0) return 0;

  const totalCost = variant.suppliers.reduce(
    (sum: number, s: any) => sum + s.cost,
    0
  );
  return totalCost / variant.suppliers.length;
};

/**
 * Obtiene el proveedor con el menor costo para una variante
 */
export const getCheapestSupplier = (variant: any) => {
  if (!variant.suppliers || variant.suppliers.length === 0) return null;

  return variant.suppliers.reduce((cheapest: any, current: any) =>
    current.cost < cheapest.cost ? current : cheapest
  );
};

/**
 * Formatea el nombre de una variante para mostrar
 */
export const formatVariantName = (
  productType: ProductType,
  variant: any
): string => {
  switch (productType) {
    case "food":
      return `${variant.weight}${variant.weightUnit} - ${
        variant.flavor || "Sin sabor"
      } - ${variant.ageRange}`;

    case "accessory":
      return `${variant.size}${variant.color ? ` - ${variant.color}` : ""}`;

    case "snack":
      return `${variant.weight}${variant.weightUnit}${
        variant.flavor ? ` - ${variant.flavor}` : ""
      }`;

    case "medicine":
      return `${variant.dosage} - ${variant.presentation} (${variant.quantity} unidades)`;

    case "hygiene":
      return variant.volume
        ? `${variant.volume}${variant.volumeUnit}${
            variant.scent ? ` - ${variant.scent}` : ""
          }`
        : variant.productSubtype;

    case "toy":
      return `${variant.size}${
        variant.material ? ` - ${variant.material}` : ""
      }`;

    case "other":
      return variant.variantName || "Variante";

    default:
      return "Variante";
  }
};

/**
 * Crea una variante base con valores calculados
 */
export const createBaseVariant = (
  price: number,
  discount: number,
  suppliers: Array<{ supplier: string; cost: number; isPreferred: boolean }>,
  stock: number = 0
): Omit<BaseVariantDTO, "suppliers"> & {
  suppliers: any[];
  discountedPrice: number;
} => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  const preferredSupplier =
    suppliers.find((s) => s.isPreferred) || suppliers[0];
  const profit = preferredSupplier ? price - preferredSupplier.cost : 0;

  return {
    price,
    discount,
    discountedPrice,
    profit,
    onSale: discount > 0,
    stock,
    suppliers,
  };
};

/**
 * Obtiene el nombre legible de un tipo de producto
 */
export const getProductTypeLabel = (productType: ProductType): string => {
  const labels: Record<ProductType, string> = {
    food: "Alimento",
    accessory: "Accesorio",
    snack: "Snack/Premio",
    medicine: "Medicina",
    hygiene: "Higiene",
    toy: "Juguete",
    other: "Otro",
  };

  return labels[productType] || "Desconocido";
};

/**
 * Obtiene el ícono o emoji representativo de un tipo de producto
 */
export const getProductTypeIcon = (productType: ProductType): string => {
  const icons: Record<ProductType, string> = {
    food: "🍖",
    accessory: "🦴",
    snack: "🍪",
    medicine: "💊",
    hygiene: "🧼",
    toy: "🎾",
    other: "📦",
  };

  return icons[productType] || "📦";
};

/**
 * Filtra productos por múltiples criterios
 */
export const filterProducts = (
  products: any[],
  filters: {
    productType?: ProductType[];
    targetAnimal?: string[];
    available?: boolean;
    isFeatured?: boolean;
    onSale?: boolean;
    brandId?: string;
    categoryId?: string;
  }
) => {
  return products.filter((product) => {
    // Filtrar por tipo de producto
    if (filters.productType && filters.productType.length > 0) {
      if (!filters.productType.includes(product.productType)) return false;
    }

    // Filtrar por animal objetivo
    if (filters.targetAnimal && filters.targetAnimal.length > 0) {
      if (
        !filters.targetAnimal.includes(product.targetAnimal) &&
        product.targetAnimal !== "all" &&
        product.targetAnimal !== "both"
      ) {
        return false;
      }
    }

    // Filtrar por disponibilidad
    if (
      filters.available !== undefined &&
      product.available !== filters.available
    ) {
      return false;
    }

    // Filtrar por destacados
    if (
      filters.isFeatured !== undefined &&
      product.isFeatured !== filters.isFeatured
    ) {
      return false;
    }

    // Filtrar por productos en oferta
    if (filters.onSale !== undefined) {
      const hasVariantOnSale = product.variants.some((v: any) => v.onSale);
      if (hasVariantOnSale !== filters.onSale) return false;
    }

    // Filtrar por marca
    if (filters.brandId) {
      const brandId =
        typeof product.brand === "object" ? product.brand._id : product.brand;
      if (brandId?.toString() !== filters.brandId) return false;
    }

    // Filtrar por categoría
    if (filters.categoryId) {
      const categoryId =
        typeof product.category === "object"
          ? product.category._id
          : product.category;
      if (categoryId?.toString() !== filters.categoryId) return false;
    }

    return true;
  });
};

/**
 * Ordena productos según diferentes criterios
 */
export const sortProducts = (
  products: any[],
  sortBy: "name" | "price-asc" | "price-desc" | "newest" | "featured" = "name"
) => {
  const sorted = [...products];

  switch (sortBy) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "price-asc":
      return sorted.sort((a, b) => {
        const minPriceA = Math.min(
          ...a.variants.map((v: any) => v.discountedPrice)
        );
        const minPriceB = Math.min(
          ...b.variants.map((v: any) => v.discountedPrice)
        );
        return minPriceA - minPriceB;
      });

    case "price-desc":
      return sorted.sort((a, b) => {
        const maxPriceA = Math.max(
          ...a.variants.map((v: any) => v.discountedPrice)
        );
        const maxPriceB = Math.max(
          ...b.variants.map((v: any) => v.discountedPrice)
        );
        return maxPriceB - maxPriceA;
      });

    case "newest":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });

    case "featured":
      return sorted.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });

    default:
      return sorted;
  }
};

// ========== HELPERS PARA MODALES DE PRODUCTO ==========

/**
 * Valores por defecto para cada tipo de variante
 */
const VARIANT_DEFAULTS: Record<ProductType, Partial<CurrentVariant>> = {
  food: {
    weight: 0,
    weightUnit: "kg",
    flavor: "",
    ageRange: "adult",
    specialDiet: "none",
  },
  accessory: {
    size: "M",
    color: "",
    material: "",
  },
  snack: {
    weight: 0,
    weightUnit: "g",
    flavor: "",
    texture: "crunchy",
  },
  medicine: {
    dosage: "",
    presentation: "tablet",
    quantity: 0,
    requiresPrescription: false,
  },
  hygiene: {
    volume: 0,
    volumeUnit: "ml",
    scent: "",
    productSubtype: "shampoo",
  },
  toy: {
    size: "M",
    material: "",
    isInteractive: false,
  },
  other: {
    variantName: "",
    specifications: {},
  },
};

/**
 * Obtiene una variante inicial según el tipo de producto
 */
export const getInitialVariant = (type: ProductType): CurrentVariant => ({
  ...BASE_VARIANT_TEMPLATE,
  ...VARIANT_DEFAULTS[type],
});

/**
 * Formateadores de nombre para mostrar variantes
 */
type VariantDisplayConfig = {
  [K in ProductType]: (variant: any) => string;
};

const VARIANT_DISPLAY_FORMATTERS: VariantDisplayConfig = {
  food: (v) => `${v.weight}${v.weightUnit} ${v.flavor || ""} - ${v.ageRange}`.trim(),
  accessory: (v) => `${v.size} ${v.color || ""}`.trim(),
  snack: (v) => `${v.weight}${v.weightUnit} ${v.flavor || ""}`.trim(),
  medicine: (v) => `${v.dosage} - ${v.presentation} (${v.quantity})`,
  hygiene: (v) => `${v.volume || ""}${v.volumeUnit} - ${v.productSubtype}`,
  toy: (v) => `${v.size} ${v.material || ""}`.trim(),
  other: (v) => v.variantName || "Variante",
};

/**
 * Obtiene el nombre para mostrar de una variante
 */
export const getVariantDisplayName = (variant: any, productType: ProductType): string => {
  const formatter = VARIANT_DISPLAY_FORMATTERS[productType];
  return formatter ? formatter(variant) : "Variante";
};

/**
 * Reglas de validación por tipo de producto
 */
type ValidationRule = {
  condition: (variant: CurrentVariant) => boolean;
  message: string;
};

const TYPE_VALIDATIONS: Partial<Record<ProductType, ValidationRule>> = {
  food: {
    condition: (v) => !v.weight || v.weight <= 0,
    message: "El peso es requerido para productos de alimento",
  },
  accessory: {
    condition: (v) => !v.size,
    message: "El talle es requerido para accesorios",
  },
  snack: {
    condition: (v) => !v.weight || v.weight <= 0,
    message: "El peso es requerido para snacks",
  },
  medicine: {
    condition: (v) => !v.dosage || !v.quantity,
    message: "La dosis y cantidad son requeridas para medicinas",
  },
};

/**
 * Valida una variante según el tipo de producto
 */
export const validateVariant = (
  variant: CurrentVariant,
  productType: ProductType
): ValidationResult => {
  // Validación común: al menos un proveedor
  if (variant.suppliers.length === 0) {
    return { isValid: false, message: "Agregue al menos un proveedor" };
  }

  // Validación común: ganancia mayor a 0
  if (variant.profit <= 0) {
    return { isValid: false, message: "La ganancia debe ser mayor a 0" };
  }

  // Validaciones específicas por tipo
  const typeValidation = TYPE_VALIDATIONS[productType];
  if (typeValidation && typeValidation.condition(variant)) {
    return { isValid: false, message: typeValidation.message };
  }

  return { isValid: true };
};

/**
 * Tipo para información de proveedor
 */
type SupplierInfo = {
  supplier: string;
  cost: number;
  isPreferred: boolean;
};

/**
 * Obtiene el proveedor preferido de una lista de proveedores
 */
export const getPreferredSupplierFromList = (suppliers: SupplierInfo[]): SupplierInfo | null => {
  if (suppliers.length === 0) return null;
  return suppliers.find((s) => s.isPreferred) || suppliers[0];
};

/**
 * Calcula el precio base (costo + ganancia)
 */
export const calculateBasePrice = (cost: number, profitPercentage: number): number => {
  return cost + cost * (profitPercentage / 100);
};

/**
 * Aplica el descuento al precio
 */
export const applyDiscount = (price: number, discountPercentage: number): number => {
  return price - (price * discountPercentage) / 100;
};

/**
 * Calcula el precio final de una variante
 */
export const calculateVariantPrice = (variant: CurrentVariant): number => {
  const preferredSupplier = getPreferredSupplierFromList(variant.suppliers);
  if (!preferredSupplier) return 0;

  const basePrice = calculateBasePrice(preferredSupplier.cost, variant.profit);
  const finalPrice = variant.onSale
    ? applyDiscount(basePrice, variant.discount)
    : basePrice;

  return Math.round(finalPrice);
};

/**
 * Prepara la variante con precios calculados para guardar
 */
export const prepareVariantForSave = (variant: CurrentVariant): any => {
  const preferredSupplier = getPreferredSupplierFromList(variant.suppliers);
  if (!preferredSupplier) return variant;

  const basePrice = calculateBasePrice(preferredSupplier.cost, variant.profit);
  const finalPrice = variant.onSale
    ? applyDiscount(basePrice, variant.discount)
    : basePrice;

  return {
    ...variant,
    price: Math.round(basePrice),
    discountedPrice: Math.round(finalPrice),
  };
};

/**
 * Mapeo de ProductType a variantType
 */
const VARIANT_TYPE_MAP: Record<ProductType, string> = {
  food: "FoodVariant",
  accessory: "AccessoryVariant",
  snack: "SnackVariant",
  medicine: "MedicineVariant",
  hygiene: "HygieneVariant",
  toy: "ToyVariant",
  other: "GenericVariant",
};

/**
 * Prepara una variante editada para guardar (con variantType)
 */
export const prepareEditedVariantForSave = (
  variant: CurrentVariant,
  productType: ProductType
): any => {
  const prepared = prepareVariantForSave(variant);

  return {
    ...prepared,
    variantType: VARIANT_TYPE_MAP[productType],
  };
};

/**
 * Convierte una variante del producto a CurrentVariant para edición
 */
export const productVariantToCurrentVariant = (variant: any): CurrentVariant => {
  const suppliers = variant.suppliers?.map((s: any) => ({
    supplier: typeof s.supplier === "object" ? s.supplier._id : s.supplier,
    cost: s.cost,
    isPreferred: s.isPreferred,
  })) || [];

  return {
    ...variant,
    suppliers,
    price: variant.price || 0,
    discount: variant.discount || 0,
    profit: variant.profit || 0,
    onSale: variant.onSale || false,
    stock: variant.stock || 0,
  };
};

/**
 * Detecta el tipo de variante basándose en sus propiedades
 */
export const detectVariantType = (variant: any): ProductType => {
  if (variant.variantType) {
    const typeMap: Record<string, ProductType> = {
      FoodVariant: "food",
      AccessoryVariant: "accessory",
      SnackVariant: "snack",
      MedicineVariant: "medicine",
      HygieneVariant: "hygiene",
      ToyVariant: "toy",
      GenericVariant: "other",
    };
    return typeMap[variant.variantType] || "other";
  }

  // Detección por propiedades
  if ("weight" in variant && "ageRange" in variant) return "food";
  if ("size" in variant && "color" in variant) return "accessory";
  if ("weight" in variant && "texture" in variant) return "snack";
  if ("dosage" in variant && "presentation" in variant) return "medicine";
  if ("volume" in variant && "productSubtype" in variant) return "hygiene";
  if ("size" in variant && "isInteractive" in variant) return "toy";

  return "other";
};
