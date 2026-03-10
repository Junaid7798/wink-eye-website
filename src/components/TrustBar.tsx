"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { ShieldCheck, Clock, Gem } from "lucide-react";

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const step = target / (duration * 60); // 60fps
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}</span>;
}

const stats = [
    { icon: ShieldCheck, value: 18, sublabel: "Clinical Experience", isAnimated: true, displayValue: "", displaySuffix: " Years" },
    { icon: Clock, value: 0, sublabel: "With Every Patient", isAnimated: false, displayValue: "Ample", displaySuffix: " Time" },
    { icon: Gem, value: 0, sublabel: "Business", isAnimated: false, displayValue: "Women", displaySuffix: "-Owned" },
];

export default function TrustBar() {
    return (
        <section className="relative z-20 mt-8">
            <div className="max-w-5xl mx-auto px-6">
                <div className="glass-strong rounded-3xl shadow-xl py-6 sm:py-8 px-5 sm:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
                        {stats.map((stat, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-4 sm:gap-0 sm:space-y-3 group"
                            >
                                <m.div
                                    initial={{ scale: 0.8 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.15, type: "spring", stiffness: 200 }}
                                    className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-500/20 group-hover:scale-110"
                                >
                                    <stat.icon size={24} />
                                </m.div>
                                <div className="text-left sm:text-center">
                                    <h3 className="text-xl md:text-2xl font-serif font-extrabold text-primary-900">
                                        {stat.isAnimated ? (
                                            <>
                                                <AnimatedCounter target={stat.value} />
                                                <span className="text-primary-500 font-bold">+{stat.displaySuffix}</span>
                                            </>
                                        ) : (
                                            <>
                                                {stat.displayValue}
                                                <span className="text-primary-500 font-bold">{stat.displaySuffix}</span>
                                            </>
                                        )}
                                    </h3>
                                    <p className="text-xs text-text-muted uppercase tracking-[0.15em] font-bold mt-1">
                                        {stat.sublabel}
                                    </p>
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
