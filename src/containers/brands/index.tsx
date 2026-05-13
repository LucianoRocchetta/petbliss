"use client";

import { BrandsCardSkeleton } from "@/components/shared/brandsCardSkeleton";
import { Button } from "@/components/ui/button";
import { getBrands } from "@/services/brandService";
import { Brand } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FadeText } from "@/components/ui/fade-in-text";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  fadeUpSoftVariants,
  viewportAnimationProps,
  transitions,
  cardHoverProps,
  getStaggerDelay,
} from "@/lib/animations";

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
    <section className="relative section-y-padding">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between section-container">
        <div>
          <FadeText text="Comprá por marca" direction="in" wordDelay={0.2} />
          <motion.p
            className="section-paragraph"
            variants={fadeUpSoftVariants}
            {...viewportAnimationProps}
            transition={{ ...transitions.default, delay: 0.35 }}
          >
            Hacé click en la que más te interese para ver sus productos.
          </motion.p>
        </div>
        <motion.div
          variants={fadeUpSoftVariants}
          {...viewportAnimationProps}
          transition={{ ...transitions.default, delay: 0.4 }}
        >
          <Button className="w-fit hidden lg:block" variant="outlineDark" size="default" asChild>
            <Link href="#">
              Ver todas las marcas
            </Link>
          </Button>
        </motion.div>
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
            ? brands.map((brand, index) => (
                <SwiperSlide key={brand._id} className="!w-auto">
                  <Link className="select-none" href={`/shop?brand=${brand.slug}`} passHref>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: getStaggerDelay(index, 0.05),
                        duration: 0.5,
                      }}
                      whileHover={cardHoverProps.whileHover}
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
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: getStaggerDelay(index, 0.05) }}
                    >
                      <BrandsCardSkeleton />
                    </motion.div>
                  </SwiperSlide>
                ))}
        </Swiper>
      </div>
      
      <motion.div
        className="lg:hidden mt-4 flex items-center justify-center w-full"
        variants={fadeUpSoftVariants}
        {...viewportAnimationProps}
        transition={{ ...transitions.default, delay: 0.5 }}
      >
        <Button variant="outlineDark" size="default" asChild>
          <Link href="#">
            Ver todas las marcas
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
