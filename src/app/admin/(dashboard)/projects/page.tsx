import { createClient } from "@/lib/supabase/server";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
    const supabase = await createClient();
    const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return <div>Error loading projects: {error.message}</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Portfolio Projects</h1>
                <p className="text-text-muted mt-2">Manage the projects displayed on the public portfolio.</p>
            </div>

            <ProjectsClient initialProjects={projects || []} />
        </div>
    );
}
