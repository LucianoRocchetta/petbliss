'use client'

import { FeaturedProductCard } from '@/containers/home-featured-products/components'
import {
  fadeUpVariants,
  fadeVariants,
  getStaggerDelay,
  transitions,
} from '@/lib/animations'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { GRID_CONFIG } from '../constants'
import { ProductsGridProps } from '../types'

export const ProductsGrid = memo(
  ({ products, gridCols, sortBy, filterKey }: ProductsGridProps) => {
    const hasProducts = useMemo(() => products.length > 0, [products.length])

    const gridClassName = useMemo(() => {
      const colsClass =
        gridCols === 4
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

      return `grid ${GRID_CONFIG.gap} ${colsClass}`
    }, [gridCols])

    return (
      <AnimatePresence mode="wait">
        {!hasProducts ? (
          <motion.div
            key="empty"
            variants={fadeVariants}
            className="text-center py-20"
          >
            <p className="text-zinc-400 text-sm">
              No se encontraron productos con los filtros seleccionados.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${sortBy}-${filterKey}`}
            variants={fadeVariants}
            transition={transitions.fast}
            className={gridClassName}
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                variants={fadeUpVariants}
                transition={{
                  ...transitions.default,
                  delay: getStaggerDelay(index, 0.05),
                }}
              >
                <FeaturedProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

ProductsGrid.displayName = 'ProductsGrid'
