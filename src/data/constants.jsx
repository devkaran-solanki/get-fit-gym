import {
    Dumbbell,
    Zap,
    Users,
    Trophy,
    CheckCircle,
    MapPin
} from 'lucide-react';

export const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
];

export const FACILITIES_DATA = [
    {
        title: "Elite Equipment",
        desc: "Biomechanically perfect machinery.",
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Clinical Hygiene",
        desc: "Sanitized hourly. Spotless floors.",
        img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Climate Control",
        desc: "Optimal temperature for training.",
        img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Luxury Lockers",
        desc: "Secure, spacious, and clean.",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Certified Pros",
        desc: "Trainers who walk the talk.",
        img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Extended Hours",
        desc: "Train on your schedule.",
        img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
    },
];

export const SERVICES_DATA = [
    {
        id: 'strength',
        icon: <Dumbbell size={32} />,
        title: "Strength",
        subtitle: "Heavy Iron & Precision",
        desc: "Access premier free weights and biomechanically perfected machines specifically designed to maximize hypertrophy and strength gains safely.",
        img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
        details: {
            heading: "Build Your Foundation",
            description: "Our strength zone isn't just a collection of weights; it's a sanctuary for those looking to push their physical limits. We feature a complete lineup of Hammer Strength plate-loaded machines, Olympic lifting platforms with bumper plates, and a dumbbell rack that goes up to 80kg.",
            benefits: [
                "Competition-grade Olympic benches and racks",
                "Dedicated deadlift platforms with jack stands",
                "Wide variety of isolation machines for targeted growth",
                "Spotter arms and safety bars on all squat racks"
            ],
            expect: "Expect a high-energy environment fueled by focused individuals. Whether you are training for powerlifting, bodybuilding, or general strength, our equipment can handle your max effort."
        }
    },
    {
        id: 'endurance',
        icon: <Zap size={32} />,
        title: "Endurance",
        subtitle: "Cardio Suite",
        desc: "High-performance treadmills and ellipticals equipped with tracking technology to push your cardiovascular limits to new heights.",
        img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200&auto=format&fit=crop",
        details: {
            heading: "Unleash Your Stamina",
            description: "Forget boring cardio. Our endurance suite is equipped with the latest TechnoGym treadmills, Concept2 Rowers, and assault bikes designed to spike your heart rate and shred calories. Integrated screens allow you to run virtual trails around the world or stream your favorite shows.",
            benefits: [
                "HIIT-ready equipment (Assault Bikes, SkiErgs)",
                "Heart-rate monitoring integration",
                "Low-impact ellipticals and recumbent bikes",
                "Virtual running landscapes on HD screens"
            ],
            expect: "A sweat-drenched session that improves your VO2 max and metabolic rate. Perfect for warming up before a lift or a dedicated endurance session."
        }
    },
    {
        id: 'personal',
        icon: <Users size={32} />,
        title: "Personal",
        subtitle: "1-on-1 Coaching",
        desc: "Get matched with an elite trainer who builds a bespoke roadmap for your body type, ensuring every rep counts towards your goals.",
        img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
        details: {
            heading: "Expertise in Your Corner",
            description: "Our Personal Training program eliminates the guesswork. You get a dedicated coach who analyzes your biomechanics, lifestyle, and goals to craft a program that evolves as you do. This is accountability at its finest.",
            benefits: [
                "Customized workout & nutrition plans",
                "Real-time form correction and safety",
                "Progress tracking via app",
                "Weekly check-ins and adjustments"
            ],
            expect: "Structured, intense, and educational sessions. You won't just learn *what* to lift, but *how* and *why*, empowering you for a lifetime of fitness."
        }
    },
    {
        id: 'physique',
        icon: <Trophy size={32} />,
        title: "Physique",
        subtitle: "Transformation",
        desc: "Comprehensive programs combining intense training with lifestyle adjustments to completely reshape your body composition.",
        img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
        details: {
            heading: "Sculpt Your Masterpiece",
            description: "Transformation is science, not magic. Our Physique programs focus on body recomposition—dropping body fat while retaining or building lean muscle tissue. We use data-driven approaches to ensure you see visible changes in the mirror.",
            benefits: [
                "Body composition analysis (InBody)",
                "Hypertrophy-specific programming",
                "Macro-nutrient cycling guidance",
                "Before/After progress documentation"
            ],
            expect: "A disciplined approach requiring consistency inside and outside the gym. Results are the priority here, and we provide every tool to ensure you achieve them."
        }
    },
    {
        id: 'athletic',
        icon: <CheckCircle size={32} />,
        title: "Athletic",
        subtitle: "Functional Training",
        desc: "Dynamic movements that improve agility, core stability, and real-world strength, perfect for athletes and active individuals.",
        img: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1200&auto=format&fit=crop",
        details: {
            heading: "Move Like An Athlete",
            description: "Life isn't played sitting down. Our Functional Training area features turf tracks, sleds, kettlebells, and battle ropes designed to improve your explosive power, agility, and core stability.",
            benefits: [
                "20m indoor turf track for sprints/sleds",
                "Plyometric boxes and agility ladders",
                "TRX suspension training rigs",
                "Medicine balls and kettlebell stations"
            ],
            expect: "High-intensity, dynamic movements that challenge your coordination and conditioning. You'll leave feeling more agile and capable in real-world activities."
        }
    },
    {
        id: 'nutrition',
        icon: <MapPin size={32} />,
        title: "Nutrition",
        subtitle: "Diet Planning",
        desc: "Fuel your ambition with scientific diet planning that complements your workout intensity for optimal recovery and growth.",
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
        details: {
            heading: "Fuel Your Performance",
            description: "You can't out-train a bad diet. Our nutrition experts work with you to understand your metabolic rate and dietary preferences, creating sustainable meal plans that fuel your workouts and recovery without feeling restrictive.",
            benefits: [
                "Personalized caloric & macro breakdown",
                "Supplementation advice based on goals",
                "Meal prep guides and recipes",
                "Hydration and recovery strategies"
            ],
            expect: "No fad diets. Just science-backed nutritional advice that fits your lifestyle, ensuring you have the energy to crush your workouts and recover effectively."
        }
    }
];

