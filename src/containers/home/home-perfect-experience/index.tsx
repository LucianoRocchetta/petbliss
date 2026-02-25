"use client"

import { FadeText } from "@/components/ui"
import {
  fadeLeftVariants,
  fadeRightVariants,
  fadeUpSoftVariants,
  fadeUpVariants,
  getStaggerDelay,
  transitions,
  viewportAnimationProps,
} from "@/lib/animations"
import { motion } from "framer-motion"
import { CreditCard, Gift, ShieldCheck, Truck } from "lucide-react"
import Image from "next/image"

const leftFeatures = [
  {
    icon: Truck,
    title: "Envíos gratis en CABA",
    description: "Obtené tus envíos en CABA completamente gratis los lunes y miércoles. Planifique con anticipación y ahorre.",
  },
  {
    icon: CreditCard,
    title: "Pagá contra-entrega",
    description: "Sin pagos por delante necesarios. Pagá de forma segura cuando tu orden llegue a tu puerta.",
  },
]

const rightFeatures = [
  {
    icon: Gift,
    title: "Muestras de regalo",
    description: "Probá antes de tu compra. Obtené muestras complementarias con la compra de tu producto.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de calidad",
    description: "100% de satisfacción garantizada. ¿No estás satisfecho? Lo solucionaremos, sin hacer preguntas.",
  },
]

export const PerfectExperience = () => {
  return (
    <section className="w-full section-y-padding">
      <div className="section-container flex flex-col gap-10">
        <div>
          <FadeText text="La experiencia perfecta" className="text-start" direction="in" wordDelay={0.2} />
          <motion.p
            className="section-paragraph"
            variants={fadeUpSoftVariants}
            {...viewportAnimationProps}
            transition={{ ...transitions.default, delay: 0.35 }}
          >
            Diseñamos cada paso para que el cuidado de su mascota sea sencillo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-[350px] gap-x-10 gap-y-5 lg:gap-y-0">
          {/* Left column - features slide from left */}
          <div className="grid grid-rows-2 col-span-1 gap-5">
            {leftFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col gap-2 items-center justify-center"
                variants={fadeLeftVariants}
                {...viewportAnimationProps}
                transition={{
                  delay: getStaggerDelay(index, 0.15, 0.2),
                  duration: 0.5,
                }}
              >
                <div className="bg-[#737373]/10 rounded-[5px] p-2">
                  <feature.icon strokeWidth={1} className="w-[48px] h-[48px] text-[#1a1a1a]" />
                </div>
                <h3 className="text-2xl font-bold text-center">{feature.title}</h3>
                <p className="text-base font-light text-[#737373] text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Center image */}
          <motion.div
            className="hidden lg:block col-span-2 row-span-2"
            variants={fadeUpVariants}
            {...viewportAnimationProps}
            transition={{ ...transitions.slow, delay: 0.3 }}
          >
            <Image
              src="/images/cat-perfect-experience.png"
              width={500}
              height={500}
              alt="Perfect Experience"
              className="object-cover rounded-[10px] w-full h-full"
            />
          </motion.div>

          {/* Right column - features slide from right */}
          <div className="grid grid-rows-2 col-span-1 gap-5">
            {rightFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col gap-2 items-center justify-center"
                variants={fadeRightVariants}
                {...viewportAnimationProps}
                transition={{
                  delay: getStaggerDelay(index, 0.15, 0.2),
                  duration: 0.5,
                }}
              >
                <div className="bg-[#737373]/10 rounded-[5px] p-2">
                  <feature.icon strokeWidth={1} className="w-[48px] h-[48px] text-[#1a1a1a]" />
                </div>
                <h3 className="text-2xl font-bold text-center">{feature.title}</h3>
                <p className="text-base font-light text-[#737373] text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}