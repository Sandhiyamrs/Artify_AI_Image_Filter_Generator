🎨 Artify – AI Image Filter Generator

description: Transform ordinary images into stunning digital art using AI-powered filters.



🔗 Live Demo
👉 Website: Add your deployed link here
👉 GitHub Repository: Add your repo link here



📸 Screenshots
🏠 Home Page
🖼️ Preview Page
⚙️ Settings / Filter Selection Page



📝 Project Description

Artify is an interactive Python application that converts normal photos into beautiful digital artwork using AI-powered filters.
With a clean UI and fast processing, users can upload images, apply filters instantly, and download the final output.



✨ Features
🎨 1. Image Upload
Upload any JPG/PNG image directly into the app.

🖼️ 2. Multiple AI-Based Filters
Cartoon Effect
Pencil Sketch (Color & B/W)
Neon Glow
Vintage / Sepia
Blur / Smooth
Sharpen
Grayscale

⚡ 3. Real-Time Preview
Instant filter effects with zero delay.

💾 4. Download Output
Save filtered images in high-quality format.

📂 5. Modern UI
Built with Streamlit for a smooth user experience.

🔁 6. Reset / Re-Upload
Change the input image without restarting the app.

🧩 7. Optimized Performance
Powered by OpenCV + NumPy for fast image processing.



🛠️ Tech Stack
🔹 Programming Language

Python 3
🔹 Core Libraries
OpenCV (cv2)
NumPy
Pillow (PIL)
Matplotlib (optional)

🔹 Framework
Streamlit (UI)

🔹 Development Tools
pip
GitHub
Streamlit Cloud / Vercel (for hosting)



📂 Folder Structure
artify/
│── app.py
│── requirements.txt
│── filters/
│   ├── cartoon.py
│   ├── sketch.py
│   ├── neon.py
│   ├── sepia.py
│── assets/
│   ├── home.png
│   ├── preview.png
│   ├── settings.png
│── README.md



⚙️ Installation & Setup
# Clone the repository
git clone https://github.com/your-username/artify-ai-image-filter.git
# Navigate into folder
cd artify-ai-image-filter
# Install dependencies
pip install -r requirements.txt
# Run the app
streamlit run app.py


💡 How It Works
Upload → Process → Preview → Download
Filters are applied using OpenCV operations like:
Edge detection
Gaussian blur
Thresholding
Color maping
Custom kernels


🚀 Future Enhancements
Add ML-based style transfer
Add HDR & Oil Paint filter
Add image history
Add dark mode
Add mobile responsive support



👩‍💻 Author
Sandhiya M
🐙 GitHub: your profile link
📧 Email: your email



⭐ Support
If you found this project useful, please ⭐ the repo!
