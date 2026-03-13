import { getPublishedArticles } from "@/lib/api/portfolio";
import ArticlesClient from "./ArticlesClient";

export default async function ArticlesPage() {
    const articles = await getPublishedArticles();

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Blog & Case Studies</h1>
                <p className="text-text-muted mt-2">Publish technical insights and deep-dive articles to boost your SEO and authority.</p>
            </div>

            <ArticlesClient initialArticles={articles} />
        </div>
    );
}
