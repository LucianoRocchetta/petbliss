import { VariantFieldProps } from "@/types";
import { INPUT_CLASS, VOLUME_UNIT_OPTIONS, HYGIENE_SUBTYPE_OPTIONS } from "@/utils/constants";

export const HygieneVariantFields = ({ currentVariant, onChange }: VariantFieldProps) => {
  return (
    <>
      <div>
        <label>Volumen (opcional)</label>
        <input
          type="number"
          name="volume"
          value={currentVariant.volume || 0}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label>Unidad</label>
        <select
          name="volumeUnit"
          value={currentVariant.volumeUnit}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {VOLUME_UNIT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Aroma (opcional)</label>
        <input
          type="text"
          name="scent"
          value={currentVariant.scent || ""}
          onChange={onChange}
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label>Subtipo</label>
        <select
          name="productSubtype"
          value={currentVariant.productSubtype}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {HYGIENE_SUBTYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
