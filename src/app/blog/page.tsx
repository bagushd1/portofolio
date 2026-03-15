import { getPublishedArticles } from "@/lib/api/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import { ArrowRight, Calendar, User, Clock, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPage() {
    const articles = await getPublishedArticles();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-32 pb-24 px-4 sm:px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <header className="mb-16 md:mb-24 text-center">
                        <ScrollReveal delay={0.1}>
                            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                                Engineering <br />
                                <span className="text-secondary italic font-serif lowercase">Insights.</span>
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="text-lg md:text-2xl font-bold text-text-muted max-w-2xl mx-auto uppercase tracking-wide">
                                Deep dive ke dalam arsitektur sistem, studi kasus teknis, dan catatan perjalanan membangun solusi digital.
                            </p>
                        </ScrollReveal>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {articles.length === 0 ? (
                            <div className="col-span-full py-32 text-center border-4 border-foreground rounded-[2rem] bg-surface">
                                <FileText className="w-16 h-16 text-text-dim mx-auto mb-6" />
                                <h2 className="text-2xl font-black uppercase tracking-widest">Belum Ada Artikel.</h2>
                                <p className="text-text-muted font-bold mt-2">Nantikan tulisan teknis menarik dari tim kami segera!</p>
                            </div>
                        ) : (
                            articles.map((article, index) => (
                                <ScrollReveal key={article.id} delay={index * 0.1} className="group flex flex-col h-full bg-surface border-4 border-foreground rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    <Link href={`/blog/${article.slug}`} className="block relative aspect-video overflow-hidden border-b-4 border-foreground">
                                        {article.image_url ? (
                                            <Image src={article.image_url} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        ) : (
                                            <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                                                <FileText className="w-12 h-12 text-secondary opacity-50" />
                                            </div>
                                        )}
                                    </Link>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-dim bg-background px-3 py-1 rounded-full border-2 border-foreground">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-dim">
                                                <Clock className="w-3 h-3" />
                                                5 Mins Read
                                            </div>
                                        </div>

                                        <Link href={`/blog/${article.slug}`}>
                                            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors leading-tight">
                                                {article.title}
                                            </h2>
                                        </Link>

                                        <p className="text-text-muted font-bold line-clamp-3 mb-8 flex-1">
                                            {article.description || "Klik untuk membaca detail artikel selengkapnya..."}
                                        </p>

                                        <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-secondary transition-colors group/link">
                                            Baca Selengkapnya <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </ScrollReveal>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
