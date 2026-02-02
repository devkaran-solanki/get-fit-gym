# Contact Form Setup Guide

## Overview
The contact form is fully functional with the following features:
- ✅ Form validation
- ✅ Client-side rate limiting (3 submissions/hour)
- ✅ Server-side rate limiting (IP-based)
- ✅ Honeypot spam protection
- ✅ Beautiful success modal with animations
- ✅ Error handling with user-friendly messages
- ✅ Loading states

## How It Works

### Development Mode
When running locally (`npm run dev`), form submissions are simulated:
- Data is logged to the browser console
- Rate limiting still applies (via localStorage)
- Perfect for testing the UI/UX

### Production Mode (Vercel Deployment)
When deployed to Vercel, the serverless API is automatically activated:
1. Form data is sent to `/api/contact`
2. Server validates the data and checks rate limits
3. You receive the inquiry (see Email Setup below)
4. User sees success confirmation

## Deployment Instructions

### 1. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### 2. Set Up Email Notifications (Optional but Recommended)

#### Option A: Using Resend (Easiest)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to Vercel Environment Variables:
   - `RESEND_API_KEY` = your-api-key
4. Uncomment the email sending code in `api/contact.js`

#### Option B: Using SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Add to Vercel Environment Variables:
   - `SENDGRID_API_KEY` = your-api-key
4. Install: `npm install @sendgrid/mail`
5. Add email sending code to `api/contact.js`

#### Option C: Store in Database
1. Use Supabase, MongoDB, or PlanetScale
2. Add connection string to Environment Variables
3. Modify `api/contact.js` to store inquiries

### 3. View Submissions

**Without Email Setup:**
- View in Vercel Dashboard → Your Project → Logs
- All submissions are logged with details

**With Database:**
- Access your database dashboard
- Query the `inquiries` collection/table

## Rate Limiting Details

### Client-Side (localStorage)
- Maximum 3 submissions per hour per browser
- Resets automatically after 1 hour
- Cannot be bypassed without clearing localStorage

### Server-Side (IP-based)
- Maximum 3 submissions per hour per IP address
- Stored in memory (for serverless, consider Redis/Upstash for production scale)
- Prevents attacks even if client bypasses frontend

## Customization

### Change Rate Limits
Edit these files:
- `src/utils/contactForm.js` - Client-side limits
- `api/contact.js` - Server-side limits

### Change Form Fields
Edit:
- `src/components/sections/Contact.jsx` - Form UI
- `api/contact.js` - Validation logic

### Customize Success Modal
Edit the `SuccessModal` component in `Contact.jsx`

## Testing Rate Limits

1. Submit the form 3 times
2. On the 4th attempt, you'll see:
   - Error message about rate limit
   - Button changes to "Rate Limited"
   - Remaining inquiries counter

## Security Features

1. **Honeypot Field**: Hidden field that bots fill out, humans don't see
2. **Input Validation**: Server-side validation of all fields
3. **Rate Limiting**: Dual-layer (client + server) protection
4. **IP Tracking**: Each IP address is tracked for abuse prevention
5. **CORS**: Vercel handles CORS automatically

## Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Ensure all required fields are filled

**Rate limit hit too quickly?**
- Clear localStorage: `localStorage.removeItem('getfit_inquiry_submissions')`
- Wait for the cooldown period

**API not working in production?**
- Check Vercel function logs
- Ensure `api/contact.js` is properly deployed
- Verify environment variables are set
