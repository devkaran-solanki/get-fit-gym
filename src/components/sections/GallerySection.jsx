import React from 'react';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';
import { GALLERY_DATA } from '../../data/constants';

const GallerySection = ({ onNavigate }) => {
    return (
        <section id="gallery" className="py-16 md:py-24 bg-neutral-950">
            <div className="container mx-auto px-6 md:px-16">
                <RevealOnScroll>
                    <div className="flex items-center gap-4 md:gap-6 mb-4">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            <span className="text-red-600">Gallery</span>
                        </h2>
                        <div className="h-[2px] bg-gradient-to-r from-red-600 to-transparent w-16 md:w-48"></div>
                    </div>
                </RevealOnScroll>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <RevealOnScroll delay={50}>
                        <p className="text-neutral-400 max-w-md">
                            Take a glimpse inside Rajkot's most premium fitness facility.
                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={100}>
                        <button
                            onClick={() => onNavigate('#all-gallery')}
                            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 cursor-pointer"
                        >
                            <span className="relative pb-1">
                                View All Photos
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-500 transition-all duration-500 ease-out group-hover:w-full"></span>
                            </span>
                            <ArrowRight size={14} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
                        </button>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {GALLERY_DATA.slice(0, 4).map((item, index) => (
                        <RevealOnScroll key={index} delay={index * 100}>
                            <div className="group relative aspect-square overflow-hidden cursor-pointer">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="text-white text-sm font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="absolute inset-0 border border-transparent group-hover:border-red-600/50 transition-colors duration-500"></div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
