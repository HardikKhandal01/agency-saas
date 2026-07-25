import React from 'react';

const DashboardOverview = () => {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)' }}>Welcome back! 👋</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '4px' }}>
          Here is what's happening with your agency today.
        </p>
      </div>

      {/* Temporary Placeholder UI */}
      <div className="bento-grid" style={{ marginTop: '0' }}>
        <div className="bento-card">
          <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>Total Revenue</h3>
          <p style={{ fontSize: '32px', fontWeight: '700', marginTop: '12px' }}>$12,450</p>
          <span style={{ color: 'green', fontSize: '12px', fontWeight: '500' }}>+14% from last month</span>
        </div>
        
        <div className="bento-card">
          <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>Active Clients</h3>
          <p style={{ fontSize: '32px', fontWeight: '700', marginTop: '12px' }}>42</p>
          <span style={{ color: 'green', fontSize: '12px', fontWeight: '500' }}>+3 new this week</span>
        </div>
        
        <div className="bento-card">
          <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>Active Campaigns</h3>
          <p style={{ fontSize: '32px', fontWeight: '700', marginTop: '12px' }}>18</p>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '500' }}>Across Google & Meta</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;