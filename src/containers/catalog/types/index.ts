import { Product, Brand } from "@/types"

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest"
export type GridColumns = 3 | 4

export interface CatalogFilters {
  keyword: string
  category: string
  brand: string
}

export interface UseCatalogFiltersReturn {
  filters: CatalogFilters
  searchInput: string
  categories: string[]
  brands: Brand[]
  handleSearchChange: (value: string) => void
  handleCategoryChange: (category: string) => void
  handleBrandChange: (brand: string) => void
  clearAllFilters: () => void
}

export interface UseCatalogProductsReturn {
  products: Product[]
  isLoading: boolean
  page: number
  totalPages: number
  setPage: (page: number) => void
}

export interface CatalogSidebarProps {
  categories: string[]
  brands: Brand[]
  selectedCategory: string
  selectedBrand: string
  searchValue: string
  onSearchChange: (value: string) => void
  onCategoryChange: (category: string) => void
  onBrandChange: (brand: string) => void
  onClearAll: () => void
  totalResults: number
}

export interface CatalogToolbarProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  gridCols: GridColumns
  onGridColsChange: (cols: GridColumns) => void
  onOpenMobileFilters: () => void
}

export interface ProductsGridProps {
  products: Product[]
  gridCols: GridColumns
  sortBy: SortOption
  filterKey: string
}

export interface MobileFiltersDrawerProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  brands: Brand[]
  selectedCategory: string
  selectedBrand: string
  searchValue: string
  onSearchChange: (value: string) => void
  onCategoryChange: (category: string) => void
  onBrandChange: (brand: string) => void
  onClearAll: () => void
  totalResults: number
}
