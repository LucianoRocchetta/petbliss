"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronUp } from "lucide-react"

interface AccordionItemData {
  id: string
  title: string
  content: string
  category?: string
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
  allowMultiple?: boolean
  highlightCategory?: string | null
}

interface AccordionItemProps {
  item: AccordionItemData
  isOpen: boolean
  onToggle: () => void
  index: number
  isHighlighted: boolean
  hasActiveFilter: boolean
}

const AccordionItem = ({ item, isOpen, onToggle, index, isHighlighted, hasActiveFilter }: AccordionItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isHighlighted ? 1.02 : 1,
      }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        scale: { duration: 0.3, ease: "easeOut" }
      }}
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 origin-center",
        isHighlighted 
          ? "bg-[#1A1A1A] shadow-lg shadow-black/10" 
          : hasActiveFilter 
            ? "bg-[#F5F5F5]/60 opacity-50" 
            : "bg-[#F5F5F5] hover:bg-[#EBEBEB]"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <motion.span 
          animate={{ 
            color: isHighlighted ? "#FFFFFF" : "#1A1A1A",
          }}
          transition={{ duration: 0.3 }}
          className="text-lg font-semibold pr-4"
        >
          {item.title}
        </motion.span>
        <motion.div
          animate={{ 
            rotate: isOpen ? 0 : 180,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronUp className={cn(
            "w-5 h-5 transition-colors duration-300",
            isHighlighted ? "text-white" : "text-[#1A1A1A]"
          )} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5">
              <p className={cn(
                "leading-relaxed transition-colors duration-300",
                isHighlighted ? "text-gray-300" : "text-[#666666]"
              )}>
                {item.content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Accordion = ({ items, className, allowMultiple = false, highlightCategory = null }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set())

  const handleToggle = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(id)
      }
      return newSet
    })
  }

  const hasActiveFilter = highlightCategory !== null && highlightCategory !== "todos"

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => {
        const isHighlighted = hasActiveFilter && item.category === highlightCategory
        
        return (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openItems.has(item.id)}
            onToggle={() => handleToggle(item.id)}
            index={index}
            isHighlighted={isHighlighted}
            hasActiveFilter={hasActiveFilter}
          />
        )
      })}
    </div>
  )
}

export { Accordion, type AccordionItemData }
