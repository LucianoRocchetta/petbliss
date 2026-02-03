/**
 * Helpers para trabajar con el nuevo sistema de productos
 *
 * Este archivo contiene funciones auxiliares para facilitar
 * la creación, validación y manipulación de productos y variantes
 */

import { ProductType, ProductVariantDTO, BaseVariantDTO } from "@/types";

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
