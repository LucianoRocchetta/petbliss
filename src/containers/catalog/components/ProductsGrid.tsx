"use client"

import { memo, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FeaturedProductCard } from "@/containers/home-featured-products/components"
import { ANIMATION_CONFIG, GRID_CONFIG } from "../constants"
import { ProductsGridProps } from "../types"

export const ProductsGrid = memo(({ products, gridCols, sortBy, filterKey }: ProductsGridProps) => {
  const hasProducts = useMemo(() => products.length > 0, [products.length])

  const gridClassName = useMemo(() => {
    const colsClass = gridCols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    
    return `grid ${GRID_CONFIG.gap} ${colsClass}`
  }, [gridCols])

  return (
    <AnimatePresence mode="wait">
      {!hasProducts ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-20"
        >
          <p className="text-zinc-400 text-sm">
            No se encontraron productos con los filtros seleccionados.
          </p>
        </motion.div>
      ) : (
        <motion.div
          key={`grid-${sortBy}-${filterKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_CONFIG.duration.fast }}
          className={gridClassName}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: ANIMATION_CONFIG.duration.normal,
              }}
            >
              <FeaturedProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

ProductsGrid.displayName = "ProductsGrid"
