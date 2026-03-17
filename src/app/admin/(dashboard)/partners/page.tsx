import { getPartners } from "@/lib/actions/partner";
import PartnersClient from "./PartnersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Partners Management | RBAdev Admin",
};

export default async function PartnersPage() {
    const { data: partners = [], error } = await getPartners();

    return (
        <div className="p-4 md:p-10 max-w-[1600px] mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground mb-4">
                    Management <span className="text-primary italic font-serif lowercase">Partners</span>
                </h1>
                <p className="text-foreground/60 font-bold uppercase tracking-widest text-xs border-l-4 border-primary pl-4">
                    Kelola logo dan identitas partner strategis RBAdev.
                </p>
            </div>

            <PartnersClient initialPartners={partners} />
        </div>
    );
}
