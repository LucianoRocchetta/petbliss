import HomeGrid from "@/containers/home-grid";
import { Carousel } from "@/containers";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Image
        src="/images/banner.png"
        alt="pet-bliss-banner-sale"
        width={1920}
        height={900}
        className="w-full h-[150px] mb-10 object-cover lg:h-[350px] lg:mb-20 draggable"
        draggable={false}
        priority
      />
      <div className="space-y-20 w-3/4 m-auto">
        <HomeGrid />
        <Carousel title="Productos destacados" />
        {/* <Carousel title="Accesorios" category="accesorio" /> */}
      </div>
    </>
  );
}
