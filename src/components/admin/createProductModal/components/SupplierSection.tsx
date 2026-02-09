import { CurrentVariant, CurrentSupplier, SupplierOption } from "@/types";
import { INPUT_CLASS } from "@/utils/constants";

type SupplierSectionProps = {
  suppliers: SupplierOption[];
  currentSupplier: CurrentSupplier;
  currentVariantSuppliers: CurrentVariant["suppliers"];
  onCurrentSupplierChange: (supplier: CurrentSupplier) => void;
  onAddSupplier: () => void;
  onRemoveSupplier: (index: number) => void;
};

export const SupplierSection = ({
  suppliers,
  currentSupplier,
  currentVariantSuppliers,
  onCurrentSupplierChange,
  onAddSupplier,
  onRemoveSupplier,
}: SupplierSectionProps) => {
  const getSupplierName = (supplierId: string): string => {
    return suppliers.find((s) => s._id === supplierId)?.name || "Desconocido";
  };

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold mb-2">Proveedores</h4>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <select
          value={currentSupplier.supplier}
          onChange={(e) =>
            onCurrentSupplierChange({
              ...currentSupplier,
              supplier: e.target.value,
            })
          }
          className="p-2 border rounded-2xl"
        >
          <option value="">Selecciona proveedor</option>
          {suppliers.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Costo"
          value={currentSupplier.cost}
          onChange={(e) =>
            onCurrentSupplierChange({
              ...currentSupplier,
              cost: Number(e.target.value),
            })
          }
          className="p-2 border rounded-2xl"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={currentSupplier.isPreferred}
            onChange={(e) =>
              onCurrentSupplierChange({
                ...currentSupplier,
                isPreferred: e.target.checked,
              })
            }
          />
          <label className="text-sm">Preferido</label>
          <button
            type="button"
            onClick={onAddSupplier}
            className="ml-2 px-3 py-1 bg-green-600 text-white rounded-2xl text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Lista de proveedores agregados */}
      <div className="space-y-1">
        {currentVariantSuppliers.map((sup, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <span className="text-sm">
              {getSupplierName(sup.supplier)} - ${sup.cost} {sup.isPreferred && "⭐"}
            </span>
            <button
              type="button"
              onClick={() => onRemoveSupplier(idx)}
              className="text-red-600 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
