<p align="center">
  <img src="https://github.com/iamvishalrathi/PodTales/blob/main/public/icons/logo.png" width="30%" alt="logo">
</p>
<p align="center">
    <h1 align="center">PODTALES: AI SaaS Podcast Application</h1>
</p>
<p align="center">
    <em><code><a href="https://podtales.vercel.app/" target="_blank" >❯ Live</a></code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/iamvishalrathi/PodTales?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/iamvishalrathi/PodTales?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/iamvishalrathi/PodTales?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/iamvishalrathi/PodTales?style=flat&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
		<em>Built with the tools and technologies:</em>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-18181B?style=for-the-badge&logo=shadcnui&logoColor=white" alt="ShadCN UI" />
    <img src="https://img.shields.io/badge/-Convex-18181B?style=for-the-badge" alt="Convex" />
    <img src="https://img.shields.io/badge/-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
    <img src="https://img.shields.io/badge/-ElevenLabs-FF6F00?style=for-the-badge&logo=elevenlabs&logoColor=white" alt="ElevenLabs" />
    <img src="https://img.shields.io/badge/-Freepik-0F9AFE?style=for-the-badge&logo=freepik&logoColor=white" alt="Freepik" />
    <img src="https://img.shields.io/badge/-Clerk-3A3A3A?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
</p>

