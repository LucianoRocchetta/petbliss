import { AdminProductsGrid, AdminCategoriesPanel } from "@/containers";


export default function AdminPanel() {

    return (
        <div className="h-full">
            <h2>Admin Panel</h2>

            
            <AdminProductsGrid />
            <AdminCategoriesPanel />
           
        </div>
    );
}