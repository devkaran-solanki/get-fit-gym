import React from 'react';
import { Dumbbell } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-neutral-800/50 relative overflow-hidden">
            {/* Subtle top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>

            <div className="container mx-auto px-6 md:px-16 py-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-3">
                            <Dumbbell className="text-red-600" size={28} />
                            <span className="text-2xl font-black text-white italic tracking-tighter">GET FIT <span className="text-red-600">GYM</span></span>
                        </div>
                        <p className="text-neutral-500 text-sm max-w-xs text-center md:text-left">Elevating fitness standards in Rajkot since day one.</p>
                    </div>

                    <p className="text-neutral-600 text-xs font-bold uppercase tracking-widest text-center md:text-right">
                        &copy; {new Date().getFullYear()} Get Fit Gym, Rajkot.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
