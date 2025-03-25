import { AdminProductsGrid, AdminCategoriesPanel } from "@/containers";
import { AdminBrandsPanel } from "@/containers/admin-brands-panel";

export default function AdminPanel() {
    return (
        <div className="h-full space-y-20">
            <AdminBrandsPanel/>           
            <AdminProductsGrid />
            <AdminCategoriesPanel />
        </div>
    );
}