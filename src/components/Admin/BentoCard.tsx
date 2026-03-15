import { cn } from "@/lib/utils";

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    bg?: string;
    shadowColor?: string;
}

export function BentoCard({ children, className, bg = "bg-white", shadowColor = "rgba(0,0,0,1)" }: BentoCardProps) {
    return (
        <div 
            className={cn(
                "border-4 border-foreground rounded-[2.5rem] p-8 relative overflow-hidden transition-all duration-300",
                bg,
                className
            )}
            style={{ 
                boxShadow: `8px 8px 0px 0px ${shadowColor}` 
            }}
        >
            {children}
        </div>
    );
}
