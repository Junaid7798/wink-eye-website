"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { FocusReveal } from "./FocusReveal";

const brands = [
    { name: "Bebe", logo: "bebe-logo.png" },
    { name: "BCBG", logo: "bcbg.png" },
    { name: "Calvin Klein", logo: "calvin-klein-logo.png" },
    { name: "Cruz", logo: "cruz-logo.png" },
    { name: "EasyTwist", logo: "easytwist-logo.png" },
    { name: "Europa", logo: "europa-logo.png" },
    { name: "FYSH", logo: "fysh-logo.png" },
    { name: "Gant", logo: "gant-logo.png" },
    { name: "Michael Ryen", logo: "michael-ryen-logo.png" },
    { name: "Miyagi", logo: "miyagi-logo.png" },
    { name: "Scott Harris", logo: "scott-harris-logo.png" },
    { name: "Steve Madden", logo: "steve-madden-logo.png" },
    { name: "XXL", logo: "xxl-logo.png" },
];

export default function BrandsShowcase() {
    // Duplicate brands for seamless infinite scroll
    const duplicatedBrands = [...brands, ...brands];

    return (
        <section id="designbrand" className="py-20 relative overflow-hidden bg-white">
            {/* Subtle, blended interior image background */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                <Image
                    src="/images/eyeglasses-display.png"
                    alt="Wink Eye Care Interior"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </div>
            {/* Lighting Overlay to ensure text legibility and soft blending */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/30 to-white/90 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-20 gap-6 sm:gap-8">
                    <FocusReveal className="max-w-xl">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass bg-white/80 backdrop-blur-md text-xs font-bold uppercase tracking-[0.15em] text-primary-700 mb-5 shadow-sm border border-primary-100">
                            Our Collection
                        </span>
                        <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-900 leading-tight">
                            Designer Brands.
                            <br />
                            <span className="text-gradient-primary">Uncompromised Style.</span>
                        </h2>
                    </FocusReveal>
                    <m.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-sm"
                    >
                        <p className="text-primary-800/80 font-medium mb-4 leading-relaxed bg-white/60 p-5 rounded-2xl backdrop-blur-sm border border-white/50 shadow-sm">
                            Browse our handpicked collection of designer frames and sunglasses. Visit us to try them on!
                        </p>
                    </m.div>
                </div>

                {/* Single Marquee Row — Larger full color logos */}
                <div className="marquee-container overflow-hidden py-4">
                    <div className="flex animate-marquee gap-8" style={{ width: "max-content" }}>
                        {duplicatedBrands.map((brand, idx) => (
                            <div
                                key={`r1-${idx}`}
                                className="glass-card h-24 w-36 sm:h-32 sm:w-56 flex-shrink-0 flex items-center justify-center rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 bg-white/90 backdrop-blur-md border border-primary-50/50"
                            >
                                <Image
                                    src={`/images/${brand.logo}`}
                                    alt={brand.name}
                                    width={160}
                                    height={80}
                                    className="max-h-16 w-auto object-contain filter drop-shadow-sm transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
