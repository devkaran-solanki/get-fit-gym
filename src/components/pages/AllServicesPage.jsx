import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ServiceCard from '../common/ServiceCard';

const AllServicesPage = React.memo(({ services, onBack, onServiceClick }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-24 animate-in fade-in duration-700">
            {/* Header */}
            <div className="container mx-auto px-6 md:px-16 mb-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-neutral-400 hover:text-red-500 transition-colors duration-500 uppercase tracking-widest text-xs font-bold group mb-12"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-500" />
                    Back to Services
                </button>

                <div className="flex items-center gap-4 md:gap-6 mb-6">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        <span className="text-red-600">Services</span>
                    </h1>
                    <div className="h-[2px] bg-gradient-to-r from-red-600 to-transparent w-16 md:w-48"></div>
                </div>
                <p className="text-neutral-400 max-w-2xl text-lg font-light">
                    Explore our complete range of premium fitness services designed to help you achieve your goals.
                </p>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-6 md:px-16 pb-24">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onClick={onServiceClick}
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-neutral-800 bg-neutral-950">
                <div className="container mx-auto px-6 md:px-16 py-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to Transform?</h3>
                            <p className="text-neutral-400">Start your fitness journey with us today.</p>
                        </div>
                        <button
                            onClick={onBack}
                            className="group relative px-10 py-4 font-bold tracking-wide uppercase text-sm overflow-hidden rounded-sm bg-red-600 text-white transition-all duration-500 ease-out hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></span>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Get Started
                                <ArrowRight size={16} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AllServicesPage;
