import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex overflow-hidden bg-background text-foreground">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 flex items-center justify-between px-6 border-b border-surface-border bg-surface/50 backdrop-blur-md md:hidden">
                    <span className="text-xl font-bold tracking-tight">RBA<span className="text-primary-light">Admin</span></span>
                </header>
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-6xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
