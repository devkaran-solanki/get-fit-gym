import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';

const AllTrainersPage = React.memo(({ trainers, onBack, onTrainerClick }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-24 animate-in fade-in duration-700">
            {/* Header */}
            <div className="container mx-auto px-6 md:px-16 mb-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-neutral-400 hover:text-red-500 transition-colors duration-500 uppercase tracking-widest text-xs font-bold group mb-12 cursor-pointer"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-500" />
                    Back to Trainers
                </button>

                <div className="flex items-center gap-4 md:gap-6 mb-6">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        Our <span className="text-red-600">Trainers</span>
                    </h1>
                    <div className="h-[2px] bg-gradient-to-r from-red-600 to-transparent w-16 md:w-48"></div>
                </div>
                <p className="text-neutral-400 max-w-2xl text-lg font-light">
                    Meet our elite team of certified professionals dedicated to transforming your fitness journey.
                </p>
            </div>

            {/* Trainers Grid */}
            <div className="container mx-auto px-6 md:px-16 pb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainers.map((trainer, index) => (
                        <RevealOnScroll key={trainer.id} delay={index * 100}>
                            <div
                                onClick={() => onTrainerClick(trainer)}
                                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                            >
                                {/* Image */}
                                <img
                                    src={trainer.img}
                                    alt={trainer.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>

                                {/* Red accent line - top */}
                                <div className="absolute top-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-full z-10"></div>

                                {/* Experience badge */}
                                <div className="absolute top-4 left-4 border border-neutral-600 px-3 py-1 bg-black/40 backdrop-blur-sm">
                                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">{trainer.experience}</span>
                                </div>

                                {/* Arrow - bottom right */}
                                <div className="absolute bottom-4 right-4 w-10 h-10 border border-neutral-600 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:border-red-600 group-hover:bg-red-600/20 transition-all duration-500">
                                    <ArrowRight size={16} className="text-neutral-400 group-hover:text-white transition-colors duration-300" />
                                </div>

                                {/* Content - bottom */}
                                <div className="absolute bottom-0 left-0 right-16 p-5">
                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1">{trainer.role}</p>
                                    <h3 className="text-xl font-bold text-white mb-2">{trainer.name}</h3>
                                    <p className="text-neutral-400 text-sm">{trainer.specialization}</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-neutral-800 bg-neutral-950">
                <div className="container mx-auto px-6 md:px-16 py-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Train With The Best</h3>
                            <p className="text-neutral-400">Book a session with one of our expert trainers today.</p>
                        </div>
                        <button
                            onClick={onBack}
                            className="group relative px-10 py-4 font-bold tracking-wide uppercase text-sm overflow-hidden rounded-sm bg-red-600 text-white transition-all duration-500 ease-out hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></span>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Book A Session
                                <ArrowRight size={16} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AllTrainersPage;
