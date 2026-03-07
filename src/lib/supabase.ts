import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazy-initialized Supabase client.
 * Dibuat saat pertama kali diakses (runtime), bukan saat build time,
 * sehingga build tetap berhasil meskipun env vars belum diset.
 */
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error(
                "Missing Supabase environment variables. " +
                "Pastikan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY " +
                "sudah diset di file .env.local"
            );
        }

        _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }

    return _supabase;
}
