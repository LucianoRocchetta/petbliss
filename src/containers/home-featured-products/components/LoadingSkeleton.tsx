"use client"

const SKELETON_COUNT = 3

const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-2xl aspect-[4/5] mb-4" />
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
    <div className="flex gap-2 mb-3">
      <div className="h-8 bg-gray-200 rounded-full w-16" />
      <div className="h-8 bg-gray-200 rounded-full w-16" />
    </div>
    <div className="h-8 bg-gray-200 rounded w-1/3" />
  </div>
)

export const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
)
