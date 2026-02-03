import { CurrentVariant } from "../types";

type SupplierInfo = {
  supplier: string;
  cost: number;
  isPreferred: boolean;
};

/**
 * Obtiene el proveedor preferido o el primero disponible
 */
export const getPreferredSupplier = (suppliers: SupplierInfo[]): SupplierInfo | null => {
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
  const preferredSupplier = getPreferredSupplier(variant.suppliers);
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
  const preferredSupplier = getPreferredSupplier(variant.suppliers);
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
