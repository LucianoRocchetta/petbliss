import { Schema, model, models } from "mongoose";

// Schema principal de producto con discriminador
const ProductSchema = new Schema(
  {
    productType: {
      type: String,
      required: true,
      enum: [
        "food",
        "accessory",
        "snack",
        "medicine",
        "hygiene",
        "toy",
        "other",
      ],
      default: "other",
    },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    available: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    byOrder: { type: Boolean, required: true, default: false },
    isFeatured: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    targetAnimal: {
      type: String,
      enum: ["dog", "cat", "bird", "fish", "reptile", "rodent", "both", "all"],
      default: "all",
    },
    variants: {
      type: [Schema.Types.Mixed],
      required: true,
      default: [],
    },
  },
  {
    discriminatorKey: "productType",
    timestamps: true,
  }
);

// Modelo base
const Product = models.Product || model("Product", ProductSchema);

// ========== VARIANTES PARA PRODUCTOS DE ALIMENTO ==========
const foodVariantSchema = new Schema({
  weight: { type: Number, required: true }, // en kg o gramos
  weightUnit: { type: String, enum: ["kg", "g", "lb"], default: "kg" },
  flavor: { type: String, required: false }, // Pollo, Carne, Pescado, etc.
  ageRange: {
    type: String,
    enum: ["puppy", "junior", "adult", "senior", "all"],
    default: "all",
  },
  specialDiet: {
    type: String,
    enum: ["none", "light", "hypoallergenic", "grain-free", "organic"],
    default: "none",
  },
});

// ========== VARIANTES PARA ACCESORIOS ==========
const accessoryVariantSchema = new Schema({
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL", "universal"],
    required: true,
  },
  color: { type: String, required: false },
  material: { type: String, required: false },
});

// ========== VARIANTES PARA SNACKS/PREMIOS ==========
const snackVariantSchema = new Schema({
  weight: { type: Number, required: true },
  weightUnit: { type: String, enum: ["kg", "g", "units"], default: "g" },
  flavor: { type: String, required: false },
  texture: {
    type: String,
    enum: ["soft", "crunchy", "chewy", "mixed"],
    default: "crunchy",
  },
});

// ========== VARIANTES PARA MEDICINAS ==========
const medicineVariantSchema = new Schema({
  dosage: { type: String, required: true }, // ej: "10mg", "5ml"
  presentation: {
    type: String,
    enum: ["tablet", "capsule", "liquid", "powder", "injection", "topical"],
    required: true,
  },
  quantity: { type: Number, required: true }, // cantidad en el empaque
  requiresPrescription: { type: Boolean, default: false },
});

// ========== VARIANTES PARA PRODUCTOS DE HIGIENE ==========
const hygieneVariantSchema = new Schema({
  volume: { type: Number, required: false }, // en ml o L
  volumeUnit: { type: String, enum: ["ml", "L", "oz"], default: "ml" },
  scent: { type: String, required: false },
  productSubtype: {
    type: String,
    enum: ["shampoo", "conditioner", "wipes", "dental", "ear-cleaner", "other"],
    default: "other",
  },
});

// ========== VARIANTES PARA JUGUETES ==========
const toyVariantSchema = new Schema({
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL"],
    required: true,
  },
  material: { type: String, required: false },
  isInteractive: { type: Boolean, default: false },
});

// ========== VARIANTES GENÉRICAS ==========
const genericVariantSchema = new Schema({
  variantName: { type: String, required: true },
  specifications: { type: Map, of: Schema.Types.Mixed },
});

export default Product;

// Función helper para obtener el modelo con variantes apropiadas
export const getProductModel = (productType: string) => {
  const discriminators = Product.discriminators || {};

  if (discriminators[productType]) {
    return discriminators[productType];
  }

  return Product;
};

// Función para crear variantes según el tipo de producto
export const getVariantSchema = (productType: string) => {
  const schemas: Record<string, Schema> = {
    food: foodVariantSchema,
    accessory: accessoryVariantSchema,
    snack: snackVariantSchema,
    medicine: medicineVariantSchema,
    hygiene: hygieneVariantSchema,
    toy: toyVariantSchema,
    other: genericVariantSchema,
  };

  return schemas[productType] || genericVariantSchema;
};

// Tipos de variantes disponibles
export const PRODUCT_TYPES = {
  FOOD: "food",
  ACCESSORY: "accessory",
  SNACK: "snack",
  MEDICINE: "medicine",
  HYGIENE: "hygiene",
  TOY: "toy",
  OTHER: "other",
} as const;

export const VARIANT_TYPES = {
  FOOD: "FoodVariant",
  ACCESSORY: "AccessoryVariant",
  SNACK: "SnackVariant",
  MEDICINE: "MedicineVariant",
  HYGIENE: "HygieneVariant",
  TOY: "ToyVariant",
  GENERIC: "GenericVariant",
} as const;
