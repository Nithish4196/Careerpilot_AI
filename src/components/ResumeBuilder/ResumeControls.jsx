import React, { useState } from 'react';
import { Wand2, Plus, Trash2, Settings2, FileText, User, Briefcase, GraduationCap, Code } from 'lucide-react';
import { generateText } from '../../services/huggingface';

export default function ResumeControls({ data, setData }) {
  const [activeTab, setActiveTab] = useState('profile'); // profile, experience, education, skills, settings
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, profile: { ...prev.profile, [name]: value } }));
  };

  const updateItem = (category, id, field, value) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = (category, defaultItem) => {
    setData(prev => ({
      ...prev,
      [category]: [...prev[category], { id: Date.now().toString(), ...defaultItem }]
    }));
  };

  const removeItem = (category, id) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const handleAIEnhanceSummary = async () => {
    if (!data.profile.title) {
      alert("Please enter a Professional Title first so the AI knows what to target.");
      return;
    }
    setIsGenerating(true);
    const prompt = `[INST] You are an expert resume writer. Write a professional resume summary (around 3-4 sentences) for a ${data.profile.title}. It should be impactful, highlighting expertise and drive. Respond ONLY with the summary paragraph, no intro or outro. [/INST]`;
    const generated = await generateText(prompt);
    
    // Clean up response if it contains the prompt
    let cleanText = generated;
    if (generated.includes('[/INST]')) {
      cleanText = generated.split('[/INST]')[1].trim();
    }
    
    setData(prev => ({ ...prev, profile: { ...prev.profile, summary: cleanText } }));
    setIsGenerating(false);
  };

  const handleAIEnhanceExperience = async (id, title, description) => {
    if (!title || !description) {
      alert("Please enter a Job Title and at least some basic description first.");
      return;
    }
    setIsGenerating(true);
    const prompt = `[INST] You are an expert resume writer. Rewrite the following job description for a "${title}" into 3-4 impactful bullet points. Use strong action verbs and focus on achievements. 
Original description: ${description}
Respond ONLY with the bullet points (starting with dashes), no intro or outro. [/INST]`;
    const generated = await generateText(prompt);
    
    let cleanText = generated;
    if (generated.includes('[/INST]')) {
      cleanText = generated.split('[/INST]')[1].trim();
    }

    updateItem('experience', id, 'description', cleanText);
    setIsGenerating(false);
  };

  const tabs = [
    { id: 'settings', icon: Settings2, label: 'Design' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'skills', icon: Code, label: 'Skills' },
  ];

  return (
    <div className="resume-controls-pane">
      {/* Tab Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-dark)' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '1rem 0.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-color)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                opacity: activeTab === tab.id ? 1 : 0.7,
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={18} />
              <span style={{ fontSize: '0.75rem' }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="resume-controls-content">
        
        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in">
            <div className="section-header">Templates</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div 
                className={`template-card ${data.template === 'professional' ? 'active' : ''}`}
                onClick={() => setData(prev => ({ ...prev, template: 'professional' }))}
              >
                <div style={{ fontWeight: '600' }}>Professional</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Clean & Classic</div>
              </div>
              <div 
                className={`template-card ${data.template === 'modern' ? 'active' : ''}`}
                onClick={() => setData(prev => ({ ...prev, template: 'modern' }))}
              >
                <div style={{ fontWeight: '600' }}>Modern</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sleek Sidebar</div>
              </div>
              <div 
                className={`template-card ${data.template === 'creative' ? 'active' : ''}`}
                onClick={() => setData(prev => ({ ...prev, template: 'creative' }))}
                style={{ gridColumn: 'span 2' }}
              >
                <div style={{ fontWeight: '600' }}>Creative</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Bold & Distinctive</div>
              </div>
            </div>

            <div className="section-header">Accent Color</div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['#2c3e50', '#e11d48', '#2563eb', '#16a34a', '#d97706', '#9333ea', '#333333'].map(color => (
                <div
                  key={color}
                  className={`color-swatch ${data.color === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setData(prev => ({ ...prev, color }))}
                />
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="section-header">Personal Details</div>
            <div className="control-group">
              <label className="control-label">Full Name</label>
              <input className="input-field" name="name" value={data.profile.name} onChange={handleProfileChange} placeholder="John Doe" />
            </div>
            <div className="control-group">
              <label className="control-label">Professional Title</label>
              <input className="input-field" name="title" value={data.profile.title} onChange={handleProfileChange} placeholder="Software Engineer" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="control-group">
                <label className="control-label">Email</label>
                <input className="input-field" name="email" value={data.profile.email} onChange={handleProfileChange} placeholder="john@example.com" />
              </div>
              <div className="control-group">
                <label className="control-label">Phone</label>
                <input className="input-field" name="phone" value={data.profile.phone} onChange={handleProfileChange} placeholder="(555) 123-4567" />
              </div>
            </div>
            <div className="control-group">
              <label className="control-label">Location</label>
              <input className="input-field" name="location" value={data.profile.location} onChange={handleProfileChange} placeholder="New York, NY" />
            </div>
            <div className="control-group">
              <label className="control-label">LinkedIn / Website</label>
              <input className="input-field" name="linkedin" value={data.profile.linkedin} onChange={handleProfileChange} placeholder="linkedin.com/in/johndoe" />
            </div>
            
            <div className="control-group" style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="control-label">Professional Summary</label>
                <button className="ai-magic-btn" style={{ marginTop: 0 }} onClick={handleAIEnhanceSummary} disabled={isGenerating}>
                  <Wand2 size={14} /> {isGenerating ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <textarea 
                className="input-field" 
                name="summary" 
                value={data.profile.summary} 
                onChange={handleProfileChange} 
                rows="4" 
                placeholder="A brief summary of your professional background..."
              />
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="animate-fade-in">
            <div className="section-header">
              Work Experience
              <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => addItem('experience', { title: '', company: '', startDate: '', endDate: '', description: '' })}>
                <Plus size={16} /> Add
              </button>
            </div>
            
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="dynamic-list-item">
                <button className="remove-item-btn" onClick={() => removeItem('experience', exp.id)}><Trash2 size={16} /></button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                  <div className="control-group">
                    <label className="control-label">Job Title</label>
                    <input className="input-field" value={exp.title} onChange={(e) => updateItem('experience', exp.id, 'title', e.target.value)} placeholder="Senior Developer" />
                  </div>
                  <div className="control-group">
                    <label className="control-label">Company</label>
                    <input className="input-field" value={exp.company} onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)} placeholder="Tech Corp" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="control-group">
                      <label className="control-label">Start Date</label>
                      <input className="input-field" value={exp.startDate} onChange={(e) => updateItem('experience', exp.id, 'startDate', e.target.value)} placeholder="Jan 2020" />
                    </div>
                    <div className="control-group">
                      <label className="control-label">End Date</label>
                      <input className="input-field" value={exp.endDate} onChange={(e) => updateItem('experience', exp.id, 'endDate', e.target.value)} placeholder="Present" />
                    </div>
                  </div>
                  <div className="control-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label className="control-label">Description (Bullet points)</label>
                      <button className="ai-magic-btn" style={{ marginTop: 0 }} onClick={() => handleAIEnhanceExperience(exp.id, exp.title, exp.description)} disabled={isGenerating}>
                        <Wand2 size={14} /> AI Enhance
                      </button>
                    </div>
                    <textarea 
                      className="input-field" 
                      value={exp.description} 
                      onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)} 
                      rows="4" 
                      placeholder="- Developed highly scalable applications..."
                    />
                  </div>
                </div>
              </div>
            ))}
            {data.experience.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No experience added yet.</p>}
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="animate-fade-in">
            <div className="section-header">
              Education
              <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => addItem('education', { degree: '', school: '', year: '' })}>
                <Plus size={16} /> Add
              </button>
            </div>
            
            {data.education.map((edu) => (
              <div key={edu.id} className="dynamic-list-item">
                <button className="remove-item-btn" onClick={() => removeItem('education', edu.id)}><Trash2 size={16} /></button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                  <div className="control-group">
                    <label className="control-label">Degree</label>
                    <input className="input-field" value={edu.degree} onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
                  </div>
                  <div className="control-group">
                    <label className="control-label">School</label>
                    <input className="input-field" value={edu.school} onChange={(e) => updateItem('education', edu.id, 'school', e.target.value)} placeholder="University Name" />
                  </div>
                  <div className="control-group">
                    <label className="control-label">Year / Duration</label>
                    <input className="input-field" value={edu.year} onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)} placeholder="2016 - 2020" />
                  </div>
                </div>
              </div>
            ))}
            {data.education.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No education added yet.</p>}
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="animate-fade-in">
            <div className="section-header">
              Skills
              <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => addItem('skills', { name: '' })}>
                <Plus size={16} /> Add
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {data.skills.map((skill) => (
                <div key={skill.id} style={{ position: 'relative' }}>
                  <input 
                    className="input-field" 
                    value={skill.name} 
                    onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)} 
                    placeholder="e.g. React.js"
                    style={{ paddingRight: '2.5rem' }} 
                  />
                  <button 
                    className="remove-item-btn" 
                    onClick={() => removeItem('skills', skill.id)}
                    style={{ top: '50%', transform: 'translateY(-50%)', right: '0.5rem' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            {data.skills.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No skills added yet.</p>}
          </div>
        )}

      </div>
    </div>
  );
}
