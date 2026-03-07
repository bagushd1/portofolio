"use client";

import { useState, type FormEvent } from "react";
import type { ContactFormData, ApiResponse } from "@/types/contact";

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [responseMessage, setResponseMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setFieldErrors({});
        setResponseMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data: ApiResponse = await res.json();

            if (data.success) {
                setStatus("success");
                setResponseMessage(data.message);
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
                setResponseMessage(data.message);
                if (data.errors) setFieldErrors(data.errors);
            }
        } catch {
            setStatus("error");
            setResponseMessage("Terjadi kesalahan jaringan. Silakan coba lagi.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1.5">
                    Nama <span className="text-error">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama kamu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-surface-light border text-foreground placeholder:text-text-dim text-sm
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200
            ${fieldErrors.name ? "border-error" : "border-surface-border"}`}
                />
                {fieldErrors.name && (
                    <p className="mt-1 text-xs text-error">{fieldErrors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1.5">
                    Email <span className="text-error">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-surface-light border text-foreground placeholder:text-text-dim text-sm
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200
            ${fieldErrors.email ? "border-error" : "border-surface-border"}`}
                />
                {fieldErrors.email && (
                    <p className="mt-1 text-xs text-error">{fieldErrors.email}</p>
                )}
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-muted mb-1.5">
                    Subjek <span className="text-text-dim text-xs">(opsional)</span>
                </label>
                <input
                    id="subject"
                    type="text"
                    placeholder="Tentang apa?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-light border border-surface-border text-foreground placeholder:text-text-dim text-sm
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-1.5">
                    Pesan <span className="text-error">*</span>
                </label>
                <textarea
                    id="message"
                    rows={5}
                    placeholder="Tulis pesan kamu di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-surface-light border text-foreground placeholder:text-text-dim text-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200
            ${fieldErrors.message ? "border-error" : "border-surface-border"}`}
                />
                {fieldErrors.message && (
                    <p className="mt-1 text-xs text-error">{fieldErrors.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-white transition-all duration-300
          bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-[0.98]"
            >
                {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Mengirim...
                    </span>
                ) : (
                    "Kirim Pesan ✉️"
                )}
            </button>

            {/* Status Message */}
            {status === "success" && (
                <div className="p-4 rounded-xl bg-success/10 border border-success/20 animate-fade-in-up">
                    <p className="text-sm text-success flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {responseMessage}
                    </p>
                </div>
            )}

            {status === "error" && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/20 animate-fade-in-up">
                    <p className="text-sm text-error flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {responseMessage}
                    </p>
                </div>
            )}
        </form>
    );
}
