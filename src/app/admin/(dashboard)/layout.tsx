import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-[#f8f8f8] h-screen overflow-hidden text-foreground relative">
            {/* Desktop Floating Sidebar */}
            <AdminSidebar />
            
            <div className="flex-1 flex flex-col h-screen md:pl-[312px] pr-6 min-w-0">
                {/* Mobile Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b-4 border-foreground bg-primary text-foreground md:hidden shrink-0">
                    <span className="text-xl font-black uppercase tracking-tighter text-foreground">
                        RBA<span className="italic font-serif lowercase text-foreground">dev.</span>
                    </span>
                </header>

                <main className="flex-1 py-6 min-h-0">
                    <div className="w-full h-full bg-white border-4 border-foreground rounded-[2.5rem] md:rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative">
                        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar overscroll-contain">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
