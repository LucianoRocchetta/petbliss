"use client"

import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link"

export const MobileCTA = () => {
  return (
    <div className="mt-8 md:hidden">
      <Button variant="outlineDark" size="default" asChild className="w-full">
        <Link href="/shop">
          Ver todos los productos
          <IconArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </div>
  )
}
