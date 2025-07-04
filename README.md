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
- [👾 Features](#-features)
- [⚙ Tech Stack](#-tech-stack)
- [🔍 Website Preview](#-website-preview)
- [📂 Repository Structure](#-repository-structure)
- [🚀 Getting Started](#-getting-started)
    - [📦 Installation](#-installation)
    - [🤖 Usage](#-usage)
- [📞 Contact](#-contact)

---

## 📍 Overview

PodTales is a cutting-edge AI SaaS platform that empowers users to create, discover, and enjoy podcasts with ease. Leveraging advanced AI technologies, PodTales offers seamless text-to-audio podcast generation with multi-voice support, automatic thumbnail image creation, and a modern, responsive user interface. Users can explore trending and popular podcasts, search and filter content, and manage their own podcast library. The platform integrates robust authentication, real-time data handling, and a feature-rich podcast player for an immersive listening experience across all devices.

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
- **Robust Authentication**: Secure user login and registration.
- **Responsive Design**: Optimized for all devices and screen sizes.


---

## ⚙ Tech Stack

### 🖥️ Frontend
- **Next.js** – React framework for server-side rendering and routing
- **TypeScript** – Type-safe JavaScript
- **Tailwind CSS** – Utility-first CSS framework
- **ShadCN UI** – Modern UI components

### 🧠 Backend
- **Convex** – Real-time backend as a service
- **Gemini** – AI model for text/image generation
- **ElevenLabs** – AI voice synthesis for podcasts
- **Freepik** - AI thubmnail generation for podcasts

### 🔐 Authentication
- **Clerk** – User authentication and management

### 🗄️ Database
- **Convex Database** – Integrated with Convex backend for real-time data

---

## 🔍 Website Preview
![image](https://github.com/iamvishalrathi/PodTales/blob/main/public/sns.png)

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

### 🤖 Usage

To run the project, execute the following command:

```sh
❯ npm run dev
```

---

## **📞 Contact**
For any questions, suggestions, or feedback, feel free to reach out:
- **Email:** [rajatrathi029@gmail.com](mailto:rajatrathi029@gmail.com)
