import { Carousel, FeaturedProducts, HomeHero } from "@/containers";
import HomeGrid from "@/containers/home-grid";
import Brands from "@/containers/brands";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="space-y-20">
        <Brands />
        <FeaturedProducts />
        
        
        {/* <HomeGrid />
        <Carousel title="Productos destacados" /> */}
      </div>
    </>
  );
}
