export const PATTERN_IMAGES = [
  "/images/product-card/pattern-1.jpg",
  "/images/product-card/pattern-2.jpg",
  "/images/product-card/pattern-3.jpg",
] as const

export const CAROUSEL_BREAKPOINTS = {
  640: {
    slidesPerView: 1,
  },
  1024: {
    slidesPerView: 2,
  },
  1440: {
    slidesPerView: 2.5,
  },
} as const

export const FEATURED_PRODUCTS_CONFIG = {
  spaceBetween: 20,
  defaultSlidesPerView: 1,
  fetchLimit: 10,
} as const
