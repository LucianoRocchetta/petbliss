import { VariantFieldProps } from "@/types";
import { INPUT_CLASS } from "@/utils/constants";

export const GenericVariantFields = ({ currentVariant, onChange }: VariantFieldProps) => {
  return (
    <div>
      <label>Nombre de la variante</label>
      <input
        type="text"
        name="variantName"
        value={currentVariant.variantName || ""}
        onChange={onChange}
        className={INPUT_CLASS}
      />
    </div>
  );
};
