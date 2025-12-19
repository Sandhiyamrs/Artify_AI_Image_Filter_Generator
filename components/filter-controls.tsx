"use client"

import { Button } from "@/components/ui/button"

interface FilterControlsProps {
  onFilterClick: (filterName: string) => void
  activeFilter: string
  loading: boolean
}

const filters = [
  { name: "grayscale", label: "Grayscale", icon: "⚪" },
  { name: "blur", label: "Blur", icon: "✨" },
  { name: "sharpen", label: "Sharpen", icon: "🔍" },
  { name: "sepia", label: "Sepia", icon: "🟤" },
  { name: "cartoon", label: "Cartoon", icon: "🎨" },
  { name: "edge_enhance", label: "Edge", icon: "⚡" },
  { name: "invert", label: "Invert", icon: "🔲" },
  { name: "posterize", label: "Posterize", icon: "📊" },
]

export default function FilterControls({ onFilterClick, activeFilter, loading }: FilterControlsProps) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Choose Filter</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filters.map((filter) => (
          <Button
            key={filter.name}
            onClick={() => onFilterClick(filter.name)}
            disabled={loading}
            className={`flex flex-col items-center gap-2 h-auto py-3 transition-all ${
              activeFilter === filter.name
                ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            }`}
          >
            <span className="text-2xl">{filter.icon}</span>
            <span className="text-xs font-medium">{filter.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
