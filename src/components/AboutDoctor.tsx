"use client";

import { m } from "framer-motion";
import { GraduationCap, Award, Stethoscope } from "lucide-react";
import Image from "next/image";
import { FocusReveal } from "./FocusReveal";

export default function AboutDoctor() {
    return (
        <section id="ourdoctor" className="py-20 relative overflow-hidden bg-mesh-soft">
            {/* Decorative orbs */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary-100/30 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/4" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[80px] translate-y-1/4" />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">

                {/* Left: Image */}
                <m.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-lg mx-auto w-full lg:max-w-none"
                >
                    {/* Decorative glass frame */}
                    <div className="absolute -inset-4 md:-inset-6 glass rounded-[3rem] -rotate-2 z-0 opacity-60" />
                    <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-primary-100/30 to-accent/10 rounded-[3rem] rotate-2 z-0 blur-sm" />

                    {/* Main Image — doctor.jpg.png */}
                    <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl z-10">
                        <Image
                            src="/images/doctor.jpg.png"
                            alt="Dr. Minal Patel - Optometrist"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                            className="object-cover hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/15 via-transparent to-transparent" />
                    </div>

                    {/* Floating Experience Badge */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute -right-4 lg:-right-10 bottom-16 glass-strong px-7 py-5 rounded-3xl shadow-xl z-20 animate-float hidden sm:block"
                    >
                        <h4 className="text-4xl font-serif font-extrabold text-gradient-primary">18+</h4>
                        <p className="text-[10px] font-bold text-text-muted mt-1 tracking-[0.15em] uppercase">Years<br />Experience</p>
                    </m.div>
                </m.div>

                {/* Right: Content */}
                <FocusReveal delay={0.15} className="flex flex-col space-y-7">
                    <div>
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm font-bold uppercase tracking-[0.15em] text-primary-700 mb-5">
                            Our Doctor
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4 sm:mb-5 leading-tight">
                            Meet Wink Optometrist<br />
                            <span className="text-gradient-primary">Dr. Minal Patel</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-accent to-accent-gold rounded-full mb-7" />

                        <div className="space-y-3 sm:space-y-5 text-text-muted leading-relaxed text-[13px] sm:text-[15px]">
                            <p>
                                Dr. Minal Patel is a licensed therapeutic optometrist with over 18 years of clinical experience. She has extensive expertise in contact lenses, glaucoma management, dry eye treatment, myopia management, and the co-management of refractive (LASIK) and cataract surgeries. She is also certified in orthokeratology.
                            </p>
                            <p>
                                Dr. Minal Patel is the owner of Wink Eye Care and Optical. She earned her Bachelor of Science degree and a degree in Business Administration from Temple University and completed her Doctor of Optometry at the Pennsylvania College of Optometry at Salus University in Jenkintown, PA. She completed a primary care externship at The Eye Institute in Philadelphia and further advanced her clinical training through an ocular disease externship at Omni Eye Care in Atlanta, GA.
                            </p>
                            <p>
                                Dr. Patel is passionate about providing exceptional, personalized eye care. She believes in spending ample time with each patient and performing thorough, comprehensive eye examinations. Her philosophy of care focuses not only on correcting vision, but on identifying and treating the underlying root causes of eye conditions to support long-term eye health.
                            </p>
                            <p>
                                Outside of the office, Dr. Patel enjoys painting, staying active through fitness and workouts, watching football and basketball, and exploring new restaurants with her husband.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-3">
                        <a
                            href="https://calendar.app.google/Ke2Rg6r8pgH8d5MCA"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-primary-900 text-white font-bold rounded-full hover:bg-primary-700 transition-all duration-300 shadow-[0_8px_30px_rgba(2,42,53,0.3)] hover:shadow-[0_12px_40px_rgba(2,42,53,0.45)] hover:-translate-y-1 active:translate-y-0 text-[15px]"
                            target="_blank" rel="noopener noreferrer"
                        >
                            Book with Dr. Patel
                        </a>
                    </div>
                </FocusReveal>
            </div>
        </section>
    );
}
