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
      // FIX 1: Exact endpoint '/api/v1/leads/' lagaya
      const response = await axios.get('https://agency-saas-backend-2flg.onrender.com/api/v1/leads/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // FIX 2: Safety check - Ensure data is an array before setting it
      if (Array.isArray(response.data)) {
        setLeads(response.data);
      } else {
        setLeads([]); // Agar error aaye toh empty array set karo
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]); // Crash se bachne ke liye khali list
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // API Call: Nayi Lead Create karna
  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      // FIX 3: Endpoint update kiya
      await axios.post('https://agency-saas-backend-2flg.onrender.com/api/v1/leads/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowModal(false);
      setFormData({ name: '', company: '', email: '', value: '', status: 'new' }); 
      fetchLeads(); 
      
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Failed to create lead.");
    }
  };

  // FIX 4: Safety Check - Make sure we are filtering an array
  const safeLeads = Array.isArray(leads) ? leads : [];
  const groupedLeads = {
    new: safeLeads.filter(l => l.status === 'new'),
    contacted: safeLeads.filter(l => l.status === 'contacted'),
    closed: safeLeads.filter(l => l.status === 'closed')
  };

  const LeadCard = ({ lead }) => (
    <div className="lead-card" style={{ padding: '16px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '15px' }}>{lead.name}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{lead.company || 'No Company'}</div>
        </div>
        <MoreHorizontal size={18} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
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

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <Loader2 className="animate-spin" size={32} style={{ color: 'var(--primary)' }} />
        </div>
      ) : (
        /* Kanban Board - Layout structure setup */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-main)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                New Leads
              </div>
              <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{groupedLeads.new.length}</span>
            </div>
            {groupedLeads.new.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-main)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                In Progress
              </div>
              <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{groupedLeads.contacted.length}</span>
            </div>
            {groupedLeads.contacted.map(lead => <LeadCard key={lead.id} lead={lead} />)}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
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

      {/* ADD LEAD MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Add New Lead</h2>
              <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowModal(false)} />
            </div>

            <form onSubmit={handleCreateLead}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Lead Name *</label>
                <input type="text" className="input-field" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rahul Sharma" style={{ width: '100%' }} />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Company</label>
                <input type="text" className="input-field" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="e.g. Tech Innovators" style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Email</label>
                  <input type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="rahul@example.com" style={{ width: '100%' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Value ($)</label>
                  <input type="number" className="input-field" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} placeholder="1200" style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Status</label>
                <select className="input-field" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} style={{ width: '100%' }}>
                  <option value="new">New Lead</option>
                  <option value="contacted">In Progress</option>
                  <option value="closed">Closed Won</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', fontWeight: '500', color: 'var(--text-muted)', cursor: 'pointer', padding: '10px 20px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CRM;