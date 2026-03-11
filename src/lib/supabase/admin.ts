import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Admin Client (Server-Side Only)
 * Menggunakan SUPABASE_SERVICE_ROLE_KEY untuk operasi admin
 * seperti membuat storage bucket, bypass RLS, dll.
 *
 * JANGAN gunakan client ini di client-side code!
 */
export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error(
            "Missing Supabase admin credentials. " +
            "Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY " +
            "sudah diset di file .env.local"
        );
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
