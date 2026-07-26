import React from 'react';
import { Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '16px 0' }}>
      <div className="container">
        {/* flexWrap: 'wrap' add kiya hai */}
        <div className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderRadius: '16px', gap: '10px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '20px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Layers style={{ color: 'var(--primary)' }} />
            <span className="text-gradient">AgencySaaS</span>
          </div>

          {/* isme className="nav-links" add kiya hai */}
          <div className="nav-links">
            <span style={{ cursor: 'pointer' }}>Features</span>
            <span style={{ cursor: 'pointer' }}>Pricing</span>
            <span style={{ cursor: 'pointer' }}>About</span>
          </div>

          <button className="btn-primary" style={{ padding: '8px 20px' }} onClick={() => navigate('/auth')}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;