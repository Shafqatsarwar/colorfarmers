# ColorFarmers - Next.js Setup & Deployment Commands

## Project Information
- **Project Name:** ColorFarmers
- **Business:** Scholars Photostat Centre
- **Technology:** Next.js + React + Tailwind CSS
- **AI Integration:** Google Gemini API

---

## ✅ Environment Variables Already Configured

Your API key and contact information are already set up:
- **Gemini API Key:** AIzaSyDByN4sd4a1mm5aYDCOKBpLZiaRQmPS8DI
- **WhatsApp:** 923004251833
- **Email:** infoscholars@yahoo.com

---

## Initial Setup

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages:
- Next.js 15
- React & React DOM
- Tailwind CSS
- Google Generative AI SDK
- EmailJS

---

## Development

### 2. Create .env.local File
The `.env.local` file is already configured with your credentials. If you need to recreate it, copy from `.env.example`:

```bash
copy .env.example .env.local
```

Your `.env.local` should contain:
```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDByN4sd4a1mm5aYDCOKBpLZiaRQmPS8DI
NEXT_PUBLIC_WHATSAPP_NUMBER=923004251833
NEXT_PUBLIC_ADMIN_EMAIL=infoscholars@yahoo.com
```

### 3. Run Development Server
```bash
npm run dev
```

This will start the development server at:
- **URL:** http://localhost:3000
- **Auto-reload:** Enabled
- **Fast Refresh:** Enabled

The browser should open automatically.

---

## Building for Production

### 4. Create Production Build
```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### 5. Start Production Server Locally
```bash
npm start
```

This serves the production build locally for testing before deployment.

---

## Deployment

### Option 1: Deploy to Vercel (Recommended for Next.js)

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Login to Vercel
```bash
vercel login
```

#### Deploy to Production
```bash
vercel --prod
```

**Important:** Add environment variables in Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   - `NEXT_PUBLIC_GEMINI_API_KEY` = `AIzaSyDByN4sd4a1mm5aYDCOKBpLZiaRQmPS8DI`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `923004251833`
   - `NEXT_PUBLIC_ADMIN_EMAIL` = `infoscholars@yahoo.com`

---

### Option 2: Deploy to Railway

#### Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Login to Railway
```bash
railway login
```

#### Initialize Project
```bash
railway init
```

#### Deploy
```bash
railway up
```

**Important:** Add environment variables in Railway Dashboard with the same values as above.

---

### Option 3: Deploy via GitHub

#### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - ColorFarmers Next.js project"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

#### Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub
4. Select your repository
5. Add environment variables (see above)
6. Deploy!

---

## Project Structure (Next.js)

```
colorfarmers/
├── app/
│   ├── layout.js            # Root layout with fonts & metadata
│   ├── page.js              # Home page route
│   ├── globals.css          # Global styles
│   ├── about/
│   │   └── page.js          # About page
│   ├── start-today/
│   │   └── page.js          # Start Today page
│   ├── rates/
│   │   └── page.js          # Rates page
│   ├── reviews/
│   │   └── page.js          # Reviews page
│   └── contact/
│       └── page.js          # Contact page
├── components/
│   ├── Navbar.js            # Navigation bar
│   ├── Footer.js            # Footer component
│   ├── ChatButton.js        # Chat button
│   ├── Chatbot.js           # AI chatbot
│   └── pages/
│       ├── Home.js          # Home page component
│       ├── About.js         # About page component
│       ├── StartToday.js    # Start Today component
│       ├── Rates.js         # Rates component
│       ├── Reviews.js       # Reviews component
│       └── Contact.js       # Contact component
├── public/
│   ├── FAQ.json             # Chatbot FAQ data
│   └── Logo.jpg             # Company logo (add your logo here)
├── .env.local               # Local environment variables (DO NOT COMMIT)
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
├── plan.md                  # Implementation plan
└── command.md               # This file
```

---

## Key Differences from Vite

### Environment Variables
- **Vite:** `VITE_` prefix
- **Next.js:** `NEXT_PUBLIC_` prefix
- **File:** `.env.local` instead of `.env`

### Routing
- **Vite:** React Router (manual setup)
- **Next.js:** File-based routing (automatic)

### Components
- **Client Components:** Add `'use client'` at the top
- **Server Components:** Default (no directive needed)

### Imports
- **Vite:** `import.meta.env.VITE_*`
- **Next.js:** `process.env.NEXT_PUBLIC_*`

---

## Important Notes

### Security
- ✅ `.env.local` file is in `.gitignore` - never commit it!
- ✅ Use `NEXT_PUBLIC_` prefix for client-side variables
- ✅ API keys are already configured

### Logo
- Add your company logo as `public/Logo.jpg`
- Recommended size: 500x500px or larger
- Format: JPG, PNG, or SVG

### Chatbot
- ✅ Gemini API key is already configured
- ✅ FAQ data is loaded from `public/FAQ.json`
- ✅ Arabic greeting included

### Forms
- Review and contact forms use `mailto:` by default
- Can be upgraded to EmailJS for better functionality
- All submissions notify admin via email

---

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear Next.js cache and rebuild
rmdir /s /q .next
npm run build
```

### Chatbot Not Working
1. Check if `NEXT_PUBLIC_GEMINI_API_KEY` is set in `.env.local`
2. Verify the API key is valid (already configured: AIzaSyDByN4sd4a1mm5aYDCOKBpLZiaRQmPS8DI)
3. Check browser console for errors

### Styles Not Loading
```bash
# Rebuild
npm run build
npm run dev
```

---

## Testing Checklist

Before deployment, verify:
- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables configured (.env.local file)
- [ ] Logo added to public folder
- [ ] All pages load correctly
- [ ] Chatbot displays and responds
- [ ] Forms submit successfully
- [ ] WhatsApp links work (923004251833)
- [ ] Email links work (infoscholars@yahoo.com)
- [ ] Mobile responsive on all pages
- [ ] No console errors

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel --prod

# Deploy to Railway
railway up
```

---

## Support

For issues or questions:
- **Email:** infoscholars@yahoo.com
- **Phone:** 042-37503264-5
- **Mobile:** 0300-4251833
- **WhatsApp:** 0300-4251833

---

## Version History

- **v2.0.0** (2025-11-25) - Migrated to Next.js
  - Converted from Vite to Next.js 15
  - File-based routing
  - Improved SEO with metadata
  - Better performance
  - All features preserved

- **v1.0.0** (2025-11-25) - Initial Vite release

---

**Last Updated:** 2025-11-25
**Framework:** Next.js 15
**Maintained by:** ColorFarmers Development Team
