import { ProductType, ProductVariant } from "@/types";
import { CurrentVariant } from "../types";
import { BASE_VARIANT_TEMPLATE } from "./constants";

// Reutilizamos funciones del módulo de creación
export {
  getInitialVariant,
  getVariantDisplayName,
  validateVariant,
  type ValidationResult,
} from "../../createProductModal/utils/variantHelpers";

export {
  calculateVariantPrice,
  prepareVariantForSave,
  getPreferredSupplier,
  calculateBasePrice,
  applyDiscount,
} from "../../createProductModal/utils/priceCalculations";

// ========== HELPERS ESPECÍFICOS DE EDICIÓN ==========

/**
 * Convierte una variante del producto a CurrentVariant para edición
 */
export const productVariantToCurrentVariant = (variant: any): CurrentVariant => {
  // Aseguramos que los suppliers tengan el formato correcto
  const suppliers = variant.suppliers?.map((s: any) => ({
    supplier: typeof s.supplier === 'object' ? s.supplier._id : s.supplier,
    cost: s.cost,
    isPreferred: s.isPreferred,
  })) || [];

  return {
    ...variant,
    suppliers,
    // Aseguramos que los campos base estén presentes
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
      'FoodVariant': 'food',
      'AccessoryVariant': 'accessory',
      'SnackVariant': 'snack',
      'MedicineVariant': 'medicine',
      'HygieneVariant': 'hygiene',
      'ToyVariant': 'toy',
      'GenericVariant': 'other',
    };
    return typeMap[variant.variantType] || 'other';
  }
  
  // Detección por propiedades
  if ('weight' in variant && 'ageRange' in variant) return 'food';
  if ('size' in variant && 'color' in variant) return 'accessory';
  if ('weight' in variant && 'texture' in variant) return 'snack';
  if ('dosage' in variant && 'presentation' in variant) return 'medicine';
  if ('volume' in variant && 'productSubtype' in variant) return 'hygiene';
  if ('size' in variant && 'isInteractive' in variant) return 'toy';
  
  return 'other';
};

/**
 * Prepara una variante editada para guardar
 */
export const prepareEditedVariantForSave = (variant: CurrentVariant, productType: ProductType): any => {
  const { prepareVariantForSave } = require("../../createProductModal/utils/priceCalculations");
  const prepared = prepareVariantForSave(variant);
  
  // Añadir el variantType según el productType
  const variantTypeMap: Record<ProductType, string> = {
    food: 'FoodVariant',
    accessory: 'AccessoryVariant',
    snack: 'SnackVariant',
    medicine: 'MedicineVariant',
    hygiene: 'HygieneVariant',
    toy: 'ToyVariant',
    other: 'GenericVariant',
  };
  
  return {
    ...prepared,
    variantType: variantTypeMap[productType],
  };
};
