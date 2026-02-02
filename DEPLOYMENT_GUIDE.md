# Get Fit Gym - Vercel Deployment Guide

This guide explains how to deploy your Get Fit Gym website to Vercel and make the contact form fully functional.

---

## 📋 Prerequisites

1. A [GitHub](https://github.com), [GitLab](https://gitlab.com), or [Bitbucket](https://bitbucket.org) account
2. A [Vercel](https://vercel.com) account (free tier is sufficient)
3. Your code pushed to a Git repository

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

If you haven't already, push your project to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Get Fit Gym website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/get-fit-gym.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use your GitHub account for easiest setup)
2. Click **"Add New..."** → **"Project"**
3. Select your `get-fit-gym` repository from the list
4. Click **"Import"**

### Step 3: Configure Project Settings

Vercel will auto-detect that this is a Vite project. Verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site is now live! 🎉

---

## 📧 Contact Form Setup

The contact form uses a Vercel Serverless Function located at `/api/contact.js`. It works automatically once deployed!

### How It Works

When a user submits the contact form:

1. **Client-side validation** checks required fields
2. **Honeypot field** prevents basic bot submissions
3. **Client-side rate limiting** (3 submissions per hour per browser)
4. **Server-side rate limiting** (3 submissions per hour per IP)
5. **Form data is logged** to Vercel's Function Logs

### Viewing Inquiries

Currently, inquiries are logged to Vercel's serverless function logs:

1. Go to your Vercel Dashboard
2. Select your project
3. Click **"Functions"** tab or **"Logs"** tab  
4. Filter by `api/contact` to see all form submissions

Each submission shows:
```json
{
  "id": "INQ-1234567890",
  "name": "John Doe",
  "phone": "+91 98765 43210",
  "goal": "Muscle Building",
  "message": "I want to join the gym",
  "submittedAt": "2026-02-02T15:30:00.000Z"
}
```

---

## 📬 (Optional) Email Notifications with Resend

Want to receive email notifications for each inquiry? Follow these steps:

### Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up (free tier: 100 emails/day)
2. Verify your email
3. Go to **API Keys** and create a new API key
4. Copy the key (starts with `re_...`)

### Step 2: Add Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (e.g., `re_abc123...`)
   - **Environment:** Production
4. Click **"Save"**

### Step 3: Update the API Function

Update the `api/contact.js` file to send emails:

```javascript
// Add at the top of the file
import { Resend } from 'resend';

// Inside the handler function, after creating the inquiry object:
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
    from: 'Get Fit Gym <onboarding@resend.dev>', // Use your domain after verification
    to: 'your-email@example.com', // Your email to receive notifications
    subject: `🏋️ New Inquiry from ${inquiry.name}`,
    html: `
        <h1>New Gym Inquiry</h1>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Phone:</strong> ${inquiry.phone}</p>
        <p><strong>Goal:</strong> ${inquiry.goal}</p>
        <p><strong>Message:</strong> ${inquiry.message || 'No message'}</p>
        <p><strong>Submitted:</strong> ${inquiry.submittedAt}</p>
    `
});
```

### Step 4: Install Resend Package

Add the dependency:

```bash
npm install resend
```

Then commit and push. Vercel will automatically redeploy.

---

## 🗄️ (Optional) Store Inquiries in a Database

For a more robust solution, consider storing inquiries in a database.

### Option A: Vercel KV (Recommended for simplicity)

1. Go to Vercel Dashboard → **Storage** → **Create** → **KV**
2. Connect it to your project
3. Use the Vercel KV SDK in your API:

```javascript
import { kv } from '@vercel/kv';

// Inside handler:
await kv.lpush('inquiries', JSON.stringify(inquiry));
```

### Option B: MongoDB Atlas (Free tier available)

1. Create a MongoDB Atlas cluster at [mongodb.com](https://mongodb.com)
2. Get your connection string
3. Add `MONGODB_URI` to Vercel environment variables
4. Use the MongoDB driver in your API

### Option C: Supabase (PostgreSQL)

1. Create a project at [supabase.com](https://supabase.com)
2. Create an `inquiries` table
3. Add `SUPABASE_URL` and `SUPABASE_KEY` to Vercel
4. Use the Supabase client in your API

---

## 🌐 Custom Domain (Optional)

1. Go to your Vercel project → **Settings** → **Domains**
2. Add your custom domain (e.g., `getfitgym.com`)
3. Follow the DNS configuration instructions
4. Vercel automatically provisions an SSL certificate

---

## 🔒 Security Features Included

| Feature | Description |
|---------|-------------|
| **Honeypot Field** | Hidden field that bots fill out, real users don't |
| **Client Rate Limiting** | Max 3 submissions per hour (localStorage-based) |
| **Server Rate Limiting** | Max 3 submissions per hour per IP address |
| **Input Validation** | Server validates name (2+ chars) and phone format |
| **HTTPS** | Automatic SSL certificate from Vercel |

---

## 🔄 Continuous Deployment

After initial setup, every time you push to your main branch, Vercel automatically:

1. Builds your project
2. Runs any tests
3. Deploys to production

No manual deployment needed!

---

## ❓ Troubleshooting

### Form returns "Something went wrong"
- Check Vercel Function Logs for errors
- Verify the API route exists at `/api/contact.js`

### Emails not sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for failed deliveries
- Ensure the `from` email domain is verified in Resend

### 404 on API routes
- Make sure `api/contact.js` is in the root `/api` folder
- Redeploy after adding/moving the file

---

## 📞 Support

If you encounter any issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Resend Documentation](https://resend.com/docs)

---

Happy deploying! 🚀
