'use client'

import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '@/services/productService'
import { Product } from '@/types'
import { CATALOG_CONFIG } from '../constants'
import { CatalogFilters, UseCatalogProductsReturn } from '../types'

export const useCatalogProducts = (
  filters: CatalogFilters
): UseCatalogProductsReturn => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { keyword, category, brand } = filters

  useEffect(() => {
    setPage(1)
  }, [keyword, category, brand])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await getProducts({
          keyword,
          category,
          brand,
          limit: CATALOG_CONFIG.productsPerPage,
          page,
        })

        if (response) {
          setProducts(response.products)
          setTotalPages(response.totalPages)
        }
      } catch (error) {
        console.error('Error fetching catalog products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [page, keyword, category, brand])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  return {
    products,
    isLoading,
    page,
    totalPages,
    setPage: handlePageChange,
  }
}
