import { VariantFieldProps } from "@/types";
import { INPUT_CLASS, SNACK_WEIGHT_UNIT_OPTIONS, TEXTURE_OPTIONS } from "@/utils/constants";

export const SnackVariantFields = ({ currentVariant, onChange }: VariantFieldProps) => {
  return (
    <>
      <div>
        <label>Peso</label>
        <input
          type="number"
          name="weight"
          value={currentVariant.weight || 0}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label>Unidad</label>
        <select
          name="weightUnit"
          value={currentVariant.weightUnit}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {SNACK_WEIGHT_UNIT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Sabor (opcional)</label>
        <input
          type="text"
          name="flavor"
          value={currentVariant.flavor || ""}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label>Textura</label>
        <select
          name="texture"
          value={currentVariant.texture}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {TEXTURE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
