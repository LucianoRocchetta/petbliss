import { VariantFieldProps } from "../../types";
import {
  INPUT_CLASS,
  WEIGHT_UNIT_OPTIONS,
  AGE_RANGE_OPTIONS,
  SPECIAL_DIET_OPTIONS,
} from "../../utils/constants";

export const FoodVariantFields = ({ currentVariant, onChange }: VariantFieldProps) => {
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
          {WEIGHT_UNIT_OPTIONS.map((opt) => (
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
        <label>Rango de edad</label>
        <select
          name="ageRange"
          value={currentVariant.ageRange}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {AGE_RANGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Dieta especial</label>
        <select
          name="specialDiet"
          value={currentVariant.specialDiet}
          onChange={onChange}
          className={INPUT_CLASS}
        >
          {SPECIAL_DIET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
