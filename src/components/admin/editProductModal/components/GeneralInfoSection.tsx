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
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (field: "byOrder" | "isFeatured", checked: boolean) => void;
};

export const GeneralInfoSection = ({
  formData,
  productType,
  categories,
  brands,
  onFormChange,
  onImageChange,
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
          <label className="text-sm font-medium">Tipo de producto</label>
          <div className="mt-1">
            <span className="inline-flex items-center px-3 py-2 rounded-2xl bg-blue-100 text-blue-800 text-sm font-medium">
              {productTypeLabel}
            </span>
            <span className="ml-2 text-xs text-gray-500">No modificable</span>
          </div>
        </div>
        <div>
          <label htmlFor="edit-target-animal" className="text-sm font-medium">
            Animal objetivo
          </label>
          <select
            id="edit-target-animal"
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
          <label htmlFor="edit-product-name" className="text-sm font-medium">
            Nombre del producto <span className="text-red-500">*</span>
          </label>
          <input
            id="edit-product-name"
            name="name"
            value={formData.name}
            onChange={onFormChange}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="edit-product-brand" className="text-sm font-medium">
            Marca <span className="text-red-500">*</span>
          </label>
          <select
            id="edit-product-brand"
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
          <label htmlFor="edit-product-description" className="text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="edit-product-description"
            name="description"
            value={formData.description}
            onChange={onFormChange}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="edit-product-category" className="text-sm font-medium">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            id="edit-product-category"
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
          <label htmlFor="edit-product-available" className="text-sm font-medium">
            Disponibilidad
          </label>
          <select
            id="edit-product-available"
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
            id="edit-byOrder"
            type="checkbox"
            name="byOrder"
            checked={formData.byOrder}
            onChange={(e) => onCheckboxChange("byOrder", e.target.checked)}
          />
          <label htmlFor="edit-byOrder" className="text-sm cursor-pointer select-none">
            Por encargo
          </label>
        </div>
        <div className={CHECKBOX_CLASS}>
          <input
            id="edit-featured"
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => onCheckboxChange("isFeatured", e.target.checked)}
          />
          <label htmlFor="edit-featured" className="text-sm cursor-pointer select-none">
            Destacado
          </label>
        </div>
        <div className="col-span-2">
          <label htmlFor="edit-product-image" className="text-sm font-medium">
            Cambiar imagen
          </label>
          <input
            id="edit-product-image"
            type="file"
            onChange={onImageChange}
            className={`${INPUT_CLASS} text-zinc-800 bg-white`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Dejar vacío para mantener la imagen actual
          </p>
        </div>
      </div>
    </div>
  );
};
