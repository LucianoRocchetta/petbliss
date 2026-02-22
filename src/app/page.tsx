import { 
  FeaturedProducts, 
  HomeHero, 
  PerfectExperience, 
  WhyPetbliss, 
  Faqs, 
} from "@/containers";
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
        <Faqs />
        {/* <HomeGrid />
        <Carousel title="Productos destacados" /> */}
      </div>
    </>
  );
}
