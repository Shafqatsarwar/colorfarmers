# 📧 EmailJS Setup Guide for ColorFarmers

**For Client Reference**

This guide will help you set up email notifications for your ColorFarmers website. When configured, customers will receive order confirmations and you'll get notifications for new orders.

## Loook al details in .env.example file in project root directory and fill the values in .env.local file for smooth communications
---

## 🎯 What is EmailJS?

EmailJS is a free service that allows your website to send emails directly from the browser without needing a backend server.

**Benefits:**
- ✅ **FREE** for up to 200 emails/month
- ✅ No credit card required
- ✅ Works with Gmail, Outlook, Yahoo, etc.
- ✅ Easy to set up (5-10 minutes)

---

## 📋 What You'll Need

1. An email account (Gmail recommended)
2. 5-10 minutes of your time
3. Access to your `.env.local` file

---

## 🚀 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to: **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Create a free account using your email
4. Verify your email address

---

### Step 2: Add Email Service

1. After logging in, click **"Add New Service"**
2. Choose your email provider:
   - **Gmail** (recommended)
   - Outlook
   - Yahoo
   - Or any other provider

3. **For Gmail:**
   - Click on Gmail
   - Click **"Connect Account"**
   - Sign in with your Google account
   - Allow EmailJS to send emails on your behalf
   - Give your service a name (e.g., "ColorFarmers Notifications")

4. **Copy the Service ID**
   - After connecting, you'll see a **Service ID** (looks like: `service_abc123`)
   - **SAVE THIS** - you'll need it later

---

### Step 3: Create Email Template

1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Set up your template:

   **Template Name:** `ColorFarmers Order Notification`

   **Subject Line:**
   ```
   {{subject}}
   ```

   **Email Body:**
   ```
   Dear {{to_name}},

   {{message}}

   Best regards,
   ColorFarmers - Scholars Photostat Centre
   Muslim Town Mor, Beside Jamia Asharfia
   147-Ferozepur Road, Lahore
   Phone: 042-37503264-5, Mobile: 0300-4251833
   Email: infoscholars@yahoo.com
   ```

4. **Important Settings:**
   - To Email: `{{to_email}}`
   - From Name: `ColorFarmers`
   - From Email: Use your connected email
   - Reply To: `infoscholars@yahoo.com`

5. Click **"Save"**
6. **Copy the Template ID** (looks like: `template_xyz789`)
   - **SAVE THIS** - you'll need it later

---

### Step 4: Get Your Public Key

1. Click on your **profile icon** (top right)
2. Go to **"Account"** → **"General"**
3. Find the **"Public Key"** section
4. **Copy the Public Key** (looks like: `AbCdEfGh123456`)
   - **SAVE THIS** - you'll need it later

---

### Step 5: Add to Your Website

1. Open your project folder: `d:\Panaverse\colorfarmers`
2. Find the file: `.env.local`
3. Add these three lines (replace with your actual values):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=AbCdEfGh123456
```

**Example with real values:**
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_8k2m9x1
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_h7j4p2q
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Kx9mP2nQ5rT8vW
```

4. **Save the file**

---

### Step 6: Restart Your Website

1. If your website is running, **stop it** (press Ctrl+C in the terminal)
2. **Start it again:**
   ```bash
   npm run dev
   ```
3. Wait for it to start (you'll see: "Ready on http://localhost:3000")

---

## ✅ Test Email Functionality

1. Open your website: http://localhost:3000
2. Go to the **Order** page
3. Fill out the order form with your email
4. Submit the order
5. **Check your email** - you should receive an order confirmation!
6. **Check admin email** (infoscholars@yahoo.com) - should receive new order notification!

---

## 🎯 What Emails Will Be Sent?

Once configured, your website will automatically send:

1. **Order Confirmation to Customer**
   - Sent when customer places an order
   - Includes order details, ID, and status

2. **New Order Notification to Admin**
   - Sent to: infoscholars@yahoo.com
   - Includes customer details and order information

3. **Order Status Updates**
   - Sent when you update order status in admin panel
   - Notifies customer of changes

4. **Review Notifications**
   - Sent when customers submit reviews
   - Sent when reviews are approved

---

## 📊 Email Limits (Free Plan)

- **200 emails per month** (FREE)
- **50 emails per day**
- More than enough for most small businesses!

**Need more?**
- Paid plans start at $7/month for 1,000 emails
- Upgrade anytime from EmailJS dashboard

---

## 🔍 Troubleshooting

### "Email not received"

**Check:**
1. ✅ All three values added to `.env.local`
2. ✅ No typos in Service ID, Template ID, or Public Key
3. ✅ Website restarted after adding values
4. ✅ Check spam/junk folder
5. ✅ Email service is connected in EmailJS dashboard

### "Invalid API key" error

**Solution:**
- Double-check you copied the Public Key correctly
- Make sure there are no extra spaces
- Try regenerating the Public Key in EmailJS

### "Service not found" error

**Solution:**
- Verify Service ID is correct
- Make sure email service is still connected in EmailJS
- Try reconnecting your email account

---

## 🔒 Security Notes

- ✅ Never share your `.env.local` file
- ✅ Never commit `.env.local` to Git (it's already in .gitignore)
- ✅ Public Key is safe to use in browser (it's meant to be public)
- ✅ EmailJS handles all email sending securely

---

## 📞 Need Help?

If you encounter any issues:

1. **Check EmailJS Dashboard:**
   - Go to https://www.emailjs.com/
   - Check "Email History" to see if emails were sent
   - Check "Email Service" to verify connection

2. **Check Browser Console:**
   - Press F12 in your browser
   - Look for error messages
   - Share them with your developer

3. **Contact EmailJS Support:**
   - They have excellent free support
   - Usually respond within 24 hours

---

## 📝 Quick Reference

**Your EmailJS Credentials (fill these in):**

```
Service ID: ___________________
Template ID: ___________________
Public Key: ___________________
```

**Where to add them:**
- File: `.env.local`
- Location: `d:\Panaverse\colorfarmers\.env.local`

**After adding:**
- Restart website: `npm run dev`
- Test by placing an order

---

## ✨ Summary

1. ✅ Create EmailJS account (free)
2. ✅ Connect your email (Gmail recommended)
3. ✅ Create email template
4. ✅ Copy Service ID, Template ID, Public Key
5. ✅ Add to `.env.local`
6. ✅ Restart website
7. ✅ Test by placing order

**Time Required:** 5-10 minutes  
**Cost:** FREE (up to 200 emails/month)  
**Difficulty:** Easy (just copy & paste)

---

**Last Updated:** December 6, 2025  
**For:** ColorFarmers - Scholars Photostat Centre  
**Contact:** infoscholars@yahoo.com | 0300-4251833
