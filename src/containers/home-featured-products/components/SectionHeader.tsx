"use client"

import { FadeText } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { fadeUpSoftVariants, transitions, viewportAnimationProps } from "@/lib/animations"
import { IconArrowRight } from "@tabler/icons-react"
import { motion } from "framer-motion"
import Link from "next/link"

export const SectionHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <FadeText text="Nuestra colección Premium" direction="in" wordDelay={0.2} />
      <motion.div
        variants={fadeUpSoftVariants}
        {...viewportAnimationProps}
        transition={{ ...transitions.default, delay: 0.4 }}
      >
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
      </motion.div>
    </div>
  )
}
