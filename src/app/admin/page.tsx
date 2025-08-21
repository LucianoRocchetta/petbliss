import {
  AdminProductsGrid,
  AdminCategoriesPanel,
  AdminSuppliersPanel,
} from "@/containers";
import { AdminBrandsPanel } from "@/containers/admin-brands-panel";

export default function AdminPanel() {
  return (
    <div className="h-full space-y-20 my-20 w-3/4 m-auto">
      <AdminBrandsPanel />
      <AdminProductsGrid />
      <AdminCategoriesPanel />
      <AdminSuppliersPanel />
    </div>
  );
}
