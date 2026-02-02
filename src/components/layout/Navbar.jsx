import React, { useState, useEffect, useCallback } from 'react';
import { Dumbbell, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../../data/constants';

const Navbar = React.memo(({ onNavigate, onLogoClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleMobileNavClick = useCallback((href) => {
        setIsOpen(false);
        onNavigate(href);
    }, [onNavigate]);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled
                ? 'bg-black/90 backdrop-blur-md border-neutral-800 py-4'
                : 'bg-transparent border-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-16 flex justify-between items-center">
                <div onClick={onLogoClick} className="text-2xl font-black text-white italic tracking-tighter flex items-center gap-2 cursor-pointer z-50">
                    <Dumbbell className="text-red-600" size={32} strokeWidth={2.5} />
                    GET FIT <span className="text-red-600">GYM</span>
                </div>

                <div className="hidden md:flex space-x-10">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate(link.href);
                            }}
                            className="relative text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-500 cursor-pointer group py-2"
                        >
                            {link.name}
                            {/* Bold underline expanding from center */}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500 ease-out"></span>
                            {/* Glow effect */}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-500 blur-[3px] opacity-0 group-hover:w-full group-hover:opacity-80 transition-all duration-500 ease-out"></span>
                        </a>
                    ))}
                </div>

                <button
                    className="md:hidden text-white z-50 w-10 h-10 flex flex-col justify-center items-center focus:outline-none relative"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`absolute block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-2'
                            }`}
                    />
                    <span
                        className={`absolute block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'
                            }`}
                    />
                    <span
                        className={`absolute block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-2'
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed top-0 left-0 w-full h-screen z-40 md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                style={{ minHeight: '100vh' }}
            >
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-black">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-neutral-950"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                    {/* Animated glow effects */}
                    <div className={`absolute top-20 -left-32 w-64 h-64 bg-red-600/20 rounded-full blur-[100px] transition-all duration-1000 ${isOpen ? 'opacity-100 translate-x-10' : 'opacity-0 -translate-x-10'}`}></div>
                    <div className={`absolute bottom-20 -right-32 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] transition-all duration-1000 delay-200 ${isOpen ? 'opacity-100 -translate-x-10' : 'opacity-0 translate-x-10'}`}></div>
                </div>

                {/* Content container */}
                <div className="relative h-full flex flex-col justify-between px-8 py-24">
                    {/* Decorative top line */}
                    <div className={`absolute top-20 left-0 h-[2px] bg-gradient-to-r from-red-600 via-red-500 to-transparent transition-all duration-700 ease-out ${isOpen ? 'w-1/2' : 'w-0'}`}></div>

                    {/* Navigation Links */}
                    <nav className="flex-1 flex flex-col justify-center space-y-2">
                        {NAV_LINKS.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleMobileNavClick(link.href);
                                }}
                                className={`group relative overflow-hidden py-3 transition-all duration-500 ease-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                                style={{ transitionDelay: isOpen ? `${index * 80 + 150}ms` : '0ms' }}
                            >
                                {/* Link number */}
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-600/60 tracking-widest">
                                    0{index + 1}
                                </span>
                                {/* Link text */}
                                <span className="block ml-8 text-3xl font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors duration-300">
                                    {link.name}
                                </span>
                                {/* Hover line */}
                                <span className="absolute bottom-2 left-8 h-[2px] w-0 bg-red-600 group-hover:w-24 transition-all duration-300"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Bottom section with CTA and social */}
                    <div className={`space-y-6 transition-all duration-500 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        {/* Divider */}
                        <div className="h-[1px] bg-gradient-to-r from-neutral-800 via-neutral-700 to-transparent"></div>

                        {/* CTA Button */}
                        <button
                            onClick={() => handleMobileNavClick('#contact')}
                            className="w-full py-4 bg-red-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                            Start Your Journey
                            <ArrowRight size={16} />
                        </button>

                        {/* Social & Contact row */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                                <a href="#" className="w-11 h-11 flex items-center justify-center border border-neutral-700/80 bg-neutral-900/30 text-neutral-500 rounded active:bg-red-600 active:border-red-600 active:text-white transition-colors duration-200">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="w-11 h-11 flex items-center justify-center border border-neutral-700/80 bg-neutral-900/30 text-neutral-500 rounded active:bg-red-600 active:border-red-600 active:text-white transition-colors duration-200">
                                    <Facebook size={18} />
                                </a>
                                <a href="#" className="w-11 h-11 flex items-center justify-center border border-neutral-700/80 bg-neutral-900/30 text-neutral-500 rounded active:bg-red-600 active:border-red-600 active:text-white transition-colors duration-200">
                                    <Twitter size={18} />
                                </a>
                            </div>
                            <a href="tel:+919876543210" className="text-neutral-400 text-xs font-bold tracking-wider">
                                +91 98765 43210
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;
