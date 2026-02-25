"use client"

import { memo, useCallback } from "react"
import { motion } from "framer-motion"
import { IconSearch, IconX } from "@tabler/icons-react"
import { CatalogSidebarProps } from "../types"

export const CatalogSidebar = memo(({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  searchValue,
  onSearchChange,
  onCategoryChange,
  onBrandChange,
  onClearAll,
  totalResults,
}: CatalogSidebarProps) => {
  const hasActiveFilters = selectedCategory || selectedBrand || searchValue

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value)
    },
    [onSearchChange]
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="hidden lg:block w-64 flex-shrink-0"
    >
      <div className="sticky top-24 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Filtros</h2>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-xs text-[#737373] hover:text-[#1A1A1A] transition-colors"
            >
              Limpiar todo
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <IconSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F5] border border-[#E3E3E3] rounded-lg text-sm text-[#1A1A1A] placeholder:text-[#737373] focus:outline-none focus:border-[#1A1A1A] transition-colors"
          />
        </div>

        {/* Categories Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#737373]">Categoría</h3>
          <div className="space-y-1">
            <button
              onClick={() => onCategoryChange("")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedCategory
                  ? "bg-[#F5F5F5] text-[#1A1A1A]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              Todas las categorías
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-[#F5F5F5] text-[#1A1A1A]"
                    : "text-[#737373] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#737373]">Marca</h3>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            <button
              onClick={() => onBrandChange("")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedBrand
                  ? "bg-[#F5F5F5] text-[#1A1A1A]"
                  : "text-[#737373] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
              }`}
            >
              Todas las marcas
            </button>
            {brands.map((brand) => (
              <button
                key={brand.slug}
                onClick={() => onBrandChange(brand.slug || "")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedBrand === brand.slug
                    ? "bg-[#F5F5F5] text-[#1A1A1A]"
                    : "text-[#737373] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="pt-4 border-t border-[#E3E3E3]">
          <p className="text-sm text-[#737373]">
            <span className="font-medium text-[#1A1A1A]">{totalResults}</span> productos encontrados
          </p>
        </div>
      </div>
    </motion.div>
  )
})

CatalogSidebar.displayName = "CatalogSidebar"
