import React from 'react';
import { Check, Sparkles, Crown, Medal, Award } from 'lucide-react';

const PricingCard = ({ plan, type = 'general', onClick, delay = 0, compact = false }) => {
    const isPersonalTraining = type === 'personal';

    // Tier-specific styling for personal training
    const tierStyles = {
        bronze: {
            gradient: 'from-amber-900/20 via-amber-800/10 to-transparent',
            border: 'border-amber-700/30 hover:border-amber-600/50',
            glow: 'group-hover:shadow-amber-900/20',
            accent: 'text-amber-500',
            bgAccent: 'bg-amber-500',
            icon: <Medal className="w-6 h-6" />
        },
        silver: {
            gradient: 'from-slate-400/20 via-slate-500/10 to-transparent',
            border: 'border-slate-400/30 hover:border-slate-300/50',
            glow: 'group-hover:shadow-slate-400/20',
            accent: 'text-slate-300',
            bgAccent: 'bg-slate-300',
            icon: <Award className="w-6 h-6" />
        },
        gold: {
            gradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
            border: 'border-yellow-500/30 hover:border-yellow-400/50',
            glow: 'group-hover:shadow-yellow-500/30',
            accent: 'text-yellow-400',
            bgAccent: 'bg-yellow-400',
            icon: <Crown className="w-6 h-6" />
        }
    };

    const style = isPersonalTraining ? tierStyles[plan.color] : null;

    return (
        <div
            className={`group relative flex flex-col h-full rounded-sm overflow-hidden transition-all duration-500 
                ${plan.popular
                    ? 'bg-gradient-to-b from-red-950/40 via-neutral-900/80 to-neutral-900 border-2 border-red-600/50 hover:border-red-500 shadow-lg shadow-red-900/20'
                    : isPersonalTraining
                        ? `bg-gradient-to-b ${style.gradient} bg-neutral-900/90 border ${style.border} ${style.glow} shadow-lg`
                        : 'bg-neutral-900/80 border border-neutral-800/50 hover:border-neutral-700'
                }
                hover:transform hover:-translate-y-1`}
            style={{
                transitionDelay: `${delay}ms`,
                backdropFilter: 'blur(10px)'
            }}
        >
            {/* Popular badge */}
            {plan.popular && (
                <div className="absolute top-0 right-0">
                    <div className="relative">
                        <div className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-sm flex items-center gap-1.5">
                            <Sparkles size={12} className="animate-pulse" />
                            Most Popular
                        </div>
                        <div className="absolute inset-0 bg-red-500 blur-md opacity-50"></div>
                    </div>
                </div>
            )}

            {/* Tier badge for personal training */}
            {isPersonalTraining && (
                <div className={`absolute top-4 left-4 ${style.accent} flex items-center gap-2`}>
                    {style.icon}
                    <span className="text-xs font-bold uppercase tracking-widest">{plan.tier}</span>
                </div>
            )}

            {/* Content */}
            <div className={`p-6 ${compact ? 'pb-4' : 'p-8'} flex-1 flex flex-col ${isPersonalTraining ? 'pt-14' : ''}`}>
                {/* Header */}
                <div className="mb-6">
                    <h3 className={`text-xl font-bold text-white mb-1 ${isPersonalTraining ? '' : 'uppercase tracking-wide'}`}>
                        {plan.name}
                    </h3>
                    <p className="text-neutral-500 text-sm">{plan.description}</p>

                    {/* Sessions badge for personal training */}
                    {isPersonalTraining && plan.sessions && (
                        <div className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${style.bgAccent} text-black`}>
                            {plan.sessions}
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-neutral-500 text-lg">₹</span>
                        <span className={`text-4xl md:text-5xl font-black ${plan.popular ? 'text-red-500' : isPersonalTraining ? style.accent : 'text-white'}`}>
                            {plan.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-neutral-500 text-sm">{plan.period}</span>
                    </div>
                    {plan.billedAs && (
                        <p className="text-neutral-600 text-xs mt-1">{plan.billedAs}</p>
                    )}
                    {plan.savings && (
                        <span className="inline-block mt-2 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                            {plan.savings}
                        </span>
                    )}
                </div>

                {/* Features */}
                <div className="flex-1">
                    <ul className="space-y-3">
                        {plan.features.slice(0, compact ? 4 : plan.features.length).map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                                <Check
                                    size={16}
                                    className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-red-500' : isPersonalTraining ? style.accent : 'text-red-600'}`}
                                />
                                <span className="text-neutral-300">{feature}</span>
                            </li>
                        ))}
                        {compact && plan.features.length > 4 && (
                            <li className="text-neutral-500 text-xs pl-7">
                                +{plan.features.length - 4} more features
                            </li>
                        )}
                    </ul>

                    {/* Extras for personal training */}
                    {isPersonalTraining && plan.extras && !compact && (
                        <div className="mt-6 pt-4 border-t border-neutral-800/50">
                            <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-3">Also Includes</p>
                            <ul className="space-y-2">
                                {plan.extras.map((extra, index) => (
                                    <li key={index} className="flex items-start gap-2 text-xs text-neutral-500">
                                        <span className={`${style.accent}`}>+</span>
                                        <span>{extra}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => onClick && onClick(plan)}
                    className={`w-full mt-6 py-3 px-6 font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300
                        ${plan.popular
                            ? 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/30'
                            : isPersonalTraining
                                ? `border ${style.border} ${style.accent} hover:bg-white/5`
                                : 'border border-neutral-700 text-white hover:border-red-600 hover:text-red-500'
                        }`}
                >
                    Get Started
                </button>
            </div>

            {/* Bottom glow effect for popular */}
            {plan.popular && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
            )}
        </div>
    );
};

export default PricingCard;
