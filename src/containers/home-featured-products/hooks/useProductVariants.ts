import { Product } from "@/types"
import { useEffect, useMemo, useState } from "react"
import { FoodVariant, UseProductVariantsReturn } from "../types"

export const useProductVariants = (product: Product): UseProductVariantsReturn => {
  const isFood = product.productType === "food"

  const uniqueWeights = useMemo(() => {
    if (!isFood) return []
    return Array.from(
      new Set(
        product.variants
          .map((v) => (v as FoodVariant).weight)
          .filter((w): w is number => w !== undefined)
      )
    )
  }, [product.variants, isFood])

  const uniqueFlavors = useMemo(() => {
    if (!isFood) return []
    return Array.from(
      new Set(
        product.variants
          .map((v) => (v as FoodVariant).flavor)
          .filter((f): f is string => !!f && f !== "")
      )
    )
  }, [product.variants, isFood])

  const [selectedWeight, setSelectedWeight] = useState<number>(uniqueWeights[0] || 0)
  const [selectedFlavor, setSelectedFlavor] = useState<string>(uniqueFlavors[0] || "")
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)

  useEffect(() => {
    if (!isFood) return

    const index = product.variants.findIndex((v) => {
      const variant = v as FoodVariant
      const weightMatch = variant.weight === selectedWeight
      const flavorMatch = !selectedFlavor || variant.flavor === selectedFlavor
      return weightMatch && flavorMatch
    })

    if (index !== -1) {
      setActiveVariantIndex(index)
    }
  }, [selectedWeight, selectedFlavor, product.variants, isFood])

  const activeVariant = product.variants[activeVariantIndex]

  const currentPrice = useMemo(() => {
    if (!activeVariant) return 0
    return activeVariant.discount > 0 
      ? activeVariant.discountedPrice 
      : activeVariant.price
  }, [activeVariant])

  return {
    activeVariantIndex,
    selectedWeight,
    selectedFlavor,
    uniqueWeights,
    uniqueFlavors,
    currentPrice,
    setSelectedWeight,
    setSelectedFlavor,
  }
}
