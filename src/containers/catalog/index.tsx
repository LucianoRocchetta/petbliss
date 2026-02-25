"use client"

import { Suspense, useCallback, useMemo, useState } from "react"
import Pagination from "@/components/shared/pagination"
import {
  CatalogHero,
  CatalogSidebar,
  CatalogToolbar,
  LoadingSkeleton,
  MobileFiltersDrawer,
  ProductsGrid,
} from "./components"
import { useCatalogFilters, useCatalogProducts } from "./hooks"
import { GridColumns, SortOption } from "./types"
import { GRID_CONFIG } from "./constants"

const CatalogContent = () => {
  const {
    filters,
    searchInput,
    categories,
    brands,
    handleSearchChange,
    handleCategoryChange,
    handleBrandChange,
    clearAllFilters,
  } = useCatalogFilters()

  const { products, isLoading, page, totalPages, setPage } = useCatalogProducts(filters)

  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [gridCols, setGridCols] = useState<GridColumns>(GRID_CONFIG.defaultCols)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleOpenMobileFilters = useCallback(() => {
    setMobileFiltersOpen(true)
  }, [])

  const handleCloseMobileFilters = useCallback(() => {
    setMobileFiltersOpen(false)
  }, [])

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortBy(sort)
  }, [])

  const handleGridColsChange = useCallback((cols: GridColumns) => {
    setGridCols(cols)
  }, [])

  const sortedProducts = useMemo(() => {
    const result = [...products]
    
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => {
          const priceA = a.variants[0]?.discountedPrice || a.variants[0]?.price || 0
          const priceB = b.variants[0]?.discountedPrice || b.variants[0]?.price || 0
          return priceA - priceB
        })
        break
      case "price-desc":
        result.sort((a, b) => {
          const priceA = a.variants[0]?.discountedPrice || a.variants[0]?.price || 0
          const priceB = b.variants[0]?.discountedPrice || b.variants[0]?.price || 0
          return priceB - priceA
        })
        break
      case "newest":
        result.reverse()
        break
      default:
        break
    }
    
    return result
  }, [products, sortBy])

  const filterKey = useMemo(
    () => `${filters.keyword}-${filters.category}-${filters.brand}`,
    [filters]
  )

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <CatalogHero />

      {/* Main Content */}
      <div className="section-container pb-20">
        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <CatalogSidebar
            categories={categories}
            brands={brands}
            selectedCategory={filters.category}
            selectedBrand={filters.brand}
            searchValue={searchInput}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onClearAll={clearAllFilters}
            totalResults={sortedProducts.length}
          />

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <CatalogToolbar
              sortBy={sortBy}
              onSortChange={handleSortChange}
              gridCols={gridCols}
              onGridColsChange={handleGridColsChange}
              onOpenMobileFilters={handleOpenMobileFilters}
            />

            {/* Product Grid */}
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <ProductsGrid
                  products={sortedProducts}
                  gridCols={gridCols}
                  sortBy={sortBy}
                  filterKey={filterKey}
                />

                {totalPages > 1 && (
                  <div className="mt-10">
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <MobileFiltersDrawer
        isOpen={mobileFiltersOpen}
        onClose={handleCloseMobileFilters}
        categories={categories}
        brands={brands}
        selectedCategory={filters.category}
        selectedBrand={filters.brand}
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
        onClearAll={clearAllFilters}
        totalResults={sortedProducts.length}
      />
    </div>
  )
}

export const Catalog = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CatalogContent />
    </Suspense>
  )
}
