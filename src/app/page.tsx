import HomeGrid from "@/containers/home-grid";
import { Carousel } from "@/containers";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <div className="w-full h-[150px] lg:h-[400px] mb-10 lg:mb-20 relative">
        <Image
          src="/images/banner.png"
          alt="pet-bliss-banner-sale"
          draggable={false}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="space-y-20 w-3/4 m-auto">
        <HomeGrid />
        <Carousel title="Productos destacados" />
        {/* <Carousel title="Accesorios" category="accesorio" /> */}
      </div>
    </>
  );
}
