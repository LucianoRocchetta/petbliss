import { VariantFieldProps } from "@/types";
import { INPUT_CLASS, ACCESSORY_SIZE_OPTIONS } from "@/utils/constants";

export const AccessoryVariantFields = ({ currentVariant, onChange }: VariantFieldProps) => {
  return (
    <>
      <div>
        <label>Talle</label>
        <select
          name="size"
          value={currentVariant.size}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {ACCESSORY_SIZE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Color (opcional)</label>
        <input
          type="text"
          name="color"
          value={currentVariant.color || ""}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label>Material (opcional)</label>
        <input
          type="text"
          name="material"
          value={currentVariant.material || ""}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
    </>
  );
};
