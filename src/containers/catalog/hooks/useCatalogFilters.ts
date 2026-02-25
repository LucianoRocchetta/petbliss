"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { debounce } from "lodash"
import { getCategories } from "@/services/categoryService"
import { getBrands } from "@/services/brandService"
import { Brand, Category } from "@/types"
import { CATALOG_CONFIG } from "../constants"
import { UseCatalogFiltersReturn } from "../types"

export const useCatalogFilters = (): UseCatalogFiltersReturn => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialKeyword = searchParams.get("keyword") || ""
  const initialCategory = searchParams.get("category") || ""
  const initialBrand = searchParams.get("brand") || ""

  const [keyword, setKeyword] = useState(initialKeyword)
  const [category, setCategory] = useState(initialCategory)
  const [brand, setBrand] = useState(initialBrand)
  const [searchInput, setSearchInput] = useState(initialKeyword)
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const newKeyword = searchParams.get("keyword") || ""
    setKeyword(newKeyword)
    setSearchInput(newKeyword)
  }, [searchParams])

  useEffect(() => {
    setKeyword("")
    setSearchInput("")
  }, [category, brand])

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          getCategories(),
          getBrands(),
        ])

        const categoryNames = categoriesRes.map((cat: Category) => cat.name)
        setCategories(categoryNames)

        const brandData = brandsRes.map((b: Brand) => ({
          name: b.name,
          slug: b.slug,
        }))
        setBrands(brandData)
      } catch (error) {
        console.error("Failed to fetch filters data:", error)
      }
    }

    fetchFiltersData()
  }, [])

  const debouncedSetKeyword = useMemo(
    () => debounce((value: string) => setKeyword(value), CATALOG_CONFIG.debounceDelay),
    []
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value)
      debouncedSetKeyword(value)
    },
    [debouncedSetKeyword]
  )

  const handleCategoryChange = useCallback(
    (selectedCategory: string) => {
      setCategory(selectedCategory)
      const query = new URLSearchParams(searchParams.toString())
      
      if (selectedCategory) {
        query.set("category", selectedCategory)
      } else {
        query.delete("category")
      }
      
      router.push(`/shop?${query.toString()}`)
    },
    [searchParams, router]
  )

  const handleBrandChange = useCallback(
    (selectedBrand: string) => {
      setBrand(selectedBrand)
      const query = new URLSearchParams(searchParams.toString())
      
      if (selectedBrand) {
        query.set("brand", selectedBrand)
      } else {
        query.delete("brand")
      }
      
      router.push(`/shop?${query.toString()}`)
    },
    [searchParams, router]
  )

  const clearAllFilters = useCallback(() => {
    setKeyword("")
    setSearchInput("")
    setCategory("")
    setBrand("")
    router.push("/shop")
  }, [router])

  const filters = useMemo(
    () => ({ keyword, category, brand }),
    [keyword, category, brand]
  )

  return {
    filters,
    searchInput,
    categories,
    brands,
    handleSearchChange,
    handleCategoryChange,
    handleBrandChange,
    clearAllFilters,
  }
}
