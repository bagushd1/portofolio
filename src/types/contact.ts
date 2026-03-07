/**
 * Tipe data untuk pesan kontak yang masuk dari pengunjung.
 */
export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
}

/**
 * Tipe data untuk request body saat pengunjung mengirim pesan.
 */
export interface ContactFormData {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

/**
 * Tipe data standar untuk response API.
 */
export interface ApiResponse<T = null> {
    success: boolean;
    message: string;
    data?: T;
    errors?: Record<string, string>;
    count?: number;
}
