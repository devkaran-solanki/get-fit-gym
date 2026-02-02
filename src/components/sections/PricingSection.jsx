import React, { useState } from 'react';
import { ArrowRight, Dumbbell, Users } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';
import PricingCard from '../common/PricingCard';
import { PRICING_DATA } from '../../data/constants';

const PricingSection = ({ onNavigate, onGetStarted }) => {
    const [activeTab, setActiveTab] = useState('general');

    const currentPlans = activeTab === 'general'
        ? PRICING_DATA.general
        : PRICING_DATA.personalTraining;

    return (
        <section id="pricing" className="py-16 md:py-24 relative overflow-hidden bg-neutral-950">
            {/* Background effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px] translate-x-1/2"></div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            ></div>

            <div className="container mx-auto px-6 md:px-16 relative z-10">
                {/* Header */}
                <RevealOnScroll>
                    <div className="flex items-center gap-4 md:gap-6 mb-4">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            <span className="text-red-600">Pricing</span>
                        </h2>
                        <div className="h-[2px] bg-gradient-to-r from-red-600 to-transparent w-16 md:w-48"></div>
                    </div>
                </RevealOnScroll>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <RevealOnScroll delay={50}>
                        <p className="text-neutral-400 max-w-md">
                            Invest in yourself. Choose the plan that matches your commitment level and goals.
                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={100}>
                        <button
                            onClick={() => onNavigate('#all-pricing')}
                            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 cursor-pointer"
                        >
                            <span className="relative pb-1">
                                View All Plans
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-red-500 transition-all duration-500 ease-out group-hover:w-full"></span>
                            </span>
                            <ArrowRight size={14} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
                        </button>
                    </RevealOnScroll>
                </div>

                {/* Tab Switcher */}
                <RevealOnScroll delay={150}>
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex bg-neutral-900/80 border border-neutral-800 rounded-sm p-1 backdrop-blur-sm">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${activeTab === 'general'
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                                        : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                <Dumbbell size={16} />
                                <span>General Training</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${activeTab === 'personal'
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                                        : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                <Users size={16} />
                                <span>Personal Training</span>
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {currentPlans.map((plan, index) => (
                        <RevealOnScroll key={plan.id} delay={200 + index * 100}>
                            <PricingCard
                                plan={plan}
                                type={activeTab}
                                onClick={() => onGetStarted && onGetStarted(plan)}
                                compact={true}
                            />
                        </RevealOnScroll>
                    ))}
                </div>

                {/* Bottom Note */}
                <RevealOnScroll delay={500}>
                    <div className="mt-12 text-center">
                        <p className="text-neutral-600 text-sm">
                            All prices are in INR. GST applicable.
                            <span className="text-neutral-500 ml-1">Need a custom plan?</span>
                            <button
                                onClick={() => onNavigate('#contact')}
                                className="text-red-500 hover:text-red-400 ml-1 underline underline-offset-2"
                            >
                                Contact us
                            </button>
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default PricingSection;
