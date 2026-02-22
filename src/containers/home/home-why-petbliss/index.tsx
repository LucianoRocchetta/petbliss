"use client"

import { FadeText } from "@/components/ui"
import { motion } from "framer-motion"
import { Heart, Shield, Sparkles } from "lucide-react"


const whyPetbliss = [
  {
    icon: <Shield className="text-white" />,
    title: "Confianza y Calidad",
    description: "Ingredientes de primera calidad con los que puede contar, siempre.",
  },
  {
    icon: <Heart className="text-white" />,
    title: "Cuidado y Bienestar",
    description: "La salud y felicidad de su mascota es nuestra máxima prioridad.",
  },
  {
    icon: <Sparkles className="text-white" />,
    title: "Transparencia",
    description: "Información clara sobre cada ingrediente y su fuente.",
  },
]

export const WhyPetbliss = () => {
  return (
    <section className="bg-[#1A1A1A] w-full section-y-padding">
      <div className="section-container flex flex-col gap-10">
        <div>
          <FadeText text="Porqué las mascotas eligen PetBliss" className="text-white text-start" direction="in" wordDelay={0.2} />
          <p className="section-paragraph max-w-[550px]">
            Nuestro compromiso va más allá que simple comida: es acerca de crear una vida saludable y feliz para tus amados compañeros
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whyPetbliss.map((item) => (
            <motion.div
              whileHover={{
                scale: 1.01,
                y: -5,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              key={item.title} className="flex flex-col gap-[10px] bg-white/5 rounded-[10px] p-6"
            >
              <div className="w-10 h-10 bg-white/10 rounded-[5px] flex items-center justify-center">{item.icon}</div>
              <h3 className="text-white text-2xl font-bold">{item.title}</h3>
              <p className="text-white text-base font-light">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  ) 
}