import { IconX } from "@tabler/icons-react";
import { formatPrice } from "@/utils";
import { ProductType, CurrentVariant, CurrentSupplier, SupplierOption } from "@/types";
import { VariantFields } from "../../createProductModal/components/variant-fields";
import { CommonVariantFields } from "../../createProductModal/components/CommonVariantFields";
import { SupplierSection } from "../../createProductModal/components/SupplierSection";

type EditVariantModalProps = {
  isOpen: boolean;
  variant: CurrentVariant;
  variantIndex: number;
  productType: ProductType;
  suppliers: SupplierOption[];
  calculatedPrice: number;
  currentSupplier: CurrentSupplier;
  onClose: () => void;
  onVariantChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCurrentSupplierChange: (supplier: CurrentSupplier) => void;
  onAddSupplier: () => void;
  onRemoveSupplier: (index: number) => void;
  onSave: () => void;
};

export const EditVariantModal = ({
  isOpen,
  variant,
  variantIndex,
  productType,
  suppliers,
  calculatedPrice,
  currentSupplier,
  onClose,
  onVariantChange,
  onCurrentSupplierChange,
  onAddSupplier,
  onRemoveSupplier,
  onSave,
}: EditVariantModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">
            Editar Variante #{variantIndex + 1}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Campos específicos del tipo de producto */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Características del producto</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <VariantFields
              productType={productType}
              currentVariant={variant}
              onChange={onVariantChange}
            />
          </div>
        </div>

        {/* Campos comunes */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Precio y Stock</h4>
          <CommonVariantFields
            currentVariant={variant}
            onChange={onVariantChange}
          />
        </div>

        {/* Proveedores */}
        <div className="mb-6">
          <SupplierSection
            suppliers={suppliers}
            currentSupplier={currentSupplier}
            currentVariantSuppliers={variant.suppliers}
            onCurrentSupplierChange={onCurrentSupplierChange}
            onAddSupplier={onAddSupplier}
            onRemoveSupplier={onRemoveSupplier}
          />
        </div>

        {/* Precio calculado */}
        {variant.suppliers.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-bold">Precio final calculado:</h4>
            <p className="text-2xl font-bold text-green-600">
              ${formatPrice(calculatedPrice)}
            </p>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};
