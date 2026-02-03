import { ProductType, ProductDTO } from "@/types";
import { formatPrice } from "@/utils";
import { CurrentVariant, CurrentSupplier, SupplierOption } from "../types";
import { VariantFields } from "./variant-fields";
import { CommonVariantFields } from "./CommonVariantFields";
import { SupplierSection } from "./SupplierSection";
import { VariantCard } from "./VariantCard";

type VariantsSectionProps = {
  productType: ProductType;
  formData: ProductDTO;
  currentVariant: CurrentVariant;
  currentSupplier: CurrentSupplier;
  suppliers: SupplierOption[];
  calculatedPrice: number;
  onCurrentVariantChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCurrentSupplierChange: (supplier: CurrentSupplier) => void;
  onAddSupplier: () => void;
  onRemoveSupplier: (index: number) => void;
  onAddVariant: () => void;
  onRemoveVariant: (index: number) => void;
};

export const VariantsSection = ({
  productType,
  formData,
  currentVariant,
  currentSupplier,
  suppliers,
  calculatedPrice,
  onCurrentVariantChange,
  onCurrentSupplierChange,
  onAddSupplier,
  onRemoveSupplier,
  onAddVariant,
  onRemoveVariant,
}: VariantsSectionProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Variantes</h3>

      {/* Campos específicos del tipo de producto */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <VariantFields
          productType={productType}
          currentVariant={currentVariant}
          onChange={onCurrentVariantChange}
        />
      </div>

      {/* Campos comunes */}
      <CommonVariantFields
        currentVariant={currentVariant}
        onChange={onCurrentVariantChange}
      />

      {/* Proveedores */}
      <SupplierSection
        suppliers={suppliers}
        currentSupplier={currentSupplier}
        currentVariantSuppliers={currentVariant.suppliers}
        onCurrentSupplierChange={onCurrentSupplierChange}
        onAddSupplier={onAddSupplier}
        onRemoveSupplier={onRemoveSupplier}
      />

      {/* Precio calculado */}
      {currentVariant.suppliers.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold">Precio final calculado:</h4>
          <p className="text-xl">${formatPrice(calculatedPrice)}</p>
        </div>
      )}

      <button
        type="button"
        onClick={onAddVariant}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-2xl"
      >
        Agregar variante
      </button>

      {/* Lista de variantes agregadas */}
      {formData.variants.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {formData.variants.map((variant: any, index) => (
            <VariantCard
              key={index}
              variant={variant}
              index={index}
              productType={productType}
              onRemove={onRemoveVariant}
            />
          ))}
        </div>
      )}
    </div>
  );
};
