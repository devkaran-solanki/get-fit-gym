import React from 'react';
import { CheckCircle } from 'lucide-react';
import RevealOnScroll from '../common/RevealOnScroll';
import Button from '../common/Button';

const About = ({ onNavigate }) => {
    return (
        <section id="about" className="py-16 md:py-24 bg-black">
            <div className="container mx-auto px-6 md:px-16">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <RevealOnScroll>
                        <div className="relative">
                            <div className="absolute -inset-4 border border-red-600/20 translate-x-4 translate-y-4 rounded-sm"></div>
                            <div className="relative rounded-sm overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop"
                                    alt="Trainer helping client"
                                    className="w-full h-[600px] object-cover"
                                    loading="lazy"
                                    width="800"
                                    height="600"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8">
                                    <p className="text-red-500 font-bold mb-2 uppercase tracking-wider text-xs">Expert Guidance</p>
                                    <p className="text-xl text-white font-bold max-w-xs">Forged in sweat, defined by discipline.</p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <div>
                        <RevealOnScroll delay={200}>
                            <h2 className="text-red-600 font-bold tracking-[0.2em] uppercase mb-4 text-sm">About Get Fit Gym</h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                More Than A Gym. <br />
                                <span className="text-neutral-500">We Are A Movement.</span>
                            </h3>
                            <p className="text-neutral-400 mb-8 leading-relaxed text-lg font-light">
                                Located in the heart of Rajkot, we don't just sell memberships; we sell a lifestyle change.
                                Whether you are a professional athlete or stepping into a gym for the first time, our facility
                                is built to push your limits.
                            </p>

                            <div className="space-y-5 mb-10">
                                {[
                                    "Personalized attention & structured programs",
                                    "Focus on correct form & long-term safety",
                                    "Premium equipment & hygienic environment",
                                    "A motivating atmosphere for the dedicated"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <CheckCircle className="text-red-500 flex-shrink-0" size={18} />
                                        <span className="text-neutral-300">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Button primary={false} onClick={() => onNavigate('#contact')}>
                                Our Philosophy
                            </Button>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
