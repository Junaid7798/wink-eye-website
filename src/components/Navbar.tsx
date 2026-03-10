"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [pastHero, setPastHero] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 40);
                    setPastHero(window.scrollY > window.innerHeight * 0.85);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#services", label: "Services" },
        { href: "#storeinfo", label: "Office Info" },
        { href: "#ourdoctor", label: "Our Doctor" },
        { href: "#designbrand", label: "Designer Brands" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header className="fixed w-full top-0 z-50 flex flex-col transition-all duration-500">
            {/* Top Utility Bar */}
            <div className={`hidden md:flex bg-surface-dark text-white/80 text-[13px] py-2 px-6 justify-between items-center transition-all duration-500 ${scrolled ? "opacity-0 h-0 py-0 overflow-hidden" : "opacity-100"}`}>
                <div className="flex space-x-6 items-center max-w-7xl mx-auto w-full">
                    <a href="tel:215-935-6320" className="flex items-center gap-2 hover:text-white transition-colors">
                        <Phone size={13} className="text-accent" /> 215-935-6320
                    </a>
                    <a href="mailto:winkeyecare20@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                        <Mail size={13} className="text-accent" /> winkeyecare20@gmail.com
                    </a>
                    <span className="flex items-center gap-2">
                        <MapPin size={13} className="text-accent" /> Abington, PA
                    </span>
                </div>
            </div>

            {/* Main Navigation - Floating Glassy Bar */}
            <nav className={`mx-4 sm:mx-6 md:mx-10 mt-3 px-6 sm:px-8 py-3.5 flex justify-between items-center rounded-2xl transition-all duration-500 ${pastHero
                ? "bg-primary-800/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-primary-700/50"
                : scrolled
                    ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60"
                    : "bg-white/90 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-white/50"
                }`}>
                <Link href="/" className="flex items-center gap-1.5 relative z-10">
                    <span className={`text-[28px] font-serif font-extrabold tracking-tight transition-colors duration-500 ${pastHero ? "text-white" : "text-primary-800"}`}>
                        wink
                    </span>
                    <span className={`text-[13px] italic font-light tracking-wide transition-colors duration-500 ${pastHero ? "text-white/70" : "text-primary-500"}`}>
                        eye care & optical
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1 font-medium text-[13px] tracking-wide">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative px-4 py-2 transition-colors duration-300 group uppercase ${pastHero ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-primary-600"}`}
                        >
                            {link.label}
                            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] group-hover:w-3/4 transition-all duration-300 rounded-full ${pastHero ? "bg-gradient-to-r from-accent to-white" : "bg-gradient-to-r from-primary-400 to-primary-600"}`} />
                        </Link>
                    ))}
                    <MagneticButton
                        href="https://calendar.app.google/Ke2Rg6r8pgH8d5MCA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ml-3 px-6 py-2.5 rounded-full font-bold text-[13px] duration-300 ${pastHero ? "bg-white text-primary-800 shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.35)]" : "bg-primary-600 text-white shadow-[0_4px_20px_rgba(10,126,154,0.25)] hover:shadow-[0_6px_25px_rgba(10,126,154,0.4)] hover:bg-primary-700"}`}
                    >
                        Schedule Appointment
                    </MagneticButton>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300 ${pastHero ? "bg-white/20 text-white" : "bg-gray-50 text-primary-900"}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden absolute top-full left-0 w-full glass-strong shadow-2xl p-8 flex flex-col space-y-5 text-center"
                    >
                        {navLinks.map((link, i) => (
                            <m.div
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2 text-lg font-semibold text-text-main hover:text-primary-600 transition-colors uppercase tracking-wide"
                                >
                                    {link.label}
                                </Link>
                            </m.div>
                        ))}
                        <a
                            href="https://calendar.app.google/Ke2Rg6r8pgH8d5MCA"
                            className="w-full py-4 rounded-full bg-primary-600 text-white font-bold flex justify-center mt-4 shadow-lg"
                            target="_blank" rel="noopener noreferrer"
                        >
                            Schedule Appointment
                        </a>
                    </m.div>
                )}
            </AnimatePresence>
        </header>
    );
}
