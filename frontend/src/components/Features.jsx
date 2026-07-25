import React from 'react';
import { Bot, LineChart, Users, Mic, PenTool } from 'lucide-react';

const Features = () => {
  return (
    <section className="section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">
            Everything you need in <span className="text-gradient">One Tool</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
            Replace 5 different subscriptions with one powerful platform. 
            Fully white-labeled for your agency.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          
          {/* Card 1: CRM (Large - spans 2 columns) */}
          <div className="bento-card col-span-2">
            <div className="icon-wrapper" style={{ backgroundColor: '#eef2ff' }}>
              <Users size={28} style={{ color: 'var(--primary)' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
              Smart CRM & Lead Pipeline
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '80%' }}>
              Manage all your clients, track lead statuses with Kanban boards, and never miss a follow-up. 
              Integrated directly with your marketing campaigns.
            </p>
            {/* Fake UI Element inside card to make it look premium */}
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>Lead: John Doe</span>
                <span style={{ color: 'green', fontSize: '14px', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '12px' }}>Closed Won</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Receptionist */}
          <div className="bento-card col-span-1">
            <div className="icon-wrapper" style={{ backgroundColor: '#fff1f2' }}>
              <Mic size={28} style={{ color: '#e11d48' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
              AI Receptionist
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
              Your 24/7 automated agent. Books appointments, answers FAQs, and captures voice leads.
            </p>
          </div>

          {/* Card 3: AI Content Studio */}
          <div className="bento-card col-span-1">
            <div className="icon-wrapper" style={{ backgroundColor: '#f0fdfa' }}>
              <PenTool size={28} style={{ color: '#0d9488' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
              Content Generator
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
              Instantly generate SEO keywords, ad headlines, and blog posts using advanced AI models.
            </p>
          </div>

          {/* Card 4: Analytics (Wide) */}
          <div className="bento-card col-span-2">
            <div className="icon-wrapper" style={{ backgroundColor: '#fdf4ff' }}>
              <LineChart size={28} style={{ color: '#c026d3' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
              Campaign Analytics & Reporting
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '80%' }}>
              Track ROAS, clicks, and conversions across Google and Meta Ads. Generate one-click PDF reports for your clients with your own branding.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;