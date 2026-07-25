import React, { useState } from 'react';
import { Bot, Sparkles, Image as ImageIcon, Upload, Save, Zap, RefreshCw, Copy, Check } from 'lucide-react';
import axios from 'axios';

const AIStudio = () => {
  // Tabs & Settings State
  const [activeTab, setActiveTab] = useState('text');
  const [brandMemory, setBrandMemory] = useState('We are a premium digital marketing agency targeting B2B clients. Keep the tone highly professional, concise, and persuasive.');
  const [isMemorySaved, setIsMemorySaved] = useState(false);
  
  // Vision (Upload) State
  const [uploadedImage, setUploadedImage] = useState(null);

  // Text Generator State
  const [textForm, setTextForm] = useState({ type: 'Google Ad Copy', tone: 'Professional', topic: '' });
  const [textResult, setTextResult] = useState('');
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Image Generator State (UPDATED)
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageResult, setImageResult] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [imageError, setImageError] = useState(false); // Naya error state

  const handleSaveMemory = (e) => {
    e.preventDefault();
    setIsMemorySaved(true);
    setTimeout(() => setIsMemorySaved(false), 2000);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setTextForm(prev => ({ ...prev, topic: 'Analyze this uploaded competitor ad and generate 3 similar high-converting headline ideas.' }));
    }
  };

  const handleTextGenerate = async (e) => {
    e.preventDefault();
    setIsLoadingText(true);
    setTextResult('');

    try {
      const enrichedTopic = `[Brand Context: ${brandMemory}] Task: ${textForm.topic}`;
      const response = await axios.post('https://agency-saas-backend-2flg.onrender.com/', {
        topic: enrichedTopic,
        content_type: textForm.type,
        tone: textForm.tone
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setTextResult(response.data.result);
    } catch (error) {
      setTextResult('🚀 **[AI GENERATED MOCK]**\n\n(Fallback Mode Active due to API limits)\n\n**Headline:** Skyrocket Your Agency ROI\n**Description:** Our custom AI models help you generate converting ad copy in seconds, not hours. Start your free trial today.');
    } finally {
      setIsLoadingText(false);
    }
  };

  // REAL IMAGE GENERATION LOGIC (UPDATED)
  const handleImageGenerate = (e) => {
    e.preventDefault();
    if (!imagePrompt) return;
    
    setIsLoadingImage(true);
    setImageResult('');
    setImageError(false); // Reset error
    
    // Random seed banaya taaki har baar nayi image aaye
    const randomSeed = Math.floor(Math.random() * 1000000);
    // Prompt ko safe banaya
    const encodedPrompt = encodeURIComponent(imagePrompt.trim());
    
    // Direct URL set ki, timeout hata diya
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=400&nologo=true&seed=${randomSeed}`;
    setImageResult(imageUrl);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bot style={{ color: 'var(--primary)' }} size={32} /> AI Studio 2.0
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px' }}>
          Advanced AI trained on your brand memory. Generate converting copy and stunning graphics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        
        {/* LEFT COLUMN: Memory & Vision */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="bento-card" style={{ padding: '24px', background: 'linear-gradient(180deg, #ffffff, #f8fafc)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: 'var(--primary)' }} /> Brand Memory (Learning)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Tell the AI about your brand, audience, and rules. It will remember this for every generation.</p>
            <textarea 
              className="input-field" 
              rows="4" 
              value={brandMemory}
              onChange={(e) => setBrandMemory(e.target.value)}
              style={{ fontSize: '13px', resize: 'none', marginBottom: '16px' }}
            />
            <button onClick={handleSaveMemory} className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', background: isMemorySaved ? '#10b981' : 'var(--primary)' }}>
              {isMemorySaved ? <><Check size={16} /> Saved in Memory</> : <><Save size={16} /> Update Memory</>}
            </button>
          </div>

          <div className="bento-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={18} style={{ color: 'var(--primary)' }} /> Vision AI (Competitor Scan)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Upload a screenshot of a competitor's ad. The AI will analyze it and write a better version.</p>
            
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '120px', border: '2px dashed var(--border-color)', borderRadius: '12px', cursor: 'pointer', background: uploadedImage ? '#eff6ff' : 'transparent', transition: 'all 0.2s' }}>
              {uploadedImage ? (
                <>
                  <Check size={24} style={{ color: '#3b82f6', marginBottom: '8px' }} />
                  <span style={{ fontSize: '13px', color: '#3b82f6', fontWeight: '600' }}>Image Scanned!</span>
                </>
              ) : (
                <>
                  <Upload size={24} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>Click to upload screenshot</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* RIGHT COLUMN: Generation Engine */}
        <div className="bento-card" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
            <button onClick={() => setActiveTab('text')} style={{ flex: 1, padding: '16px', background: 'transparent', border: 'none', borderBottom: activeTab === 'text' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'text' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <Bot size={18} /> Ad Copy & Text
            </button>
            <button onClick={() => setActiveTab('image')} style={{ flex: 1, padding: '16px', background: 'transparent', border: 'none', borderBottom: activeTab === 'image' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'image' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={18} /> AI Image Gen
            </button>
          </div>

          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* TEXT TAB */}
            {activeTab === 'text' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <form onSubmit={handleTextGenerate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Content Type</label>
                    <select className="input-field" value={textForm.type} onChange={(e) => setTextForm({...textForm, type: e.target.value})}>
                      <option>Google Ad Copy</option>
                      <option>Facebook Ad Copy</option>
                      <option>SEO Blog Post</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Tone of Voice</label>
                    <select className="input-field" value={textForm.tone} onChange={(e) => setTextForm({...textForm, tone: e.target.value})}>
                      <option>Professional</option>
                      <option>Conversational & Friendly</option>
                      <option>Aggressive & Salesy</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>What are we writing about?</label>
                    <textarea className="input-field" rows="2" placeholder="e.g. A new digital marketing service..." value={textForm.topic} onChange={(e) => setTextForm({...textForm, topic: e.target.value})} required></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1', height: '48px' }} disabled={isLoadingText}>
                    {isLoadingText ? <RefreshCw className="animate-spin" style={{ margin: '0 auto' }} /> : <><Sparkles size={18} style={{ marginRight: '8px', display: 'inline-block' }} /> Generate Content</>}
                  </button>
                </form>

                <div style={{ flex: 1, background: '#f8fafc', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-color)', position: 'relative' }}>
                  {!textResult && !isLoadingText && (
                    <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>Your AI-generated text will appear here.</div>
                  )}
                  {isLoadingText && (
                    <div style={{ color: 'var(--primary)', textAlign: 'center', marginTop: '40px', fontWeight: '500', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <RefreshCw className="animate-spin" size={24} /> Processing with Brand Context...
                    </div>
                  )}
                  {textResult && !isLoadingText && (
                    <div>
                      <button onClick={() => { navigator.clipboard.writeText(textResult); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); }} style={{ position: 'absolute', top: '16px', right: '16px', background: 'white', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600' }}>
                        {isCopied ? <Check size={14} color="#10b981" /> : <Copy size={14} />} {isCopied ? 'Copied!' : 'Copy'}
                      </button>
                      <div style={{ whiteSpace: 'pre-wrap', fontSize: '14.5px', lineHeight: '1.6', color: 'var(--text-main)', marginTop: '24px' }}>
                        {textResult}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* IMAGE TAB (UPDATED ROBUST LOGIC) */}
            {activeTab === 'image' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <form onSubmit={handleImageGenerate} style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>Describe the image or banner you want</label>
                  <textarea className="input-field" rows="3" placeholder="e.g. A cricket player hitting a six, stadium lights, photorealistic" value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} required></textarea>
                  <button type="submit" className="btn-primary" style={{ width: '100%', height: '48px', marginTop: '16px', background: '#8b5cf6' }} disabled={isLoadingImage}>
                    {isLoadingImage ? <RefreshCw className="animate-spin" style={{ margin: '0 auto' }} /> : <><ImageIcon size={18} style={{ marginRight: '8px', display: 'inline-block' }} /> Generate Image</>}
                  </button>
                </form>

                {/* Real-time Image Area */}
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: '300px', position: 'relative' }}>
                  
                  {!imageResult && !isLoadingImage && !imageError && (
                    <div style={{ color: 'var(--text-muted)' }}>Generated image will appear here.</div>
                  )}
                  
                  {/* Jab tak asli image load na ho, spinner ghumta rahega */}
                  {isLoadingImage && (
                    <div style={{ color: '#8b5cf6', fontWeight: '500', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'absolute' }}>
                      <RefreshCw className="animate-spin" size={24} /> 
                      <span>Generating Image (Please wait...)</span>
                    </div>
                  )}

                  {imageError && (
                    <div style={{ color: '#ef4444', fontWeight: '500', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px', textAlign: 'center' }}>
                      <ImageIcon size={32} /> 
                      <span>Failed to load image. Please try a different prompt.</span>
                    </div>
                  )}

                  {imageResult && (
                    <img 
                      src={imageResult} 
                      alt="AI Generated" 
                      // Image ko invisible rakhenge jab tak load na ho jaye
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isLoadingImage ? 0 : 1, transition: 'opacity 0.3s' }} 
                      // Load hote hi spinner hat jayega
                      onLoad={() => { setIsLoadingImage(false); setImageError(false); }}
                      // Agar block hua to error aayega
                      onError={() => { setIsLoadingImage(false); setImageError(true); setImageResult(''); }}
                    />
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudio;