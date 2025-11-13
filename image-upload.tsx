"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onImageUpload(result)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith("image/")) {
      handleFile(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  return (
    <Card
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
        isDragging ? "border-cyan-400 bg-cyan-400/5" : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />

      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-cyan-400/10 rounded-full">
          <Upload className="w-8 h-8 text-cyan-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Upload Your Image</h2>
          <p className="text-slate-400">Drag and drop your image here or click to browse</p>
        </div>

        <Button
          onClick={() => inputRef.current?.click()}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-2"
        >
          Choose Image
        </Button>
      </div>
    </Card>
  )
}
