import { getProducts } from "@/services/productService"
import { Product } from "@/types"
import { useEffect, useState } from "react"
import { FEATURED_PRODUCTS_CONFIG } from "../constants"

interface UseFeaturedProductsReturn {
  products: Product[]
  isLoading: boolean
}

export const useFeaturedProducts = (): UseFeaturedProductsReturn => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({
          isFeatured: true,
          page: 1,
          limit: FEATURED_PRODUCTS_CONFIG.fetchLimit,
        })
        if (response) {
          setProducts(response.products)
        }
      } catch (error) {
        console.error("Error fetching featured products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading }
}
