"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { FocusReveal } from "./FocusReveal";

const reviews = [
    { name: "Jessica", text: "My appointment with Dr. Patel was the best eye experience I've had in years! The staff are professional, very sweet, and knowledgeable." },
    { name: "Gennyliz", text: "I needed an emergency eye exam and Dr. Minal Patel was able to see me immediately. She was amazing and knew exactly what she was doing!" },
    { name: "Maria S.", text: "Dr. Patel is so thorough and patient. She took the time to explain everything about my eye health. The best optometrist I've ever visited." },
    { name: "David K.", text: "Wonderful experience from start to finish. The office is modern, clean, and the frame selection is fantastic. Highly recommend!" },
    { name: "Sarah M.", text: "She is the best eye doctor I've been to. She's very good at patiently and kindly explaining any concerns that you have." },
    { name: "Priya R.", text: "Excellent care for the whole family. Dr. Patel diagnosed my son's myopia early and started a management plan. We are so grateful!" },
    { name: "Tom W.", text: "The staff is incredibly friendly and the technology here is top-notch. My exam was quick and thorough — couldn't ask for more." },
    { name: "Michelle L.", text: "I love the designer frame selection here! Dr. Patel helped me pick the perfect pair. My vision has never been better!" },
    { name: "James C.", text: "After years of dry eye discomfort, Dr. Patel created a treatment plan that actually works. Life-changing results. Thank you!" },
    { name: "Amanda H.", text: "As someone who wears specialty contacts, I appreciate Dr. Patel's expertise in fitting. She got it right on the first try!" },
];

function useSlidesPerView() {
    const [slidesPerView, setSlidesPerView] = useState(3);
    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 640) setSlidesPerView(1);
            else if (window.innerWidth < 1024) setSlidesPerView(2);
            else setSlidesPerView(3);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return slidesPerView;
}

export default function Testimonials() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesPerView = useSlidesPerView();
    const totalSlides = Math.ceil(reviews.length / slidesPerView);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Reset to slide 0 when slidesPerView changes to avoid out-of-bounds
    useEffect(() => { setCurrentSlide(0); }, [slidesPerView]);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const currentReviews = reviews.slice(
        currentSlide * slidesPerView,
        currentSlide * slidesPerView + slidesPerView
    );

    return (
        <section className="py-14 sm:py-20 relative overflow-hidden">
            {/* Soft background */}
            <div className="absolute inset-0 bg-mesh-soft" />
            <div className="absolute inset-0 bg-dot-grid opacity-30" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <FocusReveal className="text-center max-w-2xl mx-auto mb-16">
                    <div className="flex justify-center items-center gap-1 text-accent mb-6">
                        {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} fill="currentColor" size={22} className="drop-shadow-sm" />
                        ))}
                    </div>
                    <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-900 mb-5">
                        What Our Patients{" "}
                        <span className="text-gradient-primary">Say</span>
                    </h2>
                    <p className="text-lg text-text-muted">
                        ⭐ 4.8 Average Rating on Google — trusted by families across Abington.
                    </p>
                </FocusReveal>

                {/* Slider */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <m.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.4 }}
                            className="grid gap-5 sm:gap-6"
                            style={{ gridTemplateColumns: `repeat(${slidesPerView}, 1fr)` }}
                        >
                            {currentReviews.map((r, i) => (
                                <div
                                    key={`${currentSlide}-${i}`}
                                    className="glass-card rounded-3xl p-5 sm:p-8 relative group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-500/8 transition-all duration-500"
                                >
                                    {/* Decorative quote */}
                                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Quote className="text-primary-600 rotate-180" size={52} />
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1 text-accent mb-5">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={15} fill="currentColor" />)}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-text-main italic leading-relaxed mb-5 sm:mb-8 relative z-10 min-h-[80px] sm:min-h-[110px] font-serif text-base sm:text-lg tracking-wide">
                                        &ldquo;{r.text}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center justify-between border-t border-primary-50/50 pt-4">
                                        <p className="font-bold text-primary-900 text-sm">— {r.name}</p>
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-xs group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white transition-all duration-300">
                                            {r.name.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </m.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="hidden sm:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 glass-strong rounded-full items-center justify-center text-primary-700 hover:bg-primary-600 hover:text-white transition-all shadow-lg hover:shadow-xl z-20"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="hidden sm:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 glass-strong rounded-full items-center justify-center text-primary-700 hover:bg-primary-600 hover:text-white transition-all shadow-lg hover:shadow-xl z-20"
                        aria-label="Next testimonials"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-10">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide
                                ? "w-8 bg-primary-500"
                                : "w-2.5 bg-primary-200 hover:bg-primary-300"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://goo.gl/maps/BdRkrUu3Rm8C6iom6"
                        className="inline-flex items-center gap-2 font-bold text-primary-600 hover:text-accent transition-colors text-sm uppercase tracking-[0.15em] group"
                        target="_blank" rel="noopener noreferrer"
                    >
                        Read All Reviews on Google
                        <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </m.div>
            </div>
        </section>
    );
}
