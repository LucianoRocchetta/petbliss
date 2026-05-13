'use client'

import { memo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX, IconSearch } from '@tabler/icons-react'
import { MobileFiltersDrawerProps } from '../types'
import { fadeVariants, drawerLeftVariants, transitions } from '@/lib/animations'

export const MobileFiltersDrawer = memo(
  ({
    isOpen,
    onClose,
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
  }: MobileFiltersDrawerProps) => {
    const hasActiveFilters = selectedCategory || selectedBrand || searchValue

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value)
      },
      [onSearchChange]
    )

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={fadeVariants}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              variants={drawerLeftVariants}
              transition={transitions.spring}
              className="fixed left-0 top-0 bottom-0 w-80 bg-zinc-900 z-50 p-6 overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-zinc-100">Filtros</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  aria-label="Cerrar filtros"
                >
                  <IconX className="w-4 h-4 text-zinc-300" />
                </button>
              </div>

              {/* Clear all */}
              {hasActiveFilters && (
                <button
                  onClick={onClearAll}
                  className="w-full mb-6 text-sm text-zinc-400 hover:text-zinc-200 transition-colors text-left"
                >
                  Limpiar todos los filtros
                </button>
              )}

              {/* Search */}
              <div className="relative mb-6">
                <IconSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Categories Filter */}
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-medium text-zinc-300">Categoría</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => onCategoryChange('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory
                        ? 'bg-zinc-700 text-zinc-100'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
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
                          ? 'bg-zinc-700 text-zinc-100'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-medium text-zinc-300">Marca</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  <button
                    onClick={() => onBrandChange('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedBrand
                        ? 'bg-zinc-700 text-zinc-100'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    Todas las marcas
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand.slug}
                      onClick={() => onBrandChange(brand.slug || '')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedBrand === brand.slug
                          ? 'bg-zinc-700 text-zinc-100'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results count */}
              <div className="pt-4 border-t border-zinc-700">
                <p className="text-sm text-zinc-400">
                  <span className="font-medium text-zinc-200">
                    {totalResults}
                  </span>{' '}
                  productos encontrados
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
)

MobileFiltersDrawer.displayName = 'MobileFiltersDrawer'
