"use client";

import { motion } from "framer-motion";
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
            case "down": return { opacity: 0, y: -50 };
            case "left": return { opacity: 0, x: 50 };
            case "right": return { opacity: 0, x: -50 };
            case "up":
            default: return { opacity: 0, y: 80 };
        }
    };

    return (
        <motion.div
            initial={getInitialProps()}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
