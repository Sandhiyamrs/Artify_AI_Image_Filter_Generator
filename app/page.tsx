"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import ImageUpload from "@/components/image-upload"
import FilterControls from "@/components/filter-controls"
import ImagePreview from "@/components/image-preview"

export default function Page() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [filteredImage, setFilteredImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("none")
  const [filterIntensity, setFilterIntensity] = useState(100)

  const handleImageUpload = (imageData: string) => {
    setOriginalImage(imageData)
    setFilteredImage(imageData)
    setActiveFilter("none")
    setFilterIntensity(100)
  }

  const applyFilter = async (filterName: string) => {
    if (!originalImage) return

    setLoading(true)
    setActiveFilter(filterName)

    try {
      const response = await fetch("/api/apply-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: originalImage,
          filter: filterName,
          intensity: filterIntensity / 100,
        }),
      })

      const data = await response.json()
      if (data.filtered_image) {
        setFilteredImage(data.filtered_image)
      }
    } catch (error) {
      console.error("Filter application failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Artify</h1>
              <p className="text-slate-400 text-sm mt-1">AI-Powered Image Filter Studio</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!originalImage ? (
          <ImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-8">
            {/* Image Comparison */}
            <ImagePreview
              originalImage={originalImage}
              filteredImage={filteredImage}
              activeFilter={activeFilter}
              loading={loading}
            />

            {/* Filter Controls */}
            <Card className="bg-slate-900/50 border-slate-800 p-8">
              <div className="space-y-8">
                {/* Intensity Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-white font-semibold">Filter Intensity</label>
                    <span className="text-cyan-400 font-mono text-lg">{filterIntensity}%</span>
                  </div>
                  <Slider
                    value={[filterIntensity]}
                    onValueChange={(value) => setFilterIntensity(value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Filters Grid */}
                <FilterControls onFilterClick={applyFilter} activeFilter={activeFilter} loading={loading} />

                {/* Reset Button */}
                <Button
                  onClick={() => {
                    setOriginalImage(null)
                    setFilteredImage(null)
                    setActiveFilter("none")
                  }}
                  variant="outline"
                  className="w-full bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
                >
                  Reset & Upload New Image
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
