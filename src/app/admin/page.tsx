import { AdminProductsGrid } from "@/containers";


export default function AdminPanel() {

    return (
        <div className="h-full">
            <h2>Admin Panel</h2>

            <h2 className="text-2xl font-bold">Productos</h2>
            <AdminProductsGrid />
            
           
        </div>
    );
}