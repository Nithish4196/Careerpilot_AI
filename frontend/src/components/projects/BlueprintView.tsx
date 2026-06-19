import React, { useState } from 'react';
import { ProjectBlueprint } from '@/types/project';
import { 
  FileText, Map, LayoutTemplate, GitBranch, Code2, Sparkles, 
  Clock, CheckCircle2, AlertTriangle, PlayCircle
} from 'lucide-react';

interface BlueprintViewProps {
  blueprint: ProjectBlueprint;
  onSave: () => void;
  onBack: () => void;
  isSaved?: boolean;
}

export default function BlueprintView({ blueprint, onSave, onBack, isSaved = false }: BlueprintViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" |"roadmap" |"architecture" |"projects" |"build" |"extra"
  >("overview");

  const tabs = [
    { id:"overview", label:"Overview", icon: FileText },
    { id:"roadmap", label:"Roadmap", icon: Map },
    { id:"architecture", label:"Architecture", icon: LayoutTemplate },
    { id:"projects", label:"Existing Projects", icon: GitBranch },
    { id:"build", label:"How to Build", icon: Code2 },
    { id:"extra", label:"Extra Features", icon: Sparkles }
  ] as const;

  return (
    <div className="max-w-6xl mx-auto py-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-muted pb-8">
        <div>
          <button 
            onClick={onBack}
            className="text-sm font-bold text-muted-foreground hover:text-foreground mb-4 inline-block"
          >
            ← Back to Builder
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-extrabold rounded-md ${
              blueprint.overview.complexity === 'Easy' ? 'bg-green-500/10 text-green-600' :
              blueprint.overview.complexity === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
              'bg-red-500/10 text-red-600'
            }`}>
              {blueprint.overview.complexity}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5" />
              {blueprint.overview.estimatedTime}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">{blueprint.overview.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {blueprint.overview.description}
          </p>
        </div>
        
        <button 
          onClick={onSave}
          disabled={isSaved}
          className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors duration-150 ease-out shrink-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaved ?"Blueprint Saved ✓" :"Save Project Blueprint"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 border-b border-muted/50">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-bold whitespace-nowrap border-b-2 ${
                isActive 
                  ?"bg-muted/30 border-foreground text-foreground" 
                  :"border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-colors duration-150 ease-out "
              }`}
            >
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        
        {/* OVERVIEW TAB */}
        {activeTab ==="overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-background border border-muted rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-foreground" /> What you will learn
                </h3>
                <ul className="space-y-3">
                  {blueprint.overview.whatYouWillLearn.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-muted-foreground mt-0.5">•</span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Who is this for?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {blueprint.overview.whoIsItFor}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Similar Real-World Products</h3>
                <div className="grid gap-4">
                  {blueprint.overview.similarProducts.map((prod, idx) => (
                    <div key={idx} className="bg-muted/30 border border-muted rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-bold shrink-0">{prod.name}</span>
                      <span className="text-muted-foreground text-sm">— {prod.relation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-background border border-muted rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Recommended Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {blueprint.overview.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-muted text-foreground text-sm font-bold rounded-lg border border-muted-foreground/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROADMAP TAB */}
        {activeTab ==="roadmap" && (
          <div className="max-w-4xl mx-auto">
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {[
                { label:"Coding", val: blueprint.roadmap.hours.coding },
                { label:"Research", val: blueprint.roadmap.hours.research },
                { label:"Testing", val: blueprint.roadmap.hours.testing },
                { label:"Deployment", val: blueprint.roadmap.hours.deployment }
              ].map(stat => (
                <div key={stat.label} className="bg-muted/30 border border-muted rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold mb-1">{stat.val}h</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute left-[23px] top-6 bottom-12 w-0.5 bg-muted"></div>
              {blueprint.roadmap.phases.map((phase, idx) => (
                <div key={idx} className="relative flex items-start gap-6 mb-10 last:mb-0">
                  <div className="relative z-10 w-12 h-12 bg-background border-4 border-foreground rounded-full flex items-center justify-center shrink-0">
                    <span className="font-extrabold text-foreground">{idx + 1}</span>
                  </div>
                  <div className="flex-1 bg-background border border-muted rounded-2xl p-6 hover:border-foreground/20 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{phase.phase}</h3>
                      <span className="text-xs font-bold bg-muted px-2.5 py-1 rounded-md text-foreground">{phase.duration}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {phase.tasks.map((task, tidx) => (
                        <li key={tidx} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                          <span className="font-medium">{task}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-3 rounded-xl text-sm font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Milestone: {phase.milestone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ARCHITECTURE TAB */}
        {activeTab ==="architecture" && (
          <div className="space-y-12">
            <section className="max-w-3xl">
              <h3 className="text-2xl font-bold mb-4">System Design Overview</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {blueprint.architecture.overview}
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-bold mb-6">Components Breakdown</h3>
                <div className="space-y-4">
                  {blueprint.architecture.components.map((comp, idx) => (
                    <div key={idx} className="bg-background border border-muted rounded-xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{comp.name}</h4>
                        <span className="text-xs font-bold bg-muted px-2 py-1 rounded">{comp.tech}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comp.responsibility}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6">Data Flow</h3>
                <div className="bg-muted/30 border border-muted rounded-xl p-6">
                  <ol className="space-y-4 list-decimal list-inside text-muted-foreground font-medium">
                    {blueprint.architecture.dataFlow.map((step, idx) => (
                      <li key={idx} className="pl-2">{step}</li>
                    ))}
                  </ol>
                </div>
              </section>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-bold mb-6">API Endpoints & Schema</h3>
                <div className="space-y-6">
                  <div className="bg-background border border-muted rounded-xl overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 border-b border-muted font-bold text-sm">Key Endpoints</div>
                    <div className="divide-y divide-muted">
                      {blueprint.architecture.endpoints.map((ep, idx) => (
                        <div key={idx} className="p-4 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                              ep.method === 'GET' ? 'bg-blue-500/20 text-blue-500' :
                              ep.method === 'POST' ? 'bg-green-500/20 text-green-500' :
                              'bg-amber-500/20 text-amber-500'
                            }`}>{ep.method}</span>
                            <span className="font-mono text-sm font-bold">{ep.path}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{ep.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-background border border-muted rounded-xl p-5">
                    <h4 className="font-bold text-sm mb-3">Database Schema</h4>
                    <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                      {blueprint.architecture.databaseSchema.map((schema, idx) => (
                        <li key={idx}>• {schema}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6">Recommended Folder Structure</h3>
                <div className="bg-[#1e1e1e] border border-muted rounded-xl p-6 overflow-x-auto shadow-inner">
                  <pre className="font-mono text-sm text-gray-300 leading-relaxed">
                    {blueprint.architecture.folderStructure}
                  </pre>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab ==="projects" && (
          <div className="">
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
              Study these real-world repositories to understand how professionals implement similar architectures and features.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blueprint.existingProjects.map((proj, idx) => (
                <a 
                  key={idx} 
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-muted rounded-2xl p-6 hover:border-foreground/30 flex flex-col h-full group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{proj.name}</h3>
                    <GitBranch className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{proj.description}</p>
                  <div className="bg-muted/30 p-3 rounded-lg text-xs font-medium text-foreground mb-6 border border-muted">
                    <span className="font-bold block mb-1">Why study this?</span>
                    {proj.relevance}
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {proj.tech.slice(0, 2).map(t => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-wider bg-muted px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                      proj.difficulty === 'Easy' ? 'text-green-500' :
                      proj.difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'
                    }`}>
                      {proj.difficulty}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* HOW TO BUILD TAB */}
        {activeTab ==="build" && (
          <div className="space-y-12">
            
            <section className="bg-muted/20 border border-muted rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {blueprint.howToBuild.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-foreground shrink-0" /> {req}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-8">Step-by-Step Implementation</h3>
              <div className="space-y-8">
                {blueprint.howToBuild.steps.map((step, idx) => (
                  <div key={idx} className="bg-background border border-muted rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-foreground" />
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
                      <span className="text-muted-foreground font-mono text-base">Step {idx + 1}.</span> 
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed mb-6">{step.instructions}</p>
                    
                    {step.codeSnippet && (
                      <div className="bg-[#1e1e1e] border border-muted rounded-xl p-4 overflow-x-auto shadow-inner mb-6">
                        <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">{step.codeSnippet}</pre>
                      </div>
                    )}

                    {step.warning && (
                      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 p-4 rounded-xl text-sm font-medium flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block mb-1">Watch out:</strong>
                          {step.warning}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <section className="bg-background border border-muted rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Testing Strategy</h3>
                <p className="text-sm text-muted-foreground mb-6">{blueprint.howToBuild.testing.howTo}</p>
                <div className="mb-6">
                  <strong className="text-sm block mb-2">Tools:</strong>
                  <div className="flex gap-2">
                    {blueprint.howToBuild.testing.tools.map(t => (
                      <span key={t} className="text-xs font-bold bg-muted px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-sm block mb-3">Key Test Cases:</strong>
                  <ul className="space-y-2">
                    {blueprint.howToBuild.testing.cases.map((c, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-foreground">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="bg-background border border-muted rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Deployment Guide</h3>
                <ol className="space-y-4 list-decimal list-inside text-sm text-muted-foreground mb-6">
                  {blueprint.howToBuild.deployment.steps.map((s, i) => (
                    <li key={i} className="pl-2">{s}</li>
                  ))}
                </ol>
                <div className="mb-6">
                  <strong className="text-sm block mb-2 text-foreground">Required Env Vars:</strong>
                  <div className="flex flex-wrap gap-2">
                    {blueprint.howToBuild.deployment.envVars.map(v => (
                      <span key={v} className="text-[10px] font-mono bg-foreground/10 text-foreground px-2 py-1 rounded border border-foreground/20">{v}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                  <strong className="text-sm text-red-500 block mb-2">Common Deployment Errors:</strong>
                  <ul className="space-y-2">
                    {blueprint.howToBuild.deployment.commonErrors.map((err, i) => (
                      <li key={i} className="text-xs text-muted-foreground">• {err}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* EXTRA FEATURES TAB */}
        {activeTab ==="extra" && (
          <div className="space-y-12">
            
            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-foreground" /> Resume-Worthy Upgrades
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {blueprint.extraFeatures.resumeUpgrades.map((upg, idx) => (
                  <div key={idx} className="bg-foreground text-background rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-background/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                    <h4 className="font-bold text-lg mb-2 relative z-10">{upg.name}</h4>
                    <p className="text-sm text-background/80 mb-4 font-medium relative z-10">{upg.why}</p>
                    <div className="bg-background/10 p-3 rounded-xl text-sm relative z-10">
                      <strong>How:</strong> {upg.how}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid lg:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-bold mb-6">Intermediate Features</h3>
                <div className="space-y-4">
                  {blueprint.extraFeatures.intermediate.map((feat, idx) => (
                    <div key={idx} className="bg-background border border-muted rounded-xl p-5 hover:border-foreground/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold">{feat.name}</h4>
                        <span className="text-[10px] font-bold bg-muted px-2 py-1 rounded">{feat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{feat.description}</p>
                      <span className="text-xs font-mono text-foreground border border-muted px-2 py-1 rounded-md bg-muted/30">
                        {feat.tech}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6">Advanced Features</h3>
                <div className="space-y-4">
                  {blueprint.extraFeatures.advanced.map((feat, idx) => (
                    <div key={idx} className="bg-background border border-muted rounded-xl p-5 hover:border-foreground/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold">{feat.name}</h4>
                        <span className="text-[10px] font-bold bg-muted px-2 py-1 rounded">{feat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{feat.description}</p>
                      <span className="text-xs font-mono text-foreground border border-muted px-2 py-1 rounded-md bg-muted/30">
                        {feat.tech}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="bg-muted/20 border border-muted rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-6">Related Project Spin-offs</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {blueprint.extraFeatures.spinOffs.map((spin, idx) => (
                  <div key={idx} className="bg-background border border-muted rounded-xl p-5 text-left hover:shadow-md transition-shadow cursor-pointer">
                    <h4 className="font-bold mb-2 flex items-center justify-between">
                      {spin.title} <PlayCircle className="w-4 h-4 text-muted-foreground" />
                    </h4>
                    <p className="text-xs text-muted-foreground">{spin.description}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
}
