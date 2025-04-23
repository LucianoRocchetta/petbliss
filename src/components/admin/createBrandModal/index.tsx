"use client";

import React, { useState } from "react";
import { Brand } from "@/types";
import { IconX } from "@tabler/icons-react";
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

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const res = await createBrand(formDataToSend);

      if (res) {
        toast.success("Marca creada correctamente");
        setFormData(formDataTemplate);
        setIsModalVisible(false);
      }
    } catch (error) {
      toast.error("Error al crear la marca");
    }
  };

  return (
    <div
      className={`z-50 w-full h-full bg-zinc-800 fixed lg:w-1/4 top-0 right-0 p-6 border-zinc-600 border-l transform ${
        isModalVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Crear Marca</h2>
        <IconX className="w-8 h-8" onClick={() => setIsModalVisible(false)} />
      </div>

      <form>
        <div>
          <h2>Nombre de la marca</h2>
          <input
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="p-2 border rounded-2xl text-zinc-800 w-full"
          />
        </div>
        <div>
          <h2>Imagen</h2>
          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 border rounded-2xl text-zinc-800 w-full"
          />
        </div>
      </form>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Crear Marca
      </button>
    </div>
  );
};
