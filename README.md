# DocSnap 📸 -> 📄

**DocSnap** is a premium, high-performance mobile application built with **React Native** and **Expo** that allows users to instantly convert multiple images into a professional PDF document.

Designed with a sleek, dark-themed UI (Indigo/Slate palette), DocSnap prioritizes user experience, speed, and aesthetics.

## ✨ Features

### Mobile App
- **Multiple Image Selection**: Seamlessly integration with the device's media library to select multiple photos at once.
- **Instant Preview**: View selected images in a responsive grid layout.
- **Edit & Manage**: Easily remove images from your selection before generation.
- **Local PDF Generation**: Converts images to PDF directly on the device using `expo-print` (No internet required for conversion).
- **One-Image-Per-Page**: Automatically formats each image to take up a full page in the resulting PDF.
- **Share & Save**: Native sharing capabilities to save to files, email, or send via messaging apps.
- **Premium UI**: Modern, dark-mode design with smooth interactions and glassmorphic elements.

### Backend Services (New!)
- **Cloud Storage**: Secure file upload and storage capabilities.
- **Database**: PostgreSQL (via Prisma ORM) for managing user data and file metadata.
- **API**: RESTful API built with Express.js.
- **Hosting**: Configured for easy deployment on **Render.com** with persistent storage.

## 🛠 Tech Stack

### Mobile Apps
- **Framework**: React Native (0.81.5) via Expo (SDK 52)
- **Language**: JavaScript/React
- **Core Libraries**:
  - `expo-image-picker`: Media library access.
  - `expo-print`: HTML to PDF conversion engine.
  - `expo-sharing`: Native auditing and sharing interface.
  - `expo-file-system`: Local file handling.

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Storage**: Local/Persistent Disk (Render)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- Expo Go app on your physical device (iOS/Android) OR an emulator.
- (Optional) PostgreSQL installed locally if running backend locally.

### Installation & Mobile App Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adityabilawar/images-to-pdf.git
   cd images-to-pdf
   ```

2. **Install Mobile App Dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on Device**:
   - Scan the QR code with your phone using the **Expo Go** app.

### Backend Setup (Optional)

The mobile app works offline for local PDF generation. To explore the backend features:

1. **Navigate to backend**:
   ```bash
   cd backend
   ```

2. **Install Backend Dependencies**:
   ```bash
   npm install
   ```

3. **Deploy to Cloud**:
   - Follow the detailed instructions in [backend/HOSTING.md](backend/HOSTING.md) to deploy your own instance to Render.com.

4. **Connect App**:
   - Open `App.js` in the root directory.
   - Update `BACKEND_URL` to point to your deployed service URL.

## 📂 Project Structure

```
images-to-pdf/
├── App.js              # Main application entry point & logic
├── app.json            # Expo configuration
├── assets/             # Static assets (icons, splash screens)
├── backend/            # Backend Node.js Service
│   ├── src/            # Source code (Controllers, Routes)
│   ├── prisma/         # Database schema (PostgreSQL)
│   └── HOSTING.md      # Deployment instructions for Render
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
