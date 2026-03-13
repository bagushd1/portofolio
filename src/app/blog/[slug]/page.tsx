import { getArticleBySlug, getPublishedArticles } from "@/lib/api/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BlogContent from "@/components/BlogContent";
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
    const articles = await getPublishedArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
    const article = await getArticleBySlug(params.slug);
    const allArticles = await getPublishedArticles();
    const relatedArticles = allArticles
        .filter(a => a.id !== article?.id)
        .slice(0, 2);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <ReadingProgressBar />
            <main className="pt-32 pb-24 px-4 sm:px-6 md:px-12">
                <article className="max-w-[800px] mx-auto">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text-dim hover:text-primary mb-12 group transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Artikel
                    </Link>

                    <header className="mb-12 md:mb-16">
                        <ScrollReveal delay={0.1}>
                            <div className="flex items-center gap-6 mb-8 text-xs font-black uppercase tracking-[0.2em] text-text-dim">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    5 Mins Read
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-12">
                                {article.title}
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} className="relative aspect-[21/9] w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(187,247,208,1)] transform -rotate-1">
                            {article.image_url ? (
                                <Image src={article.image_url} alt={article.title} fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-[#bbf7d0] flex items-center justify-center">
                                    <span className="text-4xl font-black uppercase opacity-20 tracking-tighter">NEXUSTECH INSIGHTS</span>
                                </div>
                            )}
                        </ScrollReveal>
                    </header>

                    <ScrollReveal delay={0.3}>
                        <BlogContent content={article.content} />
                    </ScrollReveal>

                    <footer className="mt-20 pt-10 border-t-8 border-foreground flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-[#fff133] border-4 border-foreground rounded-full flex items-center justify-center font-black text-xl">
                                N
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-text-dim">Ditulis Oleh</p>
                                <p className="font-black uppercase text-lg">Nexus Engineering Team</p>
                            </div>
                        </div>

                        <button className="px-8 py-3 bg-foreground text-background font-black uppercase tracking-widest border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:bg-primary transition-all flex items-center gap-2">
                            Bagikan <Share2 className="w-4 h-4" />
                        </button>
                    </footer>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <section className="mt-32 pt-20 border-t-4 border-foreground/10">
                            <h3 className="text-4xl font-black uppercase tracking-tighter mb-12">Baca Artikel <span className="text-primary italic font-serif lowercase">Lainnya.</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedArticles.map((rel, idx) => (
                                    <Link key={rel.id} href={`/blog/${rel.slug}`} className="group p-6 border-4 border-foreground rounded-[2rem] bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                                        <h4 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{rel.title}</h4>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-dim">
                                            Baca Sekarang <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </main>
        </div>
    );
}
