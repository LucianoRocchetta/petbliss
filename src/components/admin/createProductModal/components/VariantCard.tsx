import { formatPrice } from "@/utils";
import { ProductType } from "@/types";
import { getVariantDisplayName } from "../utils/variantHelpers";

type VariantCardProps = {
  variant: any;
  index: number;
  productType: ProductType;
  onRemove: (index: number) => void;
};

export const VariantCard = ({ variant, index, productType, onRemove }: VariantCardProps) => {
  return (
    <div className="p-3 border rounded-2xl shadow">
      <p className="font-semibold text-sm mb-2">
        {getVariantDisplayName(variant, productType)}
      </p>
      <p className="text-sm">Stock: {variant.stock}</p>
      <p className="text-sm">
        Precio: ${formatPrice(variant.discountedPrice || variant.price || 0)}
      </p>
      <p className="text-sm">Proveedores: {variant.suppliers.length}</p>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded-2xl text-sm w-full"
      >
        Eliminar
      </button>
    </div>
  );
};
