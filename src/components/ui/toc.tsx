
import { cn } from "@/lib/utils";
import { TocItem } from "@/types/documentation";
import { useState } from "react";
import { BookOpen } from "lucide-react";

interface TocProps {
  items: TocItem[];
  className?: string;
  onItemClick?: (id: string) => void;
}

/**
 * Table of Contents component that displays a hierarchical structure of document headings
 * and allows navigation to different sections
 */
export function TableOfContents({ items, className, onItemClick }: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null);
  
  const handleClick = (id: string) => {
    setActiveId(id);
    if (onItemClick) onItemClick(id);
  };
  
  const renderItems = (items: TocItem[]) => {
    return (
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                "flex w-full items-center rounded-md px-2 py-1 hover:bg-muted transition-colors",
                activeId === item.id ? "bg-muted font-medium" : "text-muted-foreground"
              )}
              style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
            >
              {item.title}
            </button>
            {item.children && item.children.length > 0 && renderItems(item.children)}
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-2 font-semibold mb-4 px-2">
        <BookOpen size={18} />
        <span>Table of Contents</span>
      </div>
      {items.length > 0 ? (
        renderItems(items)
      ) : (
        <p className="text-sm text-muted-foreground px-2">
          No sections available
        </p>
      )}
    </div>
  );
}
