"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface PartnerData {
    name: string;
    logo_url?: string;
    description?: string;
    website_url?: string;
    order_index?: number;
    is_active?: boolean;
}

export async function getPartners() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("order_index", { ascending: true });

    if (error) {
        return { error: error.message };
    }

    return { data };
}

export async function createPartner(data: PartnerData) {
    const supabase = await createClient();

    const { error } = await supabase.from("partners").insert({
        name: data.name,
        logo_url: data.logo_url || null,
        description: data.description || null,
        website_url: data.website_url || null,
        order_index: data.order_index || 0,
        is_active: data.is_active ?? true,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}

export async function updatePartner(id: string, data: PartnerData) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("partners")
        .update({
            name: data.name,
            logo_url: data.logo_url || null,
            description: data.description || null,
            website_url: data.website_url || null,
            order_index: data.order_index || 0,
            is_active: data.is_active ?? true,
        })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}

export async function deletePartner(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("partners").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
}
