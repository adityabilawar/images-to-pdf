# DocSnap 📸 -> 📄

**DocSnap** is a premium, high-performance mobile application built with **React Native** and **Expo** that allows users to instantly convert multiple images into a professional PDF document.

Designed with a sleek, dark-themed UI (Indigo/Slate palette), DocSnap prioritizes user experience, speed, and aesthetics.

## ✨ Features

- **Multiple Image Selection**: Seamlessly integration with the device's media library to select multiple photos at once.
- **Instant Preview**: View selected images in a responsive grid layout.
- **Edit & Manage**: Easily remove images from your selection before generation.
- **Local PDF Generation**: Converts images to PDF directly on the device using `expo-print` (No internet required for conversion).
- **One-Image-Per-Page**: Automatically formats each image to take up a full page in the resulting PDF.
- **Share & Save**: Native sharing capabilities to save to files, email, or send via messaging apps.
- **Premium UI**: Modern, dark-mode design with smooth interactions and glassmorphic elements.

## 🛠 Tech Stack

- **Framework**: React Native (0.81.5) via Expo (SDK 52)
- **Language**: JavaScript/React
- **Core Libraries**:
  - `expo-image-picker`: Media library access.
  - `expo-print`: HTML to PDF conversion engine.
  - `expo-sharing`: Native auditing and sharing interface.
  - `expo-file-system`: Local file handling.
- **Styling**: React Native StyleSheet with deeply integrated flexible layout system.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- Expo Go app on your physical device (iOS/Android) OR an emulator.

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd images-to-pdf
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on Device**:
   - Scan the QR code with your phone using the **Expo Go** app (Android) or Camera app (iOS).
   - Press `a` for Android Emulator or `i` for iOS Simulator (if configured).

## 📂 Project Structure

```
images-to-pdf/
├── App.js              # Main application entry point & logic
├── app.json            # Expo configuration
├── assets/             # Static assets (icons, splash screens)
├── backend/            # Backend service (WIP/Separate Module)
├── package.json        # Dependencies and scripts include
└── README.md           # Project documentation
```

## 📱 Usage Guide

1. **Launch the App**: Open DocSnap on your device.
2. **Add Images**: Tap the "Add Images" button to open your photo gallery. Select one or more images.
3. **Review**: Check the selected images in the grid. specific images can be removed by tapping the red "X" icon.
4. **Generate**: Tap "Generate PDF". The app will process the images.
5. **Share/Save**: Once the PDF is ready, a share sheet will pop up allowing you to save the file or send it to others.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Built with ❤️ using Expo*
