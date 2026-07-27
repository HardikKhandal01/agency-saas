import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layers, Menu, X, Bell, User, LayoutDashboard, Users, Megaphone, Bot, Settings, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Menu items list
  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'CRM & Leads', path: '/dashboard/crm', icon: <Users size={20} /> },
    { name: 'Campaigns', path: '/dashboard/campaigns', icon: <Megaphone size={20} /> },
    { name: 'AI Studio', path: '/dashboard/ai', icon: <Bot size={20} /> },
    { name: 'AI Receptionist', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  // Current page ka Title nikalne ke liye function
  const getCurrentTitle = () => {
    const currentMenu = menuItems.find(item => item.path === location.pathname);
    return currentMenu ? currentMenu.name : 'Dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('access_token');
    navigate('/auth');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* 1. Mobile Top Center Logo (Only visible on mobile) */}
      <div className="mobile-top-bar" onClick={() => navigate('/')}>
        <Layers style={{ color: 'var(--primary)', marginRight: '8px' }} />
        <span className="text-gradient">AgencySaaS</span>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* 2. Sidebar Menu */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          
          {/* Desktop Logo in Sidebar */}
          <div className="desktop-sidebar-logo" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: 'bold' }}>
            <Layers style={{ color: 'var(--primary)' }} />
            <span className="text-gradient">AgencySaaS</span>
          </div>

          {/* Close button inside sidebar for mobile */}
          {isSidebarOpen && (
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid var(--border-color)' }}>
               <X onClick={() => setIsSidebarOpen(false)} style={{ cursor: 'pointer' }} />
            </div>
          )}

          {/* Navigation Links */}
          <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', paddingLeft: '12px' }}>MENU</div>
            {menuItems.map((item) => (
              <div 
                key={item.name}
                onClick={() => { navigate(item.path); setIsSidebarOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', cursor: 'pointer',
                  backgroundColor: location.pathname === item.path ? 'rgba(40, 70, 158, 0.1)' : 'transparent',
                  color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: location.pathname === item.path ? '600' : '500'
                }}
              >
                {item.icon} {item.name}
              </div>
            ))}
          </nav>

          {/* Logout Button at Bottom Left */}
          <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)' }}>
            <div 
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', fontWeight: '500', cursor: 'pointer', padding: '12px', borderRadius: '8px' }}
            >
              <LogOut size={20} /> Logout
            </div>
          </div>
        </aside>

        {/* 3. Main Content Area & Header */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'auto' }}>
          
          {/* Header Bar */}
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: 'white', borderBottom: '1px solid var(--border-color)' }}>
            
            {/* Left Side: Hamburger (Mobile) + Dynamic Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} />
              </button>
              <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>{getCurrentTitle()}</h2>
            </div>

            {/* Right Side: Bell & Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Bell size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <User size={20} />
                </div>
                <div className="profile-text">
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Admin User</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Agency Owner</div>
                </div>
              </div>
            </div>

          </header>

          {/* This is where individual tool pages (CRM, AI Studio, etc.) will render */}
          <div style={{ padding: '24px', flex: 1 }}>
            <Outlet />
          </div>

        </main>
      </div>

      {/* Background Overlay when Sidebar is open on Mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90 }}
        />
      )}
    </div>
  );
};

export default DashboardLayout;