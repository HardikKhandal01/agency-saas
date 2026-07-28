import React, { useState, useEffect } from 'react';
import { Mic, PhoneCall, Settings, Paperclip, Send, User, Bot, Loader2 } from 'lucide-react';

const Receptionist = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState('sarah');
  const [chatMessage, setChatMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Chat Messages State
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI assistant. How can I help your agency today?' }
  ]);

  const agents = {
    sarah: { name: 'Sarah (US)', tagline: 'Professional & Warm', gender: 'female' },
    marcus: { name: 'Marcus (UK)', tagline: 'Authoritative & Clear', gender: 'male' }
  };

  // 🔊 Text-To-Speech Logic (AI ko bulwane ke liye)
  const speakText = (text, agentId) => {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel(); // Purani aawaz roko
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    if (agentId === 'sarah') {
      // Female Voice dhoondho
      const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Google US English'));
      if (femaleVoice) utterance.voice = femaleVoice;
      utterance.pitch = 1.1;
      utterance.rate = 1.0;
    } else {
      // Male Voice dhoondho
      const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Daniel') || v.name.includes('Google UK English Male'));
      if (maleVoice) utterance.voice = maleVoice;
      utterance.pitch = 0.9;
      utterance.rate = 0.95;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // 📞 Test Call Handler
  const handleTestCall = () => {
    const sampleText = activeAgent === 'sarah' 
      ? "Hi there! I am Sarah, your professional AI assistant. I am ready to handle your client calls."
      : "Hello. I am Marcus, your senior support agent. I am ready to assist your team.";
    speakText(sampleText, activeAgent);
  };

  // 📝 Normal Text Send Handler
  const handleSendMessage = (e, textOverride = null) => {
    if (e) e.preventDefault();
    const textToSend = textOverride || chatMessage;
    if (!textToSend.trim()) return;

    // User ka message add karo
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setChatMessage('');
    setIsAiTyping(true);

    // AI ka reply (Dummy delay)
    setTimeout(() => {
      const aiReply = `I have received your request: "${textToSend}". Let me process that for you immediately.`;
      setMessages(prev => [...prev, { role: 'ai', text: aiReply }]);
      setIsAiTyping(false);
    }, 1500);
  };

  // 🎤 Mic (Speech to Text) Handler
  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Oops! Your browser doesn't support Voice typing.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      
      // User ka bola hua message add karo
      setMessages(prev => [...prev, { role: 'user', text: `🎤 ${transcript}` }]);
      setIsAiTyping(true);

      // AI ka Voice Reply
      setTimeout(() => {
        const aiReply = `I heard you say: ${transcript}. I am working on it.`;
        setMessages(prev => [...prev, { role: 'ai', text: aiReply }]);
        setIsAiTyping(false);
        speakText(aiReply, activeAgent); // Bol kar batao kyunki user ne bol kar pucha tha
      }, 1500);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  // 📎 File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages(prev => [...prev, { role: 'user', text: `📎 Uploaded File: ${file.name}` }]);
      setIsAiTyping(true);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: `I have securely received your file "${file.name}". I will scan it for relevant data.` }]);
        setIsAiTyping(false);
      }, 1500);
    }
  };

  return (
    <div className="receptionist-container">
      {/* HEADER */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Mic size={28} style={{ color: 'var(--primary)' }} />
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>AI Voice Receptionist</h1>
        </div>
      </div>

      {!isChatOpen ? (
        /* ================= SETUP VIEW ================= */
        <div className="setup-grid">
          
          <div className="setup-box" style={{ textAlign: 'center' }}>
            <div className="mic-pulse-wrapper">
              <Mic size={40} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
              {agents[activeAgent].name} Assistant
            </h2>
            <span style={{ display: 'inline-block', background: '#ecfdf5', color: '#10b981', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: '600', marginBottom: '32px' }}>
              ● Ready for Setup
            </span>
            
            <button 
              className="btn-primary" 
              style={{ width: '100%', background: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}
              onClick={handleTestCall}
            >
              <PhoneCall size={18} /> Make a Test Call
            </button>
          </div>

          <div className="setup-box">
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={20} style={{ color: 'var(--primary)' }} /> Configuration Settings
            </h3>

            <div className="pill-toggle-container" style={{ marginBottom: '20px' }}>
              <button className={`pill-button ${activeAgent === 'sarah' ? 'active' : ''}`} onClick={() => setActiveAgent('sarah')}>
                Sarah (US)
              </button>
              <button className={`pill-button ${activeAgent === 'marcus' ? 'active' : ''}`} onClick={() => setActiveAgent('marcus')}>
                Marcus (UK)
              </button>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button className="btn-primary" style={{ width: '100%', padding: '12px' }} onClick={() => setIsChatOpen(true)}>
                Save & Open Chat
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= CHAT VIEW ================= */
        <div className="chat-interface-wrapper">
          
          {/* Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', background: 'white' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Mic size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{agents[activeAgent].name}</h3>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>● Active Now</span>
            </div>
          </div>

          {/* Chat History */}
          <div className="chat-history">
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'ai' && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(40, 70, 158, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <Bot size={18} />
                  </div>
                )}
                <div style={{ 
                  background: msg.role === 'user' ? 'var(--primary)' : '#f8fafc', 
                  color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                  padding: '12px 16px', 
                  borderRadius: msg.role === 'user' ? '16px 16px 0 16px' : '0 16px 16px 16px', 
                  fontSize: '14px', maxWidth: '85%' 
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isAiTyping && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(40, 70, 158, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}><Bot size={18} /></div>
                <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '0 16px 16px 16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Loader2 size={16} className="animate-spin" /> Typing...
                </div>
              </div>
            )}
          </div>

          {/* Chips */}
          <div className="chat-chips-row">
            <span className="chat-chip" onClick={() => handleSendMessage(null, "Analyze today's leads")}>Analyze leads</span>
            <span className="chat-chip" onClick={() => handleSendMessage(null, "Draft welcome email")}>Draft email</span>
            <span className="chat-chip" onClick={() => handleSendMessage(null, "Check campaign ROI")}>Check ROI</span>
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <form onSubmit={handleSendMessage} className="chat-input-box">
              
              {/* HIDDEN NATIVE FILE UPLOAD */}
              <label htmlFor="chat-file" className="chat-icon-btn" style={{ cursor: 'pointer', margin: 0 }}>
                <Paperclip size={20} />
                <input type="file" id="chat-file" style={{ display: 'none' }} multiple onChange={handleFileUpload} />
              </label>
              
              <input 
                type="text" 
                placeholder={isListening ? "Listening..." : "Ask your agent to perform a task..."}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              
              <button type="button" className="chat-icon-btn" onClick={handleMicClick} style={{ color: isListening ? '#ef4444' : 'var(--text-muted)' }}>
                <Mic size={20} />
              </button>
              
              <button type="submit" className="chat-icon-btn" style={{ color: chatMessage.trim() ? 'white' : 'var(--text-muted)', background: chatMessage.trim() ? 'var(--primary)' : 'transparent', borderRadius: '50%', padding: '6px' }} disabled={!chatMessage.trim()}>
                <Send size={16} style={{ marginLeft: chatMessage.trim() ? '-2px' : '0' }} />
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default Receptionist;