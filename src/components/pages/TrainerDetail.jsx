import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Trophy } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';

const TrainerDetail = React.memo(({ trainer, onBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-24 animate-in fade-in duration-700">
            {/* Header */}
            <div className="container mx-auto px-6 md:px-16 mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-neutral-400 hover:text-red-500 transition-colors duration-500 uppercase tracking-widest text-xs font-bold group cursor-pointer"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-500" />
                    Back to Trainers
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="grid lg:grid-cols-[350px_1fr] gap-8 items-start">
                        {/* Image - Smaller */}
                        <RevealOnScroll>
                            <div className="relative aspect-[3/4] overflow-hidden max-w-[350px]">
                                <img
                                    src={trainer.img.replace('w=600', 'w=800')}
                                    alt={trainer.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600"></div>
                                <div className="absolute top-0 left-0 w-[2px] h-16 bg-red-600"></div>
                            </div>
                        </RevealOnScroll>

                        {/* Info - Compact */}
                        <RevealOnScroll delay={100}>
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-[2px] bg-red-600"></div>
                                    <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{trainer.role}</span>
                                </div>

                                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                                    {trainer.name}
                                </h1>

                                {/* Experience & Specialization */}
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <div className="border border-neutral-800 px-4 py-2">
                                        <span className="text-red-500 font-bold">{trainer.experience}</span>
                                        <span className="text-neutral-500 text-sm ml-2">Experience</span>
                                    </div>
                                    <p className="text-neutral-400">{trainer.specialization}</p>
                                </div>

                                {/* Languages */}
                                <div className="flex flex-wrap items-center gap-2 mb-6">
                                    <span className="text-neutral-500 text-xs uppercase tracking-wider">Languages:</span>
                                    {trainer.languages.map((lang, idx) => (
                                        <span key={idx} className="text-sm text-white">
                                            {lang}{idx < trainer.languages.length - 1 ? ',' : ''}
                                        </span>
                                    ))}
                                </div>

                                {/* Certifications & Achievements inline */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Certifications */}
                                    <div>
                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                            Certifications
                                            <div className="h-[1px] bg-neutral-800 flex-1"></div>
                                        </h3>
                                        <ul className="space-y-2">
                                            {trainer.certifications.map((cert, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-neutral-400 text-sm">
                                                    <CheckCircle size={14} className="text-red-500 shrink-0" />
                                                    {cert}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Achievements */}
                                    <div>
                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                            Achievements
                                            <div className="h-[1px] bg-neutral-800 flex-1"></div>
                                        </h3>
                                        <ul className="space-y-2">
                                            {trainer.achievements.map((achievement, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-neutral-400 text-sm">
                                                    <Trophy size={14} className="text-red-500 shrink-0" />
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-neutral-800 bg-neutral-950">
                <div className="container mx-auto px-6 md:px-16 py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Train with {trainer.name.split(' ')[0]}</h3>
                            <p className="text-neutral-400">Book a personal training session and start your transformation.</p>
                        </div>
                        <button
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

export default TrainerDetail;
