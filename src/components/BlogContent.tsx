import ScrollReveal from "@/components/ScrollReveal";

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    return (
        <div className="prose prose-xl prose-invert max-w-none 
      prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
      prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:font-medium
      prose-strong:text-primary prose-strong:font-black
      prose-li:text-foreground/80
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-[2rem] prose-img:border-4 prose-img:border-foreground
      prose-code:text-primary prose-code:bg-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-blockquote:border-l-8 prose-blockquote:border-primary prose-blockquote:bg-foreground/5 prose-blockquote:p-8 prose-blockquote:rounded-r-[2rem] prose-blockquote:italic
    ">
            <div className="whitespace-pre-wrap">
                {content}
            </div>
        </div>
    );
}
