import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FacilitiesCarousel = ({ facilities }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const progressRef = useRef(0);
    const intervalRef = useRef(null);
    const containerRef = useRef(null);
    const SLIDE_DURATION = 7000;
    const TICK_INTERVAL = 30;

    // Intersection Observer to detect when section is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.3, // Start when 30% of the section is visible
                rootMargin: '0px'
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % facilities.length);
        progressRef.current = 0;
        setProgress(0);
    }, [facilities.length]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
        progressRef.current = 0;
        setProgress(0);
    }, [facilities.length]);

    const goToSlide = useCallback((index) => {
        setActiveIndex(index);
        progressRef.current = 0;
        setProgress(0);
    }, []);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (isPaused || !isVisible) return;

        intervalRef.current = setInterval(() => {
            const increment = (TICK_INTERVAL / SLIDE_DURATION) * 100;
            progressRef.current += increment;

            if (progressRef.current >= 100) {
                progressRef.current = 0;
                setActiveIndex((prevIndex) => (prevIndex + 1) % facilities.length);
                setProgress(0);
            } else {
                setProgress(progressRef.current);
            }
        }, TICK_INTERVAL);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isPaused, isVisible, facilities.length]);

    return (
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* 1. Heading */}
            <h2 className="text-4xl font-bold text-white leading-tight order-1 lg:col-start-1 lg:row-start-1 lg:self-end">
                Facilities Built For <br />
                <span className="text-red-600 border-b-4 border-red-600">Pure Performance</span>
            </h2>

            {/* 2. Image Carousel */}
            <div
                className="relative group order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center"
                onMouseEnter={() => {
                    setIsHovered(true);
                    setIsPaused(true);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsPaused(false);
                }}
            >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-red-600/20 transform translate-x-3 translate-y-3 rounded-sm transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"></div>

                {/* Image container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-neutral-900">
                    {facilities.map((facility, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                <img
                                    src={facility.img}
                                    alt={facility.title}
                                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${isActive && !isPaused ? 'scale-110' : 'scale-100'
                                        }`}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    width="800"
                                    height="600"
                                />
                                {/* Image overlay gradient */}
                                <div className="absolute inset-0" style={{
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)'
                                }}></div>
                            </div>
                        );
                    })}

                    {/* Active facility label on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <div className="transform transition-all duration-500">
                            <span className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1 block">
                                Featured Facility
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                                {facilities[activeIndex].title}
                            </h3>
                        </div>
                    </div>

                    {/* Navigation Arrows - appear on hover */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrev();
                        }}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/10 text-white rounded-sm transition-all duration-300 hover:bg-red-600 hover:border-red-600 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                            }`}
                        aria-label="Previous facility"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/10 text-white rounded-sm transition-all duration-300 hover:bg-red-600 hover:border-red-600 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                            }`}
                        aria-label="Next facility"
                    >
                        <ArrowRight size={20} />
                    </button>

                    {/* Dot indicators */}
                    <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}>
                        {facilities.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'bg-red-600 w-6'
                                    : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Facility List */}
            <div className="order-3 lg:col-start-1 lg:row-start-2 lg:self-start">
                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    {facilities.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`relative border-l-2 pl-6 py-2 cursor-pointer transition-all duration-500 group ${activeIndex === i
                                ? 'border-red-600 bg-red-600/5'
                                : 'border-neutral-800 hover:border-neutral-600'
                                }`}
                        >
                            {/* Glow effect for active item */}
                            {activeIndex === i && (
                                <div className="absolute -left-[2px] top-0 h-full w-[2px] bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                            )}
                            <h4 className={`font-bold mb-1 text-lg transition-colors duration-300 ${activeIndex === i ? 'text-red-500' : 'text-white group-hover:text-neutral-300'
                                }`}>
                                {item.title}
                            </h4>
                            <p className={`text-sm transition-colors duration-300 ${activeIndex === i ? 'text-neutral-400' : 'text-neutral-500'
                                }`}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-10 relative">
                    <div className="h-[3px] bg-neutral-800/60 w-full rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                            style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                        ></div>
                    </div>
                    {/* Progress indicators */}
                    <div className="flex justify-between mt-3">
                        <span className="text-xs text-neutral-600 font-bold uppercase tracking-wider">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(facilities.length).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-neutral-600 font-bold uppercase tracking-wider">
                            {facilities[activeIndex].title}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesCarousel;
