"use client";

import { CreateSupplierModal } from "@/components/admin/createSupplierModal";
import AlertDialogDelete from "@/components/shared/alertDialogDelete";
import { deleteSupplierById, getSuppliers } from "@/services/supplierService";
import { Supplier } from "@/types";
import { IconCircleDashedPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AdminSuppliersPanel = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await getSuppliers();
        setSuppliers(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleDeleteSupplier = async (supplierId: string) => {
    try {
      const res = await deleteSupplierById(supplierId);
      if (!res) {
        toast.error("Error al eliminar el proveedor");
        return;
      }
      toast.success("Proveedor eliminado correctamente");
      setSuppliers(suppliers.filter((supplier) => supplier._id !== supplierId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-6 bg-zinc-700 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Proveedores</h2>
        <button
          onClick={() => setIsModalVisible(true)}
          className="p-4 gap-1 bg-blue-600 flex items-center justify-center rounded-2xl text-zinc-200 hover:bg-blue-700 duration-200"
        >
          <IconCircleDashedPlus className="w-6 h-6" /> Agregar
        </button>
      </div>
      {isModalVisible && (
        <CreateSupplierModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier._id}
            className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">{supplier.name}</h2>
            </div>
            <AlertDialogDelete
              onConfirm={() => handleDeleteSupplier(supplier._id || "")}
            >
              <IconTrash className="w-10 h-10 p-2 text-red-600 hover:text-red-300 transition" />
            </AlertDialogDelete>
          </div>
        ))}
      </div>
    </section>
  );
};
