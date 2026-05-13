import { IconX, IconLoader2 } from "@tabler/icons-react";
import { CreateProductPresentationalProps } from "./types";
import { GeneralInfoSection, VariantsSection } from "./components";

export const CreateProduct = ({
  // Data
  formData,
  categories,
  brands,
  suppliers,
  productType,
  currentVariant,
  currentSupplier,
  calculatedPrice,
  submitting,
  // Handlers
  onClose,
  onFormChange,
  onProductTypeChange,
  onCurrentVariantChange,
  onImageChange,
  onCurrentSupplierChange,
  onAddSupplier,
  onRemoveSupplier,
  onAddVariant,
  onRemoveVariant,
  onSubmit,
  onCheckboxChange,
}: CreateProductPresentationalProps) => {
  return (
    <div className="z-50 w-full overflow-y-auto lg:flex h-full text-zinc-800 bg-zinc-800/80 fixed top-0 right-0 lg:p-6">
      <div className="flex w-full lg:w-3/4 flex-col mx-auto bg-zinc-50 p-5 lg:rounded-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Crear Producto</h2>
          <IconX className="w-8 h-8 cursor-pointer" onClick={onClose} />
        </div>

        <form className="space-y-6">
          {/* Información general */}
          <GeneralInfoSection
            formData={formData}
            productType={productType}
            categories={categories}
            brands={brands}
            onFormChange={onFormChange}
            onProductTypeChange={onProductTypeChange}
            onImageChange={onImageChange}
            onCheckboxChange={onCheckboxChange}
          />

          {/* Variantes */}
          <VariantsSection
            productType={productType}
            formData={formData}
            currentVariant={currentVariant}
            currentSupplier={currentSupplier}
            suppliers={suppliers}
            calculatedPrice={calculatedPrice}
            onCurrentVariantChange={onCurrentVariantChange}
            onCurrentSupplierChange={onCurrentSupplierChange}
            onAddSupplier={onAddSupplier}
            onRemoveSupplier={onRemoveSupplier}
            onAddVariant={onAddVariant}
            onRemoveVariant={onRemoveVariant}
          />

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={onSubmit}
            >
              {submitting && <IconLoader2 className="w-4 h-4 animate-spin" />}
              {submitting ? "Creando..." : "Crear producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
