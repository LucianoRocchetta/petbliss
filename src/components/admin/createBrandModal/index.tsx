"use client";

import React, { useState } from "react";
import { Brand } from "@/types";
import { IconX, IconLoader2 } from "@tabler/icons-react";
import { createBrand } from "@/services/brandService";
import { toast } from "sonner";

interface CreateBrandModalProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  isModalVisible: boolean;
}

export const CreateBrandModal = ({
  setIsModalVisible,
  isModalVisible,
}: CreateBrandModalProps) => {
  const formDataTemplate = {
    name: "",
    imageURL: "",
  };

  const [formData, setFormData] = useState<Brand>(formDataTemplate);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.warning("El nombre de la marca es obligatorio");
      return;
    }

    if (!imageFile) {
      toast.warning("Seleccione una imagen para la marca");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("image", imageFile);

      const res = await createBrand(formDataToSend);

      if (res) {
        toast.success("Marca creada correctamente");
        setFormData(formDataTemplate);
        setImageFile(null);
        setIsModalVisible(false);
      }
    } catch (error) {
      toast.error("Error al crear la marca");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`z-50 w-full h-full bg-zinc-800 fixed lg:w-1/3 top-0 right-0 p-6 border-zinc-600 border-l transform overflow-y-auto ${
        isModalVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Crear Marca</h2>
        <button
          type="button"
          onClick={() => setIsModalVisible(false)}
          className="p-1 hover:bg-zinc-700 rounded-lg transition-colors"
        >
          <IconX className="w-6 h-6 text-zinc-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="brand-name" className="block text-sm text-zinc-300 mb-1">
            Nombre de la marca <span className="text-red-400">*</span>
          </label>
          <input
            id="brand-name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Ej: Royal Canin"
            className="p-2 border rounded-2xl text-zinc-800 w-full"
          />
        </div>

        <div>
          <label htmlFor="brand-image" className="block text-sm text-zinc-300 mb-1">
            Imagen <span className="text-red-400">*</span>
          </label>
          <input
            id="brand-image"
            type="file"
            onChange={handleImageChange}
            className="p-2 border rounded-2xl text-zinc-800 w-full bg-white"
          />
          {imageFile && (
            <p className="text-xs text-zinc-400 mt-1">{imageFile.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting && <IconLoader2 className="w-4 h-4 animate-spin" />}
          {submitting ? "Creando..." : "Crear Marca"}
        </button>
      </form>
    </div>
  );
};
