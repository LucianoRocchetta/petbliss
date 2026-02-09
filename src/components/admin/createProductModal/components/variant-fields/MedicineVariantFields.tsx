import { VariantFieldProps } from "@/types";
import { INPUT_CLASS, CHECKBOX_CLASS, PRESENTATION_OPTIONS } from "@/utils/constants";

export const MedicineVariantFields = ({ currentVariant, onChange }: VariantFieldProps) => {
  return (
    <>
      <div>
        <label>Dosis (ej: 10mg, 5ml)</label>
        <input
          type="text"
          name="dosage"
          value={currentVariant.dosage || ""}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label>Presentación</label>
        <select
          name="presentation"
          value={currentVariant.presentation}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {PRESENTATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Cantidad</label>
        <input
          type="number"
          name="quantity"
          value={currentVariant.quantity || 0}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div className={CHECKBOX_CLASS}>
        <input
          type="checkbox"
          name="requiresPrescription"
          checked={currentVariant.requiresPrescription || false}
          onChange={onChange}
        />
        <label>Requiere receta</label>
      </div>
    </>
  );
};
