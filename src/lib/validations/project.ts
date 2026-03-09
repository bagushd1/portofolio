import * as z from "zod";

export const projectSchema = z.object({
    title: z.string().min(3, "Judul minimal 3 karakter"),
    description: z.string().min(10, "Deskripsi minimal 10 karakter"),
    tech_stack: z.string().min(1, "Tech stack wajib diisi (pisahkan dengan koma)"),
    live_link: z.string().url("URL harus valid").optional().or(z.literal("")),
    github_link: z.string().url("URL harus valid").optional().or(z.literal("")),
    image_url: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
