export const CATALOG_CONFIG = {
  debounceDelay: 500,
  productsPerPage: 8,
  skeletonCount: 8,
} as const

export const SORT_OPTIONS = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "newest", label: "Más recientes" },
] as const

export const GRID_CONFIG = {
  defaultCols: 3 as const,
  gap: "gap-x-6 gap-y-10",
}

export const ANIMATION_CONFIG = {
  stagger: 0.1,
  duration: {
    fast: 0.25,
    normal: 0.5,
    slow: 0.6,
  },
  spring: {
    damping: 30,
    stiffness: 300,
  },
}
