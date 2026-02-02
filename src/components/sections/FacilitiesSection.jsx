import React from 'react';
import RevealOnScroll from '../common/RevealOnScroll';
import FacilitiesCarousel from './FacilitiesCarousel';
import { FACILITIES_DATA } from '../../data/constants';

const FacilitiesSection = () => {
    return (
        <section id="facilities" className="py-16 md:py-24 relative overflow-hidden bg-neutral-950">
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2"></div>
            <div className="container mx-auto px-6 md:px-16 relative z-10">
                <RevealOnScroll>
                    <FacilitiesCarousel facilities={FACILITIES_DATA} />
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default FacilitiesSection;
