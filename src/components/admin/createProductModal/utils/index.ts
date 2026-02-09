// Re-exportar constantes desde @/utils/constants
export {
  PRODUCT_TYPE_OPTIONS,
  TARGET_ANIMAL_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
  SNACK_WEIGHT_UNIT_OPTIONS,
  VOLUME_UNIT_OPTIONS,
  SIZE_OPTIONS,
  ACCESSORY_SIZE_OPTIONS,
  AGE_RANGE_OPTIONS,
  SPECIAL_DIET_OPTIONS,
  TEXTURE_OPTIONS,
  PRESENTATION_OPTIONS,
  HYGIENE_SUBTYPE_OPTIONS,
  AVAILABILITY_OPTIONS,
  BASE_VARIANT_TEMPLATE,
  FORM_DATA_TEMPLATE,
  CURRENT_SUPPLIER_TEMPLATE,
  INPUT_CLASS,
  CHECKBOX_CLASS,
} from "@/utils/constants";

// Re-exportar helpers desde @/utils/productHelpers
export {
  getInitialVariant,
  getVariantDisplayName,
  validateVariant,
  calculateVariantPrice,
  prepareVariantForSave,
  getPreferredSupplierFromList,
  calculateBasePrice,
  applyDiscount,
} from "@/utils/productHelpers";
