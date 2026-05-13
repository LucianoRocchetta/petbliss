'use client'

import { motion } from 'framer-motion'

export const CatalogHero = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-32 lg:pt-36 pb-10"
    >
      <div className="section-container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight"
        >
          Nuestros productos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-[#737373] mt-3 max-w-lg text-sm"
        >
          Nutrición premium seleccionada para el bienestar de tu mascota.
          Encontrá el alimento ideal con envío en toda Argentina.
        </motion.p>
      </div>
    </motion.header>
  )
}
