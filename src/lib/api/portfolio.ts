import { createClient } from "@/lib/supabase/server";

export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    tech_stack: string[];
    live_link: string | null;
    github_link: string | null;
    created_at: string;
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
    const supabase = await createClient();

    // Optimasi Fetching: Hanya select kolom yang dibutuhkan dan di-order berdasar waktu (terbaru dulu)
    const { data, error } = await supabase
        .from("projects")
        .select("id, title, description, image_url, tech_stack, live_link, github_link, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
        return [];
    }

    return data as Project[];
}

export async function getPublicTestimonials(): Promise<Testimonial[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, company, content, rating, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }

    return data as Testimonial[];
}
