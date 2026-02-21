import { Carousel, FeaturedProducts, HomeHero, WhyPetbliss } from "@/containers";
import HomeGrid from "@/containers/home/home-grid";
import Brands from "@/containers/brands";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="space-y-20">
        <Brands />
        <FeaturedProducts />
        <WhyPetbliss />
        
        
        {/* <HomeGrid />
        <Carousel title="Productos destacados" /> */}
      </div>
    </>
  );
}
