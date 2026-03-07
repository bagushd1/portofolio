import type { ContactFormData } from "@/types/contact";

/**
 * Regex sederhana untuk validasi format email.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Konstanta batas validasi input.
 */
const LIMITS = {
    NAME_MIN: 2,
    NAME_MAX: 100,
    EMAIL_MAX: 255,
    SUBJECT_MAX: 200,
    MESSAGE_MIN: 10,
    MESSAGE_MAX: 2000,
} as const;

/**
 * Validasi data form kontak dari pengunjung.
 * Mengembalikan object berisi error per field, atau null jika valid.
 */
export function validateContactForm(
    data: ContactFormData
): Record<string, string> | null {
    const errors: Record<string, string> = {};

    // Validasi nama
    if (!data.name || data.name.trim().length === 0) {
        errors.name = "Nama wajib diisi";
    } else if (data.name.trim().length < LIMITS.NAME_MIN) {
        errors.name = `Nama minimal ${LIMITS.NAME_MIN} karakter`;
    } else if (data.name.trim().length > LIMITS.NAME_MAX) {
        errors.name = `Nama maksimal ${LIMITS.NAME_MAX} karakter`;
    }

    // Validasi email
    if (!data.email || data.email.trim().length === 0) {
        errors.email = "Email wajib diisi";
    } else if (data.email.trim().length > LIMITS.EMAIL_MAX) {
        errors.email = `Email maksimal ${LIMITS.EMAIL_MAX} karakter`;
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
        errors.email = "Format email tidak valid";
    }

    // Validasi subject (opsional)
    if (data.subject && data.subject.trim().length > LIMITS.SUBJECT_MAX) {
        errors.subject = `Subjek maksimal ${LIMITS.SUBJECT_MAX} karakter`;
    }

    // Validasi pesan
    if (!data.message || data.message.trim().length === 0) {
        errors.message = "Pesan wajib diisi";
    } else if (data.message.trim().length < LIMITS.MESSAGE_MIN) {
        errors.message = `Pesan minimal ${LIMITS.MESSAGE_MIN} karakter`;
    } else if (data.message.trim().length > LIMITS.MESSAGE_MAX) {
        errors.message = `Pesan maksimal ${LIMITS.MESSAGE_MAX} karakter`;
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

/**
 * Sanitasi string untuk mencegah XSS.
 * Meng-escape karakter HTML berbahaya.
 */
export function sanitizeString(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .trim();
}

/**
 * Sanitasi seluruh data form kontak.
 */
export function sanitizeContactForm(data: ContactFormData): ContactFormData {
    return {
        name: sanitizeString(data.name),
        email: data.email.trim().toLowerCase(),
        subject: data.subject ? sanitizeString(data.subject) : undefined,
        message: sanitizeString(data.message),
    };
}