export const TRAINERS_DATA = [
    {
        id: 1,
        name: "Raj Patel",
        role: "Head Strength Coach",
        specialization: "Powerlifting & Bodybuilding",
        experience: "12+ Years",
        age: 35,
        certifications: ["NSCA-CSCS", "ACE-CPT", "Precision Nutrition L1"],
        achievements: ["National Powerlifting Champion 2018", "Trained 500+ Athletes", "Featured in Men's Health India"],
        philosophy: "Strength is not just physical—it's the foundation of confidence and mental resilience.",
        languages: ["English", "Hindi", "Gujarati"],
        availability: "Mon-Sat, 6AM-2PM",
        img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "Fitness Specialist",
        specialization: "HIIT & Functional Training",
        experience: "8+ Years",
        age: 29,
        certifications: ["NASM-CPT", "TRX Certified", "Kettlebell Specialist"],
        achievements: ["Best Trainer Award 2022", "200+ Transformation Stories", "Corporate Wellness Expert"],
        philosophy: "Every rep counts. Every drop of sweat is progress. Show up for yourself.",
        languages: ["English", "Hindi"],
        availability: "Mon-Fri, 7AM-3PM",
        img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Arjun Mehta",
        role: "Cardio Expert",
        specialization: "Endurance & Weight Loss",
        experience: "10+ Years",
        age: 32,
        certifications: ["ACE-CPT", "Spinning Certified", "Marathon Coach"],
        achievements: ["Completed 10 Marathons", "Weight Loss Specialist", "150+ Client Transformations"],
        philosophy: "Cardio isn't punishment—it's celebration of what your body can do.",
        languages: ["English", "Hindi", "Marathi"],
        availability: "Tue-Sun, 5AM-1PM",
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Sneha Desai",
        role: "Yoga & Wellness",
        specialization: "Flexibility & Recovery",
        experience: "9+ Years",
        age: 31,
        certifications: ["RYT-500", "Meditation Coach", "Ayurveda Practitioner"],
        achievements: ["Yoga Alliance Certified", "Wellness Retreat Leader", "Published Author"],
        philosophy: "True fitness is harmony between body, mind, and spirit.",
        languages: ["English", "Hindi", "Sanskrit"],
        availability: "Mon-Sat, 6AM-12PM",
        img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Vikram Singh",
        role: "Boxing Coach",
        specialization: "Combat Fitness & Conditioning",
        experience: "15+ Years",
        age: 38,
        certifications: ["USA Boxing", "Muay Thai Level 3", "MMA Conditioning"],
        achievements: ["Former State Boxing Champion", "Trained Professional Fighters", "Self-Defense Expert"],
        philosophy: "In the ring and in life—discipline, focus, and never giving up.",
        languages: ["English", "Hindi", "Punjabi"],
        availability: "Mon-Sat, 4PM-10PM",
        img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Ananya Reddy",
        role: "Nutrition Coach",
        specialization: "Diet Planning & Sports Nutrition",
        experience: "7+ Years",
        age: 28,
        certifications: ["Precision Nutrition L2", "ISSA-SN", "Sports Dietitian"],
        achievements: ["Nutrition Consultant for Athletes", "Weight Management Specialist", "Published Researcher"],
        philosophy: "You can't out-train a bad diet. Nutrition is the foundation of transformation.",
        languages: ["English", "Hindi", "Telugu"],
        availability: "Mon-Fri, 10AM-6PM",
        img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop"
    }
];

