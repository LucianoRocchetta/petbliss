import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alertdialog";
import React, { useState } from "react";

type AlertDialogDeleteProps = {
  children: React.ReactElement;
  onConfirm: () => void;
};

const AlertDialogDelete = ({ children, onConfirm }: AlertDialogDeleteProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-zinc-200">
          Esta acción eliminará permanentemente. ¿Quieres continuar?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-zinc-800" onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={handleConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDelete;
