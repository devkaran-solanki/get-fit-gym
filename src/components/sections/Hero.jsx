import React from 'react';
import RevealOnScroll from '../common/RevealOnScroll';
import Button from '../common/Button';

const Hero = ({ onNavigate }) => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
                    alt="Gym Background"
                    className="w-full h-full object-cover grayscale opacity-50 scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
                    fetchPriority="high"
                    width="1600"
                    height="900"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-red-900/30 to-transparent mix-blend-overlay"></div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-28 left-4 md:left-10 w-16 h-16 md:w-20 md:h-20 border-l-2 border-t-2 border-red-600/30"></div>
            <div className="absolute bottom-8 right-4 md:right-10 w-16 h-16 md:w-20 md:h-20 border-r-2 border-b-2 border-red-600/30"></div>

            <div className="relative z-10 container mx-auto px-6 md:px-16 text-center">
                <RevealOnScroll>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[2px] w-12 bg-red-600"></div>
                        <span className="text-red-500 text-sm font-bold tracking-[0.2em] uppercase">
                            Rajkot's Premier Fitness Center
                        </span>
                        <div className="h-[2px] w-12 bg-red-600"></div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
                        Forge Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                            Legacy
                        </span>
                    </h1>
                </RevealOnScroll>

                <RevealOnScroll delay={400}>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                        Elite equipment. World-class trainers. A community built on sweat and discipline.
                        Welcome to the new standard of fitness in Rajkot.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={600}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button onClick={() => onNavigate('#contact')}>
                            Start Your Journey
                        </Button>
                        <Button primary={false} onClick={() => onNavigate('#services')}>
                            Explore Services
                        </Button>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Hero;
