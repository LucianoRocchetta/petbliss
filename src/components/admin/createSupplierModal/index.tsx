"use client";

import React, { useState } from "react";
import { Supplier } from "@/types";
import { IconX, IconLoader2, IconChevronDown } from "@tabler/icons-react";
import { createSupplier } from "@/services/supplierService";
import { toast } from "sonner";

interface CreateSupplierModalProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  isModalVisible: boolean;
}

const INPUT_CLASS = "p-2 border rounded-2xl text-zinc-800 w-full";
const LABEL_CLASS = "block text-sm text-zinc-300 mb-1";

export const CreateSupplierModal = ({
  setIsModalVisible,
  isModalVisible,
}: CreateSupplierModalProps) => {
  const formDataTemplate: Partial<Supplier> = {
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    website: "",
    taxId: "",
    paymentTerms: "",
    notes: "",
    minimumOrder: undefined,
    deliveryTime: "",
    isActive: true,
  };

  const [formData, setFormData] = useState<Partial<Supplier>>(formDataTemplate);
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "minimumOrder" ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name?.trim()) {
      toast.warning("El nombre del proveedor es obligatorio");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name!.trim());
      if (formData.contactEmail) formDataToSend.append("contactEmail", formData.contactEmail);
      if (formData.contactPhone) formDataToSend.append("contactPhone", formData.contactPhone);
      if (formData.address) formDataToSend.append("address", formData.address);
      if (formData.website) formDataToSend.append("website", formData.website);
      if (formData.taxId) formDataToSend.append("taxId", formData.taxId);
      if (formData.paymentTerms) formDataToSend.append("paymentTerms", formData.paymentTerms);
      if (formData.notes) formDataToSend.append("notes", formData.notes);
      if (formData.minimumOrder !== undefined) formDataToSend.append("minimumOrder", String(formData.minimumOrder));
      if (formData.deliveryTime) formDataToSend.append("deliveryTime", formData.deliveryTime);
      formDataToSend.append("isActive", String(formData.isActive));

      const res = await createSupplier(formDataToSend);

      if (res) {
        toast.success("Proveedor creado correctamente");
        setFormData(formDataTemplate);
        setIsModalVisible(false);
      }
    } catch (error) {
      toast.error("Error al crear el proveedor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`z-50 w-full h-full bg-zinc-800 fixed lg:w-2/5 top-0 right-0 p-6 border-zinc-600 border-l transform overflow-y-auto ${
        isModalVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Crear Proveedor</h2>
        <button
          type="button"
          onClick={() => setIsModalVisible(false)}
          className="p-1 hover:bg-zinc-700 rounded-lg transition-colors"
        >
          <IconX className="w-6 h-6 text-zinc-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Información básica */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
            Información básica
          </h3>
          <div>
            <label htmlFor="supplier-name" className={LABEL_CLASS}>
              Nombre del proveedor <span className="text-red-400">*</span>
            </label>
            <input
              id="supplier-name"
              name="name"
              value={formData.name || ""}
              onChange={handleFormChange}
              placeholder="Ej: Distribuidora Patitas"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="supplier-taxId" className={LABEL_CLASS}>
              CUIT / CUIL
            </label>
            <input
              id="supplier-taxId"
              name="taxId"
              value={formData.taxId || ""}
              onChange={handleFormChange}
              placeholder="XX-XXXXXXXX-X"
              className={INPUT_CLASS}
            />
          </div>
        </section>

        {/* Contacto */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
            Contacto
          </h3>
          <div>
            <label htmlFor="supplier-email" className={LABEL_CLASS}>
              Correo electrónico
            </label>
            <input
              id="supplier-email"
              name="contactEmail"
              type="email"
              value={formData.contactEmail || ""}
              onChange={handleFormChange}
              placeholder="contacto@proveedor.com"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="supplier-phone" className={LABEL_CLASS}>
              Teléfono
            </label>
            <input
              id="supplier-phone"
              name="contactPhone"
              value={formData.contactPhone || ""}
              onChange={handleFormChange}
              placeholder="+54 11 XXXX-XXXX"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="supplier-website" className={LABEL_CLASS}>
              Sitio web
            </label>
            <input
              id="supplier-website"
              name="website"
              value={formData.website || ""}
              onChange={handleFormChange}
              placeholder="https://..."
              className={INPUT_CLASS}
            />
          </div>
        </section>

        {/* Dirección */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
            Dirección
          </h3>
          <div>
            <label htmlFor="supplier-address" className={LABEL_CLASS}>
              Dirección
            </label>
            <input
              id="supplier-address"
              name="address"
              value={formData.address || ""}
              onChange={handleFormChange}
              placeholder="Calle, número, ciudad"
              className={INPUT_CLASS}
            />
          </div>
        </section>

        {/* Términos comerciales */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
            Términos comerciales
          </h3>
          <div>
            <label htmlFor="supplier-paymentTerms" className={LABEL_CLASS}>
              Condiciones de pago
            </label>
            <select
              id="supplier-paymentTerms"
              name="paymentTerms"
              value={formData.paymentTerms || ""}
              onChange={handleFormChange as any}
              className={INPUT_CLASS}
            >
              <option value="">Seleccionar...</option>
              <option value="contado">Contado</option>
              <option value="15 días">15 días</option>
              <option value="30 días">30 días</option>
              <option value="45 días">45 días</option>
              <option value="60 días">60 días</option>
            </select>
          </div>
          <div>
            <label htmlFor="supplier-deliveryTime" className={LABEL_CLASS}>
              Tiempo de entrega estimado
            </label>
            <input
              id="supplier-deliveryTime"
              name="deliveryTime"
              value={formData.deliveryTime || ""}
              onChange={handleFormChange}
              placeholder="Ej: 48 hs hábiles"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="supplier-minimumOrder" className={LABEL_CLASS}>
              Pedido mínimo ($)
            </label>
            <input
              id="supplier-minimumOrder"
              name="minimumOrder"
              type="number"
              value={formData.minimumOrder ?? ""}
              onChange={handleFormChange}
              placeholder="Ej: 5000"
              className={INPUT_CLASS}
            />
          </div>
        </section>

        {/* Notas */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
            Notas
          </h3>
          <div>
            <label htmlFor="supplier-notes" className={LABEL_CLASS}>
              Observaciones
            </label>
            <textarea
              id="supplier-notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleFormChange}
              placeholder="Información adicional relevante..."
              className={`${INPUT_CLASS} resize-none h-20`}
            />
          </div>
        </section>

        {/* Estado */}
        <div className="flex items-center gap-2 py-2">
          <input
            id="supplier-isActive"
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
            }
            className="w-4 h-4"
          />
          <label htmlFor="supplier-isActive" className="text-sm text-zinc-300">
            Proveedor activo
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting && <IconLoader2 className="w-4 h-4 animate-spin" />}
          {submitting ? "Creando..." : "Crear Proveedor"}
        </button>
      </form>
    </div>
  );
};
