"use client"

import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link"

export const SectionHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        Nuestra colección Premium
      </h2>
      <Button
        variant="outlineDark"
        size="default"
        asChild
        className="hidden md:inline-flex"
      >
        <Link href="/productos">
          Ver todos los productos
          <IconArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </div>
  )
}
