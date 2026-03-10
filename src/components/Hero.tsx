"use client";

import { m, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Calendar, Phone, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MagneticButton } from "./MagneticButton";

const images = [
    "/images/dr-patel-clinic.png",
    "/images/hero-bg.jpg.png",
    "/images/dr-patel-slit-lamp.png"
];

/* ── animation variants ── */
const fadeUp: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: (d: number) => ({
        y: 0,
        opacity: 1,
        transition: { delay: d, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

export default function Hero() {
    const [currentImg, setCurrentImg] = useState(0);

    // Auto-advance the slider every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="relative h-[100dvh] min-h-[600px] flex flex-col justify-center overflow-hidden bg-primary-900">

            {/* ── Background Slider ── */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <m.div
                        key={currentImg}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.5 } }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={images[currentImg]}
                            alt="Wink Eye Care Clinic"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    </m.div>
                </AnimatePresence>
            </div>

            {/* ── Overlays for text legibility ── */}
            <div className="absolute inset-0 z-10 bg-primary-900/50 mix-blend-multiply" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary-900/90 via-primary-900/50 to-primary-900/30" />

            {/* ── Main Content ── */}
            <div className="relative z-20 w-full max-w-[1400px] mx-auto px-5 sm:px-12 text-left text-white mt-4 sm:mt-8 mb-40 sm:mb-32 md:mb-24 lg:mt-16">
                <div className="max-w-[750px]">
                    {/* Tag pill */}
                    <m.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.1}
                        className="flex mb-6"
                    >
                        <span className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[13px] font-bold uppercase tracking-[0.2em] text-white/90">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                            </span>
                            Wink Eye Care & Optical
                        </span>
                    </m.div>

                    {/* Massive Heading */}
                    <m.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                        className="text-[2rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-extrabold leading-[1.1] tracking-tight mb-5 sm:mb-8"
                    >
                        Comprehensive
                        <br />
                        <span className="italic font-light text-gradient-primary bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                            Eye Care
                        </span>
                    </m.h1>

                    {/* Subtitle */}
                    <m.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.5}
                        className="text-sm sm:text-lg md:text-2xl text-white/80 leading-relaxed font-medium mb-6 sm:mb-10"
                    >
                        Providing patients with high quality eye exams, designer eyeglasses, and contact lenses — all under one roof in{" "}
                        <span className="text-white font-bold tracking-wide">Abington, PA.</span>
                    </m.p>

                    {/* CTA Buttons */}
                    <m.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.7}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 relative z-50"
                    >
                        <MagneticButton
                            href="https://calendar.app.google/Ke2Rg6r8pgH8d5MCA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center gap-2.5 bg-white text-primary-900 px-6 sm:px-10 py-3.5 sm:py-5 rounded-full font-bold text-[14px] sm:text-[16px] shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.4)] overflow-hidden w-full sm:w-auto"
                        >
                            <Calendar size={20} className="relative z-10 text-primary-600 group-hover:rotate-12 transition-transform duration-300" />
                            <span className="relative z-10">Schedule Your Appointment Today</span>
                            <div className="absolute inset-0 bg-primary-50 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] pointer-events-none" />
                        </MagneticButton>

                        <MagneticButton
                            href="tel:215-935-6320"
                            className="group flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 sm:px-10 py-3.5 sm:py-5 rounded-full font-bold text-[14px] sm:text-[16px] hover:bg-white/20 w-full sm:w-auto"
                        >
                            <Phone size={20} className="text-white/80 group-hover:animate-bounce" />
                            <span>215-935-6320</span>
                        </MagneticButton>
                    </m.div>
                </div>
            </div>

            {/* ── Bottom Controls: Dots & Scroll ── */}
            <div className="absolute z-20 bottom-6 sm:bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 sm:gap-8 pb-2">
                {/* Slider Navigation Dots */}
                <div className="flex items-center gap-3">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImg(idx)}
                            className={`transition-all duration-500 rounded-full h-2 ${idx === currentImg ? "w-8 bg-accent" : "w-2 bg-white/40 hover:bg-white/70"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="cursor-pointer group flex flex-col items-center gap-2"
                    onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                    <span className="text-[9px] sm:text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Scroll</span>
                    <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-white/30 flex justify-center pt-1.5 sm:pt-2 group-hover:border-white/60 transition-colors">
                        <m.div
                            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/60 group-hover:bg-white"
                        />
                    </div>
                </m.div>
            </div>

        </section>
    );
}
