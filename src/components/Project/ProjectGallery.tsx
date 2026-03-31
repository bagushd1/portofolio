"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { m, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { X, Maximize2, ArrowLeft, ArrowRight, MousePointer2 } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
}

/**
 * ProjectGallery Component (Refined: Full-Width Breakout)
 * Redesigned to span the full viewport while maintaining alignment with parent content.
 * Prevents shadow clipping and adds a custom Brutalist scrollbar.
 */
export default function ProjectGallery({ images }: ProjectGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Scroll Progress Logic
    const { scrollXProgress } = useScroll({
        container: containerRef
    });
    
    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (!images || images.length === 0) return null;

    const nextImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    };

    // Width patterns for "Bento" feel (in viewport units or px)
    const getWidth = (index: number) => {
        const widths = [
            "min-w-[85vw] md:min-w-[800px]", // Wide
            "min-w-[65vw] md:min-w-[500px]", // Standard
            "min-w-[95vw] md:min-w-[950px]", // Panorama
            "min-w-[75vw] md:min-w-[650px]", // Medium
        ];
        return widths[index % widths.length];
    };

    return (
        <section className="my-32 md:my-48 relative">
            {/* Header Aligned to Content (1000px max-width) */}
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-0 mb-16 flex items-end justify-between">
                <ScrollReveal delay={0.1}>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter border-b-[12px] border-primary inline-block leading-[0.8]">
                        Project Gallery
                    </h2>
                </ScrollReveal>
                
                {/* Scroll Hint */}
                <ScrollReveal delay={0.2} className="hidden md:flex items-center gap-3 text-foreground/40 font-black uppercase text-[10px] tracking-widest pb-4">
                    <MousePointer2 className="w-5 h-5 animate-bounce-x text-primary" /> Explore Gallery
                </ScrollReveal>
            </div>

            {/* ERROR: The gallery is currently inside a max-w-1000px container in page.tsx 
                So I will use the breakout trick to span full-screen. */}
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                {/* Horizontal Scroll Strip with extra vertical padding for Shadows */}
                <div 
                    ref={containerRef}
                    className={cn(
                        "flex gap-10 md:gap-16 overflow-x-auto pb-24 pt-8 px-[calc(50vw-500px)]",
                        "cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth",
                        "custom-brutalist-scrollbar"
                    )}
                    style={{
                        // Ensure alignment logic works on mobile by providing a minimum padding
                        paddingLeft: "max(1rem, calc(50vw - 500px))",
                        paddingRight: "max(1rem, calc(50vw - 500px))"
                    }}
                >
                    {images.map((url, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative h-[350px] md:h-[550px] snap-start shrink-0 group",
                                "border-4 md:border-8 border-foreground rounded-[2.5rem] md:rounded-[4rem] overflow-hidden",
                                "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-500",
                                getWidth(index)
                            )}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <Image
                                src={url}
                                alt={`Project reveal ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                draggable={false}
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 className="w-16 h-16 text-foreground bg-background p-4 rounded-full border-4 border-foreground shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform scale-50 group-hover:scale-100 transition-all" />
                            </div>

                            {/* Image Index Indicator */}
                            <div className="absolute top-8 left-8 px-6 py-3 bg-foreground text-background font-black text-[10px] uppercase tracking-widest rounded-full z-10 shadow-[4px_4px_0px_0px_rgba(187,247,208,1)]">
                                PROJECT ASSET / {(index + 1).toString().padStart(2, '0')}
                            </div>
                        </m.div>
                    ))}
                    
                    {/* Visual Offset Spacer at the end */}
                    <div className="min-w-[2rem] md:min-w-[5vw]" />
                </div>

                {/* Refined Progress Bar - Aligned to Content */}
                <div className="max-w-[1000px] mx-auto px-4 mt-8">
                    <div className="h-8 w-full bg-slate-100 border-4 border-foreground rounded-full overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <m.div 
                            className="absolute inset-y-0 left-0 bg-primary border-r-4 border-foreground"
                            style={{ scaleX, transformOrigin: "0%" }}
                        />
                    </div>
                </div>
            </div>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedIndex(null)}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-8 right-8 text-background hover:text-primary transition-colors z-[110]"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X className="w-12 h-12" />
                        </button>

                        {/* Navigation Buttons */}
                        <div className="absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[110]">
                            <button 
                                className="p-4 md:p-6 bg-background text-foreground border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-1 hover:translate-y-1 transition-all pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            >
                                <ArrowLeft className="w-8 h-8 md:w-10 md:h-10" />
                            </button>
                            <button 
                                className="p-4 md:p-6 bg-background text-foreground border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-1 hover:translate-y-1 transition-all pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            >
                                <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
                            </button>
                        </div>

                        {/* Large Image Container */}
                        <m.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-7xl aspect-video border-8 border-background rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[selectedIndex]}
                                alt="Gallery detail view"
                                fill
                                className="object-contain"
                            />
                        </m.div>

                        {/* Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-primary px-6 py-2 border-4 border-foreground text-foreground font-black uppercase tracking-[0.5em] text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Custom Utility Styles - Brutalist Scrollbar */}
            <style jsx global>{`
                .custom-brutalist-scrollbar::-webkit-scrollbar {
                    height: 12px;
                    background: transparent;
                }
                .custom-brutalist-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.05);
                    border-radius: 9999px;
                    margin: 0 4rem;
                }
                .custom-brutalist-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--primary);
                    border: 3px solid var(--foreground);
                    border-radius: 9999px;
                }
                .custom-brutalist-scrollbar {
                    -ms-overflow-style: none; 
                    scrollbar-width: thin;
                    scrollbar-color: var(--primary) transparent;
                }
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(10px); }
                }
                .animate-bounce-x {
                    animation: bounce-x 2s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
}
