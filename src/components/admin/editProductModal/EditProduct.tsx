import { IconX } from "@tabler/icons-react";
import { EditProductPresentationalProps } from "./types";
import {
  GeneralInfoSection,
  VariantsSection,
  EditVariantModal,
  AddVariantModal,
} from "./components";

export const EditProduct = ({
  // Data
  formData,
  categories,
  brands,
  suppliers,
  productType,

  // Variant editing state
  isEditingVariant,
  editingVariant,
  editingVariantIndex,
  currentSupplier,
  calculatedPrice,

  // New variant state
  isAddingVariant,
  newVariant,
  newVariantSupplier,
  newVariantCalculatedPrice,

  // Handlers - General
  onClose,
  onFormChange,
  onCheckboxChange,
  onSubmit,

  // Handlers - Edit Variant
  onEditVariant,
  onCancelEditVariant,
  onEditingVariantChange,
  onEditSupplierChange,
  onAddEditSupplier,
  onRemoveEditSupplier,
  onSaveVariant,
  onRemoveVariant,

  // Handlers - New Variant
  onStartAddVariant,
  onCancelAddVariant,
  onNewVariantChange,
  onNewVariantSupplierChange,
  onAddNewVariantSupplier,
  onRemoveNewVariantSupplier,
  onConfirmAddVariant,
}: EditProductPresentationalProps) => {
  return (
    <div className="z-50 w-full overflow-y-auto lg:flex h-full text-zinc-800 bg-zinc-800/80 fixed top-0 right-0 lg:p-6">
      <div className="flex w-full lg:w-3/4 flex-col mx-auto bg-zinc-50 p-5 lg:rounded-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Modificar Producto</h2>
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
            onCheckboxChange={onCheckboxChange}
          />

          {/* Variantes */}
          <VariantsSection
            formData={formData}
            productType={productType}
            onEditVariant={onEditVariant}
            onRemoveVariant={onRemoveVariant}
            onStartAddVariant={onStartAddVariant}
          />

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-400 text-white rounded-2xl hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors"
              onClick={onSubmit}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>

      {/* Modal para editar variante */}
      {isEditingVariant && editingVariant && editingVariantIndex !== null && (
        <EditVariantModal
          isOpen={isEditingVariant}
          variant={editingVariant}
          variantIndex={editingVariantIndex}
          productType={productType}
          suppliers={suppliers}
          calculatedPrice={calculatedPrice}
          currentSupplier={currentSupplier}
          onClose={onCancelEditVariant}
          onVariantChange={onEditingVariantChange}
          onCurrentSupplierChange={onEditSupplierChange}
          onAddSupplier={onAddEditSupplier}
          onRemoveSupplier={onRemoveEditSupplier}
          onSave={onSaveVariant}
        />
      )}

      {/* Modal para agregar nueva variante */}
      <AddVariantModal
        isOpen={isAddingVariant}
        variant={newVariant}
        productType={productType}
        suppliers={suppliers}
        calculatedPrice={newVariantCalculatedPrice}
        currentSupplier={newVariantSupplier}
        onClose={onCancelAddVariant}
        onVariantChange={onNewVariantChange}
        onCurrentSupplierChange={onNewVariantSupplierChange}
        onAddSupplier={onAddNewVariantSupplier}
        onRemoveSupplier={onRemoveNewVariantSupplier}
        onConfirm={onConfirmAddVariant}
      />
    </div>
  );
};
