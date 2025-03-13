import { AdminProductsGrid, AdminCategoriesPanel } from "@/containers";

export default function AdminPanel() {
    return (
        <div className="h-full space-y-20">
            <h2 className="text-3xl font-bold">Admin Panel</h2>            
            <AdminProductsGrid />
            <AdminCategoriesPanel />
        </div>
    );
}