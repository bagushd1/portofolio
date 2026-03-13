import { createClient } from "@/lib/supabase/server";
import ServicesClient from "./ServicesClient";
import { getPublicServices } from "@/lib/api/portfolio";

export default async function ServicesPage() {
    const services = await getPublicServices();

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tight text-foreground">Service Management</h1>
                <p className="text-text-muted mt-2">Manage the services displayed on your landing page.</p>
            </div>

            <ServicesClient initialServices={services} />
        </div>
    );
}
