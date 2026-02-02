import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Target, CheckCircle, Dumbbell } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';
import Button from '../common/Button';
import Footer from '../layout/Footer';

const ServiceDetail = React.memo(({ service, onBack, onBook }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-24 animate-in fade-in duration-700">
            <div className="container mx-auto px-6 md:px-16 mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-neutral-400 hover:text-red-500 transition-colors uppercase tracking-widest text-xs font-bold group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Services
                </button>
            </div>

            <div className="relative h-[60vh] w-full overflow-hidden mb-16">
                <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-60"
                    loading="eager"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            {React.cloneElement(service.icon, { size: 40 })}
                            <span className="text-sm font-bold uppercase tracking-widest bg-red-600/10 px-3 py-1 rounded-sm border border-red-600/20">Premium Service</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                            {service.title}
                        </h1>
                        <p className="text-xl text-neutral-300 max-w-2xl font-light">
                            {service.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-16 pb-24">
                <div className="grid lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <RevealOnScroll>
                            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-6">
                                {service.details.heading}
                            </h2>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                                {service.details.description}
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200}>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Target className="text-red-600" /> What To Expect
                            </h3>
                            <div className="bg-neutral-900/50 p-8 border-l-2 border-neutral-800 rounded-r-sm">
                                <p className="text-neutral-300 italic">"{service.details.expect}"</p>
                            </div>
                        </RevealOnScroll>
                    </div>

                    <div className="space-y-8">
                        <RevealOnScroll delay={300}>
                            <div className="bg-neutral-950 border border-neutral-900 p-8 rounded-sm sticky top-32">
                                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                                    Key Benefits
                                </h3>
                                <ul className="space-y-4 mb-10">
                                    {service.details.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-neutral-400 text-sm">
                                            <CheckCircle className="text-red-600 shrink-0 mt-0.5" size={16} />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-4">
                                    <Button onClick={onBook} className="w-full">
                                        Book This Session
                                    </Button>
                                    <p className="text-xs text-neutral-600 text-center uppercase tracking-widest">
                                        Free consultation included
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>

            <section className="py-20 bg-red-900/10 border-t border-red-900/20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black text-white mb-6">NOT SURE YET?</h2>
                    <p className="text-neutral-400 mb-8 max-w-xl mx-auto">Explore our other services to find the perfect fit for your fitness journey.</p>
                    <button onClick={onBack} className="text-red-500 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors cursor-pointer">
                        View All Services
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
});

export default ServiceDetail;
