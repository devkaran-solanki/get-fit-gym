import React, { useState, useCallback } from 'react';
import { useLenis } from './components/common/SmoothScroll';

// Data
import { SERVICES_DATA, TRAINERS_DATA, GALLERY_DATA } from './data/constants';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import AllServicesPage from './components/pages/AllServicesPage';
import AllGalleryPage from './components/pages/AllGalleryPage';
import AllTrainersPage from './components/pages/AllTrainersPage';
import AllPricingPage from './components/pages/AllPricingPage';
import ServiceDetail from './components/pages/ServiceDetail';
import TrainerDetail from './components/pages/TrainerDetail';

// Sections
import Hero from './components/sections/Hero';
import StatsStrip from './components/sections/StatsStrip';
import About from './components/sections/About';
import GallerySection from './components/sections/GallerySection';
import TrainersSection from './components/sections/TrainersSection';
import FacilitiesSection from './components/sections/FacilitiesSection';
import ServicesSection from './components/sections/ServicesSection';
import PricingSection from './components/sections/PricingSection';
import CTA from './components/sections/CTA';
import Contact from './components/sections/Contact';

const App = () => {
    const [activeService, setActiveService] = useState(null);
    const [showAllServices, setShowAllServices] = useState(false);
    const [showAllGallery, setShowAllGallery] = useState(false);
    const [showAllTrainers, setShowAllTrainers] = useState(false);
    const [showAllPricing, setShowAllPricing] = useState(false);
    const [activeTrainer, setActiveTrainer] = useState(null);

    // Get Lenis instance for smooth scrolling
    const lenis = useLenis();

    // Smooth scroll to element using Lenis
    const smoothScrollTo = useCallback((target, offset = -80) => {
        if (lenis) {
            lenis.scrollTo(target, {
                offset: offset,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            // Fallback to native scroll
            if (typeof target === 'string') {
                const element = document.querySelector(target);
                element?.scrollIntoView({ behavior: 'smooth' });
            } else if (typeof target === 'number') {
                window.scrollTo({ top: target, behavior: 'smooth' });
            }
        }
    }, [lenis]);

    // Memoized navigation handler
    const handleNavigate = useCallback((href) => {
        setActiveService(null);
        setShowAllServices(false);
        setShowAllGallery(false);
        setShowAllTrainers(false);
        setShowAllPricing(false);
        setActiveTrainer(null);
        // Small delay only needed when coming back from service detail to allow state update
        const delay = (activeService || showAllServices || showAllGallery || showAllTrainers || showAllPricing || activeTrainer) ? 50 : 0;
        setTimeout(() => {
            const targetId = href.replace('#', '');
            if (targetId === 'all-services') {
                setShowAllServices(true);
                return;
            }
            if (targetId === 'all-gallery') {
                setShowAllGallery(true);
                return;
            }
            if (targetId === 'all-trainers') {
                setShowAllTrainers(true);
                return;
            }
            if (targetId === 'all-pricing') {
                setShowAllPricing(true);
                return;
            }
            const element = document.getElementById(targetId);
            if (element) {
                smoothScrollTo(`#${targetId}`);
            } else if (targetId === 'home') {
                smoothScrollTo(0, 0);
            }
        }, delay);
    }, [activeService, showAllServices, showAllGallery, showAllTrainers, showAllPricing, activeTrainer, smoothScrollTo]);

    const handleBookSession = useCallback(() => {
        setActiveService(null);
        setTimeout(() => {
            smoothScrollTo('#contact');
        }, 50);
    }, [smoothScrollTo]);

    const handleLogoClick = useCallback(() => handleNavigate('#home'), [handleNavigate]);

    return (
        <div className="bg-black text-neutral-200 font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
            <style>{`
                @keyframes slowZoom {
                    0% { transform: scale(1.05); }
                    100% { transform: scale(1.15); }
                }
            `}</style>
            <Navbar onNavigate={handleNavigate} onLogoClick={handleLogoClick} />

            {activeService ? (
                <ServiceDetail
                    service={activeService}
                    onBack={() => showAllServices ? setActiveService(null) : handleNavigate('#services')}
                    onBook={handleBookSession}
                />
            ) : showAllServices ? (
                <AllServicesPage
                    services={SERVICES_DATA}
                    onBack={() => handleNavigate('#services')}
                    onServiceClick={setActiveService}
                />
            ) : showAllGallery ? (
                <AllGalleryPage
                    gallery={GALLERY_DATA}
                    onBack={() => handleNavigate('#gallery')}
                />
            ) : activeTrainer ? (
                <TrainerDetail
                    trainer={activeTrainer}
                    onBack={() => showAllTrainers ? setActiveTrainer(null) : handleNavigate('#trainers')}
                />
            ) : showAllTrainers ? (
                <AllTrainersPage
                    trainers={TRAINERS_DATA}
                    onBack={() => handleNavigate('#trainers')}
                    onTrainerClick={setActiveTrainer}
                />
            ) : showAllPricing ? (
                <AllPricingPage
                    onBack={() => handleNavigate('#pricing')}
                    onGetStarted={handleBookSession}
                />
            ) : (
                <>
                    <Hero onNavigate={handleNavigate} />
                    <StatsStrip />
                    <About onNavigate={handleNavigate} />
                    <GallerySection onNavigate={handleNavigate} />
                    <TrainersSection onNavigate={handleNavigate} />
                    <FacilitiesSection />
                    <ServicesSection onNavigate={handleNavigate} onServiceClick={setActiveService} />
                    <PricingSection onNavigate={handleNavigate} onGetStarted={handleBookSession} />
                    <CTA onNavigate={handleNavigate} />
                    <Contact />
                    <Footer />
                </>
            )}
        </div>
    );
};

export default App;