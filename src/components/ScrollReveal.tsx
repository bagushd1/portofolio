"use client";

import { motion, LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export default function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) {
    const getInitialProps = () => {
        switch (direction) {
            case "down": return { opacity: 0, y: -30 };
            case "left": return { opacity: 0, x: 30 };
            case "right": return { opacity: 0, x: -30 };
            case "up":
            default: return { opacity: 0, y: 50 };
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            <motion.div
                initial={getInitialProps()}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
                className={className}
            >
                {children}
            </motion.div>
        </LazyMotion>
    );
}
