import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TocItem } from "@/types/documentation";
import { cn } from "@/lib/utils";

interface DocSidebarProps {
  title: string;
  logoUrl?: string;
  author?: string;
  updatedAt?: string;
  tocItems: TocItem[];
  isOpen: boolean;
  onSectionClick: (id: string) => void;
  isLoading?: boolean;
}

export const DocSidebar: React.FC<DocSidebarProps> = ({
  title,
  logoUrl,
  author,
  updatedAt,
  tocItems,
  isOpen,
  onSectionClick,
  isLoading = false,
}) => {
  return (
    <aside
      data-toc
      className={cn(
        "w-64 shrink-0 border-r bg-sidebar fixed inset-y-0 z-20 -translate-x-full transition-transform duration-200 md:relative md:translate-x-0",
        isOpen && "translate-x-0"
      )}
    >
      <div className="sticky top-0 bg-sidebar pt-4">
        <div className="px-4 flex items-center space-x-2 mb-4">
          {logoUrl ? (
            <img src={logoUrl} alt={title} className="h-8 w-auto" />
          ) : (
            <Book className="h-6 w-6 text-primary" />
          )}
          <h2 className="font-semibold">{title}</h2>
        </div>
        {(author || updatedAt) && (
          <div className="px-4 py-2 text-sm text-muted-foreground border-b">
            {author && <p>Author: {author}</p>}
            {updatedAt && <p>Updated: {updatedAt}</p>}
          </div>
        )}
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <nav className="p-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <div className="pl-4 space-y-2">
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <TableOfContents items={tocItems} onItemClick={onSectionClick} />
          )}
        </nav>
      </ScrollArea>
    </aside>
  );
};
