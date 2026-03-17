"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed bottom-[40px] left-1/2 -translate-x-1/2 z-[51] pointer-events-none">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white border-4 border-foreground rounded-full h-10 md:h-12 w-[180px] md:w-[260px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center px-5 gap-4 overflow-hidden"
            >
                <div className="flex-1 h-3 bg-foreground/5 rounded-full overflow-hidden relative border-2 border-foreground/10">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-primary origin-left w-full h-full"
                        style={{ scaleX }}
                    />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground/40 hidden sm:block">
                    Progress
                </span>
            </motion.div>
        </div>
    );
}
