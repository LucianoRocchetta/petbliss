"use client";

import { BrandsCardSkeleton } from "@/components/shared/brandsCardSkeleton";
import { Button } from "@/components/ui/button";
import { getBrands } from "@/services/brandService";
import { Brand } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const getAllBrands = async () => {
      try {
        const res = await getBrands();
        setBrands(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllBrands();
  }, []);

  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between section-container">
        <div>
          <h2 className="section-title">Comprá por marca</h2>
          <p className="section-paragraph">
            Hacé click en la que más te interese para ver sus productos.
          </p>
        </div>
        <Button className="w-fit hidden lg:block" variant="outlineDark" size="default" asChild>
          <Link href="#">
            Ver todas las marcas
          </Link>
        </Button>
      </div>
      <div className="mt-10 section-container-extended-r">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          grabCursor={true}
          slidesPerView="auto"
          className="w-full brands-swiper"
        >
          {!isLoading
            ? brands.map((brand) => (
                <SwiperSlide key={brand._id} className="!w-auto">
                  <Link className="select-none" href={`/shop?brand=${brand.slug}`} passHref>
                    <motion.div
                      whileHover={{
                        scale: 1.01,
                        y: -5,
                        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      className="rounded-xl size-40 relative overflow-hidden flex items-center justify-center p-5 bg-[#E6E6E6]"
                    >
                      <Image
                        src={brand.imageURL}
                        alt={brand.name}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))
            : Array(8)
                .fill(null)
                .map((_, index) => (
                  <SwiperSlide key={index} className="!w-auto">
                    <BrandsCardSkeleton />
                  </SwiperSlide>
                ))}
        </Swiper>
      </div>
      
      <div className="lg:hidden mt-4 flex items-center justify-center w-full">
        <Button variant="outlineDark" size="default" asChild>
          <Link href="#">
            Ver todas las marcas
          </Link>
        </Button>
      </div>
    </section>
  );
}