export const GALLERY_DATA = [
    {
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
        title: "Main Training Floor"
    },
    {
        img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop",
        title: "Cardio Zone"
    },
    {
        img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600&auto=format&fit=crop",
        title: "Free Weights Area"
    },
    {
        img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop",
        title: "Premium Equipment"
    },
    {
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
        title: "Locker Rooms"
    },
    {
        img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
        title: "Personal Training"
    },
    {
        img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
        title: "Strength Zone"
    },
    {
        img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
        title: "Training Session"
    }
];

export const PRICING_DATA = {
    general: [
        {
            id: 'monthly',
            name: 'Monthly',
            price: 2499,
            period: '/month',
            description: 'Perfect for trying us out',
            features: [
                'Full gym access',
                'Locker room & showers',
                'Free fitness assessment',
                'Access to cardio zone',
                'Basic equipment training'
            ],
            popular: false
        },
        {
            id: 'quarterly',
            name: 'Quarterly',
            price: 1999,
            period: '/month',
            billedAs: 'Billed as ₹5,997 every 3 months',
            description: 'Commit to your transformation',
            features: [
                'Full gym access',
                'Locker room & showers',
                'Monthly fitness assessment',
                'Access to all zones',
                'Group classes included',
                'Nutrition guidance session'
            ],
            popular: true,
            savings: 'Save ₹1,500'
        },
        {
            id: 'annual',
            name: 'Annual',
            price: 1499,
            period: '/month',
            billedAs: 'Billed as ₹17,988 yearly',
            description: 'Maximum value, maximum gains',
            features: [
                'Full gym access',
                'Premium locker with towel service',
                'Quarterly fitness assessment',
                'Access to all zones 24/7',
                'Unlimited group classes',
                'Nutrition plan included',
                'Guest passes (2/month)',
                'Priority booking'
            ],
            popular: false,
            savings: 'Save ₹12,000'
        }
    ],
    personalTraining: [
        {
            id: 'bronze',
            tier: 'Bronze',
            name: 'Foundation',
            price: 4999,
            period: '/month',
            sessions: '8 sessions/month',
            description: 'Build your foundation with expert guidance',
            color: 'bronze',
            features: [
                '8 personal training sessions',
                'Customized workout plan',
                'Form correction & technique',
                'Progress tracking',
                'WhatsApp support'
            ],
            extras: [
                'Initial fitness assessment',
                'Monthly plan updates'
            ],
            popular: false
        },
        {
            id: 'silver',
            tier: 'Silver',
            name: 'Accelerate',
            price: 8999,
            period: '/month',
            sessions: '16 sessions/month',
            description: 'Accelerate your results with dedicated coaching',
            color: 'silver',
            features: [
                '16 personal training sessions',
                'Advanced workout programming',
                'Nutrition coaching included',
                'Weekly progress check-ins',
                'Priority trainer scheduling',
                'Video form reviews'
            ],
            extras: [
                'Bi-weekly body composition analysis',
                'Supplement guidance',
                'Recovery protocols'
            ],
            popular: true
        },
        {
            id: 'gold',
            tier: 'Gold',
            name: 'Elite',
            price: 14999,
            period: '/month',
            sessions: 'Unlimited sessions',
            description: 'The ultimate transformation experience',
            color: 'gold',
            features: [
                'Unlimited personal training',
                'Elite-level programming',
                'Full nutrition meal plans',
                'Daily trainer contact',
                'Priority everything',
                'Home workout plans',
                'Competition prep available'
            ],
            extras: [
                'Weekly body composition analysis',
                'Supplement stack included',
                'Recovery & massage sessions',
                'VIP locker & amenities',
                'Exclusive member events'
            ],
            popular: false
        }
    ]
};
