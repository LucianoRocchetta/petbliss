"use client"

import { LoadingSkeleton, MobileCTA, ProductsCarousel, SectionHeader } from "./components"
import { useFeaturedProducts } from "./hooks"

export const FeaturedProducts = () => {
  const { products, isLoading } = useFeaturedProducts()

  return (
    <section className="section-container section-y-padding">
      <SectionHeader />

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <ProductsCarousel products={products} />
      )}

      <MobileCTA />
    </section>
  )
}
