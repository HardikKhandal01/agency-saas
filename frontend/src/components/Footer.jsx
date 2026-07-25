import React from 'react';
import { Layers, Globe, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '20px', marginBottom: '20px' }}>
              <Layers style={{ color: 'var(--primary)' }} />
              <span className="text-gradient">AgencySaaS</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px', maxWidth: '250px' }}>
              The all-in-one operating system for modern marketing agencies. Built to scale your business.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Globe size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
              <Mail size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
              <Phone size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '20px' }}>Product</h4>
            <span className="footer-link">Features</span>
            <span className="footer-link">Pricing</span>
            <span className="footer-link">Integrations</span>
            <span className="footer-link">Changelog</span>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '20px' }}>Company</h4>
            <span className="footer-link">About Us</span>
            <span className="footer-link">Careers</span>
            <span className="footer-link">Blog</span>
            <span className="footer-link">Contact</span>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '20px' }}>Legal</h4>
            <span className="footer-link">Privacy Policy</span>
            <span className="footer-link">Terms of Service</span>
            <span className="footer-link">Cookie Policy</span>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
          © {new Date().getFullYear()} Marketing Agency SaaS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;