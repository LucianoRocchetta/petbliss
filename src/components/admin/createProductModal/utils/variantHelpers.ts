import { ProductType } from "@/types";
import { CurrentVariant } from "../types";
import { BASE_VARIANT_TEMPLATE } from "./constants";

// ========== INICIALIZACIÓN DE VARIANTES ==========

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

export const getInitialVariant = (type: ProductType): CurrentVariant => ({
  ...BASE_VARIANT_TEMPLATE,
  ...VARIANT_DEFAULTS[type],
});

// ========== DISPLAY NAMES ==========

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

export const getVariantDisplayName = (variant: any, productType: ProductType): string => {
  const formatter = VARIANT_DISPLAY_FORMATTERS[productType];
  return formatter ? formatter(variant) : "Variante";
};

// ========== VALIDACIÓN ==========

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

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

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
