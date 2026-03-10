"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";

interface FocusRevealProps {
    children: ReactNode;
    className?: string;
    /** Delay in seconds before the animation starts */
    delay?: number;
    /** How far the element drifts up from (px). Default 24 */
    yOffset?: number;
}

/**
 * FocusReveal — An eye-care themed scroll animation.
 * Elements animate from blurred + faded + slightly offset
 * into sharp focus, like an eye adjusting its lens.
 */
export function FocusReveal({
    children,
    className,
    delay = 0,
    yOffset = 24,
}: FocusRevealProps) {
    return (
        <m.div
            initial={{ opacity: 0, y: yOffset, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </m.div>
    );
}
