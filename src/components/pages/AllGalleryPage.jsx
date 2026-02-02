import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';

const AllGalleryPage = React.memo(({ gallery, onBack }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Block scrolling when lightbox is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowLeft') {
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
            } else if (e.key === 'ArrowRight') {
                setSelectedIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
            } else if (e.key === 'Escape') {
                setSelectedIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, gallery.length]);

    const selectedImage = selectedIndex !== null ? gallery[selectedIndex] : null;

    const goToPrev = (e) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 animate-in fade-in duration-700">
            {/* Header */}
            <div className="container mx-auto px-6 md:px-16 mb-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-neutral-400 hover:text-red-500 transition-colors duration-500 uppercase tracking-widest text-xs font-bold group mb-12 cursor-pointer"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-500" />
                    Back to Gallery
                </button>

                <div className="flex items-center gap-4 md:gap-6 mb-6">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        <span className="text-red-600">Gallery</span>
                    </h1>
                    <div className="h-[2px] bg-gradient-to-r from-red-600 to-transparent w-16 md:w-48"></div>
                </div>
                <p className="text-neutral-400 max-w-2xl text-lg font-light">
                    Take a visual tour of Rajkot's most premium fitness facility. State-of-the-art equipment, immaculate spaces.
                </p>
            </div>

            {/* Gallery Grid - Masonry-like layout */}
            <div className="container mx-auto px-6 md:px-16 pb-24">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {gallery.map((item, index) => (
                        <RevealOnScroll key={index} delay={index * 75}>
                            <div
                                onClick={() => setSelectedIndex(index)}
                                className={`group relative overflow-hidden cursor-pointer ${index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
                                    }`}
                            >
                                <div className={`relative ${index === 0 || index === 5 ? 'aspect-square' : 'aspect-square'
                                    }`}>
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500"></div>

                                    {/* Hover overlay content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                        <span className="text-white text-sm font-bold uppercase tracking-wider">
                                            {item.title}
                                        </span>
                                    </div>

                                    {/* Corner accent */}
                                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-full"></div>
                                    <div className="absolute top-0 left-0 h-0 w-[2px] bg-red-600 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] delay-100 group-hover:h-full"></div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>

            {/* Premium Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center animate-in fade-in duration-300"
                    onClick={() => setSelectedIndex(null)}
                >
                    {/* Top bar with title and close */}
                    <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex items-start justify-between z-20">
                        <div className="animate-in slide-in-from-left duration-500">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-[2px] bg-red-600"></div>
                                <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
                                    {String(selectedIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-tight">{selectedImage.title}</h3>
                            <p className="text-neutral-500 text-sm mt-1">Get Fit Gym, Rajkot</p>
                        </div>
                        <button
                            className="group w-10 h-10 flex items-center justify-center cursor-pointer"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X size={24} className="text-neutral-500 group-hover:text-white transition-colors duration-500" />
                        </button>
                    </div>

                    {/* Left Arrow */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-neutral-800 group-hover:border-neutral-600 transition-colors duration-500">
                            <ArrowLeft size={20} className="text-neutral-500 group-hover:text-white transition-colors duration-500" />
                        </div>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-neutral-800 group-hover:border-neutral-600 transition-colors duration-500">
                            <ArrowRight size={20} className="text-neutral-500 group-hover:text-white transition-colors duration-500" />
                        </div>
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full flex items-center justify-center px-20 md:px-32 py-28 md:py-24"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative max-w-4xl max-h-full">
                            <img
                                src={selectedImage.img.replace('w=600', 'w=1200')}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[65vh] object-contain"
                            />
                            {/* Red corner accents on image */}
                            <div className="absolute top-0 left-0 w-12 h-[2px] bg-red-600"></div>
                            <div className="absolute top-0 left-0 w-[2px] h-12 bg-red-600"></div>
                            <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-red-600"></div>
                            <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-red-600"></div>
                        </div>
                    </div>

                    {/* Bottom indicator dots */}
                    <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {gallery.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedIndex(idx);
                                }}
                                className={`h-1 transition-all duration-300 cursor-pointer ${idx === selectedIndex
                                    ? 'w-8 bg-red-600'
                                    : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="border-t border-neutral-800 bg-neutral-950">
                <div className="container mx-auto px-6 md:px-16 py-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">See It In Person</h3>
                            <p className="text-neutral-400">Book a tour and experience our facility firsthand.</p>
                        </div>
                        <button
                            onClick={onBack}
                            className="group relative px-10 py-4 font-bold tracking-wide uppercase text-sm overflow-hidden rounded-sm bg-red-600 text-white transition-all duration-500 ease-out hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></span>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Book A Tour
                                <ArrowRight size={16} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AllGalleryPage;
