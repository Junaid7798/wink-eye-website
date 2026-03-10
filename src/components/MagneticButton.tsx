"use client";

import { useRef, ReactNode } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    target?: string;
    rel?: string;
    /** Strength of the pull — 0.25 means it moves 25% toward the cursor. Default 0.3 */
    strength?: number;
    onClick?: () => void;
}

/**
 * MagneticButton — A premium interaction effect.
 * The button subtly follows the cursor when you hover near it,
 * then snaps back smoothly when the cursor leaves.
 */
export function MagneticButton({
    children,
    className = "",
    href,
    target,
    rel,
    strength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0px, 0px)";
    };

    const sharedProps = {
        ref,
        className: `${className} transition-transform duration-300 ease-out`,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: { willChange: "transform" },
    };

    if (href) {
        return (
            <a href={href} target={target} rel={rel} {...sharedProps}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} {...sharedProps}>
            {children}
        </button>
    );
}
