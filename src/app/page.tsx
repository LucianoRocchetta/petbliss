import { Carousel, HomeHero } from "@/containers";
import HomeGrid from "@/containers/home-grid";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="space-y-20 w-3/4 m-auto">
        <HomeGrid />
        <Carousel title="Productos destacados" />
      </div>
    </>
  );
}
