import React from 'react';

const StatsStrip = () => {
    return (
        <div className="border-y border-neutral-800 bg-black py-16 relative z-20 overflow-hidden">
            {/* Subtle red accent glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent"></div>

            <div className="container mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center relative">
                {[
                    { value: "100+", label: "Machines" },
                    { value: "15+", label: "Expert Trainers" },
                    { value: "500+", label: "Members" },
                    { value: "7 Days", label: "Open A Week" }
                ].map((stat, idx) => (
                    <div key={idx} className="py-4 relative">
                        {/* Vertical divider - hidden on first item and mobile */}
                        {idx > 0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-neutral-800"></div>}
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{stat.value}</h3>
                        <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsStrip;
