import React from 'react';
import RevealOnScroll from '../common/RevealOnScroll';

const CTA = ({ onNavigate }) => {
    return (
        <section className="py-28 bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            {/* Animated diagonal lines */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_100px,rgba(255,255,255,0.02)_100px,rgba(255,255,255,0.02)_200px)]"></div>
            </div>
            {/* Glow orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/30 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-6 md:px-16 text-center relative z-10">
                <RevealOnScroll>
                    <div className="inline-block mb-6">
                        <span className="text-white/60 text-sm font-bold uppercase tracking-[0.3em] border border-white/20 px-4 py-2">Limited Time Offer</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
                        NO EXCUSES.<br className="md:hidden" /> JUST RESULTS.
                    </h2>
                    <p className="text-white/80 font-medium text-lg mb-12 max-w-2xl mx-auto">
                        The only bad workout is the one that didn't happen. Start your transformation at Rajkot's finest facility today.
                    </p>
                    <button
                        onClick={() => onNavigate('#contact')}
                        className="group relative px-14 py-5 bg-white text-black rounded-sm font-bold text-lg overflow-hidden tracking-wide uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-500">Book A Free Trial</span>
                        <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default CTA;
