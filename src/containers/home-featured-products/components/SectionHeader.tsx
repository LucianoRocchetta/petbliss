import { FadeText } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link"

export const SectionHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <FadeText text="Nuestra colección Premium" direction="in" wordDelay={0.2} />
      <Button
        variant="outlineDark"
        size="default"
        asChild
        className="hidden md:inline-flex"
      >
        <Link href="/shop">
          Ver todos los productos
          <IconArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </div>
  )
}
