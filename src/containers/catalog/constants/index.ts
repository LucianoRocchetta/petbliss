export const CATALOG_CONFIG = {
  debounceDelay: 500,
  productsPerPage: 8,
  skeletonCount: 8,
} as const

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Más recientes' },
] as const

export const GRID_CONFIG = {
  defaultCols: 3 as const,
  gap: 'gap-x-6 gap-y-10',
}
