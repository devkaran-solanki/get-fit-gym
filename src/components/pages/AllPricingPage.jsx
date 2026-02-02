import React, { useEffect, useState } from 'react';
import { ArrowLeft, Dumbbell, Users, Check, X, Sparkles } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';
import PricingCard from '../common/PricingCard';
import { PRICING_DATA } from '../../data/constants';

const AllPricingPage = ({ onBack, onGetStarted }) => {
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Feature comparison for general plans
    const generalComparison = [
        { feature: 'Full Gym Access', monthly: true, quarterly: true, annual: true },
        { feature: 'Locker Room & Showers', monthly: true, quarterly: true, annual: true },
        { feature: 'Fitness Assessment', monthly: 'Initial', quarterly: 'Monthly', annual: 'Quarterly' },
        { feature: 'Cardio Zone Access', monthly: true, quarterly: true, annual: true },
        { feature: 'Strength Zone Access', monthly: true, quarterly: true, annual: true },
        { feature: 'Functional Training Area', monthly: false, quarterly: true, annual: true },
        { feature: 'Group Classes', monthly: false, quarterly: true, annual: 'Unlimited' },
        { feature: 'Nutrition Guidance', monthly: false, quarterly: '1 Session', annual: 'Full Plan' },
        { feature: 'Guest Passes', monthly: false, quarterly: false, annual: '2/month' },
        { feature: '24/7 Access', monthly: false, quarterly: false, annual: true },
        { feature: 'Towel Service', monthly: false, quarterly: false, annual: true },
        { feature: 'Priority Booking', monthly: false, quarterly: false, annual: true },
    ];

    // Feature comparison for personal training
    const personalComparison = [
        { feature: 'Monthly Sessions', bronze: '8', silver: '16', gold: 'Unlimited' },
        { feature: 'Workout Programming', bronze: 'Basic', silver: 'Advanced', gold: 'Elite' },
        { feature: 'Nutrition Coaching', bronze: false, silver: true, gold: 'Full Meal Plans' },
        { feature: 'Progress Check-ins', bronze: 'Monthly', silver: 'Weekly', gold: 'Daily' },
        { feature: 'Trainer Contact', bronze: 'WhatsApp', silver: 'Priority', gold: '24/7 Access' },
        { feature: 'Body Composition Analysis', bronze: 'Initial', silver: 'Bi-weekly', gold: 'Weekly' },
        { feature: 'Video Form Reviews', bronze: false, silver: true, gold: true },
        { feature: 'Home Workout Plans', bronze: false, silver: false, gold: true },
        { feature: 'Supplement Guidance', bronze: false, silver: true, gold: 'Stack Included' },
        { feature: 'Recovery Sessions', bronze: false, silver: 'Protocol', gold: 'Massage Included' },
        { feature: 'Competition Prep', bronze: false, silver: false, gold: true },
        { feature: 'VIP Amenities', bronze: false, silver: false, gold: true },
    ];

    const renderComparisonValue = (value) => {
        if (value === true) {
            return <Check className="w-5 h-5 text-green-500 mx-auto" />;
        } else if (value === false) {
            return <X className="w-5 h-5 text-neutral-700 mx-auto" />;
        } else {
            return <span className="text-sm text-neutral-300">{value}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Hero Header */}
            <div className="relative py-16 md:py-24 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px]"></div>

                <div className="container mx-auto px-6 md:px-16 relative z-10">
                    <button
                        onClick={onBack}
                        className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        <span className="text-sm font-medium">Back</span>
                    </button>

                    <RevealOnScroll>
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                                Choose Your <span className="text-red-600">Path</span>
                            </h1>
                            <p className="text-neutral-400 text-lg">
                                From flexible gym access to elite personal training, find the perfect plan to match your fitness journey and goals.
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Tab Switcher */}
            <div className="container mx-auto px-6 md:px-16">
                <RevealOnScroll>
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex bg-neutral-900/80 border border-neutral-800 rounded-sm p-1.5 backdrop-blur-sm">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${activeTab === 'general'
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                                        : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                <Dumbbell size={20} />
                                <span>General Training</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-300 ${activeTab === 'personal'
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                                        : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                <Users size={20} />
                                <span>Personal Training</span>
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
                    {(activeTab === 'general' ? PRICING_DATA.general : PRICING_DATA.personalTraining).map((plan, index) => (
                        <RevealOnScroll key={plan.id} delay={index * 100}>
                            <PricingCard
                                plan={plan}
                                type={activeTab}
                                onClick={() => onGetStarted && onGetStarted(plan)}
                                compact={false}
                            />
                        </RevealOnScroll>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <RevealOnScroll>
                    <div className="mb-20">
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-8 text-center">
                            Compare <span className="text-red-600">Features</span>
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-neutral-800">
                                        <th className="text-left py-4 px-4 text-neutral-500 font-medium text-sm uppercase tracking-wider">
                                            Feature
                                        </th>
                                        {activeTab === 'general' ? (
                                            <>
                                                <th className="text-center py-4 px-4 text-white font-bold">Monthly</th>
                                                <th className="text-center py-4 px-4">
                                                    <div className="inline-flex items-center gap-2 text-red-500 font-bold">
                                                        <Sparkles size={14} />
                                                        Quarterly
                                                    </div>
                                                </th>
                                                <th className="text-center py-4 px-4 text-white font-bold">Annual</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="text-center py-4 px-4 text-amber-500 font-bold">Bronze</th>
                                                <th className="text-center py-4 px-4">
                                                    <div className="inline-flex items-center gap-2 text-red-500 font-bold">
                                                        <Sparkles size={14} />
                                                        Silver
                                                    </div>
                                                </th>
                                                <th className="text-center py-4 px-4 text-yellow-400 font-bold">Gold</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(activeTab === 'general' ? generalComparison : personalComparison).map((row, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-neutral-800/50 hover:bg-neutral-900/50 transition-colors"
                                        >
                                            <td className="py-4 px-4 text-neutral-300 text-sm">
                                                {row.feature}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {renderComparisonValue(row[activeTab === 'general' ? 'monthly' : 'bronze'])}
                                            </td>
                                            <td className="py-4 px-4 text-center bg-red-950/10">
                                                {renderComparisonValue(row[activeTab === 'general' ? 'quarterly' : 'silver'])}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {renderComparisonValue(row[activeTab === 'general' ? 'annual' : 'gold'])}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* FAQ or Additional Info */}
                <RevealOnScroll>
                    <div className="max-w-3xl mx-auto text-center pb-20">
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                            Questions? <span className="text-red-600">We've Got Answers</span>
                        </h2>

                        <div className="grid gap-4 text-left">
                            {[
                                {
                                    q: "Can I upgrade my plan anytime?",
                                    a: "Absolutely! You can upgrade to a higher tier at any time. The difference will be prorated for your current billing period."
                                },
                                {
                                    q: "Is there a joining fee?",
                                    a: "No hidden fees. The price you see is the price you pay. We may offer promotional discounts on longer commitments."
                                },
                                {
                                    q: "Can I pause my membership?",
                                    a: "Quarterly and Annual members can freeze their membership for up to 2 weeks per year with prior notice."
                                },
                                {
                                    q: "What if I'm not satisfied?",
                                    a: "We offer a 7-day money-back guarantee for new members. If you're not happy, we'll refund your first payment."
                                }
                            ].map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-neutral-900/50 border border-neutral-800/50 rounded-sm p-6 hover:border-neutral-700 transition-colors"
                                >
                                    <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                                    <p className="text-neutral-400 text-sm">{faq.a}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-neutral-600 text-sm mt-10">
                            All prices are in INR. GST applicable. Terms and conditions apply.
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default AllPricingPage;
