import { ProductType, ProductDTO } from "@/types";
import { IconPlus } from "@tabler/icons-react";
import { VariantCard } from "./VariantCard";

type VariantsSectionProps = {
  formData: ProductDTO;
  productType: ProductType;
  onEditVariant: (index: number) => void;
  onRemoveVariant: (index: number) => void;
  onStartAddVariant: () => void;
};

export const VariantsSection = ({
  formData,
  productType,
  onEditVariant,
  onRemoveVariant,
  onStartAddVariant,
}: VariantsSectionProps) => {
  const hasVariants = formData.variants.length > 0;

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Variantes ({formData.variants.length})
        </h3>
        <button
          type="button"
          onClick={onStartAddVariant}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors"
        >
          <IconPlus size={18} />
          <span>Agregar variante</span>
        </button>
      </div>

      {!hasVariants ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay variantes registradas para este producto.</p>
          <p className="text-sm mt-2">
            Haz clic en "Agregar variante" para crear una nueva.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {formData.variants.map((variant, index) => (
            <VariantCard
              key={index}
              variant={variant}
              index={index}
              productType={productType}
              onEdit={onEditVariant}
              onRemove={onRemoveVariant}
            />
          ))}
        </div>
      )}
    </div>
  );
};
