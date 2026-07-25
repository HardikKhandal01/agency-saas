import React from 'react';
import { ArrowRight, Bot, Zap, BarChart3, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <section style={{ paddingTop: '160px', paddingBottom: '100px', textAlign: 'center', width: '100%' }}>
      
      {/* Container me Flexbox lagaya hai taaki sab kuch exactly center me align ho */}
      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(40, 70, 158, 0.1)', color: 'var(--primary)', borderRadius: '100px', fontWeight: '600', fontSize: '14px', marginBottom: '24px', border: '1px solid rgba(40, 70, 158, 0.2)' }}>
          🚀 Version 2.0 is now live
        </div>

        {/* H1 me Explicit bada font size aur bold weight lagaya hai */}
        <h1 style={{ fontSize: '64px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', color: 'var(--text-main)', letterSpacing: '-1.5px' }}>
          The Operating System for <br />
          <span style={{ 
            backgroundImage: 'linear-gradient(90deg, #1e3a8a, #3b82f6)', 
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent' 
          }}>
            Modern Agencies
          </span>
        </h1>
        
        {/* Subtitle ko bada kiya aur center margin lagaya */}
        <p style={{ fontSize: '20px', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
          Replace 10 different tools with one powerful SaaS. Manage clients, track ad campaigns, and generate AI content in seconds.
        </p>

        {/* Buttons (Dynamic Logic Added Here) */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          
          {isLoggedIn ? (
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 32px', fontSize: '16px', cursor: 'pointer', background: '#10b981' }} onClick={() => navigate('/dashboard')}>
              Go to Dashboard <LayoutDashboard size={20} />
            </button>
          ) : (
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 32px', fontSize: '16px', cursor: 'pointer' }} onClick={() => navigate('/auth')}>
              Start Free Trial <ArrowRight size={20} />
            </button>
          )}

          <button className="glass-panel" style={{ padding: '16px 32px', border: '1px solid var(--border-color)', background: 'white', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>
            Book a Demo
          </button>
        </div>

        {/* Features Tags */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '48px', color: 'var(--text-muted)', fontWeight: '500' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Bot size={20} style={{ color: 'var(--primary)' }} /> AI Content Studio
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Zap size={20} style={{ color: '#eab308' }} /> Smart Kanban CRM
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <BarChart3 size={20} style={{ color: '#22c55e' }} /> Campaign Tracking
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;