import { formatPrice } from "@/utils";
import { ProductType } from "@/types";
import { getVariantDisplayName } from "@/utils/productHelpers";
import { IconEdit, IconTrash } from "@tabler/icons-react";

type VariantCardProps = {
  variant: any;
  index: number;
  productType: ProductType;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
};

export const VariantCard = ({
  variant,
  index,
  productType,
  onEdit,
  onRemove,
}: VariantCardProps) => {
  const displayName = getVariantDisplayName(variant, productType);
  const price = variant.discountedPrice || variant.price || 0;
  const hasDiscount = variant.onSale && variant.discount > 0;

  return (
    <div className="p-4 border rounded-2xl shadow bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <p className="font-semibold text-sm">{displayName}</p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(index)}
            className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Editar variante"
          >
            <IconEdit size={16} />
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Eliminar variante"
          >
            <IconTrash size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-1 text-sm text-gray-600">
        <p>Stock: <span className="font-medium text-gray-800">{variant.stock}</span></p>
        <p>
          Precio:{" "}
          <span className="font-medium text-gray-800">
            ${formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="ml-2 text-red-600 text-xs">
              -{variant.discount}%
            </span>
          )}
        </p>
        <p>Proveedores: <span className="font-medium text-gray-800">{variant.suppliers?.length || 0}</span></p>
        <p>Ganancia: <span className="font-medium text-gray-800">{variant.profit}%</span></p>
      </div>
    </div>
  );
};
