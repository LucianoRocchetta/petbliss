import { ProductDTO, ProductType } from "@/types";
import {
  INPUT_CLASS,
  CHECKBOX_CLASS,
  PRODUCT_TYPE_OPTIONS,
  TARGET_ANIMAL_OPTIONS,
  AVAILABILITY_OPTIONS,
} from "@/utils/constants";

type GeneralInfoSectionProps = {
  formData: ProductDTO;
  productType: ProductType;
  categories: string[];
  brands: string[];
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onCheckboxChange: (field: "byOrder" | "isFeatured", checked: boolean) => void;
};

export const GeneralInfoSection = ({
  formData,
  productType,
  categories,
  brands,
  onFormChange,
  onCheckboxChange,
}: GeneralInfoSectionProps) => {
  const productTypeLabel = PRODUCT_TYPE_OPTIONS.find(
    (opt) => opt.value === productType
  )?.label || productType;

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Información general</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Tipo de producto</label>
          <input
            value={productTypeLabel}
            disabled
            className={`${INPUT_CLASS} bg-gray-100 cursor-not-allowed`}
            title="El tipo de producto no se puede cambiar"
          />
        </div>
        <div>
          <label>Animal objetivo</label>
          <select
            name="targetAnimal"
            value={formData.targetAnimal}
            onChange={onFormChange}
            className={INPUT_CLASS}
          >
            {TARGET_ANIMAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Nombre del producto</label>
          <input
            name="name"
            value={formData.name}
            onChange={onFormChange}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label>Marca</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={onFormChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled>
              Selecciona una marca
            </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onFormChange}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label>Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={onFormChange}
            className={INPUT_CLASS}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Disponibilidad</label>
          <select
            name="available"
            value={String(formData.available)}
            onChange={onFormChange}
            className={INPUT_CLASS}
          >
            {AVAILABILITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className={CHECKBOX_CLASS}>
          <input
            type="checkbox"
            name="byOrder"
            checked={formData.byOrder}
            onChange={(e) => onCheckboxChange("byOrder", e.target.checked)}
          />
          <label>Por encargo</label>
        </div>
        <div className={CHECKBOX_CLASS}>
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => onCheckboxChange("isFeatured", e.target.checked)}
          />
          <label>Destacado</label>
        </div>
      </div>
    </div>
  );
};
