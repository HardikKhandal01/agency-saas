import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreHorizontal, Mail, Phone, X, Loader2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const CRM = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  // Naya State: Track karne ke liye ki konsa lead edit ho raha hai aur kiska menu open hai
  const [editingId, setEditingId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

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
      if (!token) {
        navigate('/auth');
        return;
      }
      const response = await axios.get('https://agency-saas-backend-2flg.onrender.com/api/v1/leads/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(response.data)) {
        setLeads(response.data);
      } else {
        setLeads([]);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem('access_token');
        localStorage.removeItem('isLoggedIn');
        navigate('/auth');
      }
      setLeads([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🧠 API Call: Lead Create ya Update karna
  const handleSaveLead = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      
      if (editingId) {
        // UPDATE LEAD LOGIC (PUT Request)
        await axios.put(`https://agency-saas-backend-2flg.onrender.com/api/v1/leads/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // CREATE NEW LEAD LOGIC (POST Request)
        await axios.post('https://agency-saas-backend-2flg.onrender.com/api/v1/leads/', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      // Form and Modal Reset
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: '', company: '', email: '', value: '', status: 'new' }); 
      fetchLeads(); // Nayi updated list laao
      
    } catch (error) {
      console.error("Error saving lead:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please login again to save lead.");
        navigate('/auth');
      } else {
        alert("Failed to save lead. Please try again.");
      }
    }
  };

  // Add Lead button par click karne par form fresh khulega
  const handleAddNewClick = () => {
    setFormData({ name: '', company: '', email: '', value: '', status: 'new' });
    setEditingId(null);
    setShowModal(true);
  };

  const safeLeads = Array.isArray(leads) ? leads : [];
  const groupedLeads = {
    new: safeLeads.filter(l => l.status === 'new'),
    contacted: safeLeads.filter(l => l.status === 'contacted'),
    closed: safeLeads.filter(l => l.status === 'closed')
  };

  const LeadCard = ({ lead }) => (
    <div style={{ padding: '16px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '15px' }}>{lead.name}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{lead.company || 'No Company'}</div>
        </div>
        
        {/* 3 Dots & Dropdown Menu */}
        <div style={{ position: 'relative' }}>
          <MoreHorizontal 
            size={18} 
            style={{ color: 'var(--text-muted)', cursor: 'pointer' }} 
            onClick={() => setOpenDropdownId(openDropdownId === lead.id ? null : lead.id)}
          />
          
          {openDropdownId === lead.id && (
            <div style={{ position: 'absolute', right: 0, top: '24px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, minWidth: '120px', overflow: 'hidden' }}>
              <div 
                style={{ padding: '10px 16px', fontSize: '14px', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => {
                  setFormData(lead); // Pura data form me daal do
                  setEditingId(lead.id); // Set karo ki edit mode hai
                  setShowModal(true); // Modal khol do
                  setOpenDropdownId(null); // Menu band kar do
                }}
              >
                <Edit2 size={14} /> Edit Lead
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <span style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '14px' }}>
          ${lead.value || 0}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ padding: '6px', backgroundColor: '#f1f5f9', borderRadius: '50%', cursor: 'pointer' }} title={lead.email}>
            <Mail size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div style={{ padding: '6px', backgroundColor: '#f1f5f9', borderRadius: '50%', cursor: 'pointer' }}>
            <Phone size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="crm-container">
      
      {/* Header section */}
      <div className="crm-header-top">
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)' }}>CRM & Leads</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Manage your sales pipeline and track prospects.</p>
        </div>
        
        <div className="crm-header-actions">
          <div className="crm-search-wrapper">
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search leads..." className="input-field crm-search-input" />
          </div>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }} onClick={handleAddNewClick}>
            <Plus size={18} /> Add Lead
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <Loader2 className="animate-spin" size={32} style={{ color: 'var(--primary)' }} />
        </div>
      ) : (
        /* Kanban Board */
        <div className="kanban-board" onClick={() => setOpenDropdownId(null)}> 
          {/* (Board pe kahin bhi click karne par dropdown band ho jayega) */}
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-main)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                New Leads
              </div>
              <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{groupedLeads.new.length}</span>
            </div>
            {groupedLeads.new.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-main)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                In Progress
              </div>
              <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{groupedLeads.contacted.length}</span>
            </div>
            {groupedLeads.contacted.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-main)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                Closed Won
              </div>
              <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{groupedLeads.closed.length}</span>
            </div>
            {groupedLeads.closed.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </div>

        </div>
      )}

      {/* DYNAMIC MODAL (Add/Edit) */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div className="crm-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                {editingId ? 'Edit Lead Details' : 'Add New Lead'}
              </h2>
              <X size={24} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowModal(false)} />
            </div>

            <form onSubmit={handleSaveLead}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-muted)' }}>Lead Name *</label>
                <input type="text" className="input-field" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rahul Sharma" style={{ width: '100%', boxSizing: 'border-box' }} />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-muted)' }}>Company</label>
                <input type="text" className="input-field" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="e.g. Tech Innovators" style={{ width: '100%', boxSizing: 'border-box' }} />
              </div>

              <div className="crm-form-row">
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-muted)' }}>Email</label>
                  <input type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="rahul@example.com" style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-muted)' }}>Value ($)</label>
                  <input type="number" className="input-field" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} placeholder="1200" style={{ width: '100%', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-muted)' }}>Status</label>
                <select className="input-field" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', background: '#f8fafc' }}>
                  <option value="new">New Lead</option>
                  <option value="contacted">In Progress</option>
                  <option value="closed">Closed Won</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', fontWeight: '600', color: 'var(--text-muted)', cursor: 'pointer', padding: '10px 20px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 24px', borderRadius: '100px' }}>
                  {editingId ? 'Update Lead' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CRM;