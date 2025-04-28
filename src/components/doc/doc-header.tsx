
import React from "react";
import { Book } from "lucide-react";

interface DocHeaderProps {
  title: string;
  logoUrl?: string;
}

export const DocHeader: React.FC<DocHeaderProps> = ({ title, logoUrl }) => {
  return (
    <div className="md:flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10 hidden">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export const MobileDocHeader: React.FC<DocHeaderProps & { onToggle: () => void, sidebarOpen: boolean }> = ({ 
  title, 
  logoUrl, 
  onToggle,
  sidebarOpen 
}) => {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        {logoUrl ? (
          <img src={logoUrl} alt={title} className="h-8 w-auto" />
        ) : (
          <Book className="h-6 w-6 text-primary" />
        )}
        <h1 className="text-lg font-medium">{title}</h1>
      </div>
      <button
        className="p-2 hover:bg-muted rounded-md"
        onClick={onToggle}
      >
        <span className="sr-only">Toggle Sidebar</span>
        <List className="h-6 w-6" />
      </button>
    </div>
  );
};
