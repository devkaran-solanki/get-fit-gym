// Vercel Serverless Function for Contact Form
// This will automatically work when deployed to Vercel

// In-memory rate limiting store (note: in serverless, this resets on cold starts)
// For production, consider using Vercel KV, Upstash Redis, or similar
const rateLimitMap = new Map();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 3; // Maximum 3 submissions per hour per IP

// Helper function to get client IP
function getClientIP(req) {
    return (
        req.headers.get?.('x-forwarded-for')?.split(',')[0]?.trim() ||
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.headers.get?.('x-real-ip') ||
        req.headers['x-real-ip'] ||
        'unknown'
    );
}

// Rate limiting check
function isRateLimited(ip) {
    const now = Date.now();
    const userRecord = rateLimitMap.get(ip);

    if (!userRecord) {
        rateLimitMap.set(ip, { count: 1, firstRequest: now });
        return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
    }

    // Reset if window has passed
    if (now - userRecord.firstRequest > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, firstRequest: now });
        return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
    }

    // Check if over limit
    if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        const resetTime = new Date(userRecord.firstRequest + RATE_LIMIT_WINDOW);
        return {
            limited: true,
            remaining: 0,
            resetAt: resetTime.toISOString()
        };
    }

    // Increment count
    userRecord.count++;
    rateLimitMap.set(ip, userRecord);
    return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - userRecord.count };
}

// Validate form data
function validateFormData(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    if (!data.phone || !/^[0-9+\-\s()]{10,15}$/.test(data.phone.replace(/\s/g, ''))) {
        errors.push('Please provide a valid phone number');
    }

    // Check honeypot field (should be empty)
    if (data.website && data.website.trim() !== '') {
        errors.push('Bot detected');
    }

    return errors;
}

// CORS headers for the API
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only POST requests are allowed'
        });
    }

    try {
        const clientIP = getClientIP(req);

        // Check rate limit
        const rateLimitResult = isRateLimited(clientIP);

        // Set rate limit headers
        res.setHeader('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW);
        res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining);
        res.setHeader('Content-Type', 'application/json');

        if (rateLimitResult.limited) {
            res.setHeader('X-RateLimit-Reset', rateLimitResult.resetAt);
            return res.status(429).json({
                error: 'Too many requests',
                message: `You have exceeded the limit of ${MAX_REQUESTS_PER_WINDOW} inquiries per hour. Please try again later.`,
                resetAt: rateLimitResult.resetAt
            });
        }

        // Parse request body
        let body;
        if (typeof req.body === 'string') {
            body = JSON.parse(req.body);
        } else {
            body = req.body;
        }

        const { name, phone, goal, message, website } = body;

        // Validate form data
        const validationErrors = validateFormData({ name, phone, website });

        if (validationErrors.length > 0) {
            return res.status(400).json({
                error: 'Validation failed',
                messages: validationErrors
            });
        }

        // Prepare inquiry data
        const inquiry = {
            id: `INQ-${Date.now()}`,
            name: name.trim(),
            phone: phone.trim(),
            goal: goal || 'Not specified',
            message: message?.trim() || 'No message',
            submittedAt: new Date().toISOString(),
            ip: clientIP
        };

        // Log the inquiry (you can see this in Vercel logs)
        console.log('=== NEW INQUIRY RECEIVED ===');
        console.log(JSON.stringify(inquiry, null, 2));
        console.log('============================');

        // TODO: Add your preferred integration here:
        // 
        // Option 1: Send email using Resend (recommended)
        // const { Resend } = require('resend');
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //     from: 'Get Fit Gym <noreply@yoursite.com>',
        //     to: 'your-email@example.com',
        //     subject: `New Inquiry from ${inquiry.name}`,
        //     html: `<h1>New Gym Inquiry</h1>...`
        // });
        //
        // Option 2: Store in database (MongoDB, Supabase, etc.)
        // await db.collection('inquiries').insertOne(inquiry);
        //
        // Option 3: Send to Google Sheets via API
        // Option 4: Send to your CRM (HubSpot, Salesforce, etc.)

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Inquiry submitted successfully',
            inquiryId: inquiry.id,
            remaining: rateLimitResult.remaining
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Something went wrong. Please try again later.'
        });
    }
}
