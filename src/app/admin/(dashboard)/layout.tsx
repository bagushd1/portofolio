import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex overflow-hidden bg-background text-foreground">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-dvh overflow-hidden">
                <header className="h-16 flex items-center justify-between px-6 border-b-4 border-foreground bg-primary md:hidden shrink-0">
                    <span className="text-xl font-black uppercase tracking-tighter">RBA<span className="italic font-serif lowercase">dev.</span></span>
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12 overscroll-contain">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
