import { Product } from "@/types"

export interface FeaturedProductCardProps {
  product: Product
}

export interface ProductImageProps {
  imageUrl: string
  altText: string
  patternImage: string
}

export interface VariantSelectorProps {
  label: string
  options: (string | number)[]
  selectedOption: string | number
  onSelect: (option: string | number) => void
  formatOption?: (option: string | number) => string
}

export interface PriceSectionProps {
  price: number
  isAvailable: boolean
  onAddToCart: () => void
}

export interface ProductsCarouselProps {
  products: Product[]
}

export interface FoodVariant {
  weight?: number
  flavor?: string
  price: number
  discount: number
  discountedPrice: number
}

export interface UseProductVariantsReturn {
  activeVariantIndex: number
  selectedWeight: number
  selectedFlavor: string
  uniqueWeights: number[]
  uniqueFlavors: string[]
  currentPrice: number
  setSelectedWeight: (weight: number) => void
  setSelectedFlavor: (flavor: string) => void
}
