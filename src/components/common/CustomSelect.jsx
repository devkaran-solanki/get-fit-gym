import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = React.memo(({ options, placeholder, onChange, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(value || "");

    // Sync with external value prop (for controlled component behavior)
    useEffect(() => {
        setSelected(value || "");
    }, [value]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = useCallback((option) => {
        setSelected(option);
        if (onChange) onChange(option);
        setIsOpen(false);
    }, [onChange]);

    return (
        <div className="relative w-full group/select" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`cursor-pointer block py-3 px-0 w-full text-base bg-transparent border-b-2 transition-colors flex justify-between items-center relative z-10
          ${isOpen || selected ? 'border-red-600' : 'border-neutral-800 group-hover/select:border-neutral-700'}`}
            >
                <span className={`${selected ? 'text-white' : 'text-neutral-500'} font-medium`}>
                    {selected || ""}
                </span>
                <ChevronDown
                    size={18}
                    className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : ''}`}
                />
            </div>

            <label className={`absolute left-0 transition-all duration-300 origin-[0] uppercase tracking-widest pointer-events-none text-xs font-bold
        ${selected || isOpen
                    ? '-translate-y-6 scale-75 text-red-500 top-3'
                    : 'text-neutral-500 top-3 translate-y-0 scale-100'}`}
            >
                {placeholder}
            </label>

            <div className={`absolute left-0 top-full w-full bg-neutral-900 border border-neutral-800 shadow-2xl z-50 mt-1 transition-all duration-300 origin-top
        ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
            >
                {options.map((option, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleSelect(option)}
                        className="px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-red-600/10 cursor-pointer transition-colors uppercase tracking-wide font-medium"
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default CustomSelect;
