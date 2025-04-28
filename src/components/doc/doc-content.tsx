
import React from "react";
import { Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DocSection } from "@/types/documentation";
import { useToast } from "@/components/ui/use-toast";

interface DocContentProps {
  sections: DocSection[];
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

export const DocContent: React.FC<DocContentProps> = ({ sections, sectionRefs }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {sections.map((section) => (
        <div
          key={section.id}
          ref={(el) => (sectionRefs.current[section.id] = el)}
          id={section.id}
          className="scroll-m-20 mb-10"
        >
          {section.level === 1 ? (
            <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4">{section.title}</h1>
          ) : section.level === 2 ? (
            <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-3">{section.title}</h2>
          ) : section.level === 3 ? (
            <h3 className="text-xl font-medium tracking-tight mt-6 mb-2">{section.title}</h3>
          ) : (
            <h4 className="text-lg font-medium tracking-tight mt-4 mb-2">{section.title}</h4>
          )}
          
          {section.level <= 2 && <Separator className="mb-4" />}
          
          <div className="prose prose-gray max-w-none">
            {section.content.split('```').map((block, index) => {
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
  );
};
