import React from"react";
import Link from"next/link";
import { FileText, LayoutTemplate, Palette } from"lucide-react";

const templates = [
  {
    id:"professional",
    name:"The Professional",
    description:"A classic, structured design optimized for ATS parsing.",
    icon: FileText,
  },
  {
    id:"casual",
    name:"The Casual Minimalist",
    description:"Clean lines, lots of whitespace, perfect for modern tech roles.",
    icon: LayoutTemplate,
  },
  {
    id:"creative",
    name:"The Creative Accent",
    description:"Bold typography and distinct sections to stand out.",
    icon: Palette,
  }
];

export default function ResumeSelectionPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Choose Your Template</h1>
        <p className="text-lg text-muted-foreground">
          Select a starting point for your resume. You can fully customize colors, typography, and content in the next step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Link 
            key={template.id} 
            href={`/dashboard/resume/editor?template=${template.id}`}
            className="group flex flex-col items-center text-center bg-background rounded-2xl border border-muted p-8 shadow-sm hover:border-foreground/30 cursor-pointer"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <template.icon className="w-10 h-10 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
            <div className="mt-8 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
              Select Template
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
