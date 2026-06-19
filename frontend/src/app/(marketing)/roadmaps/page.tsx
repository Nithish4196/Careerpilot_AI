import Link from"next/link";
import { BookOpen, CheckCircle2, ArrowRight } from"lucide-react";

export default function RoadmapsPage() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Learning Hub
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Personalized roadmaps for any career path</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you want to be a Data Scientist, AI Engineer, or Full Stack Developer, our AI generates a custom skill tree, weekly plan, and daily tasks just for you.
          </p>
          <ul className="space-y-4 mb-8">
            {['Skill gap analysis', 'Curated learning resources', 'Daily tracking & quizzes'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/signup" className="text-primary font-semibold hover:underline flex items-center gap-1">
            Explore Career Paths <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex-1 w-full bg-muted rounded-2xl aspect-square flex items-center justify-center border border-muted overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          {/* Placeholder for roadmap visual */}
          <div className="p-8 w-full max-w-md bg-background rounded-xl shadow-xl space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-2 bg-muted rounded w-full"></div>
            <div className="h-2 bg-muted rounded w-5/6"></div>
            <div className="space-y-2 mt-6">
              <div className="flex items-center gap-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs">1</div>
                <div className="flex-1"><div className="h-3 bg-primary/40 rounded w-1/2"></div></div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg border border-muted bg-muted/20">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">2</div>
                <div className="flex-1"><div className="h-3 bg-muted rounded w-2/3"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
