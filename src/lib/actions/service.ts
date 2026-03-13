"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ServiceData {
    title: string;
    description: string;
    icon?: string;
    order_index?: number;
}

export async function createService(data: ServiceData) {
    const supabase = await createClient();

    const { error } = await supabase.from("services").insert({
        title: data.title,
        description: data.description,
        icon: data.icon || null,
        order_index: data.order_index || 0,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
}

export async function updateService(id: string, data: ServiceData) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("services")
        .update({
            title: data.title,
            description: data.description,
            icon: data.icon || null,
            order_index: data.order_index || 0,
        })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
}

export async function deleteService(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
}
