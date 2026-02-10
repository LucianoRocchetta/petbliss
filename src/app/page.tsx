import { Carousel, HomeHero } from "@/containers";
import HomeGrid from "@/containers/home-grid";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="space-y-20">
        <HomeGrid />
        <Carousel title="Productos destacados" />
      </div>
    </>
  );
}
