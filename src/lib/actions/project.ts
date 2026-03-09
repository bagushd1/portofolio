"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ProjectData {
    title: string;
    description: string;
    tech_stack: string[];
    live_link?: string;
    github_link?: string;
    image_url?: string;
}

export async function createProject(data: ProjectData) {
    const supabase = await createClient();

    const { error } = await supabase.from("projects").insert({
        title: data.title,
        description: data.description,
        tech_stack: data.tech_stack,
        live_link: data.live_link || null,
        github_link: data.github_link || null,
        image_url: data.image_url || null,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}

export async function updateProject(id: string, data: ProjectData) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("projects")
        .update({
            title: data.title,
            description: data.description,
            tech_stack: data.tech_stack,
            live_link: data.live_link || null,
            github_link: data.github_link || null,
            image_url: data.image_url || null,
        })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}

export async function deleteProject(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}

export async function uploadImage(formData: FormData) {
    const supabase = await createClient();
    const file = formData.get("file") as File;

    if (!file) {
        return { error: "File tidak ditemukan" };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file);

    if (error) {
        return { error: error.message };
    }

    const { data: urlData } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(fileName);

    return { success: true, url: urlData.publicUrl };
}
