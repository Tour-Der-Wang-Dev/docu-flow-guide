
# Documentation Component

This project provides a comprehensive documentation component built with React, TypeScript, and Tailwind CSS. It's designed to help you display structured information in a clean, organized format.

## Project info

**URL**: https://lovable.dev/projects/81e577ff-4e8f-42eb-b5c5-f6d4930cb017

## Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Table of Contents**: Automatically generated from document headings
- **Code Highlighting**: Special formatting for code blocks with copy functionality
- **Clean Typography**: Well-structured headings and paragraphs
- **Navigation**: Easy navigation between document sections

## Component Structure

The project consists of several key components:

1. `DocComponent`: The main documentation component
2. `TableOfContents`: Component for navigating between document sections
3. `docUtils`: Utility functions for parsing and processing documentation content

## How to Use

The documentation component can be easily integrated into your React application:

```jsx
import { DocComponent } from "./components/doc-component";

// Your documentation content in markdown-like format
const myDocContent = `
# Introduction

This is an introduction to my documentation.

## Getting Started

Here's how to get started.

\`\`\`
// Example code
const example = () => {
  return "Hello world";
};
\`\`\`
`;

// Render the component
const MyDocPage = () => (
  <DocComponent 
    title="My Documentation"
    content={myDocContent}
    author="Your Name"
    updatedAt="April 28, 2025"
  />
);
```

## Props

The `DocComponent` accepts several props for customization:

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Document title |
| `content` | string | Document content in markdown-like format |
| `logoUrl` | string (optional) | URL for a logo image |
| `author` | string (optional) | Author of the document |
| `updatedAt` | string (optional) | Last update date |
| `className` | string (optional) | CSS class name for additional styling |

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/81e577ff-4e8f-42eb-b5c5-f6d4930cb017) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

Simply open [Lovable](https://lovable.dev/projects/81e577ff-4e8f-42eb-b5c5-f6d4930cb017) and click on Share -> Publish.

## Custom Domain

Yes, you can connect a custom domain!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
