import { getAdminArticles } from "@/lib/actions/article";
import ArticlesClient from "./ArticlesClient";

export const revalidate = 0; // Don't cache admin pages

export default async function ArticlesAdminPage() {
    const { data: articles, error } = await getAdminArticles();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black uppercase tracking-tight">Articles Management</h1>
                <p className="text-text-muted font-medium">Manage your blog posts and engineering insights.</p>
            </div>
            
            {error ? (
                <div className="p-4 bg-error/10 text-error rounded-xl border border-error/20">
                    Failed to load articles: {error}
                </div>
            ) : (
                <ArticlesClient initialArticles={articles || []} />
            )}
        </div>
    );
}
