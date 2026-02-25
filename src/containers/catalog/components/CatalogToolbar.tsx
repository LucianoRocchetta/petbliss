"use client"

import { memo, useCallback } from "react"
import { motion } from "framer-motion"
import { IconLayoutGrid, IconGridDots, IconAdjustmentsHorizontal } from "@tabler/icons-react"
import { SORT_OPTIONS } from "../constants"
import { CatalogToolbarProps, SortOption } from "../types"

export const CatalogToolbar = memo(({
  sortBy,
  onSortChange,
  gridCols,
  onGridColsChange,
  onOpenMobileFilters,
}: CatalogToolbarProps) => {
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSortChange(e.target.value as SortOption)
    },
    [onSortChange]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center justify-between mb-8 pb-4 border-b border-[#E3E3E3]"
    >
      <div className="flex items-center gap-3">
        {/* Mobile filter toggle */}
        <button
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-2 text-sm font-medium text-[#1A1A1A] bg-[#F5F5F5] px-4 py-2 rounded-full hover:bg-[#E3E3E3] transition-colors"
          aria-label="Abrir filtros"
        >
          <IconAdjustmentsHorizontal className="w-4 h-4 text-[#737373]" />
          Filtros
        </button>

        {/* Grid columns selector */}
        <div className="hidden md:flex items-center gap-1 bg-[#F5F5F5] rounded-lg p-0.5">
          <button
            onClick={() => onGridColsChange(3)}
            className={`p-1.5 rounded-md transition-colors ${
              gridCols === 3 ? "bg-[#E3E3E3] shadow-sm" : "hover:bg-[#E3E3E3]/50"
            }`}
            aria-label="3 columnas"
          >
            <IconGridDots className="w-4 h-4 text-[#1a1a1a]" />
          </button>
          <button
            onClick={() => onGridColsChange(4)}
            className={`p-1.5 rounded-md transition-colors ${
              gridCols === 4 ? "bg-[#E3E3E3] shadow-sm" : "hover:bg-[#E3E3E3]/50"
            }`}
            aria-label="4 columnas"
          >
            <IconLayoutGrid className="w-4 h-4 text-[#1a1a1a]" />
          </button>
        </div>
      </div>

      {/* Sort selector */}
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="text-sm bg-transparent border-0 text-[#737373] focus:outline-none cursor-pointer font-medium hover:text-[#1A1A1A] transition-colors"
        aria-label="Ordenar por"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#F5F5F5] text-[#1A1A1A]">
            {opt.label}
          </option>
        ))}
      </select>
    </motion.div>
  )
})

CatalogToolbar.displayName = "CatalogToolbar"
