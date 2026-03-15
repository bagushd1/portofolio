"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ArticleData {
    title: string;
    slug?: string;
    description?: string;
    content: string;
    image_url?: string;
    published?: boolean;
}

export async function createArticle(data: ArticleData) {
    const supabase = await createClient();

    let rawSlug = data.slug || data.title;
    const slug = rawSlug.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    const { error } = await supabase.from("articles").insert({
        title: data.title,
        slug: slug,
        description: data.description || null,
        content: data.content,
        image_url: data.image_url || null,
        published: data.published || false,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/articles");
    revalidatePath("/blog");
    return { success: true };
}

export async function updateArticle(id: string, data: ArticleData) {
    const supabase = await createClient();

    let rawSlug = data.slug || data.title;
    const slug = rawSlug.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    const { error } = await supabase
        .from("articles")
        .update({
            title: data.title,
            slug: slug,
            description: data.description || null,
            content: data.content,
            image_url: data.image_url || null,
            published: data.published || false,
        })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/articles");
    revalidatePath("/blog");
    return { success: true };
}

export async function deleteArticle(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("articles").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/articles");
    revalidatePath("/blog");
    return { success: true };
}

export async function getAdminArticles() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return { error: error.message, data: [] };
    }

    return { data, error: null };
}
