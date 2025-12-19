"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ImagePreviewProps {
  originalImage: string
  filteredImage: string
  activeFilter: string
  loading: boolean
}

export default function ImagePreview({ originalImage, filteredImage, activeFilter, loading }: ImagePreviewProps) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const newPosition = ((touch.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800 p-8 overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">Preview</h2>
          {loading && (
            <div className="flex items-center gap-2 text-cyan-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing...</span>
            </div>
          )}
        </div>

        <div
          className="relative w-full bg-slate-800 rounded-lg overflow-hidden cursor-col-resize aspect-video"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Filtered Image (Background) */}
          <img
            src={filteredImage || "/placeholder.svg"}
            alt="Filtered"
            className="absolute inset-0 w-full h-full object-contain bg-slate-900"
          />

          {/* Original Image (Foreground with clipping) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img src={originalImage || "/placeholder.svg"} alt="Original" className="w-full h-full object-contain" />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-col-resize transition-all hover:w-2"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full p-3 shadow-lg shadow-cyan-400/50">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-slate-900 rounded-full"></div>
                <div className="w-1 h-4 bg-slate-900 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 text-white text-sm font-semibold bg-slate-900/70 px-3 py-1 rounded-full backdrop-blur-sm">
            Original
          </div>
          <div className="absolute top-4 right-4 text-white text-sm font-semibold bg-slate-900/70 px-3 py-1 rounded-full backdrop-blur-sm">
            {activeFilter === "none" ? "Original" : activeFilter.replace(/_/g, " ")}
          </div>
        </div>

        <p className="text-slate-400 text-sm text-center">Drag the slider to compare before and after</p>
      </div>
    </Card>
  )
}
