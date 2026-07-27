import React, { useState } from 'react';
import { Megaphone, RefreshCw, BarChart2, ExternalLink } from 'lucide-react';

const Campaigns = () => {
  const [isSynced, setIsSynced] = useState(false);

  return (
    <div className="campaigns-container">
      
      {/* 1. HEADER & BUTTONS (Properly Wrapped) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        
        {/* Title Area */}
        <div style={{ display: 'flex', gap: '12px', minWidth: '250px', flex: 1 }}>
          <Megaphone style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Omnichannel Campaigns</h1>
            <p style={{ color: 'var(--text-muted)' }}>Track your Google & Meta ads performance in one unified dashboard.</p>
          </div>
        </div>

        {/* Sync Buttons - Mobile par ye apne aap niche shift ho jayenge */}
        {!isSynced ? (
          <button onClick={() => setIsSynced(true)} className="btn-primary" style={{ height: 'fit-content', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={16} /> Sync with Google Ads
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid var(--border-color)', background: 'white', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              Go to Google Ads <ExternalLink size={16} />
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600' }}>
              <RefreshCw size={16} /> Synced Live
            </button>
          </div>
        )}
      </div>

      {/* 2. CONTENT AREA */}
      {!isSynced ? (
        /* Empty State */
        <div className="glass-panel empty-state-box">
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
            <BarChart2 size={32} style={{ color: 'var(--primary)' }} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-main)' }}>No Data Available</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
            Sync your Google Ads account to view live campaign metrics, budget tracking, and keyword performance.
          </p>
          <button className="btn-primary" onClick={() => setIsSynced(true)}>
            Connect Account Now
          </button>
        </div>
      ) : (
        /* Synced Data Dashboard */
        <div>
          {/* Top 4 Metrics Row */}
          <div className="metrics-grid">
            <div className="metric-card">
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Total Spent</p>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>$4,250</h2>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#10b981' }}>+12% from last month</p>
            </div>
            
            <div className="metric-card">
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Total Views (Impr.)</p>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>1.2M</h2>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#10b981' }}>+450k new impr.</p>
            </div>
            
            <div className="metric-card">
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Total Clicks</p>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>24,500</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Avg. CPC: <strong>$0.17</strong></p>
            </div>
            
            <div className="metric-card highlight-card">
              <p style={{ color: '#047857', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Est. ROI</p>
              <h2 style={{ color: '#047857', fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>+324%</h2>
              <p style={{ color: '#047857', fontSize: '14px', fontWeight: '500' }}>High Performance</p>
            </div>
          </div>

          {/* Middle Charts Row */}
          <div className="charts-grid">
            <div className="metric-card">
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-main)' }}>Monthly Budget Pacing</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: '700' }}>$4,250 <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Spent</span></span>
                <span style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-muted)' }}>$5,000 <span style={{ fontSize: '14px', fontWeight: '500' }}>Limit</span></span>
              </div>
              <div style={{ width: '100%', height: '12px', background: '#e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #1e3a8a, #ef4444)' }}></div>
              </div>
              <p style={{ color: '#ef4444', fontSize: '14px', fontWeight: '500' }}>Alert: You have used 85% of your budget.</p>
            </div>

            <div className="metric-card">
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-main)' }}>Clicks by Device</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}><span>Mobile</span><span>65%</span></div>
                  <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px' }}><div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div></div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}><span>Desktop</span><span>35%</span></div>
                  <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px' }}><div style={{ width: '35%', height: '100%', background: '#64748b', borderRadius: '4px' }}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Table Row */}
          <div className="table-wrapper">
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-main)' }}>Top Performing Keywords</h3>
            
            {/* Ye div horizontal scroll handle karega bina page ko hilaye */}
            <div className="table-responsive">
              <table style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Search Keyword</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Reach (Impr.)</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Clicks</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Avg. CPC</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Conv %</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { kw: 'best marketing agency', imp: '125K', clicks: '4,200', cpc: '$0.45', conv: '12.5%' },
                    { kw: 'B2B lead generation', imp: '89K', clicks: '2,150', cpc: '$0.62', conv: '9.2%' },
                    { kw: 'SEO services near me', imp: '210K', clicks: '8,900', cpc: '$0.12', conv: '15.8%' },
                    { kw: 'Facebook ads expert', imp: '45K', clicks: '1,100', cpc: '$0.85', conv: '6.4%' },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '16px', fontWeight: '600', color: 'var(--primary)' }}>{row.kw}</td>
                      <td style={{ padding: '16px', color: 'var(--text-main)' }}>{row.imp}</td>
                      <td style={{ padding: '16px', color: 'var(--text-main)' }}>{row.clicks}</td>
                      <td style={{ padding: '16px', fontWeight: '600', color: 'var(--text-main)' }}>{row.cpc}</td>
                      <td style={{ padding: '16px', color: '#10b981', fontWeight: '600' }}>{row.conv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Campaigns;