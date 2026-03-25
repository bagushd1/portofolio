import { createPublicClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export interface Project {
    id: string;
    title: string;
    slug: string | null;
    description: string;
    image_url: string | null;
    tech_stack: string[];
    live_link: string | null;
    content: string | null;
    challenge: string | null;
    solution: string | null;
    created_at: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string | null;
    order_index: number;
    created_at: string;
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    content: string;
    image_url: string | null;
    published: boolean;
    author_id: string;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: string;
    name: string;
    company: string | null;
    content: string;
    rating: number;
    created_at: string;
}

function formatSupabaseError(error: any): string {
    if (!error) return "Unknown error";
    
    // Handle Cloudflare/Supabase 5xx HTML responses
    if (error.status === 521 || (typeof error.message === 'string' && error.message.includes('<!DOCTYPE html>'))) {
        return "Supabase service is currently unavailable or starting up (5xx response). Please try again in a few minutes.";
    }
    
    // Handle stale schema cache after project resume
    if (error.code === 'PGRST205') {
        return "Database table not found in schema cache. The project was likely just resumed; please wait a few minutes for the API to initialize.";
    }
    
    return error.message || "Unknown error";
}

export async function getPublicProjects(): Promise<Project[]> {
    const supabase = createPublicClient();

    // Optimasi Fetching: Hanya select kolom yang dibutuhkan dan di-order berdasar waktu (terbaru dulu)
    const { data, error } = await supabase
        .from("projects")
        .select("id, title, slug, description, image_url, tech_stack, live_link, content, challenge, solution, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", formatSupabaseError(error));
        return [];
    }

    return data as Project[];
}

export async function getPublicTestimonials(): Promise<Testimonial[]> {
    const supabase = createPublicClient();

    const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, company, content, rating, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching testimonials:", formatSupabaseError(error));
        return [];
    }

    return data as Testimonial[];
}

export async function getPublicServices(): Promise<Service[]> {
    const supabase = createPublicClient();

    const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true });

    if (error) {
        console.error("Error fetching services:", formatSupabaseError(error));
        return [];
    }

    return data as Service[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = createPublicClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching project by slug:", formatSupabaseError(error));
        return null;
    }

    return data as Project;
}

export async function getPublishedArticles(): Promise<Article[]> {
    const supabase = createPublicClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching articles:", formatSupabaseError(error));
        return [];
    }

    return data as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const supabase = createPublicClient();
    console.log(`[API] getArticleBySlug: Searching for slug ["${slug}"]`);

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        console.error(`[API] Error fetching article by slug ["${slug}"]:`, formatSupabaseError(error));
        return null;
    }

    if (!data) {
        console.warn(`[API] No article found matching slug ["${slug}"]`);
        return null;
    }

    console.log(`[API] Successfully found article: ${data.title}`);
    return data as Article;
}
