import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { ApiResponse } from "@/types/contact";

/**
 * DELETE /api/contact/[id]
 * Menghapus pesan tertentu berdasarkan ID (untuk admin).
 */
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Validasi format UUID
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Format ID tidak valid.",
                },
                { status: 400 }
            );
        }

        const { error } = await getSupabase().from("messages").delete().eq("id", id);

        if (error) {
            console.error("Supabase delete error:", error);
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Gagal menghapus pesan.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "Pesan berhasil dihapus.",
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
