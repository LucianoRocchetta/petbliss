import { Catalog } from "@/containers";
import Image from "next/image";

export default function ShopPage() {
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
      <Catalog />
    </>
  );
}
