import { ProductDTO } from "@/types";

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
  INPUT_CLASS,
  CHECKBOX_CLASS,
  CURRENT_SUPPLIER_TEMPLATE,
  FORM_DATA_TEMPLATE,
} from "@/utils/constants";

// ========== HELPERS ESPECÍFICOS DE EDICIÓN ==========

/**
 * Crea un ProductDTO desde un producto existente para edición
 */
export const createFormDataFromProduct = (product: any): ProductDTO => ({
  _id: product._id,
  productType: product.productType,
  targetAnimal: product.targetAnimal,
  name: product.name,
  brand: product.brand?.name || product.brand,
  imageURL: product.imageURL,
  available: product.available,
  isFeatured: product.isFeatured,
  variants: product.variants.map((v: any) => ({
    ...v,
    suppliers: v.suppliers.map((s: any) => ({
      supplier: typeof s.supplier === 'object' ? s.supplier._id : s.supplier,
      cost: s.cost,
      isPreferred: s.isPreferred,
    })),
  })),
  byOrder: product.byOrder,
  category: product.category?.name || product.category,
  description: product.description,
});
