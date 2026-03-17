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
        <form onSubmit={handleSubmit} className="space-y-5 px-1">
            {/* Nama */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Name <span className="text-destructive">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`flex h-12 md:h-14 w-full rounded-[1rem] border-4 bg-background px-4 md:px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-black placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-all font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none
            ${fieldErrors.name ? "border-[#ff4a4a]" : "border-foreground"}`}
                />
                {fieldErrors.name && (
                    <p className="mt-1 text-xs text-destructive">{fieldErrors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Email <span className="text-destructive">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`flex h-12 md:h-14 w-full rounded-[1rem] border-4 bg-background px-4 md:px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-black placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-all font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none
            ${fieldErrors.email ? "border-[#ff4a4a]" : "border-foreground"}`}
                />
                {fieldErrors.email && (
                    <p className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>
                )}
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Subject <span className="text-muted-foreground text-xs">(optional)</span>
                </label>
                <input
                    id="subject"
                    type="text"
                    placeholder="Project details?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="flex h-12 md:h-14 w-full rounded-[1rem] border-4 border-foreground bg-background px-4 md:px-5 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-all font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none"
                />
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Message <span className="text-destructive">*</span>
                </label>
                <textarea
                    id="message"
                    rows={5}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`flex min-h-[140px] w-full rounded-[1rem] border-4 bg-background px-4 md:px-5 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none
            ${fieldErrors.message ? "border-[#ff4a4a]" : "border-foreground"}`}
                />
                {fieldErrors.message && (
                    <p className="mt-1 text-xs text-destructive">{fieldErrors.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-14 md:h-16 items-center justify-center rounded-[1rem] bg-[#ff4a4a] px-8 py-2 text-sm md:text-base font-black tracking-wider uppercase text-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-50 w-full transition-all mt-6"
            >
                {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                    </span>
                ) : (
                    "Send Message"
                )}
            </button>

            {/* Status Message */}
            {status === "success" && (
                <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-600">
                    <p className="text-sm flex items-center gap-2 font-medium">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {responseMessage}
                    </p>
                </div>
            )}

            {status === "error" && (
                <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive">
                    <p className="text-sm flex items-center gap-2 font-medium">
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
