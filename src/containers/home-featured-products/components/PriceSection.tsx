"use client"

import { formatPrice } from "@/utils"
import { ShoppingCart } from "lucide-react"
import { PriceSectionProps } from "../types"

export const PriceSection = ({ price, isAvailable, onAddToCart }: PriceSectionProps) => {
  return (
    <div className="flex items-center justify-between mt-auto pt-2">
      <p className="text-2xl font-bold text-gray-900">{formatPrice(price)}</p>
      {isAvailable && (
        <button
          onClick={onAddToCart}
          className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#2D2D2D] transition-colors duration-200"
          aria-label="Agregar al carrito"
        >
          <ShoppingCart className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  )
}
