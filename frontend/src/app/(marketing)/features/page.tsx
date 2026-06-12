import { BookOpen, Briefcase, Award, Mic, Code, Bot } from "lucide-react";

export default function FeaturesPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to land your dream job</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">One platform replacing dozens of tools. Powered by state-of-the-art AI.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, title: "AI Resume Builder", desc: "Drag-and-drop builder with ATS templates and AI content optimization." },
            { icon: Briefcase, title: "Smart Job Finder", desc: "Aggregated jobs with AI match scoring and skill gap analysis." },
            { icon: Award, title: "Learning Hub", desc: "Personalized career roadmaps with daily learning plans and quizzes." },
            { icon: Mic, title: "Mock Interviews", desc: "AI voice interviewer analyzing communication, confidence, and technical skills." },
            { icon: Code, title: "Project Builder", desc: "Role-specific project generation with roadmaps and mentor mode." },
            { icon: Bot, title: "Career Assistant", desc: "24/7 AI chat for career advice, salary negotiation, and resume review." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-background p-8 rounded-2xl border border-muted hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
