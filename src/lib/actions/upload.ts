"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadPartnerLogo(file: File) {
    const supabase = await createClient();
    
    // Create bucket if not exists (usually manual but good to handle)
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = `partners/${fileName}`;

    const { data, error } = await supabase.storage
        .from("assets") // Assuming "assets" bucket exists as seen in other modules
        .upload(filePath, file);

    if (error) {
        return { error: error.message };
    }

    const { data: { publicUrl } } = supabase.storage
        .from("assets")
        .getPublicUrl(filePath);

    return { url: publicUrl };
}
