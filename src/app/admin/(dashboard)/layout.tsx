import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex overflow-hidden bg-background text-foreground">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-dvh overflow-hidden">
                <header className="h-16 flex items-center justify-between px-6 border-b-4 border-foreground bg-primary text-foreground md:hidden shrink-0">
                    <span className="text-xl font-black uppercase tracking-tighter text-foreground">RBA<span className="italic font-serif lowercase text-foreground">dev.</span></span>
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 overscroll-contain bg-[#f0f0f0]">
                    <div className="max-w-7xl mx-auto w-full bg-white border-4 border-foreground rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 min-h-[calc(100dvh-120px)]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
