import React, { useState } from 'react';
import { Bot, Settings, UploadCloud, Sparkles, X, Save, Image, Type } from 'lucide-react';

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'image'
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState('');

  // Dummy function to simulate AI generation
  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setAiOutput('');
    
    setTimeout(() => {
      setIsGenerating(false);
      setAiOutput(
        activeTab === 'text' 
        ? "Here is your AI-generated Ad Copy:\n\n🚀 Supercharge your marketing with our B2B solutions! Stop wasting budget and start closing deals. Click here to claim your free audit today!"
        : "🎨 [AI Image Preview Placeholder] - A stunning futuristic cityscape generated based on your prompt."
      );
    }, 1500);
  };

  return (
    <div className="ai-studio-container">
      
      {/* 1. HEADER & MEMORY SETTINGS */}
      <div className="ai-header-flex">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bot size={28} style={{ color: 'var(--primary)' }} />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>AI Studio 2.0</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Advanced AI trained on your brand memory.</p>
          </div>
        </div>

        <button 
          onClick={() => setIsMemoryModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(40, 70, 158, 0.1)', color: 'var(--primary)', border: 'none', borderRadius: '100px', fontWeight: '600', cursor: 'pointer' }}
        >
          <Settings size={18} /> Update Memory
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* 2. VISION AI (Competitor Scan) - Full Width */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Image size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Vision AI (Competitor Scan)</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Upload a screenshot of a competitor's ad. The AI will analyze it and write a better version.</p>
          
          <div style={{ border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8fafc' }}>
            <UploadCloud size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 12px auto' }} />
            <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Click to upload screenshot</span>
          </div>
        </div>

        {/* 3. GENERATIVE AI BOX (Ad Copy & Image Gen) */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          
          {/* Pill Toggle for Tabs */}
          <div className="pill-toggle-container">
            <button 
              className={`pill-button ${activeTab === 'text' ? 'active' : ''}`} 
              onClick={() => {setActiveTab('text'); setAiOutput('');}}
            >
              <Type size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }}/> Ad Copy & Text
            </button>
            <button 
              className={`pill-button ${activeTab === 'image' ? 'active' : ''}`} 
              onClick={() => {setActiveTab('image'); setAiOutput('');}}
            >
              <Image size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }}/> AI Image Gen
            </button>
          </div>

          <form onSubmit={handleGenerate}>
            {/* Show Dropdowns ONLY if Text Tab is active */}
            {activeTab === 'text' && (
              <div className="ai-dropdown-row">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-muted)' }}>Content Type</label>
                  <select className="input-field" style={{ width: '100%', background: '#f8fafc' }}>
                    <option>Google Ad Copy</option>
                    <option>Facebook Ad Copy</option>
                    <option>SEO Blog Post</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-muted)' }}>Tone of Voice</label>
                  <select className="input-field" style={{ width: '100%', background: '#f8fafc' }}>
                    <option>Professional</option>
                    <option>Persuasive & Aggressive</option>
                    <option>Friendly & Casual</option>
                  </select>
                </div>
              </div>
            )}

            {/* ChatGPT / Gemini Style Chatbox */}
            <div className="chatbox-wrapper">
              <textarea 
                className="chatbox-input" 
                placeholder={activeTab === 'text' ? "e.g. Write a digital marketing ad for a SaaS company..." : "e.g. A futuristic digital marketing office with neon lights..."}
                required
              />
              <div className="chatbox-footer">
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>AI will generate based on your prompt</span>
                <button type="submit" className="btn-primary" style={{ padding: '8px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }} disabled={isGenerating}>
                  <Sparkles size={16} /> {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </form>

          {/* AI Output Area */}
          {aiOutput && (
            <div className="ai-reply-box">
              <span style={{ fontWeight: '700', display: 'block', marginBottom: '8px', color: 'var(--primary)' }}>AI Response:</span>
              <div style={{ whiteSpace: 'pre-wrap' }}>{aiOutput}</div>
            </div>
          )}

        </div>
      </div>

      {/* ==============================================
          4. BRAND MEMORY MODAL (POPUP)
          ============================================== */}
      {isMemoryModalOpen && (
        <div className="modal-overlay" onClick={() => setIsMemoryModalOpen(false)}>
          {/* Prevent clicks inside modal from closing it */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>Update Brand Memory</h3>
              <X size={24} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setIsMemoryModalOpen(false)} />
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
              Give AI specific instructions about your brand, audience, and rules. It will remember this for every generation.
            </p>

            <textarea 
              className="input-field" 
              style={{ width: '100%', minHeight: '150px', resize: 'vertical', marginBottom: '20px', background: '#f8fafc' }}
              defaultValue="We are a premium digital marketing agency targeting B2B clients. Keep the tone highly professional, concise, and persuasive."
            />

            <button 
              className="btn-primary" 
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}
              onClick={() => {
                alert('Brand memory updated successfully!');
                setIsMemoryModalOpen(false);
              }}
            >
              <Save size={18} /> Save Instructions
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AIStudio;