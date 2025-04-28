
import React from "react";
import { BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableOfContents } from "@/components/ui/toc";
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
}

export const DocSidebar: React.FC<DocSidebarProps> = ({
  title,
  logoUrl,
  author,
  updatedAt,
  tocItems,
  isOpen,
  onSectionClick,
}) => {
  return (
    <aside
      data-toc
      className={cn(
        "bg-muted/40 w-full md:w-64 lg:w-72 md:flex flex-col fixed md:sticky top-0 bottom-0 left-0 z-30 md:z-0 md:h-screen overflow-hidden transition-transform",
        isOpen ? "flex translate-x-0" : "hidden md:flex md:translate-x-0 -translate-x-full"
      )}
    >
      <div className="hidden md:flex items-center space-x-2 p-4 border-b">
        {logoUrl ? (
          <img src={logoUrl} alt={title} className="h-8 w-auto" />
        ) : (
          <BookOpen className="h-6 w-6 text-primary" />
        )}
        <h1 className="text-lg font-semibold truncate">{title}</h1>
      </div>
      
      <ScrollArea className="flex-1 p-4 pb-16">
        <TableOfContents items={tocItems} onItemClick={onSectionClick} />
      </ScrollArea>
      
      {(author || updatedAt) && (
        <div className="p-4 border-t text-xs text-muted-foreground">
          {author && <div>Author: {author}</div>}
          {updatedAt && <div>Updated: {updatedAt}</div>}
        </div>
      )}
    </aside>
  );
};
