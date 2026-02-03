import { VariantFieldProps } from "../../types";
import { INPUT_CLASS, CHECKBOX_CLASS, SIZE_OPTIONS } from "../../utils/constants";

export const ToyVariantFields = ({ currentVariant, onChange }: VariantFieldProps) => {
  return (
    <>
      <div>
        <label>Tamaño</label>
        <select
          name="size"
          value={currentVariant.size}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {SIZE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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
      <div className={CHECKBOX_CLASS}>
        <input
          type="checkbox"
          name="isInteractive"
          checked={currentVariant.isInteractive || false}
          onChange={onChange}
        />
        <label>Es interactivo</label>
      </div>
    </>
  );
};
