import React from 'react';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { getOptimizedUrl } from '../../utils/helpers';

const ServiceCard = React.memo(({ service, onClick, delay }) => (
    <RevealOnScroll delay={delay}>
        <div
            onClick={() => onClick(service)}
            className="group relative h-[380px] w-full overflow-hidden border border-neutral-800/60 bg-neutral-900 cursor-pointer"
        >
            <img
                src={getOptimizedUrl(service.img, 600)}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover md:transition-transform md:duration-700 md:ease-out md:group-hover:scale-105 opacity-50 md:group-hover:opacity-35"
                loading="lazy"
                width="600"
                height="380"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
            {/* Top animated line - desktop only */}
            <div className="hidden md:block absolute top-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-full"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end">
                <div className="md:transform md:transition-transform md:duration-700 md:ease-out md:group-hover:-translate-y-2">
                    <div className="mb-3 md:mb-4 text-red-600">
                        {service.icon}
                    </div>
                    <h4 className="text-red-600 text-xs font-bold uppercase tracking-widest mb-1 opacity-80">
                        {service.subtitle}
                    </h4>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                        {service.title}
                    </h3>
                </div>

                {/* Mobile: Always show tap indicator */}
                <div className="md:hidden mt-4 flex items-center justify-between">
                    <p className="text-sm text-neutral-500 line-clamp-2 flex-1 pr-4">
                        {service.desc}
                    </p>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-red-600/50 flex items-center justify-center bg-red-600/10">
                        <ArrowRight size={18} className="text-red-500" />
                    </div>
                </div>

                {/* Desktop: Hover to reveal */}
                <div className="hidden md:grid grid-rows-[0fr] transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <div className="pt-4 opacity-0 transition-all duration-1000 delay-100 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                            <p className="text-sm font-medium leading-relaxed text-neutral-400 mb-6">
                                {service.desc}
                            </p>
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 group/btn w-fit">
                                <span className="relative pb-1">
                                    Learn More
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 ease-out group-hover/btn:w-full"></span>
                                </span>
                                <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </RevealOnScroll>
));

export default ServiceCard;
