'use client'

import { motion } from 'framer-motion'
import {
  fadeUpVariants,
  fadeUpSoftVariants,
  fadeVariants,
  transitions,
} from '@/lib/animations'

export const CatalogHero = () => {
  return (
    <motion.header
      variants={fadeVariants}
      transition={transitions.slow}
      className="pt-32 lg:pt-36 pb-10"
    >
      <div className="section-container">
        <motion.h1
          variants={fadeUpVariants}
          transition={{ ...transitions.slow, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight"
        >
          Nuestros productos
        </motion.h1>
        <motion.p
          variants={fadeUpSoftVariants}
          transition={{ ...transitions.default, delay: 0.35 }}
          className="text-[#737373] mt-3 max-w-lg text-sm"
        >
          Nutrición premium seleccionada para el bienestar de tu mascota.
          Encontrá el alimento ideal con envío en toda Argentina.
        </motion.p>
      </div>
    </motion.header>
  )
}
