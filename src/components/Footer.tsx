import { Eye, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MagneticButton } from "./MagneticButton";

export default function Footer() {
    return (
        <footer id="contact" className="bg-gradient-dark pt-24 pb-12 relative overflow-hidden">
            {/* Decorative orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-orb" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] translate-y-1/3" />

            {/* Line grid */}
            <div className="absolute inset-0 bg-line-grid" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* CTA Banner — with visible image */}
                <div className="relative rounded-[3rem] overflow-hidden mb-24 shadow-2xl">
                    {/* Background image — visible and prominent */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/dr-patel-slit-lamp.png"
                            alt="Dr. Patel performing eye examination"
                            fill
                            sizes="100vw"
                            className="object-cover object-[center_35%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/50 to-transparent" />
                    </div>

                    <div className="relative z-10 py-16 px-5 sm:py-24 sm:px-10 md:py-36 md:px-24 flex flex-col items-start justify-center gap-6 sm:gap-10 text-left">
                        <div className="text-white max-w-lg">
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-extrabold mb-4 leading-tight">
                                SEE AND BE SEEN
                            </h2>
                        </div>
                        <div className="shrink-0 mt-2">
                            <MagneticButton
                                href="https://calendar.app.google/Ke2Rg6r8pgH8d5MCA"
                                className="inline-block px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg bg-white text-primary-900 font-bold rounded-full hover:bg-primary-50 shadow-xl hover:shadow-2xl duration-300"
                                target="_blank" rel="noopener noreferrer"
                            >
                                Schedule Your Appointment Today
                            </MagneticButton>
                        </div>
                    </div>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/8 pb-16 mb-8 text-primary-50/60">

                    {/* Brand Col — no white background */}
                    <div className="space-y-6">
                        <div className="inline-block">
                            <span className="text-3xl font-serif font-extrabold text-white tracking-tight">
                                wink <span className="text-accent italic font-light font-sans text-2xl tracking-normal">eye care</span>
                            </span>
                        </div>
                        <p className="leading-relaxed text-sm max-w-sm">
                            Comprehensive eye care in Abington, PA. Providing patients with high quality eye exams, eyeglasses, and contact lenses.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="w-10 h-10 rounded-xl glass-card-dark flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 text-white/60 hover:scale-110">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl glass-card-dark flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 text-white/60 hover:scale-110">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3.5 text-sm font-medium">
                            {[
                                { href: "#home", label: "Home" },
                                { href: "#ourdoctor", label: "About Dr. Patel" },
                                { href: "#designbrand", label: "Designer Brands" },
                                { href: "#storeinfo", label: "Office Information" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-lg mb-6">Services</h4>
                        <ul className="space-y-3.5 text-sm font-medium">
                            {[
                                "Routine Exams",
                                "Contact Lenses",
                                "Myopia Management",
                                "Dry Eye Therapy",
                            ].map((svc, i) => (
                                <li key={i}>
                                    <Link href="#services" className="hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block">
                                        {svc}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-serif font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="flex gap-3 items-start group">
                                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0 mt-0.5">
                                    <MapPin size={15} />
                                </div>
                                <span className="group-hover:text-white transition-colors">1151 Old York Rd #103<br />Abington PA 19001</span>
                            </li>
                            <li className="flex gap-3 items-center group">
                                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0">
                                    <Phone size={15} />
                                </div>
                                <a href="tel:215-935-6320" className="group-hover:text-white transition-colors">215-935-6320</a>
                            </li>
                            <li className="flex gap-3 items-center group">
                                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0">
                                    <Mail size={15} />
                                </div>
                                <a href="mailto:winkeyecare20@gmail.com" className="group-hover:text-white transition-colors">winkeyecare20@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/30">
                    <p>© {new Date().getFullYear()} Wink Eye Care & Optical. All rights reserved.</p>
                    <p className="flex items-center gap-2"><Eye size={14} className="text-primary-400/50" /> Participating provider in most insurance plans.</p>
                </div>
            </div>
        </footer>
    );
}
