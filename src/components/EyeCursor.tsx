"use client";

import { useEffect, useRef, useState } from "react";

// Glow colours that cycle after each blink
const GLOW_COLORS = [
    "#0a7e9a", // teal
    "#2563eb", // blue
    "#16a34a", // green
    "#9333ea", // purple
    "#ea580c", // orange
    "#e11d48", // red
];

export function EyeCursor() {
    const cursorRef  = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [colorIdx,   setColorIdx]   = useState(0);
    const [blinkScale, setBlinkScale] = useState(1);
    const [mounted,    setMounted]    = useState(false);

    useEffect(() => {
        setMounted(true);
        if (window.matchMedia("(hover: none)").matches) return;

        let mouseX = 0, mouseY = 0;

        const moveCursor = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            const interactive = t.closest("a, button, [role='button'], input, select, textarea, label");
            setIsHovering(!!interactive);
            document.documentElement.style.cursor = interactive ? "pointer" : "none";
        };

        // Blink: squish closed → swap glow colour → open
        const blinkInterval = setInterval(() => {
            setBlinkScale(0.05);                        // lid closes
            setTimeout(() => {
                setColorIdx(i => (i + 1) % GLOW_COLORS.length); // colour changes while closed
                setBlinkScale(1);                       // lid opens → new glow revealed
            }, 150);
        }, 3000 + Math.random() * 1500);

        document.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);
        document.documentElement.style.cursor = "none";

        return () => {
            clearInterval(blinkInterval);
            document.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.documentElement.style.cursor = "";
        };
    }, []);

    if (!mounted) return null;

    const glow = GLOW_COLORS[colorIdx];

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
            style={{
                willChange: "transform",
                transform: "translate(-100px, -100px)",
                opacity: isHovering ? 0 : 1,
                transition: "opacity 0.1s ease",
            }}
        >
            <div
                style={{
                    fontSize: "26px",
                    lineHeight: 1,
                    transform: `translate(-50%, -50%) scaleY(${blinkScale})`,
                    transition: blinkScale < 1
                        ? "transform 0.07s ease-in"
                        : "transform 0.12s ease-out",
                    // Coloured drop-shadow glow changes with each blink
                    filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 12px ${glow}80)`,
                    willChange: "transform, filter",
                }}
            >
                👁️
            </div>
        </div>
    );
}
