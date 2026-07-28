import React, { useState } from 'react';
import { Mic, PhoneCall, Settings, Paperclip, Send, User, Bot } from 'lucide-react';

const Receptionist = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState('sarah'); // 'sarah' or 'marcus'
  const [chatMessage, setChatMessage] = useState('');

  // Agent Specifications
  const agents = {
    sarah: {
      name: 'Sarah (US)',
      tagline: 'Professional & Warm',
      prompt: 'You are a helpful receptionist for our marketing agency. Answer client FAQs and book appointments.'
    },
    marcus: {
      name: 'Marcus (UK)',
      tagline: 'Authoritative & Clear',
      prompt: 'You are a senior support agent. Handle technical queries, explain billing structures, and escalate issues.'
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    alert(`Message sent: ${chatMessage}`);
    setChatMessage('');
  };

  return (
    <div className="receptionist-container">
      
      {/* HEADER */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Mic size={28} style={{ color: 'var(--primary)' }} />
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>AI Voice Receptionist</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
          Configure your 24/7 automated agent to answer calls and manage CRM tasks.
        </p>
      </div>

      {!isChatOpen ? (
        /* ================= SETUP VIEW ================= */
        <div className="setup-grid">
          
          {/* BOX 1: Mic & Test Call (Will be on top in mobile) */}
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
            
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Want to skip setup and start chatting?</p>
            <button 
              className="btn-primary" 
              style={{ width: '100%', background: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}
              onClick={() => alert('Starting a dummy call...')}
            >
              <PhoneCall size={18} /> Make a Test Call
            </button>
          </div>

          {/* BOX 2: Configuration Settings */}
          <div className="setup-box">
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={20} style={{ color: 'var(--primary)' }} /> Configuration Settings
            </h3>

            {/* Apple Style Agent Switch */}
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Voice & Agent Selection</label>
            <div className="pill-toggle-container" style={{ marginBottom: '20px' }}>
              <button 
                className={`pill-button ${activeAgent === 'sarah' ? 'active' : ''}`} 
                onClick={() => setActiveAgent('sarah')}
              >
                Sarah (US)
              </button>
              <button 
                className={`pill-button ${activeAgent === 'marcus' ? 'active' : ''}`} 
                onClick={() => setActiveAgent('marcus')}
              >
                Marcus (UK)
              </button>
            </div>

            {/* Dynamic Specs */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary)', marginBottom: '4px' }}>{agents[activeAgent].tagline}</div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {agents[activeAgent].prompt}
              </p>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px' }}
                onClick={() => setIsChatOpen(true)}
              >
                Save & Open Chat
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* ================= CHAT VIEW ================= */
        <div className="chat-interface-wrapper">
          
          {/* Chat Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', background: 'white' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Mic size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{agents[activeAgent].name} Assistant</h3>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>● Active Now</span>
            </div>
          </div>

          {/* Chat History Area */}
          <div className="chat-history">
            {/* AI Welcome Message */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(40, 70, 158, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                <Bot size={18} />
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '0 16px 16px 16px', fontSize: '14px', color: 'var(--text-main)', maxWidth: '85%' }}>
                Hello! I am your AI assistant. How can I help your agency today?
              </div>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="chat-chips-row">
            <span className="chat-chip">Analyze today's leads</span>
            <span className="chat-chip">Draft welcome email</span>
            <span className="chat-chip">Check campaign ROI</span>
          </div>

          {/* Gemini/ChatGPT Style Input */}
          <div className="chat-input-area">
            <form onSubmit={handleSendMessage} className="chat-input-box">
              <button type="button" className="chat-icon-btn">
                <Paperclip size={20} />
              </button>
              
              <input 
                type="text" 
                placeholder="Ask your agent to perform a task..." 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              
              <button type="button" className="chat-icon-btn">
                <Mic size={20} />
              </button>
              
              <button 
                type="submit" 
                className="chat-icon-btn" 
                style={{ color: chatMessage.trim() ? 'white' : 'var(--text-muted)', background: chatMessage.trim() ? 'var(--primary)' : 'transparent', borderRadius: '50%', padding: '6px' }}
                disabled={!chatMessage.trim()}
              >
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