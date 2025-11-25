# 🎨 ColorFarmers - Scholars Photostat Centre

> **Professional Printing & Imaging Services Since 1987**

A modern, responsive web application for Scholars Photostat Centre, showcasing comprehensive printing and imaging services with AI-powered customer support.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Features

### 🎯 Core Features
- **6 Comprehensive Pages:** Home, About, Start Today, Rates, Reviews, Contact
- **AI-Powered Chatbot:** Google Gemini integration with Arabic greeting
- **Mobile Responsive:** Optimized for all screen sizes
- **Modern UI/UX:** Colorful, engaging design with smooth animations
- **No Authentication Required:** Easy review and order submissions

### 🤖 AI Chatbot
- Powered by Google Gemini API
- Arabic greeting: "السلام علیکم (Assalamualaikum)"
- Access to comprehensive FAQ database
- 3/4 screen size on both desktop and mobile
- Modern, compact design with light background

### 📱 Contact Integration
- **WhatsApp:** Direct messaging integration
- **Email:** System email app fallback
- **Phone:** Click-to-call functionality
- **Forms:** Review and contact forms with admin notifications

### 🎨 Design Highlights
- **Color Scheme:** Light Green, Purple, Blue
- **Theme:** Light mode with vibrant colors
- **Typography:** Inter & Outfit fonts
- **Icons:** Emoji-based for universal appeal
- **Animations:** Smooth transitions and micro-interactions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Google Gemini API key (for chatbot)

### Installation

1. **Clone or navigate to the project:**
```bash
cd d:\Panaverse\colorfarmers
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup environment variables:**
```bash
copy .env.example .env
```

4. **Edit `.env` and add your Gemini API key:**
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

5. **Start development server:**
```bash
npm run dev
```

6. **Open browser:**
Navigate to `http://localhost:3000`

---

## 📂 Project Structure

```
colorfarmers/
├── public/
│   ├── FAQ.json              # Chatbot FAQ database
│   └── Logo.jpg              # Company logo
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky navigation
│   │   ├── Footer.jsx        # Modern footer
│   │   ├── ChatButton.jsx    # Floating chat button
│   │   └── Chatbot.jsx       # AI chatbot interface
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── About.jsx         # Company information
│   │   ├── StartToday.jsx    # Order initiation
│   │   ├── Rates.jsx         # Service pricing
│   │   ├── Reviews.jsx       # Customer testimonials
│   │   └── Contact.jsx       # Contact information
│   ├── App.jsx               # Main application
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite configuration
├── plan.md                   # Implementation plan
├── command.md                # Setup commands
└── README.md                 # This file
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router DOM 6.26.0** - Routing
- **Vite 5.4.2** - Build tool
- **Tailwind CSS 3.4.1** - Styling

### AI & APIs
- **Google Generative AI** - Chatbot functionality
- **EmailJS** - Email notifications

### Development
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS compatibility

---

## 📋 Available Scripts

```bash
# Development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Railway
railway up
```

---

## 🎨 Services Offered

### 📚 Thesis Point
- Printout (B/W & Color)
- Photocopy services
- Multiple binding options
- PDF conversion & CD writing

### 💌 Invites & Cards
- Wedding cards
- Birthday cards
- Event invitations

### 🎁 Custom Printing
- Mugs, plates, tiles
- T-shirts, caps, coats
- Cushions, pillows
- Leather accessories

### 🖨️ Copy Shop
- Large format printing (44" x 200")
- CAD printing
- Scanning & archiving
- Document management

### 📖 Bindings
- Loop, Spiral, Ring
- Tape, Hard binding
- Cover print, Embossing

### 🎓 Educational Materials
- Master & Bachelor level
- O-Levels & A-Levels
- Question papers & notes

### 🏆 Custom Items
- Shields & trophies
- Certificates & frames
- Desktop items

### 🎨 Offset & Digital Print
- Letterheads, business cards
- Brochures, flyers
- Banners, signage

---

## 🌟 Key Pages

### 🏠 Home
- Hero section with CTA
- Service highlights
- Statistics showcase
- Client testimonials preview

### ℹ️ About Us
- Company history (Since 1987)
- Mission & vision
- Core values
- Timeline of achievements
- Logo display

### 🚀 Start Today
- Step-by-step guide
- Contact form
- WhatsApp/Email integration
- Multiple contact options

### 💰 Rates
- Comprehensive pricing
- Filterable service categories
- Bulk discount information
- 10+ service categories

### ⭐ Reviews
- Customer testimonials
- Star ratings
- Review submission form
- Auto-publish after approval

### 📞 Contact
- Multiple contact methods
- Contact form
- Business hours
- Location map
- Direct WhatsApp/Phone links

---

## 🔐 Environment Variables

```env
# Required
VITE_GEMINI_API_KEY=your_gemini_api_key

# Optional (Enhanced Features)
VITE_EMAIL_SERVICE_ID=your_emailjs_service_id
VITE_EMAIL_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAIL_PUBLIC_KEY=your_emailjs_public_key

# Pre-configured
VITE_WHATSAPP_NUMBER=923004251833
VITE_ADMIN_EMAIL=infoscholars@yahoo.com
```

**Get Gemini API Key:** https://makersuite.google.com/app/apikey

---

## 📱 Mobile Responsiveness

All pages are fully responsive with:
- ✅ Mobile-first design approach
- ✅ Hamburger menu for mobile navigation
- ✅ Touch-friendly buttons and links
- ✅ Optimized images and assets
- ✅ Responsive grid layouts
- ✅ Adaptive chatbot interface

---

## 🎨 Design System

### Colors
- **Primary (Green):** #22c55e - #14532d
- **Secondary (Purple):** #a855f7 - #581c87
- **Accent (Blue):** #3b82f6 - #1e3a8a

### Typography
- **Display Font:** Outfit
- **Body Font:** Inter

### Components
- Gradient buttons with hover effects
- Card components with shadows
- Input fields with focus states
- Smooth animations and transitions

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder

**Remember:** Add environment variables in your deployment platform!

---

## 📞 Contact Information

**Scholars Photostat Centre**
- 📍 Muslim Town Mor, Beside Jamia Asharfia, 147-Ferozepur Road, Lahore
- 📞 Phone: 042-37503264-5
- 📱 Mobile: 0300-4251833
- ✉️ Email: infoscholars@yahoo.com
- 💬 WhatsApp: 0300-4251833

**Business Hours:**
- Monday - Saturday: 9:00 AM - 8:00 PM
- Sunday: Closed

---

## 🏆 Major Clients

- University of the Punjab
- LUMS
- Information Technology University (ITU)
- University of Health Sciences (UHS)
- WAPDA
- National Bank of Pakistan
- Beaconhouse School Systems
- PepsiCola International
- And 100+ more organizations

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

This is a private business website. For inquiries about services or website updates, please contact the admin.

---

## 📊 Version History

### v1.0.0 (2025-11-25)
- ✅ Initial release
- ✅ 6 complete pages
- ✅ AI-powered chatbot
- ✅ Review system
- ✅ Contact forms
- ✅ Mobile responsive
- ✅ Modern UI/UX

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Google** - For Gemini AI API
- **Vite** - For the blazing fast build tool

---

## 📚 Documentation

- [Setup Guide](./command.md) - Detailed setup instructions
- [Implementation Plan](./plan.md) - Project planning document
- [FAQ Data](./public/FAQ.json) - Chatbot knowledge base

---

**Made with ❤️ for Scholars Photostat Centre**

*Serving the nation with quality printing services since 1987* 🖨️✨
