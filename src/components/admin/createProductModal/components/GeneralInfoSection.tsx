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
  onProductTypeChange: (type: ProductType) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (field: "byOrder" | "isFeatured", checked: boolean) => void;
};

export const GeneralInfoSection = ({
  formData,
  productType,
  categories,
  brands,
  onFormChange,
  onProductTypeChange,
  onImageChange,
  onCheckboxChange,
}: GeneralInfoSectionProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Información general</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="product-type" className="text-sm font-medium">
            Tipo de producto <span className="text-red-500">*</span>
          </label>
          <select
            id="product-type"
            value={productType}
            onChange={(e) => onProductTypeChange(e.target.value as ProductType)}
            className={INPUT_CLASS}
          >
            {PRODUCT_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="target-animal" className="text-sm font-medium">
            Animal objetivo
          </label>
          <select
            id="target-animal"
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
          <label htmlFor="product-image" className="text-sm font-medium">
            Imagen <span className="text-red-500">*</span>
          </label>
          <input
            id="product-image"
            type="file"
            onChange={onImageChange}
            className={`${INPUT_CLASS} text-zinc-800 bg-white`}
          />
        </div>
        <div>
          <label htmlFor="product-name" className="text-sm font-medium">
            Nombre del producto <span className="text-red-500">*</span>
          </label>
          <input
            id="product-name"
            name="name"
            value={formData.name}
            onChange={onFormChange}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="product-brand" className="text-sm font-medium">
            Marca <span className="text-red-500">*</span>
          </label>
          <select
            id="product-brand"
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
          <label htmlFor="product-description" className="text-sm font-medium">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            id="product-description"
            name="description"
            value={formData.description}
            onChange={onFormChange}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="product-category" className="text-sm font-medium">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            id="product-category"
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
          <label htmlFor="product-available" className="text-sm font-medium">
            Disponibilidad
          </label>
          <select
            id="product-available"
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
            id="product-byOrder"
            type="checkbox"
            name="byOrder"
            checked={formData.byOrder}
            onChange={(e) => onCheckboxChange("byOrder", e.target.checked)}
          />
          <label htmlFor="product-byOrder" className="text-sm">
            Por encargo
          </label>
        </div>
        <div className={CHECKBOX_CLASS}>
          <input
            id="product-featured"
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => onCheckboxChange("isFeatured", e.target.checked)}
          />
          <label htmlFor="product-featured" className="text-sm">
            Destacado
          </label>
        </div>
      </div>
    </div>
  );
};
