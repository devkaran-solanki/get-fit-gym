import React from 'react';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';
import { TRAINERS_DATA } from '../../data/constants';

const TrainersSection = ({ onNavigate }) => {
    return (
        <section id="trainers" className="py-16 md:py-24 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
            <div className="container mx-auto px-6 md:px-16">
                <RevealOnScroll>
                    <div className="flex items-center gap-4 md:gap-6 mb-4">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            Our <span className="text-red-600">Trainers</span>
                        </h2>
                        <div className="h-[2px] bg-gradient-to-r from-red-600 to-transparent w-16 md:w-48"></div>
                    </div>
                </RevealOnScroll>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <RevealOnScroll delay={50}>
                        <p className="text-neutral-400 max-w-md">
                            Certified professionals dedicated to helping you achieve your fitness goals.
                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={100}>
                        <button
                            onClick={() => onNavigate('#all-trainers')}
                            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 cursor-pointer"
                        >
                            <span className="relative pb-1">
                                View All Trainers
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-500 transition-all duration-500 ease-out group-hover:w-full"></span>
                            </span>
                            <ArrowRight size={14} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
                        </button>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {TRAINERS_DATA.slice(0, 4).map((trainer, index) => (
                        <RevealOnScroll key={index} delay={index * 100}>
                            <div className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={trainer.img}
                                        alt={trainer.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                                    {/* Red accent line - top left with padding */}
                                    <div className="absolute top-3 left-3">
                                        <div className="h-[2px] w-0 bg-red-600 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-10"></div>
                                    </div>

                                    {/* Content overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1">{trainer.role}</p>
                                        <h3 className="text-white font-bold text-base md:text-lg">{trainer.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrainersSection;
