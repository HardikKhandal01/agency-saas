import React, { useState } from 'react';
import { Bot, Settings, UploadCloud, Sparkles, X, Save, Image, Type } from 'lucide-react';
// import axios from 'axios'; // Isko uncomment karlena agar API call kar rahe ho

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'image'
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState('');
  
  // Prompt ke liye state add kiya hai
  const [promptInput, setPromptInput] = useState(''); 

const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setAiOutput('');
    
    try {
      // LocalStorage se token nikalna (jo Login ke time save hua tha)
      const token = localStorage.getItem('access_token');

      // Backend API ko request bhejna
      const response = await axios.post(
        'https://agency-saas-backend-2flg.onrender.com/api/v1/ai/generate',
        {
          prompt: promptInput,
          // Backend ko batana ki text chahiye ya image
          content_type: activeTab === 'image' ? 'image' : 'text' 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Security ke liye token bhejna
          }
        }
      );

      // Agar response me image_url hai toh wo dikhao, warna text dikhao
      if (activeTab === 'image') {
        // Maan lo backend response.data.image_url bhejta hai
        setAiOutput(response.data.image_url || response.data.result); 
      } else {
        setAiOutput(response.data.result || response.data.text);
      }

    } catch (error) {
      console.error("API Error:", error);
      setAiOutput("Oops! Kuch error aa gaya. Please check console ya phir try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`File selected: ${file.name}\n(Yahan apna image upload ka code daal sakte ho)`);
      // API call to upload screenshot
    }
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
        
        {/* 2. VISION AI (Native Upload Feature) */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Image size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Vision AI (Competitor Scan)</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Upload a screenshot of a competitor's ad. The AI will analyze it and write a better version.</p>
          
          {/* 👈 NATIVE FILE UPLOAD IMPLEMENTATION */}
          <label htmlFor="vision-upload" style={{ display: 'block', cursor: 'pointer' }}>
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '32px', textAlign: 'center', backgroundColor: '#f8fafc', transition: 'background 0.2s' }}>
              <UploadCloud size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 12px auto' }} />
              <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Click to upload screenshot</span>
            </div>
            {/* Ye hidden tag mobile ka asli File Picker open karega */}
            <input 
              type="file" 
              id="vision-upload" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* 3. GENERATIVE AI BOX (Bigger Chatbox) */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          
          {/* Pill Toggle for Tabs */}
          <div className="pill-toggle-container">
            <button 
              className={`pill-button ${activeTab === 'text' ? 'active' : ''}`} 
              onClick={() => {setActiveTab('text'); setAiOutput(''); setPromptInput('');}}
            >
              <Type size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }}/> Ad Copy & Text
            </button>
            <button 
              className={`pill-button ${activeTab === 'image' ? 'active' : ''}`} 
              onClick={() => {setActiveTab('image'); setAiOutput(''); setPromptInput('');}}
            >
              <Image size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }}/> AI Image Gen
            </button>
          </div>

          <form onSubmit={handleGenerate}>
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
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={activeTab === 'text' ? "e.g. Write a digital marketing ad for a SaaS company..." : "e.g. A high-quality futuristic cricket stadium with neon lights..."}
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

          {/* 👈 DYNAMIC AI OUTPUT AREA (Text ya Image render karega) */}
          {aiOutput && (
            <div className="ai-reply-box" style={{ padding: activeTab === 'image' ? '12px' : '20px' }}>
              <span style={{ fontWeight: '700', display: 'block', marginBottom: '12px', color: 'var(--primary)' }}>AI Response:</span>
              
              {activeTab === 'image' ? (
                // Image rendering logic
                <img 
                  src={aiOutput} 
                  alt="AI Generated" 
                  style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
                />
              ) : (
                // Text rendering logic
                <div style={{ whiteSpace: 'pre-wrap' }}>{aiOutput}</div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* BRAND MEMORY MODAL */}
      {isMemoryModalOpen && (
        <div className="modal-overlay" onClick={() => setIsMemoryModalOpen(false)}>
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