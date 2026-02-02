import React from 'react';
import { ArrowRight } from 'lucide-react';

const Button = React.memo(({ children, primary = true, className = "", onClick }) => (
    <button
        onClick={onClick}
        className={`group relative px-10 py-4 font-bold tracking-wide uppercase text-sm overflow-hidden rounded-sm transition-all duration-500 ease-out ${primary
            ? 'bg-red-600 text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]'
            : 'border border-neutral-700 text-neutral-300 hover:border-red-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]'
            } ${className}`}
    >
        <span className={`absolute inset-0 transition-transform duration-700 ease-out origin-left ${primary
            ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-700 scale-x-0 group-hover:scale-x-100'
            : 'bg-red-600/10 scale-x-0 group-hover:scale-x-100'
            }`}></span>
        <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
            <ArrowRight size={16} className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
        </span>
    </button>
));

export default Button;
