import React, { useState, useEffect } from 'react';
import { fetchGuestLeads } from '../../../api/admin';

const GuestLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // On mount, grab the guest emails from the database
  useEffect(() => {
    const loadLeads = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        
        // Make sure your backend wraps the response array inside { data: [...] } or returns an array directly!
        const data = await fetchGuestLeads(token); 
        setLeads(data.guests || []); 
      } catch (err: any) {
        setError(err.message || 'Failed to load guest leads');
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

  // Native Javascript Blob Generator
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    // 1. Set the top row Headers
    const headers = ['Email,Status,Join Date\n'];
    
    // 2. Map the data out
    const csvRows = leads.map(lead => {
      const date = new Date(lead.createdAt).toLocaleDateString();
      const status = lead.isVerified ? 'Verified' : 'Pending';
      return `"${lead.email}","${status}","${date}"\n`;
    });
    // 3. Combine it
    const csvContent = headers.concat(csvRows).join('');

    // 4. Create the invisible text blob file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // 5. Build an invisible <a> tag and fake a click to trigger download window
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `vormirex_guest_leads_${new Date().toISOString().split('T')[0]}.csv`);
    
    document.body.appendChild(link);
    link.click();
    
    // 6. Memory Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) return <div>Loading leads...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', background: '#12141a', borderRadius: '12px', border: '1px solid #2a2d35', marginTop: '30px' }}>
      
      {/* Header & Export Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Captured Guest Leads</h2>
          <p style={{ color: '#9ca3af', margin: '4px 0 0 0', fontSize: '13px' }}>Emails verified via ZeroBounce API</p>
        </div>
        
        <button 
          onClick={handleExportCSV}
          style={{ padding: '12px 20px', background: '#00d4d4', color: '#0a0b0f', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Export CSV ({leads.length})
        </button>
      </div>

      {/* Leads Table */}
      <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
               <thead>
          <tr style={{ borderBottom: '1px solid #2a2d35' }}>
            <th style={{ padding: '14px 8px', color: '#9ca3af', fontWeight: '500' }}>Email</th>
            <th style={{ padding: '14px 8px', color: '#9ca3af', fontWeight: '500' }}>Status</th>
            <th style={{ padding: '14px 8px', color: '#9ca3af', fontWeight: '500' }}>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #2a2d35' }}>
              <td style={{ padding: '14px 8px' }}>{lead.email}</td>
              <td style={{ padding: '14px 8px' }}>
                 <span style={{ 
                   background: lead.isVerified ? 'rgba(20, 184, 166, 0.1)' : 'rgba(244, 63, 94, 0.1)', 
                   color: lead.isVerified ? '#00d4d4' : '#f43f5e', 
                   padding: '4px 8px', borderRadius: '4px', fontSize: '11px' 
                 }}>
                   {lead.isVerified ? 'VERIFIED' : 'PENDING'}
                 </span>
              </td>
              <td style={{ padding: '14px 8px' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>No guest leads found.</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};
export default GuestLeads;
