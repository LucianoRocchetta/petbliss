import { Catalog } from "@/containers";
import Image from "next/image";

export default function ShopPage() {
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
      <Catalog />
    </>
  );
}
