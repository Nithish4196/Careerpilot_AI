import { Bot, ArrowRight } from "lucide-react";

export default function InterviewsPage() {
  return (
    <section className="py-24 px-6 bg-primary text-primary-foreground min-h-[calc(100vh-8rem)] flex items-center">
      <div className="max-w-7xl mx-auto text-center w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Meet your 24/7 Career Assistant</h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-12">
          Upload your resume for instant review, ask for interview tips, or get advice on salary negotiation.
        </p>
        <div className="max-w-3xl mx-auto bg-background text-foreground rounded-2xl shadow-2xl overflow-hidden border border-primary/20 flex flex-col h-[400px]">
          <div className="p-4 border-b border-muted bg-muted/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-bold">CareerPilot AI</h4>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto bg-muted/5">
            <div className="self-end bg-primary text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
              Can you review my resume for a Data Analyst role?
            </div>
            <div className="self-start bg-muted p-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
              Of course! Please upload your resume, and I'll analyze it for ATS compatibility and suggest improvements specific to Data Analytics roles.
            </div>
          </div>
          <div className="p-4 border-t border-muted bg-background flex items-center gap-2">
            <div className="h-10 flex-1 bg-muted rounded-full flex items-center px-4 text-sm text-muted-foreground">
              Type your message...
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
