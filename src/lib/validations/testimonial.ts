import * as z from "zod";

export const testimonialSchema = z.object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    company: z.string().optional().or(z.literal("")),
    content: z.string().min(10, "Konten testimoni minimal 10 karakter"),
    rating: z.number().min(1).max(5, "Rating antara 1 sampai 5"),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
