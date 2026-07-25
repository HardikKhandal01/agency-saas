import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreHorizontal, Mail, Phone, X, Loader2 } from 'lucide-react';
import axios from 'axios';

const CRM = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // New Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    value: '',
    status: 'new'
  });

  // API Call: Backend se Leads lana
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/leads/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  // Jab page load ho tab automatically leads fetch ho jayen
  useEffect(() => {
    fetchLeads();
  }, []);

  // API Call: Nayi Lead Create karna
  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:8000/api/v1/leads/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowModal(false); // Modal band karna
      setFormData({ name: '', company: '', email: '', value: '', status: 'new' }); // Form clear karna
      fetchLeads(); // Nayi list dobara fetch karna
      
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Failed to create lead.");
    }
  };

  // Data ko 3 columns me divide karna
  const groupedLeads = {
    new: leads.filter(l => l.status === 'new'),
    contacted: leads.filter(l => l.status === 'contacted'),
    closed: leads.filter(l => l.status === 'closed')
  };

  // Chota component ek single card dikhane ke liye
  const LeadCard = ({ lead }) => (
    <div className="lead-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="lead-title">{lead.name}</div>
          <div className="lead-company">{lead.company || 'No Company'}</div>
        </div>
        <MoreHorizontal size={18} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
      </div>
      
      <div className="lead-footer">
        <span style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '14px' }}>
          ${lead.value || 0}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ padding: '6px', backgroundColor: 'var(--bg-color)', borderRadius: '50%', cursor: 'pointer' }} title={lead.email}>
            <Mail size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div style={{ padding: '6px', backgroundColor: 'var(--bg-color)', borderRadius: '50%', cursor: 'pointer' }}>
            <Phone size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)' }}>CRM & Leads</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Manage your sales pipeline and track prospects.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search leads..." className="input-field" style={{ paddingLeft: '40px', width: '250px', marginBottom: 0 }} />
          </div>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setShowModal(true)}>
            <Plus size={18} /> Add Lead
          </button>
        </div>
      </div>

      {/* Loading state handle karna */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <Loader2 className="animate-spin" size={32} style={{ color: 'var(--primary)' }} />
        </div>
      ) : (
        /* Kanban Board */
        <div className="kanban-board">
          <div className="kanban-column">
            <div className="kanban-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                New Leads
              </div>
              <span className="kanban-badge">{groupedLeads.new.length}</span>
            </div>
            {groupedLeads.new.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </div>

          <div className="kanban-column">
            <div className="kanban-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                In Progress
              </div>
              <span className="kanban-badge">{groupedLeads.contacted.length}</span>
            </div>
            {groupedLeads.contacted.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </div>

          <div className="kanban-column">
            <div className="kanban-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                Closed Won
              </div>
              <span className="kanban-badge">{groupedLeads.closed.length}</span>
            </div>
            {groupedLeads.closed.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL (Popup) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Add New Lead</h2>
              <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowModal(false)} />
            </div>

            <form onSubmit={handleCreateLead}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Lead Name *</label>
                <input type="text" className="input-field" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rahul Sharma" />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Company</label>
                <input type="text" className="input-field" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="e.g. Tech Innovators" />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Email</label>
                  <input type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="rahul@example.com" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Value ($)</label>
                  <input type="number" className="input-field" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} placeholder="1200" />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Status</label>
                <select className="input-field" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="new">New Lead</option>
                  <option value="contacted">In Progress</option>
                  <option value="closed">Closed Won</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', fontWeight: '500', color: 'var(--text-muted)', cursor: 'pointer', padding: '10px 20px' }}>Cancel</button>
                <button type="submit" className="btn-primary">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CRM;