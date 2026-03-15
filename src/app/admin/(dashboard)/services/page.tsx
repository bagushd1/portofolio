import { getPublicServices } from "@/lib/api/portfolio";
import ServicesClient from "./ServicesClient";

export const revalidate = 0; // Don't cache admin pages

export default async function ServicesAdminPage() {
    const services = await getPublicServices();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black uppercase tracking-tight">Services Management</h1>
                <p className="text-text-muted font-medium">Manage the services displayed on the homepage.</p>
            </div>
            
            <ServicesClient initialServices={services} />
        </div>
    );
}
