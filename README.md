# The Muse Duo Portfolio

A modern, responsive portfolio website for The Muse Duo classical music ensemble, built with Next.js and featuring smooth animations, optimized images, and contemporary UI design.

[Live Website](https://themuseduo.com/)

![landing-page-screen](./readme-resources/Screen%20Shot%202023-01-30%20at%209.14.00%20PM.png)

## 🚀 Features

- **Next.js 14** with App Router for optimal performance
- **Modern UI Design** with Framer Motion animations
- **Responsive Design** optimized for all devices
- **Image Optimization** with Next.js Image component
- **Firebase Integration** for dynamic content
- **Email Contact Form** with social media links
- **SEO Optimized** with proper metadata and structured data
- **Accessible** with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Media**: Swiper.js for carousels
- **Video**: React Player for YouTube integration
- **Social**: React Social Media Embed
- **Language**: TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd the-muse-duo-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
# ... other Firebase config
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🏗️ Build and Deploy

To create an optimized production build:

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
├── app/
│   ├── components/          # React components
│   │   ├── Navigation.tsx   # Main navigation with burger menu
│   │   ├── Hero.tsx         # Landing section with logo
│   │   ├── About.tsx        # About the duo section
│   │   ├── Concerts.tsx     # Upcoming and past concerts
│   │   ├── Recordings.tsx   # Music player and album showcase
│   │   ├── Photos.tsx       # Gallery with image modal
│   │   ├── Press.tsx        # Press articles and reviews
│   │   ├── Contact.tsx      # Contact form and social links
│   │   └── Footer.tsx       # Footer with social media
│   ├── data/               # Static data files
│   ├── lib/                # Utility functions and configs
│   ├── globals.css         # Global CSS with Tailwind
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page component
├── public/
│   ├── images/             # Static images and assets
│   └── fonts/              # Custom fonts
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary Red**: `#EE2E31` (muse-red)
- **Secondary Gray**: `#888888` (muse-gray)

### Typography
- **Primary Font**: Candu-Condensed (custom)
- **Fallback**: sans-serif

### Animations
- **Fade In**: 2s ease-in-out
- **Slide Up**: 0.6s ease-out
- **Scale In**: 0.4s ease-out
- **Float**: 3s infinite ease-in-out

## 🔧 Customization

### Adding New Concert Dates
Edit `app/data/concerts.ts`:
```typescript
const concerts = [
  {
    startDate: { day: 15, month: "March", year: 2024 },
    venue: "Concert Hall Name",
    time: "8:00PM EDT",
    location: "123 Main St, City, State",
    ticketUrl: "https://tickets.example.com"
  }
]
```

### Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Create a collection called `video` for recordings
4. Add documents with fields: `id`, `name`, `url`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## ⚡ Performance

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js

## 📄 License

This project is private and proprietary to The Muse Duo.

---

Built with ❤️ for The Muse Duo 
