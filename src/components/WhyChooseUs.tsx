"use client";

import { m } from "framer-motion";
import { Clock, Smartphone, Glasses, ShieldCheck, Gem, Car } from "lucide-react";
import Image from "next/image";
import { FocusReveal } from "./FocusReveal";

const differentiators = [
    { icon: Clock, title: "Ample Time", desc: "She believes in spending ample time with each patient to deliver personalized, thorough care." },
    { icon: Smartphone, title: "Latest Technology", desc: "We offer patients the latest in lens technology, including high-definition digital lenses." },
    { icon: ShieldCheck, title: "Insurance Accepted", desc: "Participating provider in most insurance plans for your convenience." },
    { icon: Gem, title: "Women-Owned", desc: "Proudly women-owned business serving the Abington community." },
    { icon: Car, title: "Easy Access", desc: "Accessible via SEPTA bus route 55 and Regional Rail West Trenton Line with ample parking." },
    { icon: Glasses, title: "Designer Brands", desc: "Browse our handpicked collection of designer frames and premium sunglasses." },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Full background image with dark overlay */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero-bg.jpg.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f1923]/88 via-[#0f1923]/92 to-[#0f1923]/88" />
            </div>

            {/* Line grid */}
            <div className="absolute inset-0 bg-line-grid" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <FocusReveal className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-bold uppercase tracking-[0.15em] text-primary-200 mb-6">
                        Why Choose Us
                    </span>
                    <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white mb-6 leading-tight">
                        Why Choose{" "}
                        <span className="text-gradient-accent">Wink Eye Care?</span>
                    </h2>
                    <p className="text-lg text-primary-100/60 leading-relaxed">
                        Providing patients with high quality eye exams, eyeglasses, and contact lenses with a personal touch.
                    </p>
                </FocusReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {differentiators.map((diff, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="glass-card-dark rounded-3xl p-5 sm:p-8 group hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 bg-accent/15 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent/25 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/10">
                                <diff.icon size={26} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-primary-100 transition-colors">{diff.title}</h3>
                            <p className="text-primary-100/55 leading-relaxed text-sm">{diff.desc}</p>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
