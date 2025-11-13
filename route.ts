import { type NextRequest, NextResponse } from "next/server"
import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"
import * as os from "os"

export async function POST(request: NextRequest) {
  try {
    const { image, filter, intensity } = await request.json()

    // Create temporary directory
    const tmpDir = os.tmpdir()
    const inputPath = path.join(tmpDir, `input-${Date.now()}.png`)
    const outputPath = path.join(tmpDir, `output-${Date.now()}.png`)

    // Decode base64 and save input image
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "")
    fs.writeFileSync(inputPath, Buffer.from(base64Data, "base64"))

    // Create Python script to apply filter
    const scriptPath = path.join(tmpDir, `filter-${Date.now()}.py`)
    const pythonScript = `
import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageOps, ImageEnhance
import sys

input_path = "${inputPath}"
output_path = "${outputPath}"
filter_type = "${filter}"
intensity = float(${intensity})

# Read image
img = cv2.imread(input_path)
if img is None:
    sys.exit(1)

pil_img = Image.open(input_path).convert('RGB')

# Apply filter
if filter_type == 'grayscale':
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
elif filter_type == 'blur':
    kernel_size = int(31 * intensity)
    if kernel_size % 2 == 0:
        kernel_size += 1
    img = cv2.GaussianBlur(img, (kernel_size, kernel_size), 0)
elif filter_type == 'sharpen':
    kernel = np.array([[-1,-1,-1],
                       [-1, 9,-1],
                       [-1,-1,-1]]) * intensity
    img = cv2.filter2D(img, -1, kernel)
elif filter_type == 'sepia':
    sepia = np.array([[0.272, 0.534, 0.131],
                      [0.349, 0.686, 0.168],
                      [0.393, 0.769, 0.189]])
    sepia_img = cv2.transform(img, sepia)
    sepia_img = np.clip(sepia_img, 0, 255).astype(np.uint8)
    img = cv2.addWeighted(img, 1-intensity, sepia_img, intensity, 0)
elif filter_type == 'cartoon':
    img_color = img
    img_smooth = cv2.bilateralFilter(img, 9, 75, 75)
    img_edge = cv2.Canny(img_smooth, 100, 200)
    img_edge = cv2.cvtColor(img_edge, cv2.COLOR_GRAY2BGR)
    img = cv2.addWeighted(img_smooth, intensity, img_edge, 1-intensity, 0)
elif filter_type == 'edge_enhance':
    edges = cv2.Canny(img, 100, 200)
    edges = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
    img = cv2.addWeighted(img, 1-intensity, edges, intensity, 0)
elif filter_type == 'invert':
    img_inv = cv2.bitwise_not(img)
    img = cv2.addWeighted(img, 1-intensity, img_inv, intensity, 0)
elif filter_type == 'posterize':
    levels = int(256 * (1 - intensity * 0.75))
    img = (img // levels) * levels

cv2.imwrite(output_path, img)
`

    fs.writeFileSync(scriptPath, pythonScript)

    // Execute Python script
    try {
      execSync(`python3 "${scriptPath}"`, { timeout: 30000 })
    } catch (error) {
      console.error("Python execution error:", error)
      throw error
    }

    // Read output image
    const outputBuffer = fs.readFileSync(outputPath)
    const filteredImage = `data:image/png;base64,${outputBuffer.toString("base64")}`

    // Cleanup
    fs.unlinkSync(inputPath)
    fs.unlinkSync(outputPath)
    fs.unlinkSync(scriptPath)

    return NextResponse.json({ filtered_image: filteredImage })
  } catch (error) {
    console.error("Error applying filter:", error)
    return NextResponse.json({ error: "Failed to apply filter" }, { status: 500 })
  }
}
