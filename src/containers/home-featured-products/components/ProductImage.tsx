"use client"

import Image from "next/image"
import { useState } from "react"
import { ProductImageProps } from "../types"

export const ProductImage = ({ imageUrl, altText, patternImage }: ProductImageProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-full aspect-[4/5] max-h-[200px] lg:max-h-none mb-4 rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-[#E6E6E6] transition-opacity duration-500"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* Pattern Background Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Product Image */}
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-contain p-4 relative z-10"
      />
    </div>
  )
}
