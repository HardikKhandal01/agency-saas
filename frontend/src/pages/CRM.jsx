import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreHorizontal, Mail, Phone, X, Loader2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const CRM = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  const [editingId, setEditingId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    value: '',
    status: 'new'
  });

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

  // 🧠 UPDATED SAVE LOGIC (Crash Proof)
  const handleSaveLead = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      
      // FIX: Sirf zaroori data nikalo aur Value ko number me convert karo taaki FastAPI gussa na ho
      const cleanPayload = {
        name: formData.name,
        company: formData.company || "",
        email: formData.email || "",
        value: Number(formData.value) || 0,
        status: formData.status
      };

      if (editingId) {
        await axios.put(`https://agency-saas-backend-2flg.onrender.com/api/v1/leads/${editingId}`, cleanPayload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('https://agency-saas-backend-2flg.onrender.com/api/v1/leads/', cleanPayload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: '', company: '', email: '', value: '', status: 'new' }); 
      fetchLeads(); 
      
    } catch (error) {
      console.error("Error saving lead:", error);
      
      // Smart Error Alerts taaki exactly pata chale ki kya fasa hai
      if (error.response) {
        if (error.response.status === 401) {
          alert("Session expired. Please login again.");
          navigate('/auth');
        } else if (error.response.status === 422) {
          alert("Error (422): Form data format is invalid according to backend.");
        } else if (error.response.status === 404) {
          alert("Error (404): Update endpoint not found. Backend me PUT API missing hai!");
        } else if (error.response.status === 405) {
          alert("Error (405): Method Not Allowed. Check backend PUT routes.");
        } else {
          alert(`Failed to save lead. Status: ${error.response.status}`);
        }
      } else {
        alert("Network Error: Backend is down or unreachable.");
      }
    }
  };

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
        
        <div style={{ position: 'relative' }}>
          <MoreHorizontal 
            size={18} 
            style={{ color: 'var(--text-muted)', cursor: 'pointer' }} 
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdownId(openDropdownId === lead.id ? null : lead.id);
            }}
          />
          
          {openDropdownId === lead.id && (
            <div style={{ position: 'absolute', right: 0, top: '24px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, minWidth: '120px', overflow: 'hidden' }}>
              <div 
                style={{ padding: '10px 16px', fontSize: '14px', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFormData(lead); 
                  setEditingId(lead.id); 
                  setShowModal(true); 
                  setOpenDropdownId(null); 
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
        <div className="kanban-board" onClick={() => setOpenDropdownId(null)}> 
          
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

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setShowModal(false)}>
          <div className="crm-modal-content" onClick={(e) => e.stopPropagation()}>
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