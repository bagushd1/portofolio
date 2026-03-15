"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

const BUCKET_NAME = "portfolio-assets";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface ProjectData {
    title: string;
    slug?: string;
    description: string;
    tech_stack: string[];
    live_link?: string;
    image_url?: string;
    content?: string;
    challenge?: string;
    solution?: string;
}

/**
 * Auto-ensure storage bucket exists (idempotent).
 * Menggunakan admin client agar bisa membuat bucket.
 * Hasil di-cache agar tidak cek berulang setiap upload.
 */
let bucketEnsured = false;
async function ensureBucket() {
    if (bucketEnsured) return;

    try {
        const supabaseAdmin = createAdminClient();
        const { data } = await supabaseAdmin.storage.getBucket(BUCKET_NAME);

        if (!data) {
            const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
                public: true,
                fileSizeLimit: MAX_FILE_SIZE,
            });

            if (createError && !createError.message.includes("already exists")) {
                console.error("Failed to create bucket:", createError);
                throw createError;
            }
        }

        bucketEnsured = true;
    } catch (error) {
        console.error("ensureBucket error:", error);
        throw new Error(
            "Gagal memastikan storage bucket tersedia. " +
            "Pastikan SUPABASE_SERVICE_ROLE_KEY sudah diset di .env.local"
        );
    }
}

export async function createProject(data: ProjectData) {
    const supabase = await createClient();

    let rawSlug = data.slug || data.title;
    const slug = rawSlug.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    const { error } = await supabase.from("projects").insert({
        title: data.title,
        slug: slug,
        description: data.description,
        tech_stack: data.tech_stack,
        live_link: data.live_link || null,
        image_url: data.image_url || null,
        content: data.content || null,
        challenge: data.challenge || null,
        solution: data.solution || null,
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

    let rawSlug = data.slug || data.title;
    const slug = rawSlug.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    const { error } = await supabase
        .from("projects")
        .update({
            title: data.title,
            slug: slug,
            description: data.description,
            tech_stack: data.tech_stack,
            live_link: data.live_link || null,
            image_url: data.image_url || null,
            content: data.content || null,
            challenge: data.challenge || null,
            solution: data.solution || null,
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
    const file = formData.get("file") as File;

    if (!file) {
        return { error: "File tidak ditemukan" };
    }

    if (file.size > MAX_FILE_SIZE) {
        return { error: `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB` };
    }

    // Auto-ensure bucket exists
    try {
        await ensureBucket();
    } catch {
        return { error: "Storage bucket belum tersedia. Hubungi admin." };
    }

    // Gunakan admin client untuk upload (bypass storage RLS)
    // Aman karena fungsi ini sudah dilindungi oleh auth middleware
    const supabaseAdmin = createAdminClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `projects/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .upload(fileName, file);

    if (error) {
        return { error: error.message };
    }

    const { data: urlData } = supabaseAdmin.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

    return { success: true, url: urlData.publicUrl };
}
