import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layers, LayoutDashboard, Users, Megaphone, Bot, Settings, LogOut, Bell, User, Check } from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Naya State: Notification dropdown open/close control karne ke liye
  const [showNotifications, setShowNotifications] = useState(false);

  // Security: Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/auth'); // Token nahi hai to Login pe bhej do
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('isLoggedIn');
    navigate('/auth');
  };

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'CRM & Leads', icon: <Users size={20} />, path: '/dashboard/crm' },
    { name: 'Campaigns', icon: <Megaphone size={20} />, path: '/dashboard/campaigns' },
    { name: 'AI Studio', icon: <Bot size={20} />, path: '/dashboard/ai' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  // Genius Level: Premium Mock Data for Notifications
  const notifications = [
    { id: 1, type: 'Lead', text: 'New Lead: John Doe assigned to you', time: '5m ago', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: <Users size={16} /> },
    { id: 2, type: 'Campaign', text: 'Alert: Facebook Ad budget at 90%', time: '1h ago', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', icon: <Megaphone size={16} /> },
    { id: 3, type: 'AI', text: 'AI Studio: Your SEO blog draft is ready', time: '2h ago', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', icon: <Bot size={16} /> },
  ];

  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div 
          onClick={() => navigate('/')} 
          style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '22px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}
        >
          <Layers style={{ color: 'var(--primary)' }} />
          <span className="text-gradient">AgencySaaS</span>
        </div>
        
        <div style={{ padding: '24px 0', flex: 1 }}>
          <div style={{ padding: '0 24px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            Menu
          </div>
          {menuItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon} {item.name}
            </div>
          ))}
        </div>

        <div className="sidebar-item" onClick={handleLogout} style={{ borderTop: '1px solid var(--border-color)', marginTop: 'auto', padding: '24px' }}>
          <LogOut size={20} /> Logout
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Topbar */}
        <header className="topbar">
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>
            {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            
            {/* Notification Bell Section (Updated) */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{ cursor: 'pointer', padding: '8px', borderRadius: '50%', background: showNotifications ? 'rgba(40, 70, 158, 0.1)' : 'transparent', transition: 'all 0.2s' }}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} style={{ color: 'var(--text-main)' }} />
                <span style={{ position: 'absolute', top: 6, right: 8, width: 8, height: 8, backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
              </div>

              {/* Dropdown Menu */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '48px',
                  right: '0',
                  width: '340px',
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  zIndex: 100,
                  overflow: 'hidden'
                }}>
                  {/* Dropdown Header */}
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0, color: 'var(--text-main)' }}>Notifications</h3>
                    <span style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={14} /> Mark all read
                    </span>
                  </div>
                  
                  {/* Dropdown List */}
                  <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ display: 'flex', gap: '16px', padding: '16px 20px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: n.bg, color: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {n.icon}
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', margin: '0 0 4px 0', color: 'var(--text-main)', fontWeight: '500', lineHeight: '1.4' }}>{n.text}</p>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dropdown Footer */}
                  <div style={{ padding: '12px', textAlign: 'center', fontSize: '13px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', borderTop: '1px solid var(--border-color)' }}>
                    View All Activity
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderLeft: '1px solid var(--border-color)', paddingLeft: '24px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '600', fontSize: '14px', lineHeight: '1' }}>Admin User</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Agency Owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="dashboard-page">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;