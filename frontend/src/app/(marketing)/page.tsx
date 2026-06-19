import Link from"next/link";
import { ArrowRight, Sparkles, PlayCircle, BarChart3 } from"lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
          <Sparkles className="w-4 h-4" />
          <span>Career 2.0 is Here</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Your AI Career <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
            Copilot
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Parse your resume against real ATS criteria, simulate timed technical interviews, and track active remote job postings all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors duration-150 ease-out shadow-lg">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#demo" className="flex items-center justify-center gap-2 bg-muted text-foreground w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg hover:bg-muted/80 transition-colors duration-150 ease-out ">
            Watch Demo <PlayCircle className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Dashboard Preview Image/Mockup */}
        <div id="demo" className="mt-20 mx-auto max-w-5xl rounded-2xl border border-muted bg-background/50 shadow-2xl p-2 md:p-4 backdrop-blur-xl">
          <div className="rounded-xl overflow-hidden bg-muted aspect-[16/9] flex items-center justify-center">
             <div className="text-muted-foreground font-medium flex flex-col items-center gap-4">
               <BarChart3 className="w-16 h-16 opacity-20" />
               Interactive Dashboard Preview
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
