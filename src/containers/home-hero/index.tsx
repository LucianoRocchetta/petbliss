"use client"

import { Button } from "@/components/ui/button"
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface HeroSlide {
  id: number
  image: string
  title: string
  subtitle: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton: {
    text: string
    href: string
  }
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero-bkg.png",
    title: "Nutrición Premium",
    subtitle: "Ingredientes naturales y de alta calidad.",
    primaryButton: {
      text: "Explorar catálogo",
      href: "/catalogo",
    },
    secondaryButton: {
      text: "Encontrá el alimento ideal",
      href: "/alimentos",
    },
  },
  {
    id: 2,
    image: "/images/hero-bkg.png",
    title: "Cuidado Total",
    subtitle: "Todo lo que tu mascota necesita.",
    primaryButton: {
      text: "Ver productos",
      href: "/productos",
    },
    secondaryButton: {
      text: "Conocer más",
      href: "/nosotros",
    },
  },
  {
    id: 3,
    image: "/images/hero-bkg.png",
    title: "Accesorios Premium",
    subtitle: "Calidad y estilo para tu mejor amigo.",
    primaryButton: {
      text: "Descubrir ahora",
      href: "/accesorios",
    },
    secondaryButton: {
      text: "Ver colección",
      href: "/coleccion",
    },
  },
]

export const HomeHero = () => {
  return (
    <section className="w-full h-[400px] md:h-[600px] lg:h-[800px] relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
          renderBullet: (index: number, className: string) => {
            return `<span class="${className}"></span>`
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                draggable={false}
                fill
                priority
                className="object-cover"
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center section-container">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default" size="default" asChild>
                      <Link href={slide.primaryButton.href}>
                        {slide.primaryButton.text}
                        <IconArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="default" asChild>
                      <a href={slide.secondaryButton.href}>
                        {slide.secondaryButton.text}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 bg-transparent flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Slide anterior"
      >
        <IconChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 bg-transparent flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Slide siguiente"
      >
        <IconChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2" />
    </section>
  )
}
