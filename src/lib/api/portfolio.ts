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

export async function getPublicProjects(): Promise<Project[]> {
    const supabase = createPublicClient();

    // Optimasi Fetching: Hanya select kolom yang dibutuhkan dan di-order berdasar waktu (terbaru dulu)
    const { data, error } = await supabase
        .from("projects")
        .select("id, title, slug, description, image_url, tech_stack, live_link, content, challenge, solution, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error.message, error.details);
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
        console.error("Error fetching testimonials:", error.message);
        return [];
    }

    return data as Testimonial[];
}

export async function getPublicServices(): Promise<Service[]> {
    const supabase = createPublicClient();
    console.log("Fetching services from:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true });

    if (error) {
        console.error("Error fetching services:", error.message);
        return [];
    }

    console.log("Services fetched:", data?.length || 0);
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
        console.error("Error fetching project by slug:", error.message);
        return null;
    }

    return data as Project;
}

export async function getPublishedArticles(): Promise<Article[]> {
    const supabase = createPublicClient();
    console.log("Fetching articles from:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching articles:", error.message);
        return [];
    }

    console.log("Articles fetched count:", data?.length || 0);
    return data as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const supabase = createPublicClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching article by slug:", error.message);
        return null;
    }

    return data as Article;
}
