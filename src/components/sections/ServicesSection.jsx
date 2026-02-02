import React from 'react';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';
import ServiceCard from '../common/ServiceCard';
import { SERVICES_DATA } from '../../data/constants';

const ServicesSection = ({ onNavigate, onServiceClick }) => {
    return (
        <section id="services" className="py-16 md:py-24 bg-black">
            <div className="container mx-auto px-6 md:px-16">
                <RevealOnScroll>
                    <div className="flex items-center gap-4 md:gap-6 mb-4">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            <span className="text-red-600">Services</span>
                        </h2>
                        <div className="h-[2px] bg-gradient-to-r from-red-600 to-transparent w-16 md:w-48"></div>
                    </div>
                </RevealOnScroll>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <RevealOnScroll delay={50}>
                        <p className="text-neutral-400 max-w-md">
                            Everything you need to sculpt your body and mind under one roof. No compromises.
                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={100}>
                        <button
                            onClick={() => onNavigate('#all-services')}
                            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 cursor-pointer"
                        >
                            <span className="relative pb-1">
                                View All Services
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-500 transition-all duration-500 ease-out group-hover:w-full"></span>
                            </span>
                            <ArrowRight size={14} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
                        </button>
                    </RevealOnScroll>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES_DATA.slice(0, 4).map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onClick={onServiceClick}
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
