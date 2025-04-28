
import React, { useState, useEffect, useRef } from "react";
import { List } from "lucide-react";
import { parseContent, generateTableOfContents } from "@/utils/docUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { DocContent } from "./doc/doc-content";
import { DocSidebar } from "./doc/doc-sidebar";
import { DocHeader, MobileDocHeader } from "./doc/doc-header";
import { cn } from "@/lib/utils";

interface DocComponentProps {
  title: string;
  content: string;
  logoUrl?: string;
  author?: string;
  updatedAt?: string;
  className?: string;
}

export const DocComponent: React.FC<DocComponentProps> = ({
  title,
  content,
  logoUrl,
  author,
  updatedAt,
  className,
}) => {
  // Parse content and generate TOC
  const sections = parseContent(content);
  const tocItems = generateTableOfContents(sections);
  
  // State and refs
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Check if mobile
  const isMobile = useIsMobile();
  
  // Handle section navigation
  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      if (isMobile) {
        setSidebarOpen(false);
      }
    }
  };
  
  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest("[data-toc]")) {
          setSidebarOpen(false);
        }
      };
      
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [isMobile, sidebarOpen]);

  return (
    <div className={cn("flex flex-col md:flex-row w-full min-h-screen bg-background", className)}>
      <MobileDocHeader
        title={title}
        logoUrl={logoUrl}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      <DocSidebar
        title={title}
        logoUrl={logoUrl}
        author={author}
        updatedAt={updatedAt}
        tocItems={tocItems}
        isOpen={sidebarOpen}
        onSectionClick={scrollToSection}
      />

      <main className="flex-1 pb-16">
        <DocHeader title={title} logoUrl={logoUrl} />
        <DocContent sections={sections} sectionRefs={sectionRefs} />
      </main>
    </div>
  );
};
