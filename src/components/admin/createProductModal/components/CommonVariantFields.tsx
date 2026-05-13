import { CurrentVariant } from "@/types";
import { INPUT_CLASS, CHECKBOX_CLASS } from "@/utils/constants";

type CommonVariantFieldsProps = {
  currentVariant: CurrentVariant;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export const CommonVariantFields = ({ currentVariant, onChange }: CommonVariantFieldsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div>
        <label>Ganancia (%)</label>
        <input
          type="number"
          name="profit"
          value={currentVariant.profit || 0}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={currentVariant.stock || 0}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div className={`col-span-2 ${CHECKBOX_CLASS}`}>
        <input
          type="checkbox"
          name="onSale"
          checked={currentVariant.onSale || false}
          onChange={onChange}
        />
        <label>En oferta</label>
        {currentVariant.onSale && (
          <input
            type="number"
            placeholder="Descuento (%)"
            name="discount"
            value={currentVariant.discount || 0}
            onChange={onChange}
            className="p-2 border rounded-2xl w-32"
          />
        )}
      </div>
    </div>
  );
};
