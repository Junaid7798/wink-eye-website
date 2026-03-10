"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { FocusReveal } from "./FocusReveal";

const servicesList = [
    { title: "Routine Eye Exams", icon: "routine_exam.png", desc: "Thorough, comprehensive eye exams for the whole family using the latest diagnostic technology." },
    { title: "Contact Lenses", icon: "contact_lenses.png", desc: "Expert fitting and prescription for all types of contact lenses, including specialty designs." },
    { title: "Myopia Management", icon: "myopic-management.png", desc: "Advanced treatments to slow myopia progression in children and young adults." },
    { title: "Glaucoma Testing", icon: "coma.png", desc: "Early detection and ongoing management of glaucoma with cutting-edge imaging." },
    { title: "Retinal Imaging", icon: "retinal_macular_imaging.png", desc: "High-definition digital scans to monitor retinal health and detect conditions early." },
    { title: "Dry Eye Therapy", icon: "dry-eye-therapy-img.png", desc: "Personalized treatment plans to relieve chronic dry eye discomfort and symptoms." },
    { title: "Designer Frames", icon: "design_frame.png", desc: "Handpicked collection of premium designer frames from top fashion brands." },
    { title: "Sunglasses", icon: "sunglass.png", desc: "Protect your eyes in style with our curated selection of prescription and non-prescription sunglasses." },
];

export default function ServicesGrid() {
    return (
        <section id="services" className="py-20 relative overflow-hidden bg-mesh-soft">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">

                {/* Header */}
                <FocusReveal className="text-center max-w-4xl mx-auto mb-12 md:mb-24">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm font-bold uppercase tracking-[0.15em] text-primary-700 mb-6 shadow-sm">
                        Our Services
                    </span>
                    <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-primary-900 mb-5 sm:mb-8 leading-tight">
                        Personalized eye care for{" "}
                        <span className="text-gradient-primary">every stage</span> of life.
                    </h2>
                    <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
                        From routine exams to advanced treatments, we offer the latest in lens technology and personalized care plans.
                    </p>
                </FocusReveal>

                {/* Grid - 4 Columns, 2 Rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
                    {servicesList.map((svc, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="group bg-white rounded-3xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 relative border border-gray-100 flex flex-col h-full hover:-translate-y-2"
                        >
                            <div className="relative z-10 flex flex-col h-full items-center text-center">
                                {/* Bigger image container */}
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-50 group-hover:bg-primary-50 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 p-4">
                                    <Image
                                        src={`/images/${svc.icon}`}
                                        alt={svc.title}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Sharp, Dark Text */}
                                <h3 className="text-xl md:text-2xl font-serif font-black text-gray-900 mb-4 group-hover:text-primary-800 transition-colors tracking-tight">
                                    {svc.title}
                                </h3>

                                <p className="text-gray-700 font-medium text-[15px] leading-relaxed mb-8 flex-grow">
                                    {svc.desc}
                                </p>

                                <div className="flex items-center gap-2 text-primary-700 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all duration-300 mt-auto">
                                    Learn More <span className="text-xl leading-none transition-transform">→</span>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
