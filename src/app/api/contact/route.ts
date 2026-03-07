import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import {
    validateContactForm,
    sanitizeContactForm,
} from "@/lib/validators";
import type { ContactFormData, ApiResponse, ContactMessage } from "@/types/contact";

/**
 * Rate limiting sederhana menggunakan Map di memory.
 * Catatan: Pada serverless, tiap instance punya Map sendiri,
 * jadi ini bukan rate limiting yang sempurna, tapi cukup
 * untuk mencegah spam ringan.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 menit
const RATE_LIMIT_MAX = 5; // maks 5 request per menit

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

/**
 * POST /api/contact
 * Menerima dan menyimpan pesan dari pengunjung.
 */
export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message:
                        "Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit.",
                },
                { status: 429 }
            );
        }

        // Parse request body
        let body: ContactFormData;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Format request tidak valid.",
                },
                { status: 400 }
            );
        }

        // Validasi input
        const errors = validateContactForm(body);
        if (errors) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Validasi gagal.",
                    errors,
                },
                { status: 400 }
            );
        }

        // Sanitasi input
        const sanitized = sanitizeContactForm(body);

        // Simpan ke database Supabase
        const { error } = await getSupabase().from("messages").insert({
            name: sanitized.name,
            email: sanitized.email,
            subject: sanitized.subject || null,
            message: sanitized.message,
        });

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Gagal menyimpan pesan. Silakan coba lagi nanti.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "Pesan berhasil dikirim! Terima kasih telah menghubungi kami.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Terjadi kesalahan server.",
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/contact
 * Mengambil semua pesan masuk (untuk keperluan admin).
 *
 * Catatan: Endpoint ini opsional. Bisa juga melihat pesan
 * langsung dari dashboard Supabase.
 */
export async function GET() {
    try {
        const { data, error, count } = await getSupabase()
            .from("messages")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase select error:", error);
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Gagal mengambil data pesan.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json<ApiResponse<ContactMessage[]>>(
            {
                success: true,
                message: "Data pesan berhasil diambil.",
                data: data as ContactMessage[],
                count: count ?? 0,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Terjadi kesalahan server.",
            },
            { status: 500 }
        );
    }
}
