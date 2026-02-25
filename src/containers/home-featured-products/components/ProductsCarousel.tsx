"use client"

import { getStaggerDelay } from "@/lib/animations"
import { IconChevronRight } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"

import { CAROUSEL_BREAKPOINTS, FEATURED_PRODUCTS_CONFIG } from "../constants"
import { ProductsCarouselProps } from "../types"
import { FeaturedProductCard } from "./FeaturedProductCard"

export const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-featured-next",
          prevEl: ".swiper-featured-prev",
        }}
        spaceBetween={FEATURED_PRODUCTS_CONFIG.spaceBetween}
        slidesPerView={FEATURED_PRODUCTS_CONFIG.defaultSlidesPerView}
        grabCursor={true}
        breakpoints={CAROUSEL_BREAKPOINTS}
        className="!overflow-visible"
      >
        {products.map((product, index) => (
          <SwiperSlide key={product._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: getStaggerDelay(index, 0.05),
                duration: 0.5,
              }}
            >
              <FeaturedProductCard product={product} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Button */}
      <button
        className="swiper-featured-next absolute -right-4 md:right-0 top-1/3 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Siguiente"
      >
        <IconChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  )
}
