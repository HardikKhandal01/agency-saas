import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, Save, PhoneCall, Settings, Send, Paperclip, X, Image as ImageIcon, Bot, User } from 'lucide-react';

const Receptionist = () => {
  // Configuration States
  const [isConfigured, setIsConfigured] = useState(false);
  const [botName, setBotName] = useState('Sarah Assistant');
  const [voice, setVoice] = useState('female-1');
  const [prompt, setPrompt] = useState("You are a helpful receptionist for our marketing agency. Answer client FAQs and book appointments.");
  const [isSaving, setIsSaving] = useState(false);

  // Chat Interface States
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your AI assistant. How can I help your agency today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Vision (Upload) State
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 1. TEXT-TO-SPEECH (Real Voice Playback)
  const playVoice = (voiceType) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any currently playing audio
      const msg = new SpeechSynthesisUtterance("Hello, I am your AI assistant. How can I help your agency today?");
      
      // Simulating different voices using pitch and rate
      if (voiceType === 'female-1') {
        msg.pitch = 1.2;
        msg.rate = 1.0;
      } else {
        msg.pitch = 0.8;
        msg.rate = 0.9;
      }
      window.speechSynthesis.speak(msg);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  // 2. SPEECH-TO-TEXT (Mic Recording)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser. Please use Chrome.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setInputValue((prev) => prev ? prev + " " + transcript : transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // 3. HANDLE CONFIGURATION SAVE / TEST CALL
  const handleSave = (e) => {
    if(e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsConfigured(true); // Switch to Chat UI
    }, 1000);
  };

  // 4. HANDLE IMAGE UPLOAD
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
    }
  };

  // 5. SEND MESSAGE LOGIC
  const handleSendMessage = (text = inputValue) => {
    if (!text && !uploadedFile) return;

    // Add User Message
    const userMsg = { role: 'user', text: text, image: uploadedFile };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setUploadedFile(null);
    setIsTyping(true);

    // Simulate AI Response based on context
    setTimeout(() => {
      let aiResponse = "I have noted that down for the team.";
      
      if (userMsg.image) {
        aiResponse = "I analyzed the campaign screenshot you attached. The CTR looks slightly low for this ad group. I suggest optimizing the headline and increasing the daily budget by 10% to improve reach.";
      } else if (text.toLowerCase().includes("email") || text.toLowerCase().includes("draft")) {
        aiResponse = "Sure, I have drafted an introductory email for the new client. I've sent it to your drafts folder for review.";
      } else if (text.toLowerCase().includes("leads")) {
        aiResponse = "Today we generated 14 new B2B leads from the LinkedIn campaign. 3 of them are high-ticket prospects. Should I schedule intro calls with them?";
      }

      setMessages(prev => [...prev, { role: 'bot', text: aiResponse }]);
      setIsTyping(false);
      
      // Optional: Auto-play Bot Response
      // if ('speechSynthesis' in window) {
      //   const msg = new SpeechSynthesisUtterance(aiResponse);
      //   if (voice === 'female-1') { msg.pitch = 1.2; } else { msg.pitch = 0.8; }
      //   window.speechSynthesis.speak(msg);
      // }
    }, 1500);
  };

  // ==========================================
  // UI RENDER LOGIC
  // ==========================================

  // VIEW 1: CHAT INTERFACE (Post-Configuration)
  if (isConfigured) {
    return (
      <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-out' }}>
        
        {/* Chat Header */}
        <div style={{ background: 'white', padding: '16px 24px', borderRadius: '16px 16px 0 0', border: '1px solid var(--border-color)', borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mic color="white" size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{botName}</h2>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span> Active Now
              </span>
            </div>
          </div>
          {/* Settings Toggle (Back to config) */}
          <button onClick={() => setIsConfigured(false)} style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-muted)' }} title="Agent Settings">
            <Settings size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid var(--border-color)', padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: '12px', alignItems: 'flex-end' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: msg.role === 'user' ? 'var(--accent)' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {msg.role === 'user' ? <User size={16} color="var(--primary)" /> : <Bot size={16} color="white" />}
              </div>
              <div style={{ maxWidth: '70%', background: msg.role === 'user' ? 'var(--primary)' : 'white', color: msg.role === 'user' ? 'white' : 'var(--text-main)', padding: '16px', borderRadius: msg.role === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0', border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: '14.5px', lineHeight: '1.5' }}>
                {msg.image && (
                  <img src={msg.image} alt="Uploaded" style={{ width: '100%', borderRadius: '8px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.2)' }} />
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={16} color="white" /></div>
              <div style={{ background: 'white', padding: '16px', borderRadius: '16px 16px 16px 0', border: '1px solid var(--border-color)', fontSize: '14px', color: 'var(--text-muted)' }}>
                {botName} is typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input & Controls Area */}
        <div style={{ background: 'white', padding: '16px 24px', borderRadius: '0 0 16px 16px', border: '1px solid var(--border-color)', borderTop: 'none' }}>
          
          {/* Digital Marketing Action Chips */}
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
            {["Analyze today's leads", "Draft welcome email", "Check campaign ROI"].map((chip, idx) => (
              <button key={idx} onClick={() => handleSendMessage(chip)} style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: 'var(--primary)', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {chip}
              </button>
            ))}
          </div>

          {/* Uploaded File Preview */}
          {uploadedFile && (
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
              <img src={uploadedFile} alt="Preview" style={{ height: '60px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
              <button onClick={() => setUploadedFile(null)} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={12} /></button>
            </div>
          )}

          {/* Main Input Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface-color)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            
            {/* Attachment Button */}
            <label style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
              <Paperclip size={20} />
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
            
            {/* Input Field */}
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isListening ? "Listening..." : "Ask your agent to perform a task..."}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'var(--text-main)' }}
            />
            
            {/* Mic Button */}
            <button 
              onClick={startListening}
              style={{ background: isListening ? '#ef4444' : 'transparent', color: isListening ? 'white' : 'var(--text-muted)', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            >
              <Mic size={20} />
            </button>
            
            {/* Send Button */}
            <button 
              onClick={() => handleSendMessage()}
              disabled={!inputValue && !uploadedFile}
              style={{ background: (!inputValue && !uploadedFile) ? 'var(--border-color)' : 'var(--primary)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <Send size={18} style={{ marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 2: SETUP CONFIGURATION (Pre-Chat)
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Mic style={{ color: 'var(--primary)' }} size={32} /> AI Voice Receptionist
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px' }}>
          Configure your 24/7 automated agent to answer calls and manage CRM tasks.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        
        {/* Left Column: Bot Avatar & Testing */}
        <div className="bento-card" style={{ padding: '32px', textAlign: 'center', alignSelf: 'start' }}>
          
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', position: 'relative', boxShadow: '0 10px 25px rgba(40, 70, 158, 0.2)' }}>
            <Mic size={48} color="white" />
          </div>
          
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>{botName || 'Unnamed Bot'}</h2>
          <span style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: '600', marginBottom: '24px' }}>
            Ready for Setup
          </span>
          
          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '24px', paddingTop: '24px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Want to skip setup and start chatting?</p>
            {/* TEST CALL BUTTON FIXED */}
            <button onClick={() => handleSave()} className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', background: '#10b981' }}>
              <PhoneCall size={18} /> Make a Test Call
            </button>
          </div>
        </div>

        {/* Right Column: Configuration Form */}
        <div className="bento-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Configuration Settings</h2>
          
          <form onSubmit={handleSave}>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Agent Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="e.g. Sarah"
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>Voice Selection (Click Play to hear)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                
                {/* Voice Option 1 */}
                <div style={{ border: `1px solid ${voice === 'female-1' ? 'var(--primary)' : 'var(--border-color)'}`, background: voice === 'female-1' ? '#eff6ff' : 'var(--surface-color)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setVoice('female-1')}>
                  <button type="button" onClick={(e) => { e.stopPropagation(); playVoice('female-1'); }} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}><Play size={16} fill="currentColor" /></button>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>Sarah (US)</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Professional & Warm</div>
                  </div>
                </div>

                {/* Voice Option 2 */}
                <div style={{ border: `1px solid ${voice === 'male-1' ? 'var(--primary)' : 'var(--border-color)'}`, background: voice === 'male-1' ? '#eff6ff' : 'var(--surface-color)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setVoice('male-1')}>
                  <button type="button" onClick={(e) => { e.stopPropagation(); playVoice('male-1'); }} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4b5563', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}><Play size={16} fill="currentColor" /></button>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>Marcus (UK)</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Authoritative & Clear</div>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span>System Prompt (Instructions)</span>
              </label>
              <textarea 
                className="input-field" 
                rows="5" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Tell the AI how to behave..."
                style={{ resize: 'none', lineHeight: '1.5' }}
                required
              />
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} disabled={isSaving}>
                <Save size={18} /> {isSaving ? 'Configuring Agent...' : 'Save & Open Chat'}
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
};

export default Receptionist;