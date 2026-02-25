"use client"

import { motion } from "framer-motion"
import { CATALOG_CONFIG, GRID_CONFIG } from "../constants"

const CardSkeleton = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="animate-pulse"
  >
    <div className="bg-[#E3E3E3] rounded-2xl aspect-[4/5] mb-4" />
    <div className="h-6 bg-[#E3E3E3] rounded w-3/4 mb-3" />
    <div className="h-4 bg-[#E3E3E3] rounded w-1/4 mb-2" />
    <div className="flex gap-2 mb-3">
      <div className="h-8 bg-[#E3E3E3] rounded-full w-16" />
      <div className="h-8 bg-[#E3E3E3] rounded-full w-16" />
    </div>
    <div className="h-8 bg-[#E3E3E3] rounded w-1/3" />
  </motion.div>
)

export const LoadingSkeleton = () => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${GRID_CONFIG.gap}`}>
    {Array.from({ length: CATALOG_CONFIG.skeletonCount }).map((_, index) => (
      <CardSkeleton key={index} index={index} />
    ))}
  </div>
)
