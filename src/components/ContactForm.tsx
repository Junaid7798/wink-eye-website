"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const resp = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.error || "Failed to submit.");
            }

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
        } catch (err) {
            console.error("Form error:", err);
            setStatus("error");
            setErrorMessage((err as Error).message);
        }
    };

    return (
        <section id="storeinfo" className="py-20 relative overflow-hidden bg-mesh-soft">
            {/* Decorative */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary-100/20 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-bold uppercase tracking-[0.15em] text-primary-700 mb-5">
                        Get In Touch
                    </span>
                    <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-900 mb-5">
                        Contact <span className="text-gradient-primary">Us</span>
                    </h2>
                    <p className="text-lg text-text-muted max-w-lg mx-auto">
                        Have a question or need assistance? Send us a message and we&apos;ll reply shortly.
                    </p>
                </m.div>

                <div className="flex flex-col gap-8">

                    {/* Row 1: Image (left) & Office Info + Hours (right) */}
                    <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                        {/* Left: Exterior Photo — stretches to match right column */}
                        <m.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary-100/50 min-h-[220px] sm:min-h-[400px]"
                        >
                            <Image
                                src="/images/Building exterior.png"
                                alt="Wink Eye Care Clinic Exterior"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </m.div>

                        {/* Right: Info and Hours */}
                        <m.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            {/* Contact Info Card */}
                            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 flex-1 shadow-xl">
                                <h3 className="font-serif font-bold text-2xl text-primary-900 mb-8">Office Information</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-5 items-start group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-md">
                                            <MapPin size={22} />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="font-bold text-primary-900 text-base mb-1">Address</p>
                                            <p className="text-text-muted text-sm leading-relaxed">1151 Old York Rd, Suite 103<br />Abington, PA 19001</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-start group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-md">
                                            <Phone size={22} />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="font-bold text-primary-900 text-base mb-1">Phone</p>
                                            <a href="tel:215-935-6320" className="text-text-muted text-sm hover:text-primary-600 transition-colors">215-935-6320</a>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-start group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-md">
                                            <Mail size={22} />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className="font-bold text-primary-900 text-base mb-1">Email</p>
                                            <a href="mailto:winkeyecare20@gmail.com" className="text-text-muted text-sm hover:text-primary-600 transition-colors break-all">winkeyecare20@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hours Card */}
                            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent shadow-md">
                                        <Clock size={22} />
                                    </div>
                                    <h3 className="font-serif font-bold text-2xl text-primary-900">Office Hours</h3>
                                </div>
                                <div className="space-y-3.5 text-[15px]">
                                    {[
                                        { day: "Monday", hours: "10:00 AM – 6:00 PM" },
                                        { day: "Tuesday", hours: "11:00 AM – 7:00 PM" },
                                        { day: "Wednesday", hours: "11:00 AM – 6:00 PM" },
                                        { day: "Thursday", hours: "Closed" },
                                        { day: "Friday", hours: "9:30 AM – 5:00 PM" },
                                        { day: "Saturday", hours: "Every other Sat: 9 AM – 3 PM" },
                                        { day: "Sunday", hours: "Closed" },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex justify-between py-1 ${item.hours === "Closed" ? "text-text-light" : "text-text-main"}`}>
                                            <span className="font-semibold">{item.day}</span>
                                            <span className="text-text-muted">{item.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </m.div>
                    </div>

                    {/* Row 2: Parking Info (left) & Map (right) */}
                    <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                        {/* Left: Parking & Transit Card */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-center"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-2-2.2-3.3C13 5.5 12 5 11 5H5c-1.1 0-2.1.6-2.7 1.4L1 8v8c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
                                </div>
                                <h3 className="font-serif font-bold text-2xl text-primary-900">Parking & Public Transportation</h3>
                            </div>
                            <p className="text-text-main text-base leading-relaxed font-medium">
                                Accessible via SEPTA bus route 55 and Regional Rail West Trenton Line to the Noble Station. Free parking widely available.
                            </p>
                        </m.div>

                        {/* Right: Google Map */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <a
                                href="https://maps.google.com/?q=1151+Old+York+Rd+Suite+103+Abington+PA+19001"
                                target="_blank" rel="noopener noreferrer"
                                className="block rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative w-full h-full min-h-[250px] border border-primary-100/50"
                            >
                                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/10 transition-all duration-300 z-10 flex items-center justify-center pointer-events-none">
                                    <span className="bg-white/95 text-primary-700 font-bold px-5 py-2.5 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl transform group-hover:scale-105 pointer-events-auto">
                                        Open in Google Maps →
                                    </span>
                                </div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.0!2d-75.119!3d40.113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6b0!2s1151+Old+York+Rd+Abington+PA!5e0!3m2!1sen!2sus!4v1"
                                    className="w-full h-full pointer-events-none"
                                    loading="lazy"
                                    title="Wink Eye Care Location"
                                />
                            </a>
                        </m.div>
                    </div>

                    {/* Bottom: Form below Map */}
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-primary-50 w-full max-w-full mt-8"
                    >
                        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-primary-900 mb-7 sm:mb-10 text-center">Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-primary-900 mb-3">Full Name <span className="text-accent">*</span></label>
                                    <input
                                        type="text" name="name" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full bg-[#f5f8fa] border border-primary-100 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 focus:bg-white transition-all duration-300 text-primary-900 placeholder:text-text-light text-[15px]"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-primary-900 mb-3">Email Address <span className="text-accent">*</span></label>
                                    <input
                                        type="email" name="email" required
                                        value={formData.email} onChange={handleChange}
                                        className="w-full bg-[#f5f8fa] border border-primary-100 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 focus:bg-white transition-all duration-300 text-primary-900 placeholder:text-text-light text-[15px]"
                                        placeholder="johndoe@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-primary-900 mb-3">Phone Number <span className="text-accent">*</span></label>
                                    <input
                                        type="tel" name="phone" required
                                        value={formData.phone} onChange={handleChange}
                                        className="w-full bg-[#f5f8fa] border border-primary-100 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 focus:bg-white transition-all duration-300 text-primary-900 placeholder:text-text-light text-[15px]"
                                        placeholder="215-555-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-primary-900 mb-3">Subject</label>
                                    <select
                                        name="subject" value={formData.subject} onChange={handleChange}
                                        className="w-full bg-[#f5f8fa] border border-primary-100 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 focus:bg-white transition-all duration-300 text-primary-900 text-[15px] appearance-none cursor-pointer"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Appointment Request">Appointment Request</option>
                                        <option value="Insurance Question">Insurance Question</option>
                                        <option value="Eyewear Inquiry">Eyewear Inquiry</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-primary-900 mb-3">Message <span className="text-accent">*</span></label>
                                <textarea
                                    name="message" required rows={5}
                                    value={formData.message} onChange={handleChange}
                                    className="w-full bg-[#f5f8fa] border border-primary-100 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 focus:bg-white transition-all duration-300 text-primary-900 placeholder:text-text-light text-[15px] resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <AnimatePresence>
                                {status === "success" && (
                                    <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-green-50 text-green-700 p-5 rounded-2xl flex items-center gap-4 border border-green-200">
                                        <CheckCircle className="shrink-0" size={24} />
                                        <p className="font-medium text-[15px]">Thank you! Your message has been sent successfully.</p>
                                    </m.div>
                                )}
                                {status === "error" && (
                                    <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-red-50 text-red-700 p-5 rounded-2xl flex items-center gap-4 border border-red-200">
                                        <AlertCircle className="shrink-0" size={24} />
                                        <p className="font-medium text-[15px]">Oops: {errorMessage}</p>
                                    </m.div>
                                )}
                            </AnimatePresence>

                            <div className="pt-4 text-center">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="group inline-flex w-full sm:w-auto px-12 py-5 items-center justify-center gap-3 bg-primary-600 font-bold text-white rounded-full hover:bg-primary-700 transition-all duration-300 shadow-[0_8px_25px_rgba(10,126,154,0.3)] hover:shadow-[0_12px_35px_rgba(10,126,154,0.45)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-[17px]"
                                >
                                    {status === "loading" ? "Sending..." : "Send Message"}
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </m.div >
                </div >
            </div >
        </section >
    );
}
