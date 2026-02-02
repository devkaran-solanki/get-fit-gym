import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import Lenis from 'lenis';

// Create context for Lenis instance
const LenisContext = createContext(null);

/**
 * Hook to access the Lenis instance
 * @returns {Lenis | null} The Lenis instance
 */
export const useLenis = () => useContext(LenisContext);

/**
 * SmoothScroll Provider Component
 * Wraps the app with Lenis smooth scrolling
 */
export const SmoothScrollProvider = ({ children }) => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        // Initialize Lenis with premium settings
        const lenisInstance = new Lenis({
            // Smooth scroll duration - higher = smoother but slower
            duration: 1.2,
            // Easing function for that premium feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // Direction: vertical
            orientation: 'vertical',
            // Gesture orientation
            gestureOrientation: 'vertical',
            // Smooth scroll on mouse wheel
            smoothWheel: true,
            // Wheel multiplier - adjust scroll speed
            wheelMultiplier: 1,
            // Touch multiplier for mobile
            touchMultiplier: 2,
            // Infinite scroll (disabled)
            infinite: false,
        });

        // Store the instance in state
        setLenis(lenisInstance);

        // RAF loop for smooth animation
        let rafId;
        function raf(time) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            cancelAnimationFrame(rafId);
            lenisInstance.destroy();
            setLenis(null);
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
};

/**
 * Hook for scroll callbacks
 * Calls the callback on every scroll event
 */
export const useScrollCallback = (callback) => {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        lenis.on('scroll', callback);

        return () => {
            lenis.off('scroll', callback);
        };
    }, [lenis, callback]);
};

/**
 * Scroll to a specific element or position
 * Can be used outside of React components
 * @param {string | HTMLElement | number} target - Target to scroll to
 * @param {Object} options - Scroll options
 */
export const scrollTo = (target, options = {}) => {
    // Try to find the Lenis instance from the window
    const lenis = window.__lenis;

    if (lenis) {
        lenis.scrollTo(target, {
            offset: options.offset || -80,
            duration: options.duration || 1.2,
            easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
            immediate: options.immediate || false,
            lock: options.lock || false,
            onComplete: options.onComplete || null,
        });
    } else {
        // Fallback for non-Lenis environments
        if (typeof target === 'string') {
            const element = document.querySelector(target);
            element?.scrollIntoView({ behavior: 'smooth' });
        } else if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: 'smooth' });
        } else if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

export default SmoothScrollProvider;

