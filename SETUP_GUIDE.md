# ColorFarmers - Setup & Configuration Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Gemini API Configuration
# Get your API key from: https://makersuite.google.com/app/apikey
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# EmailJS Configuration
# Get your credentials from: https://www.emailjs.com/
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=infoscholars@yahoo.com
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

### 3. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Paste it in your `.env.local` file as `NEXT_PUBLIC_GEMINI_API_KEY`

**Important:** Make sure you're using **Gemini 2.5-flash** model (configured in the code). Gemini 1.5 and 2.0 are deprecated by Google.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Troubleshooting

### Chatbot Not Working

If the chatbot is not responding, check the browser console (F12) for error messages:

1. **API Key Missing**: You'll see `❌ API Key Missing`
   - **Fix**: Add `NEXT_PUBLIC_GEMINI_API_KEY` to your `.env.local` file

2. **API Key Invalid**: You'll see an error about invalid API key
   - **Fix**: Get a new API key from Google AI Studio

3. **Quota Exceeded**: You'll see a quota error
   - **Fix**: Check your API usage limits in Google AI Studio

4. **Model Not Available**: Error about model not found
   - **Fix**: The code is configured for `gemini-2.5-flash`. Don't change it to 1.5 or 2.0 as they're deprecated.

### Dependencies Issues

If you encounter dependency errors:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

If the build fails:

```bash
# Clean Next.js cache
rm -rf .next
npm run build
```

## 📝 Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini API key for chatbot | Yes |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID for email notifications | Yes |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID | Yes |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key | Yes |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Admin email address | Yes |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin panel password | Yes |

## 🤖 Chatbot Configuration

The chatbot is configured to use:
- **Model**: `gemini-2.5-flash` (latest stable model)
- **Context**: Includes FAQ data from `/public/FAQ.json`
- **Features**: 
  - Intelligent responses about services
  - FAQ integration
  - Error handling with helpful messages
  - Debug logging in console

### Testing the Chatbot

1. Open the website
2. Click the chat button in the bottom-right corner
3. Type a message
4. Check the browser console (F12) for debug information:
   - `🔑 API Key Check` - Confirms API key is loaded
   - `🤖 Initializing Gemini AI` - Shows model initialization
   - `📤 Sending message` - Confirms message is being sent
   - `✅ Response received` - Confirms successful response

## 🎨 UI/UX Features

- **Responsive Design**: Works on all screen sizes
- **Modern Animations**: Smooth transitions and micro-interactions
- **Gradient Themes**: Beautiful color schemes
- **Accessible**: Keyboard navigation support
- **Fast Loading**: Optimized for performance

## 📦 Project Structure

```
colorfarmers/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── admin/             # Admin panel
│   └── ...                # Other pages
├── components/            # React components
│   ├── Chatbot.tsx        # AI Chatbot component
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer component
│   └── ...                # Other components
├── contexts/              # React contexts
│   ├── AuthContext.tsx    # Authentication context
│   └── NotificationContext.tsx
├── public/                # Static files
│   └── FAQ.json           # FAQ data for chatbot
├── .env.local             # Environment variables (create this)
└── package.json           # Dependencies

```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables in Vercel

Go to your project settings in Vercel and add all the environment variables from `.env.local`.

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Review this guide
3. Check that all environment variables are set correctly
4. Ensure you're using the latest version of Node.js (18+)

## 🔄 Updates

To update dependencies:

```bash
npm update
```

To check for outdated packages:

```bash
npm outdated
```

---

**Last Updated**: November 2025
**Gemini Model**: 2.5-flash (stable)
