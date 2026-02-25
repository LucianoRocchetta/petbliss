"use client"

import { Button } from "@/components/ui/button"
import { fadeUpSoftVariants, transitions, viewportAnimationProps } from "@/lib/animations"
import { IconArrowRight } from "@tabler/icons-react"
import { motion } from "framer-motion"
import Link from "next/link"

export const MobileCTA = () => {
  return (
    <motion.div
      className="mt-8 md:hidden"
      variants={fadeUpSoftVariants}
      {...viewportAnimationProps}
      transition={{ ...transitions.default, delay: 0.5 }}
    >
      <Button variant="outlineDark" size="default" asChild className="w-full">
        <Link href="/shop">
          Ver todos los productos
          <IconArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </motion.div>
  )
}
