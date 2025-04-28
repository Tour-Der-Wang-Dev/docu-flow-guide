import React, { useState, useEffect, useRef } from "react";
import { Book, FileText, Copy, BookOpen, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseContent, generateTableOfContents } from "@/utils/docUtils";
import { DocPage, DocSection } from "@/types/documentation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/ui/toc";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

// Define component props
interface DocComponentProps {
  /**
   * Title of the documentation page
   */
  title: string;
  
  /**
   * Content of the documentation in markdown-like format
   */
  content: string;
  
  /**
   * Optional logo URL to display in the header
   */
  logoUrl?: string;
  
  /**
   * Optional author of the documentation
   */
  author?: string;
  
  /**
   * Optional last updated date
   */
  updatedAt?: string;
  
  /**
   * CSS class name for additional styling
   */
  className?: string;
}

/**
 * DocComponent - A comprehensive documentation display component
 * 
 * This component renders documentation content with a table of contents sidebar,
 * styled headers, and properly formatted content sections. It supports navigation
 * between sections and includes a mobile-responsive design.
 * 
 * @param props - Component props (see DocComponentProps interface)
 * @returns JSX.Element - The rendered documentation component
 */
export const DocComponent: React.FC<DocComponentProps> = ({
  title,
  content,
  logoUrl,
  author,
  updatedAt,
  className,
}) => {
  // Parse the content into sections
  const sections = parseContent(content);
  
  // Generate table of contents
  const tocItems = generateTableOfContents(sections);
  
  // State for mobile sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get toast function for notifications
  const { toast } = useToast();
  
  // Check if the viewport is mobile
  const isMobile = useIsMobile();
  
  // References to section elements
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Effect to close sidebar on mobile when a section is clicked
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
  
  // Function to scroll to a section
  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Close sidebar on mobile after clicking
      if (isMobile) {
        setSidebarOpen(false);
      }
    }
  };
  
  // Function to copy code snippet
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard",
    });
  };
  
  return (
    <div className={cn("flex flex-col md:flex-row w-full min-h-screen bg-background", className)}>
      {/* Mobile header with toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          {logoUrl ? (
            <img src={logoUrl} alt={title} className="h-8 w-auto" />
          ) : (
            <Book className="h-6 w-6 text-primary" />
          )}
          <h1 className="text-lg font-medium">{title}</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <List className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar / Table of Contents */}
      <aside
        data-toc
        className={cn(
          "bg-muted/40 w-full md:w-64 lg:w-72 md:flex flex-col fixed md:sticky top-0 bottom-0 left-0 z-30 md:z-0 md:h-screen overflow-hidden transition-transform",
          sidebarOpen ? "flex translate-x-0" : "hidden md:flex md:translate-x-0 -translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="hidden md:flex items-center space-x-2 p-4 border-b">
          {logoUrl ? (
            <img src={logoUrl} alt={title} className="h-8 w-auto" />
          ) : (
            <BookOpen className="h-6 w-6 text-primary" />
          )}
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>
        
        {/* Table of Contents */}
        <ScrollArea className="flex-1 p-4 pb-16">
          <TableOfContents items={tocItems} onItemClick={scrollToSection} />
        </ScrollArea>
        
        {/* Footer with metadata */}
        {(author || updatedAt) && (
          <div className="p-4 border-t text-xs text-muted-foreground">
            {author && <div>Author: {author}</div>}
            {updatedAt && <div>Updated: {updatedAt}</div>}
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 pb-16">
        <div className="hidden md:flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {/* Render each section */}
          {sections.map((section) => (
            <div
              key={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              id={section.id}
              className="scroll-m-20 mb-10"
            >
              {/* Section heading with appropriate size based on level */}
              {section.level === 1 ? (
                <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4">{section.title}</h1>
              ) : section.level === 2 ? (
                <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-3">{section.title}</h2>
              ) : section.level === 3 ? (
                <h3 className="text-xl font-medium tracking-tight mt-6 mb-2">{section.title}</h3>
              ) : (
                <h4 className="text-lg font-medium tracking-tight mt-4 mb-2">{section.title}</h4>
              )}
              
              {/* Separator after headings */}
              {section.level <= 2 && <Separator className="mb-4" />}
              
              {/* Section content with special handling for code blocks */}
              <div className="prose prose-gray max-w-none">
                {section.content.split('```').map((block, index) => {
                  // Even indices are normal text, odd indices are code blocks
                  if (index % 2 === 0) {
                    return (
                      <div key={index} className="my-4 leading-7 text-muted-foreground">
                        {block.split('\n').filter(Boolean).map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    );
                  } else {
                    // This is a code block
                    return (
                      <Card key={index} className="my-6">
                        <CardHeader className="bg-muted py-1 px-4 flex flex-row items-center justify-between">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            <FileText size={14} className="inline mr-2" /> 
                            Code Snippet
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => copyToClipboard(block)}
                          >
                            <Copy size={14} />
                          </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                          <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto">
                            <code>{block}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/**
 * Example usage of DocComponent:
 * 
 * ```jsx
 * // Define your documentation content
 * const myDocContent = `
 * # Introduction
 * 
 * This is an introduction to our documentation.
 * 
 * ## Getting Started
 * 
 * Here's how to get started with our product.
 * 
 * ```javascript
 * // Example code
 * const app = initApp();
 * app.start();
 * ```
 * 
 * ### Installation
 * 
 * Installation instructions...
 * `;
 * 
 * // Render the documentation component
 * <DocComponent
 *   title="My Project Documentation"
 *   content={myDocContent}
 *   author="John Doe"
 *   updatedAt="2025-04-28"
 * />
 * ```
 */
