
import { DocComponent } from "./doc-component";

/**
 * Example implementation of the DocComponent with sample content
 */
export const DocExample = () => {
  // Sample documentation content in markdown-like format
  const sampleContent = `# Welcome to Documentation

This documentation component helps you display structured information in a clean, organized format.

## Getting Started

Starting with this component is easy - just provide your content in a markdown-like format.

### Installation

To use this component in your project, simply import it:

\`\`\`
import { DocComponent } from "./components/doc-component";
\`\`\`

Then add it to your page:

\`\`\`
<DocComponent 
  title="My Documentation"
  content={myDocumentationString}
/>
\`\`\`

## Features

This component includes several helpful features to make your documentation shine.

### Table of Contents

A dynamic table of contents is automatically generated from your headings.

### Code Highlighting

Code blocks are specially formatted and include a copy button:

\`\`\`
function example() {
  return "This is a code example";
}
\`\`\`

### Responsive Design

This component works well on both desktop and mobile devices.

## Customization

You can customize this component to match your project's look and feel.

### Styling

The component uses Tailwind CSS classes for styling and can be further customized.

### Props

Several props are available for customization:

\`\`\`
title: string;       // Document title
content: string;     // Document content
logoUrl?: string;    // Optional logo
author?: string;     // Document author
updatedAt?: string;  // Last update date
\`\`\`

## Conclusion

We hope this documentation component helps you create beautiful, readable documentation for your projects.
`;

  return (
    <DocComponent 
      title="Documentation Guide" 
      content={sampleContent}
      author="Lovable Team"
      updatedAt="April 28, 2025"
      logoUrl="/lovable-uploads/57183554-779b-4540-9a32-c695e78e1252.png"
    />
  );
};
