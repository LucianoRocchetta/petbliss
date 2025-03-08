import HomeGrid from "@/containers/home-grid"
import { Carousel } from "@/containers"
import { categories } from "@/mock"
import Categories from "@/containers/categories"


export default function HomePage () {
    return (
        <>
            <div className="w-full space-y-20">
               <HomeGrid />
               <Carousel title="Productos destacados" category="destacado"/>
               <Carousel title="Accesorios" category="accesorio"/>
               <Categories categories={categories}/>
            </div>
        </>
    )
}