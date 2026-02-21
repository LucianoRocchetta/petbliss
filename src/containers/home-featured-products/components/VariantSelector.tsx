"use client"

import { VariantSelectorProps } from "../types"

export const VariantSelector = ({
  label,
  options,
  selectedOption,
  onSelect,
  formatOption,
}: VariantSelectorProps) => {
  if (options.length === 0) return null

  const displayValue = (option: string | number) => {
    return formatOption ? formatOption(option) : String(option)
  }

  return (
    <div className="mb-3">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={String(option)}
            onClick={() => onSelect(option)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
              selectedOption === option
                ? "bg-[#1A1A1A] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {displayValue(option)}
          </button>
        ))}
      </div>
    </div>
  )
}
