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
      <div className="flex flex-wrap gap-2 mb-2">
        <select
          value={currentSupplier.supplier}
          onChange={(e) =>
            onCurrentSupplierChange({
              ...currentSupplier,
              supplier: e.target.value,
            })
          }
          className="p-2 border rounded-2xl flex-1 min-w-[160px]"
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
          value={currentSupplier.cost || ""}
          onChange={(e) =>
            onCurrentSupplierChange({
              ...currentSupplier,
              cost: Number(e.target.value),
            })
          }
          className="p-2 border rounded-2xl w-28"
        />
        <div className="flex items-center gap-1">
          <input
            id="supplier-preferred"
            type="checkbox"
            checked={currentSupplier.isPreferred}
            onChange={(e) =>
              onCurrentSupplierChange({
                ...currentSupplier,
                isPreferred: e.target.checked,
              })
            }
            className="w-4 h-4"
          />
          <label htmlFor="supplier-preferred" className="text-sm cursor-pointer select-none">
            Preferido
          </label>
          <button
            type="button"
            onClick={onAddSupplier}
            className="ml-2 px-3 py-1 bg-green-600 text-white rounded-2xl text-sm hover:bg-green-700 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {currentVariantSuppliers.map((sup, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-2 rounded ${
              sup.isPreferred
                ? "bg-yellow-50 border border-yellow-200"
                : "bg-gray-100"
            }`}
          >
            <span className="text-sm">
              {getSupplierName(sup.supplier)} - ${sup.cost}
              {sup.isPreferred && (
                <span className="ml-1 text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full">
                  Preferido
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => onRemoveSupplier(idx)}
              className="text-red-600 text-sm hover:text-red-800 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