<br>

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [👾 Features](#-features)
- [⚙ Tech Stack](#-tech-stack)
- [🔍 Website Preview](#-website-preview)
- [📂 Repository Structure](#-repository-structure)
- [🚀 Getting Started](#-getting-started)
    - [📦 Installation](#-installation)
    - [⚙️ Environment Setup](#️-environment-setup)
    - [🤖 Usage](#-usage)
- [📞 Contact](#-contact)

---

## 📍 Overview

PodTales is a cutting-edge AI SaaS platform that empowers users to create, discover, and enjoy podcasts with ease. Leveraging advanced AI technologies, PodTales offers seamless text-to-audio podcast generation with multi-voice support, automatic thumbnail image creation, and a modern, responsive user interface. Users can explore trending and popular podcasts, search and filter content, and manage their own podcast library. The platform integrates robust authentication, real-time data handling, and a feature-rich podcast player for an immersive listening experience across all devices.

---

## 🏗️ Architecture

PodTales follows a modern full-stack architecture with real-time capabilities and AI integration:

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                          │
├─────────────────────────────────────────────────────────────────┤
│  Next.js App Router  │  TypeScript  │  Tailwind CSS  │ ShadCN  │
│      Responsive UI   │   Type Safety │   Styling      │   UI     │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Authentication Layer                      │
├─────────────────────────────────────────────────────────────────┤
│                        Clerk Auth                               │
│              User Management & Session Handling                │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Backend Layer                            │
├─────────────────────────────────────────────────────────────────┤
│                      Convex Backend                             │
│   Real-time Database  │  File Storage  │  Server Functions     │
│   Query & Mutations   │  Audio/Images  │  Business Logic       │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                        AI Services                             │
├─────────────────────────────────────────────────────────────────┤
│  Gemini AI (Google)  │  ElevenLabs    │    Freepik API         │
│  Text Generation     │  Voice Synthesis │  Thumbnail Generation │
│  Content Creation    │  Multi-voice TTS │  AI Image Creation   │
└─────────────────────────────────────────────────────────────────┘
```

### 🔄 Data Flow
1. **User Interaction** → Next.js frontend handles UI interactions
2. **Authentication** → Clerk manages secure user sessions
3. **Real-time Updates** → Convex provides live database synchronization
4. **AI Processing** → Multiple AI services generate content
5. **File Management** → Convex handles audio and image storage
6. **State Management** → React Context manages global app state

### 🗄️ Database Schema
- **Users**: Profile data, authentication, social links, admin roles
- **Podcasts**: Audio content, metadata, ratings, analytics
- **Ratings**: User reviews and rating system
- **Reports**: Content moderation system
- **Follows**: Social networking features
- **Notifications**: Real-time user alerts

---

## 👾 Features

### 🎙️ Podcast Creation & Management
- **Create Podcast Page**: Generate podcasts from text using multi-voice AI, with instant previews and AI-generated thumbnails.
- **Profile Page**: View, manage, and delete your created podcasts.
- **Podcast Details Page**: See detailed info including creator, listeners, and transcript.

### 🔍 Discovery & Search
- **Modern Home Page**: Showcases trending podcasts with a sticky player for uninterrupted listening.
- **Discover Podcasts Page**: Explore new and popular podcasts.
- **Fully Functional Search**: Find podcasts easily using various search criteria and filters.

### 🎧 Listening Experience
- **Podcast Player**: Backward/forward controls, mute/unmute, and seamless playback.
- **Sticky Player**: Continue listening while browsing the site.

### 🛡️ User & Platform Features
- **Robust Authentication**: Secure user login and registration with Clerk
- **User Profiles**: Customizable profiles with bio, social links, and verification
- **Social Features**: Follow/unfollow users, community discovery
- **Admin Dashboard**: Content moderation and platform analytics
- **Notification System**: Real-time updates for user interactions
- **Responsive Design**: Optimized for all devices and screen sizes

### 🤖 AI-Powered Content
- **Multi-Voice AI**: Choose from various AI voices (Amy, Dan, Liv, Scarlett, Will)
- **Smart Thumbnails**: AI-generated podcast covers using Freepik API
- **Content Enhancement**: Gemini AI for intelligent content creation
- **Language Support**: Multi-language podcast generation capabilities

### 📊 Analytics & Engagement
- **View Tracking**: Monitor podcast performance and engagement
- **Rating System**: Five-star rating system with detailed reviews
- **Popular Content**: Trending and most-listened recommendations
- **Advanced Search**: Filter by category, language, and popularity

---

## ⚙ Tech Stack

### 🖥️ Frontend
- **Next.js 14** – React framework with App Router for SSR and routing
- **TypeScript** – Type-safe JavaScript for better development experience
- **Tailwind CSS** – Utility-first CSS framework for rapid styling
- **ShadCN UI** – Modern, accessible React component library
- **Embla Carousel** – Smooth, customizable carousel components

### 🧠 Backend & AI Services
- **Convex** – Real-time backend as a service with built-in database
- **Gemini AI** – Google's advanced AI for intelligent content generation
- **ElevenLabs** – Premium AI voice synthesis with natural-sounding voices
- **Freepik API** – AI-powered thumbnail and image generation service
- **Vercel** – Deployment platform with global CDN

### 🔐 Authentication & Security
- **Clerk** – Complete authentication solution with session management
- **JWT Tokens** – Secure token-based authentication
- **Role-based Access** – Admin and user role management system
- **Zod Validation** – Runtime type checking and data validation

### 🗄️ Database & Storage
- **Convex Database** – Real-time NoSQL database with live queries
- **File Storage** – Integrated storage for audio files and images
- **Search Indexing** – Full-text search across podcast content
- **Real-time Sync** – Automatic data synchronization across clients

### 🎵 Media & Audio
- **Custom Audio Player** – Advanced controls with progress tracking
- **Audio Streaming** – Efficient streaming with buffering optimization
- **Background Playback** – Continuous playback while navigating
- **Multi-format Support** – Support for various audio formats

---

## 🔍 Website Preview
![image](https://github.com/iamvishalrathi/PodTales/blob/main/public/sns1.png)
![image](https://github.com/iamvishalrathi/PodTales/blob/main/public/sns2.png)
![image](https://github.com/iamvishalrathi/PodTales/blob/main/public/sns3.png)

---

## 📂 Repository Structure

```sh
└── PodTales/
    ├── README.md
    ├── app
    │   ├── (auth)
    │   ├── (root)
    │   ├── globals.css
    │   └── layout.tsx
    ├── components
    │   ├── Carousel.tsx
    │   ├── EmblaCarouselDotButton.tsx
    │   ├── EmptyState.tsx
    │   ├── GeneratePodcast.tsx
    │   ├── GenerateThumbnail.tsx
    │   ├── Header.tsx
    │   ├── LeftSidebar.tsx
    │   ├── LoaderSpinner.tsx
    │   ├── MobileNav.tsx
    │   ├── PodcastCard.tsx
    │   ├── PodcastDetailPlayer.tsx
    │   ├── PodcastPlayer.tsx
    │   ├── ProfileCard.tsx
    │   ├── RightSidebar.tsx
    │   ├── Searchbar.tsx
    │   └── ui
    ├── components.json
    ├── constants
    │   └── index.ts
    ├── convex
    │   ├── _generated
    │   ├── auth.config.ts
    │   ├── files.ts
    │   ├── freepik.ts
    │   ├── http.ts
    │   ├── openai.ts
    │   ├── podcasts.ts
    │   ├── schema.ts
    │   ├── tasks.ts
    │   ├── unreal.ts
    │   └── users.ts
    ├── lib
    │   ├── formatTime.ts
    │   ├── useDebounce.ts
    │   └── utils.ts
    ├── middleware.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── providers
    │   ├── AudioProvider.tsx
    │   └── ConvexClerkProvider.tsx
    ├── public
    │   ├── Amy.mp3
    │   ├── Dan.mp3
    │   ├── Liv.mp3
    │   ├── Scarlett.mp3
    │   ├── Will.mp3
    │   ├── icons
    │   └── images
    ├── sampleData.jsonl
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── types
        └── index.ts
```
---

## 🚀 Getting Started

### 📦 Installation

Build the project from source:

1. Clone the PodTales repository:
```sh
❯ git clone https://github.com/iamvishalrathi/PodTales
```

2. Navigate to the project directory:
```sh
❯ cd PodTales
```

3. Install the required dependencies:
```sh
❯ npm install
```

### ⚙️ Environment Setup

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Convex Backend
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_public_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# AI Services
GEMINI_API_KEY=your_gemini_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
FREEPIK_API_KEY=your_freepik_api_key

# Application URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 🤖 Usage

1. **Start the development server:**
```sh
❯ npm run dev
```

2. **Start Convex backend (in a separate terminal):**
```sh
❯ npm run convex
```

3. **Open your browser:**
```
http://localhost:3000
```

### 📋 Available Scripts
```sh
npm run dev          # Start Next.js development server
npm run convex       # Start Convex backend development
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint checks
```

---

## **📞 Contact**

For any questions, suggestions, or feedback, feel free to reach out:

- **Email:** [rajatrathi029@gmail.com](mailto:rajatrathi029@gmail.com)
- **GitHub:** [@iamvishalrathi](https://github.com/iamvishalrathi)
- **Live Demo:** [PodTales](https://podtales.vercel.app/)

---

<div align="center">

**[⬆ Back to Top](#podtales-ai-saas-podcast-application)**

Made with ❤️ by [Vishal Rathi](https://github.com/iamvishalrathi)

</div>
