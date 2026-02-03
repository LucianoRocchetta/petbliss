import { Schema, model, models } from "mongoose";

const SupplierSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    contactEmail: { type: String, required: false },
    contactPhone: { type: String, required: false },
    address: { type: String, required: false },
    notes: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    // Información adicional útil
    website: { type: String, required: false },
    taxId: { type: String, required: false }, // CUIT/CUIL
    paymentTerms: { type: String, required: false }, // ej: "30 días", "contado"
    minimumOrder: { type: Number, required: false }, // Pedido mínimo
    deliveryTime: { type: String, required: false }, // Tiempo de entrega estimado
  },
  {
    timestamps: true,
  }
);

// Índice para búsquedas rápidas
SupplierSchema.index({ name: 1 });
SupplierSchema.index({ isActive: 1 });

export default models.Supplier || model("Supplier", SupplierSchema);
