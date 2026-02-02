import React, { useState, useCallback, useEffect } from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter, ArrowRight, CheckCircle, X, Loader2, Sparkles, AlertTriangle, Shield } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';
import CustomSelect from '../common/CustomSelect';
import { submitContactForm, getRateLimitStatus, formatTimeUntilReset } from '../../utils/contactForm';

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, formData }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Small delay to trigger animation
            setTimeout(() => setIsVisible(true), 50);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Animated particles/confetti effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: i % 2 === 0 ? '#dc2626' : '#fbbf24',
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            opacity: isVisible ? 0.6 : 0,
                            transform: isVisible ? 'scale(1)' : 'scale(0)',
                            transition: `all ${0.5 + Math.random() * 0.5}s ease-out ${i * 0.05}s`
                        }}
                    />
                ))}
            </div>

            {/* Modal Content */}
            <div className={`relative bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 p-8 md:p-12 max-w-md w-full transform transition-all duration-700 ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-full transition-all duration-300"
                >
                    <X size={20} />
                </button>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                {/* Glow effects */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl" />

                {/* Success Icon */}
                <div className="relative flex justify-center mb-8">
                    <div className="relative">
                        {/* Outer ring animation */}
                        <div className={`absolute inset-0 w-24 h-24 border-4 border-red-600/30 rounded-full transition-all duration-1000 ${isVisible ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
                            style={{ animationDelay: '0.3s' }}
                        />
                        <div className={`absolute inset-0 w-24 h-24 border-4 border-red-500/20 rounded-full transition-all duration-1000 delay-200 ${isVisible ? 'scale-[1.8] opacity-0' : 'scale-100 opacity-100'}`} />

                        {/* Main icon container */}
                        <div className={`w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-xl shadow-red-600/30 transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}>
                            <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Sparkles size={18} className="text-yellow-500" />
                        <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">Congratulations</span>
                        <Sparkles size={18} className="text-yellow-500" />
                    </div>

                    <h3 className="text-3xl font-black text-white mb-4 uppercase italic">
                        You're In!
                    </h3>

                    <p className="text-neutral-400 mb-8 leading-relaxed">
                        Thanks for reaching out, <span className="text-white font-semibold">{formData.name || 'Champion'}</span>!
                        Our team will contact you within <span className="text-red-500 font-semibold">24 hours</span> to kickstart your fitness journey.
                    </p>

                    {/* Summary card */}
                    <div className="bg-neutral-800/50 border border-neutral-700/50 p-5 mb-8 text-left">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Your Inquiry Summary</p>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-neutral-500 text-sm">Name:</span>
                                <span className="text-white text-sm font-medium">{formData.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-500 text-sm">Phone:</span>
                                <span className="text-white text-sm font-medium">{formData.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-neutral-500 text-sm">Goal:</span>
                                <span className="text-red-500 text-sm font-medium">{formData.goal || 'Not specified'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold uppercase tracking-widest hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
                    >
                        Let's Go!
                    </button>
                </div>
            </div>
        </div>
    );
};

const Contact = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        goal: '',
        message: '',
        website: '' // Honeypot field - should remain empty
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [error, setError] = useState(null);
    const [rateLimitInfo, setRateLimitInfo] = useState(null);

    // Check rate limit status on mount and periodically
    useEffect(() => {
        const checkRateLimit = () => {
            const status = getRateLimitStatus();
            setRateLimitInfo(status);
        };

        checkRateLimit();
        const interval = setInterval(checkRateLimit, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, []);

    // Handle input changes
    const handleInputChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    }, [error]);

    // Handle goal selection from CustomSelect
    const handleGoalChange = useCallback((value) => {
        setFormData(prev => ({
            ...prev,
            goal: value
        }));
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate required fields
        if (!formData.name.trim() || !formData.phone.trim()) {
            setError('Please fill in all required fields.');
            return;
        }

        // Check honeypot (bot detection)
        if (formData.website.trim() !== '') {
            // Silently fail for bots
            console.log('Bot detected via honeypot');
            setIsSubmitting(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            return;
        }

        // Check rate limit before submitting
        const rateLimitStatus = getRateLimitStatus();
        if (rateLimitStatus.isLimited) {
            setError(rateLimitStatus.message);
            setRateLimitInfo(rateLimitStatus);
            return;
        }

        setIsSubmitting(true);

        try {
            // Submit to API (or simulate in development)
            const result = await submitContactForm({
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                goal: formData.goal,
                message: formData.message.trim(),
                website: formData.website // Include honeypot for server-side check
            });

            console.log('Submission successful:', result);

            // Store submitted data for success modal
            setSubmittedData({ ...formData });

            // Show success modal
            setShowSuccess(true);

            // Reset form
            setFormData({
                name: '',
                phone: '',
                goal: '',
                message: '',
                website: ''
            });

            // Update rate limit info
            setRateLimitInfo(getRateLimitStatus());

        } catch (err) {
            console.error('Submission error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
            setRateLimitInfo(getRateLimitStatus());
        } finally {
            setIsSubmitting(false);
        }
    };

    // Close success modal
    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setSubmittedData(null);
    };

    return (
        <>
            <section id="contact" className="py-16 md:py-24 bg-neutral-950">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <RevealOnScroll>
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-6">Join The Club</h2>
                                <p className="text-neutral-400 mb-12 text-lg font-light">
                                    Stop waiting. Start training. Visit us or drop a message to schedule your orientation.
                                </p>
                                <div className="space-y-8">
                                    {[
                                        { icon: <MapPin size={24} />, title: "Visit Us", lines: ["Get Fit Gym, [Street Name],", "Near [Landmark], Rajkot, Gujarat, India."] },
                                        { icon: <Phone size={24} />, title: "Call Us", lines: ["+91 98765 43210", "+91 91234 56789"] },
                                        { icon: <Clock size={24} />, title: "Working Hours", lines: ["Mon - Sat: 6:00 AM - 10:00 PM", "Sunday: Closed"] }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-5 group p-4 -m-4 rounded-sm hover:bg-neutral-900/50 transition-all duration-300">
                                            <div className="w-14 h-14 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 group-hover:border-red-600/50 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-500 rounded-sm">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2 group-hover:text-red-500 transition-colors">{item.title}</h4>
                                                {item.lines.map((line, lineIdx) => (
                                                    <p key={lineIdx} className="text-neutral-400 text-sm leading-relaxed">{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 mt-12">
                                    <a href="#" className="group relative w-11 h-11 border border-neutral-700/80 bg-neutral-900/30 flex items-center justify-center text-neutral-500 rounded overflow-hidden transition-all duration-500 ease-out hover:border-red-500/60 hover:text-white hover:shadow-[0_0_8px_rgba(239,68,68,0.5),0_0_15px_rgba(239,68,68,0.2)]">
                                        <span className="absolute inset-0 bg-gradient-to-tr from-red-600/0 to-red-500/0 group-hover:from-red-600/15 group-hover:to-red-500/10 transition-all duration-500 ease-out"></span>
                                        <Instagram size={18} className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-[1px]" />
                                    </a>
                                    <a href="#" className="group relative w-11 h-11 border border-neutral-700/80 bg-neutral-900/30 flex items-center justify-center text-neutral-500 rounded overflow-hidden transition-all duration-500 ease-out hover:border-red-500/60 hover:text-white hover:shadow-[0_0_8px_rgba(239,68,68,0.5),0_0_15px_rgba(239,68,68,0.2)]">
                                        <span className="absolute inset-0 bg-gradient-to-tr from-red-600/0 to-red-500/0 group-hover:from-red-600/15 group-hover:to-red-500/10 transition-all duration-500 ease-out"></span>
                                        <Facebook size={18} className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-[1px]" />
                                    </a>
                                    <a href="#" className="group relative w-11 h-11 border border-neutral-700/80 bg-neutral-900/30 flex items-center justify-center text-neutral-500 rounded overflow-hidden transition-all duration-500 ease-out hover:border-red-500/60 hover:text-white hover:shadow-[0_0_8px_rgba(239,68,68,0.5),0_0_15px_rgba(239,68,68,0.2)]">
                                        <span className="absolute inset-0 bg-gradient-to-tr from-red-600/0 to-red-500/0 group-hover:from-red-600/15 group-hover:to-red-500/10 transition-all duration-500 ease-out"></span>
                                        <Twitter size={18} className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-[1px]" />
                                    </a>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200}>
                            <div className="relative">
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -z-10"></div>
                                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -z-10"></div>

                                <form
                                    className="bg-neutral-950/80 backdrop-blur-xl p-8 md:p-12 border border-neutral-800 relative overflow-hidden group"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

                                    <h3 className="text-3xl font-black text-white mb-2 uppercase italic">Start Your Legacy</h3>
                                    <p className="text-neutral-500 mb-10 text-sm">Fill out the form below and we'll contact you within 24 hours.</p>

                                    <div className="space-y-8">
                                        <div className="relative z-0 w-full group">
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-neutral-800 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer transition-colors disabled:opacity-50"
                                                placeholder=" "
                                                required
                                                disabled={isSubmitting}
                                            />
                                            <label htmlFor="name" className="peer-focus:font-medium absolute text-xs font-bold text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest">
                                                Full Name
                                            </label>
                                        </div>

                                        <div className="relative z-0 w-full group">
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-neutral-800 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer transition-colors disabled:opacity-50"
                                                placeholder=" "
                                                required
                                                disabled={isSubmitting}
                                            />
                                            <label htmlFor="phone" className="peer-focus:font-medium absolute text-xs font-bold text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest">
                                                Phone Number
                                            </label>
                                        </div>

                                        <CustomSelect
                                            placeholder="Goal"
                                            options={["Weight Loss", "Muscle Building", "General Fitness", "Personal Training"]}
                                            onChange={handleGoalChange}
                                            value={formData.goal}
                                        />

                                        <div className="relative z-0 w-full group">
                                            <textarea
                                                id="message"
                                                rows="2"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b-2 border-neutral-800 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer transition-colors resize-none disabled:opacity-50"
                                                placeholder=" "
                                                disabled={isSubmitting}
                                            ></textarea>
                                            <label htmlFor="message" className="peer-focus:font-medium absolute text-xs font-bold text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest">
                                                Any Specific Targets?
                                            </label>
                                        </div>

                                        {/* Honeypot field - hidden from users, only bots fill this */}
                                        <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
                                            <label htmlFor="website">Website (Leave empty)</label>
                                            <input
                                                type="text"
                                                id="website"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                tabIndex={-1}
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* Error Display */}
                                        {error && (
                                            <div className="flex items-start gap-3 p-4 bg-red-950/50 border border-red-900/50 rounded animate-pulse">
                                                <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-red-400 text-sm font-medium">{error}</p>
                                                    {rateLimitInfo?.isLimited && (
                                                        <p className="text-red-500/70 text-xs mt-1">
                                                            Rate limit: {rateLimitInfo.remaining}/{rateLimitInfo.maxAllowed} remaining
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Rate Limit Info (subtle indicator when not at limit) */}
                                        {!error && rateLimitInfo && rateLimitInfo.remaining < rateLimitInfo.maxAllowed && (
                                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                                <Shield size={14} />
                                                <span>{rateLimitInfo.remaining} inquiries remaining this hour</span>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting || rateLimitInfo?.isLimited}
                                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : rateLimitInfo?.isLimited ? (
                                                    <>
                                                        <Shield size={18} />
                                                        Rate Limited
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Inquiry <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </span>
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-red-700/50"></div>
                                        </button>

                                        {/* Security Badge */}
                                        <div className="flex items-center justify-center gap-2 pt-4 border-t border-neutral-800/50">
                                            <Shield size={14} className="text-green-500" />
                                            <span className="text-xs text-neutral-500">Your information is secure and encrypted</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccess}
                onClose={handleCloseSuccess}
                formData={submittedData || {}}
            />
        </>
    );
};

export default Contact;
