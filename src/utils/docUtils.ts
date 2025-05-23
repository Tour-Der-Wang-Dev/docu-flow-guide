
import { DocSection, TocItem } from "@/types/documentation";

/**
 * Utils for parsing and handling documentation
 */

// Function to parse markdown-like content into sections
export function parseContent(content: string): DocSection[] {
  // This is a simplified parser, in a real implementation you might use a markdown parser library
  const sections: DocSection[] = [];
  const lines = content.split('\n');
  
  let currentSection: DocSection | null = null;
  let contentBuffer: string[] = [];
  
  lines.forEach((line, index) => {
    // Check for headings (# Heading)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headingMatch) {
      // If we were building a previous section, save it
      if (currentSection) {
        sections.push({
          ...currentSection,
          content: contentBuffer.join('\n')
        });
        contentBuffer = [];
      }
      
      // Start a new section
      currentSection = {
        id: `section-${sections.length}`,
        title: headingMatch[2],
        level: headingMatch[1].length,
        content: ''
      };
    } else {
      // Add line to current section content
      if (currentSection) {
        contentBuffer.push(line);
      } else if (line.trim()) {
        // If there's no current section but there's content, create a default section
        currentSection = {
          id: `section-${sections.length}`,
          title: 'Introduction',
          level: 1,
          content: ''
        };
        contentBuffer.push(line);
      }
    }
    
    // If this is the last line and we have a current section, add it
    if (index === lines.length - 1 && currentSection) {
      sections.push({
        ...currentSection,
        content: contentBuffer.join('\n')
      });
    }
  });
  
  return sections;
}

// Function to generate table of contents from sections
export function generateTableOfContents(sections: DocSection[]): TocItem[] {
  const toc: TocItem[] = [];
  const stack: TocItem[] = [];
  
  sections.forEach(section => {
    const item: TocItem = {
      id: section.id,
      title: section.title,
      level: section.level
    };
    
    // Reset stack if we find a h1
    if (section.level === 1) {
      toc.push(item);
      stack.length = 0;
      stack.push(item);
      return;
    }
    
    // Navigate to correct parent in the hierarchy
    while (stack.length > 0 && stack[stack.length - 1].level >= section.level) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      // No parent found, add to root
      toc.push(item);
    } else {
      // Add as child to parent
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(item);
    }
    
    stack.push(item);
  });
  
  return toc;
}

// Modified function that doesn't return JSX elements
export function renderDocContent(content: string): string {
  // This function no longer returns JSX, just processes the content
  // In a real implementation, rendering would happen in the component
  return content;
}
