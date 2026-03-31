"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { m, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { X, Maximize2, ArrowLeft, ArrowRight, MousePointer2 } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
}

/**
 * ProjectGallery Component (Horizontal Bento Ribbon)
 * Redesigned for compact vertical space with "Drag to Explore" functionality.
 * Asymmetrical widths, consistent height, and a progress indicator.
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
            "min-w-[80vw] md:min-w-[700px]", // Wide
            "min-w-[60vw] md:min-w-[450px]", // Standard
            "min-w-[90vw] md:min-w-[850px]", // Panorama
            "min-w-[70vw] md:min-w-[550px]", // Medium
        ];
        return widths[index % widths.length];
    };

    return (
        <section className="my-32 md:my-48 overflow-hidden">
            <div className="flex items-center justify-between mb-16">
                <ScrollReveal delay={0.1}>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter border-b-[12px] border-primary inline-block leading-[0.8]">
                        Showcase Reel
                    </h2>
                </ScrollReveal>
                
                {/* Scroll Hint */}
                <ScrollReveal delay={0.2} className="hidden md:flex items-center gap-3 text-foreground/40 font-black uppercase text-[10px] tracking-widest">
                    <MousePointer2 className="w-4 h-4 animate-bounce-x" /> Drag to Explore
                </ScrollReveal>
            </div>

            {/* Horizontal Scroll Strip */}
            <div className="relative group">
                <div 
                    ref={containerRef}
                    className="flex gap-8 overflow-x-auto pb-12 cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth hide-scrollbar px-4"
                >
                    {images.map((url, index) => (
                        <m.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative h-[300px] md:h-[500px] snap-center shrink-0",
                                "border-4 md:border-8 border-foreground rounded-[2rem] md:rounded-[3.5rem] overflow-hidden",
                                "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300",
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
                                <Maximize2 className="w-12 h-12 text-foreground bg-background p-3 rounded-full border-4 border-foreground shadow-lg" />
                            </div>

                            {/* Image Index Indicator */}
                            <div className="absolute top-6 left-6 px-4 py-2 bg-foreground text-background font-black text-xs uppercase tracking-widest rounded-full z-10">
                                ASSET_{(index + 1).toString().padStart(2, '0')}
                            </div>
                        </m.div>
                    ))}
                    {/* Extra padding spacer for end of scroll */}
                    <div className="min-w-[2rem] md:min-w-[10vw]" />
                </div>

                {/* Progress Bar (Brutalist Style) */}
                <div className="max-w-7xl mx-auto px-4 mt-8">
                    <div className="h-6 w-full bg-slate-100 border-4 border-foreground rounded-full overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
                                className="p-4 bg-background text-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-1 hover:translate-y-1 transition-all pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            >
                                <ArrowLeft className="w-8 h-8" />
                            </button>
                            <button 
                                className="p-4 bg-background text-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-1 hover:translate-y-1 transition-all pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            >
                                <ArrowRight className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Large Image Container */}
                        <m.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-7xl aspect-video border-8 border-background rounded-[2rem] overflow-hidden shadow-2xl"
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
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background font-black uppercase tracking-[0.5em] text-sm">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Custom Utility Styles */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
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
