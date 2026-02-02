/**
 * Contact Form Utilities
 * Handles form submission with client-side rate limiting and API integration
 */

// Configuration
const STORAGE_KEY = 'getfit_inquiry_submissions';
const MAX_SUBMISSIONS_PER_HOUR = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Check if the user is rate limited based on localStorage
 * @returns {{ isLimited: boolean, remaining: number, resetAt: Date | null }}
 */
export function checkClientRateLimit() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const now = Date.now();

        if (!stored) {
            return { isLimited: false, remaining: MAX_SUBMISSIONS_PER_HOUR, resetAt: null };
        }

        const submissions = JSON.parse(stored);

        // Filter out submissions older than the rate limit window
        const recentSubmissions = submissions.filter(
            timestamp => now - timestamp < RATE_LIMIT_WINDOW
        );

        // Update storage with only recent submissions
        if (recentSubmissions.length !== submissions.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSubmissions));
        }

        const remaining = MAX_SUBMISSIONS_PER_HOUR - recentSubmissions.length;

        if (remaining <= 0) {
            // Calculate when the oldest submission will expire
            const oldestSubmission = Math.min(...recentSubmissions);
            const resetAt = new Date(oldestSubmission + RATE_LIMIT_WINDOW);

            return {
                isLimited: true,
                remaining: 0,
                resetAt
            };
        }

        return { isLimited: false, remaining, resetAt: null };
    } catch (error) {
        console.error('Rate limit check error:', error);
        return { isLimited: false, remaining: MAX_SUBMISSIONS_PER_HOUR, resetAt: null };
    }
}

/**
 * Record a new submission timestamp
 */
export function recordSubmission() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const now = Date.now();

        let submissions = stored ? JSON.parse(stored) : [];

        // Filter out old submissions and add the new one
        submissions = submissions.filter(
            timestamp => now - timestamp < RATE_LIMIT_WINDOW
        );
        submissions.push(now);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch (error) {
        console.error('Error recording submission:', error);
    }
}

/**
 * Format remaining time until rate limit resets
 * @param {Date} resetAt - The reset time
 * @returns {string} Formatted time string
 */
export function formatTimeUntilReset(resetAt) {
    const now = new Date();
    const diff = resetAt.getTime() - now.getTime();

    if (diff <= 0) return 'now';

    const minutes = Math.ceil(diff / (1000 * 60));

    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
        return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }

    return `${hours}h ${remainingMinutes}m`;
}

/**
 * Submit contact form data to the API
 * @param {Object} formData - The form data to submit
 * @returns {Promise<{ success: boolean, message: string, inquiryId?: string }>}
 */
export async function submitContactForm(formData) {
    // Check client-side rate limit first
    const rateLimit = checkClientRateLimit();

    if (rateLimit.isLimited) {
        const timeUntilReset = formatTimeUntilReset(rateLimit.resetAt);
        throw new Error(
            `You've reached the maximum number of inquiries (${MAX_SUBMISSIONS_PER_HOUR}) per hour. ` +
            `Please try again in ${timeUntilReset}.`
        );
    }

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Try to parse the response as JSON
        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            throw new Error('Server returned an unexpected response. Please try again.');
        }

        if (!response.ok) {
            // Handle rate limit from server
            if (response.status === 429) {
                throw new Error(data.message || 'Too many requests. Please try again later.');
            }

            // Handle validation errors
            if (response.status === 400) {
                throw new Error(data.messages?.join(', ') || 'Please check your form inputs.');
            }

            throw new Error(data.message || 'Something went wrong. Please try again.');
        }

        // Record successful submission for client-side rate limiting
        recordSubmission();

        return {
            success: true,
            message: data.message || 'Inquiry submitted successfully!',
            inquiryId: data.inquiryId
        };

    } catch (error) {
        throw error;
    }
}

/**
 * Get current rate limit status for display
 * @returns {{ remaining: number, maxAllowed: number, isLimited: boolean, message?: string }}
 */
export function getRateLimitStatus() {
    const rateLimit = checkClientRateLimit();

    return {
        remaining: rateLimit.remaining,
        maxAllowed: MAX_SUBMISSIONS_PER_HOUR,
        isLimited: rateLimit.isLimited,
        message: rateLimit.isLimited
            ? `Rate limit reached. Try again in ${formatTimeUntilReset(rateLimit.resetAt)}.`
            : undefined
    };
}
