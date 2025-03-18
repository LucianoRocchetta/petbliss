import { AdminProductsGrid, AdminCategoriesPanel } from "@/containers";

export default function AdminPanel() {
    return (
        <div className="h-full space-y-20">           
            <AdminProductsGrid />
            <AdminCategoriesPanel />
        </div>
    );
}