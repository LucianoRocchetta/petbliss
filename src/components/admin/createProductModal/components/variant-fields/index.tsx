import { ProductType } from "@/types";
import { VariantFieldProps } from "../../types";
import { FoodVariantFields } from "./FoodVariantFields";
import { AccessoryVariantFields } from "./AccessoryVariantFields";
import { SnackVariantFields } from "./SnackVariantFields";
import { MedicineVariantFields } from "./MedicineVariantFields";
import { HygieneVariantFields } from "./HygieneVariantFields";
import { ToyVariantFields } from "./ToyVariantFields";
import { GenericVariantFields } from "./GenericVariantFields";

type VariantFieldsProps = VariantFieldProps & {
  productType: ProductType;
};

const VARIANT_FIELDS_MAP: Record<ProductType, React.FC<VariantFieldProps>> = {
  food: FoodVariantFields,
  accessory: AccessoryVariantFields,
  snack: SnackVariantFields,
  medicine: MedicineVariantFields,
  hygiene: HygieneVariantFields,
  toy: ToyVariantFields,
  other: GenericVariantFields,
};

export const VariantFields = ({ productType, currentVariant, onChange }: VariantFieldsProps) => {
  const FieldsComponent = VARIANT_FIELDS_MAP[productType] || GenericVariantFields;
  return <FieldsComponent currentVariant={currentVariant} onChange={onChange} />;
};

export {
  FoodVariantFields,
  AccessoryVariantFields,
  SnackVariantFields,
  MedicineVariantFields,
  HygieneVariantFields,
  ToyVariantFields,
  GenericVariantFields,
};
