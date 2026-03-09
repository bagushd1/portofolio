"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface TestimonialData {
    name: string;
    company?: string;
    content: string;
    rating?: number;
}

export async function createTestimonial(data: TestimonialData) {
    const supabase = await createClient();

    const { error } = await supabase.from("testimonials").insert({
        name: data.name,
        company: data.company || null,
        content: data.content,
        rating: data.rating || 5,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}

export async function updateTestimonial(id: string, data: TestimonialData) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("testimonials")
        .update({
            name: data.name,
            company: data.company || null,
            content: data.content,
            rating: data.rating || 5,
        })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}
