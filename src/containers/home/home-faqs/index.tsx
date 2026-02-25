"use client"

import { Accordion, FadeText } from "@/components/ui"
import {
  fadeLeftVariants,
  fadeRightVariants,
  getStaggerDelay,
  transitions,
  viewportAnimationProps,
} from "@/lib/animations"
import { cn } from "@/lib/utils"
import { type Category, FAQ_ITEMS, FILTER_BUTTONS } from "@/utils/constants"
import { motion } from "framer-motion"
import { useState } from "react"

export const Faqs = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("todos")

  return (
    <section className="w-full section-y-padding">
      <div className="section-container flex flex-col lg:flex-row gap-10 lg:gap-20">
        <motion.div
          className="lg:w-[35%]"
          variants={fadeLeftVariants}
          {...viewportAnimationProps}
          transition={{ ...transitions.default, delay: 0.2 }}
        >
          <div className="lg:sticky lg:top-8 flex flex-col gap-6">
            <FadeText 
              text="Preguntas frecuentes" 
              className="text-start" 
              direction="in" 
              wordDelay={0.2} 
            />
            
            <div className="flex flex-wrap gap-2">
              {FILTER_BUTTONS.map((button, index) => (
                <motion.button
                  key={button.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.3,
                    delay: getStaggerDelay(index, 0.1, 0.3),
                  }}
                  onClick={() => setActiveFilter(button.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                    activeFilter === button.id
                      ? "bg-[#1A1A1A] text-white"
                      : "bg-transparent text-[#1A1A1A] border border-[#E0E0E0] hover:border-[#1A1A1A]"
                  )}
                >
                  {button.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:w-[65%]"
          variants={fadeRightVariants}
          {...viewportAnimationProps}
          transition={{ ...transitions.default, delay: 0.3 }}
        >
          <Accordion 
            items={FAQ_ITEMS} 
            highlightCategory={activeFilter}
          />
        </motion.div>
      </div>
    </section>
  )
}
