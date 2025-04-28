
/**
 * Types for the documentation component
 */

// Structure for a documentation section
export interface DocSection {
  id: string;
  title: string;
  content: string;
  level: number; // 1 for h1, 2 for h2, etc.
}

// Structure for a documentation page
export interface DocPage {
  title: string;
  sections: DocSection[];
  updatedAt?: string;
  author?: string;
}

// Structure for table of contents item
export interface TocItem {
  id: string;
  title: string;
  level: number;
  children?: TocItem[];
}
