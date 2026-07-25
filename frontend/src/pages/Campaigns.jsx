import React, { useState } from 'react';
import { Megaphone, RefreshCw, ExternalLink, BarChart2, MousePointerClick, DollarSign, Activity, X, Search, Smartphone, Monitor } from 'lucide-react';

const Campaigns = () => {
  // States for Sync System
  const [showPopup, setShowPopup] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [adsId, setAdsId] = useState('');
  const [syncStep, setSyncStep] = useState('');

  // Handle the Sync Simulation
  const startSync = (e) => {
    e.preventDefault();
    if (!adsId) return;
    
    setIsSyncing(true);
    setSyncStep('Authenticating with Google...');
    
    setTimeout(() => {
      setSyncStep('Fetching Live Campaigns...');
      setTimeout(() => {
        setSyncStep('Calculating ROI & Metrics...');
        setTimeout(() => {
          setIsSyncing(false);
          setIsSynced(true);
          setShowPopup(false);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Megaphone style={{ color: 'var(--primary)' }} size={32} /> Omnichannel Campaigns
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px' }}>
            Track your Google & Meta ads performance in one unified dashboard.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {isSynced && (
            <a 
              href="https://ads.google.com?subid=xs-ip-gemini-adlc" 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }}
            >
              Go to Google Ads <ExternalLink size={16} />
            </a>
          )}
          <button 
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isSynced ? '#10b981' : 'var(--primary)' }}
            onClick={() => setShowPopup(true)}
          >
            <RefreshCw size={18} className={isSyncing ? "animate-spin" : ""} /> 
            {isSynced ? 'Synced Live' : 'Sync with Google Ads'}
          </button>
        </div>
      </div>

      {/* Sync Popup Modal */}
      {showPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Connect Ad Account</h3>
              <button onClick={() => !isSyncing && setShowPopup(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            
            {isSyncing ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <RefreshCw size={32} className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto 16px auto' }} />
                <p style={{ fontWeight: '500', color: 'var(--text-main)' }}>{syncStep}</p>
                <div style={{ width: '100%', height: '4px', background: 'rgba(40, 70, 158, 0.1)', borderRadius: '2px', marginTop: '16px', overflow: 'hidden' }}>
                  <div style={{ width: syncStep.includes('ROI') ? '90%' : syncStep.includes('Fetching') ? '60%' : '30%', height: '100%', background: 'var(--primary)', transition: 'width 1.5s ease-in-out' }}></div>
                </div>
              </div>
            ) : (
              <form onSubmit={startSync}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Google Ads Customer ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. 123-456-7890" 
                  className="input-field"
                  value={adsId}
                  onChange={(e) => setAdsId(e.target.value)}
                  pattern="\d{3}-?\d{3}-?\d{4}"
                  title="Please enter a 10-digit Google Ads ID"
                  required
                />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: '24px' }}>Find this 10-digit number in the top right corner of your Google Ads account.</p>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Connect & Sync Data</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      {!isSynced ? (
        // Pre-Sync State (Empty State)
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--surface-color)', border: '1px dashed var(--border-color)', borderRadius: '16px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(40, 70, 158, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
            <BarChart2 size={32} style={{ color: 'var(--primary)' }} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>No Data Available</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px auto' }}>Sync your Google Ads account to view live campaign metrics, budget tracking, and keyword performance.</p>
          <button className="btn-primary" onClick={() => setShowPopup(true)}>Connect Account Now</button>
        </div>
      ) : (
        // Post-Sync State (Premium Live Dashboard)
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top 4 Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div className="bento-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '14px' }}>Total Spend</span>
                <div style={{ padding: '8px', background: 'rgba(40, 70, 158, 0.1)', borderRadius: '8px', color: 'var(--primary)' }}><DollarSign size={18} /></div>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>$4,250<span style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: '500' }}>.00</span></h3>
              <p style={{ fontSize: '13px', color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><Activity size={14} /> +12% from last month</p>
            </div>

            <div className="bento-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '14px' }}>Total Views (Impr.)</span>
                <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', color: '#8b5cf6' }}><Search size={18} /></div>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>1.2M</h3>
              <p style={{ fontSize: '13px', color: '#10b981', fontWeight: '600' }}>+45K new impressions</p>
            </div>

            <div className="bento-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '14px' }}>Total Clicks</span>
                <div style={{ padding: '8px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '8px', color: '#eab308' }}><MousePointerClick size={18} /></div>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>24,592</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>Avg. CPC: <strong style={{ color: 'var(--text-main)' }}>$0.17</strong></p>
            </div>

            <div className="bento-card" style={{ padding: '24px', border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '14px' }}>Est. ROI</span>
                <div style={{ padding: '8px', background: '#10b981', borderRadius: '8px', color: 'white' }}><Activity size={18} /></div>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#047857' }}>+342%</h3>
              <p style={{ fontSize: '13px', color: '#047857', fontWeight: '600' }}>High Performance</p>
            </div>
          </div>

          {/* Middle Row: Budget Tracker & Devices */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            
            {/* Budget Tracker */}
            <div className="bento-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Monthly Budget Pacing</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: '500' }}>$4,250 Spent</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>$5,000 Limit</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(40, 70, 158, 0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, var(--primary), #ef4444)' }}></div>
              </div>
              <p style={{ fontSize: '13px', color: '#ef4444', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Alert: You have used 85% of your budget. Consider increasing the limit.
              </p>
            </div>

            {/* Device Breakdown */}
            <div className="bento-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Clicks by Device</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <Smartphone style={{ color: 'var(--primary)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}><span>Mobile</span> <span>72%</span></div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(40, 70, 158, 0.1)', borderRadius: '3px' }}><div style={{ width: '72%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div></div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Monitor style={{ color: 'var(--text-muted)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-muted)' }}><span>Desktop</span> <span>28%</span></div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(40, 70, 158, 0.1)', borderRadius: '3px' }}><div style={{ width: '28%', height: '100%', background: 'var(--text-muted)', borderRadius: '3px' }}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyword Performance Table */}
          <div className="bento-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Top Performing Keywords</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '13px' }}>
                    <th style={{ padding: '12px', fontWeight: '600' }}>Search Keyword</th>
                    <th style={{ padding: '12px', fontWeight: '600' }}>Reach (Impr.)</th>
                    <th style={{ padding: '12px', fontWeight: '600' }}>Clicks</th>
                    <th style={{ padding: '12px', fontWeight: '600' }}>Avg. CPC</th>
                    <th style={{ padding: '12px', fontWeight: '600' }}>Conversion %</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { kw: "best marketing agency", reach: "125K", clicks: "4,200", cpc: "$0.45", conv: "12.5%" },
                    { kw: "B2B lead generation", reach: "89K", clicks: "2,150", cpc: "$0.62", conv: "9.2%" },
                    { kw: "SEO services near me", reach: "210K", clicks: "8,900", cpc: "$0.12", conv: "15.8%" },
                    { kw: "Facebook ads expert", reach: "45K", clicks: "1,100", cpc: "$0.85", conv: "6.4%" }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--primary)' }}>{row.kw}</td>
                      <td style={{ padding: '16px 12px' }}>{row.reach}</td>
                      <td style={{ padding: '16px 12px' }}>{row.clicks}</td>
                      <td style={{ padding: '16px 12px', fontWeight: '500' }}>{row.cpc}</td>
                      <td style={{ padding: '16px 12px', color: '#10b981', fontWeight: '600' }}>{row.conv}</td>
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