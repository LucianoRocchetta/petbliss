import { Carousel, FeaturedProducts, HomeHero, WhyPetbliss, PerfectExperience } from "@/containers";
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
        <PerfectExperience />
        
        {/* <HomeGrid />
        <Carousel title="Productos destacados" /> */}
      </div>
    </>
  );
}
