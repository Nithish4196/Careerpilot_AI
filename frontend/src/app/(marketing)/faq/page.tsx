import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto min-h-[calc(100vh-8rem)]">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "Is CareerPilot AI free to use?", a: "We offer a generous free tier that includes basic resume building and job search. Premium features like unlimited AI mock interviews and advanced roadmaps require a subscription." },
          { q: "How accurate is the ATS scoring?", a: "Our ATS scoring algorithm is built on the same parsers used by Fortune 500 companies, ensuring high accuracy." },
          { q: "Can I practice coding interviews?", a: "Yes! Our mock interview system includes an integrated code editor with support for Python, Java, C++, and JavaScript." }
        ].map((faq, i) => (
          <div key={i} className="border border-muted rounded-xl p-6 hover:border-primary/30 transition-colors">
            <h4 className="text-lg font-bold flex items-center justify-between cursor-pointer">
              {faq.q}
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </h4>
            {/* In a real app, this would be an accordion */}
            <p className="mt-4 text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
