"use client"

import useCartStore from "@/store/cartStore"
import { useProductVariants, useRandomPattern } from "../hooks"
import { FeaturedProductCardProps } from "../types"
import { PriceSection } from "./PriceSection"
import { ProductImage } from "./ProductImage"
import { VariantSelector } from "./VariantSelector"

export const FeaturedProductCard = ({ product }: FeaturedProductCardProps) => {
  const { addItem, openCart } = useCartStore()
  const patternImage = useRandomPattern()

  const {
    activeVariantIndex,
    selectedWeight,
    selectedFlavor,
    uniqueWeights,
    uniqueFlavors,
    currentPrice,
    setSelectedWeight,
    setSelectedFlavor,
  } = useProductVariants(product)

  const isFood = product.productType === "food"

  const handleAddToCart = () => {
    if (!product.available) return
    addItem({ product, quantity: 1, variant: activeVariantIndex })
    openCart()
  }

  return (
    <div className="flex flex-col h-full">
      <ProductImage
        imageUrl={product.imageURL}
        altText={product.name}
        patternImage={patternImage}
      />

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.name}</h3>

        {isFood && (
          <>
            <VariantSelector
              label="Peso"
              options={uniqueWeights}
              selectedOption={selectedWeight}
              onSelect={(weight) => setSelectedWeight(weight as number)}
              formatOption={(w) => `${w}kg`}
            />
            <VariantSelector
              label="Sabor"
              options={uniqueFlavors}
              selectedOption={selectedFlavor}
              onSelect={(flavor) => setSelectedFlavor(flavor as string)}
            />
          </>
        )}

        <PriceSection
          price={currentPrice}
          isAvailable={product.available}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  )
}
