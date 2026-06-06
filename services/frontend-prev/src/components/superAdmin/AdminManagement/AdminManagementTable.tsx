import React from "react";
import "./AdminManagement.css";
import { MoreVertical } from "lucide-react";

// UX Utilities
const roleBadgeClass = (role: string) =>
  role === "super-admin" ? "super-admin" : "admin";

const getInitials = (name: string) => {
  if (!name) return "AD";
  const parts = name.split(" ");
  if (parts.length > 1) return parts[0][0] + parts[1][0];
  return parts[0][0] + (parts[0][1] || "");
};

const getAvatarClass = (role: string) => {
  return role === "super-admin" ? "cyan" : "purple";
};

// Data Pipe
interface TableProps {
  admins: any[];
}

const AdminManagementTable = ({ admins }: TableProps) => {

  // Decode Current User from LocalStorage Cache
  const storedUserStr = localStorage.getItem("user");
  let currentUserId = "";
  if (storedUserStr) {
    try {
      const parsed = JSON.parse(storedUserStr);
      currentUserId = parsed._id || parsed.id;
    } catch(e) {}
  }

  return (
    <section className="admin-management-table-section">

      {/* ── DESKTOP TABLE ── */}
      <div className="admin-table-wrapper">
        <table className="admin-management-table">
          <thead>
            <tr>
              <th></th>
              <th>Admin</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Permissions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => {
              const isMe = admin._id === currentUserId;
              
              return (
              <tr key={admin._id}>
                <td><span className="admin-row-radio" /></td>
                <td>
                  <div className="admin-user-cell">
                    <div className={`admin-avatar ${getAvatarClass(admin.role)}`}>{getInitials(admin.name).toUpperCase()}</div>
                    <span>{admin.name || "Anonymous Admin"}</span>
                  </div>
                </td>
                <td className="admin-email">{admin.email}</td>
                <td>
                  <span className={`admin-role-badge ${roleBadgeClass(admin.role)}`}>
                    {admin.role === 'super-admin' ? 'Super Admin' : 'Admin'}
                  </span>
                </td>
                <td>
                  <span className={`admin-status-badge ${admin.isVerified ? "active" : "inactive"}`}>
                    <span className="status-dot" />
                    {admin.isVerified ? "Verified" : "Pending"}
                  </span>
                </td>
                <td className="admin-last-login">--</td>
                <td className="admin-permissions">{admin.role === 'super-admin' ? 'Full Access' : 'Read / Write'}</td>
                <td>
                  <button 
                    type="button" 
                    className="admin-row-action-btn"
                    disabled={isMe}
                    style={{ opacity: isMe ? 0.3 : 1, cursor: isMe ? 'not-allowed' : 'pointer' }}
                    title={isMe ? "Action restricted for current user" : "Actions"}
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            )})}
            
            {admins.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>
                  No administrators matched your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARDS  ── */}
      <div className="admin-mobile-cards">
        {admins.map((admin) => {
          const isMe = admin._id === currentUserId;
          
          return (
          <div key={admin._id} className="admin-mobile-card">

            {/* Top: avatar + name + action */}
            <div className="admin-mobile-card-top">
              <div className={`admin-avatar ${getAvatarClass(admin.role)}`}>{getInitials(admin.name).toUpperCase()}</div>
              <span className="admin-mobile-card-name">{admin.name}</span>
              <button 
                type="button" 
                className="admin-row-action-btn"
                disabled={isMe}
                style={{ opacity: isMe ? 0.3 : 1, cursor: isMe ? 'not-allowed' : 'pointer' }}
                title={isMe ? "Action restricted for current user" : "Actions"}
              >
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Info rows */}
            <div className="admin-mobile-card-info">
              <div className="admin-mobile-card-row">
                <span className="admin-mobile-card-label">EMAIL</span>
                <span className="admin-mobile-card-val">{admin.email}</span>
              </div>
              <div className="admin-mobile-card-row">
                <span className="admin-mobile-card-label">ROLE</span>
                <span className={`admin-role-badge ${roleBadgeClass(admin.role)}`}>
                  {admin.role === 'super-admin' ? 'Super Admin' : 'Admin'}
                </span>
              </div>
              <div className="admin-mobile-card-row">
                <span className="admin-mobile-card-label">STATUS</span>
                <span className={`admin-status-badge ${admin.isVerified ? "active" : "inactive"}`}>
                  <span className="status-dot" />
                  {admin.isVerified ? "Verified" : "Pending"}
                </span>
              </div>
              <div className="admin-mobile-card-row">
                <span className="admin-mobile-card-label">PERMISSIONS</span>
                <span className="admin-mobile-card-val">{admin.role === 'super-admin' ? 'Full Access' : 'Read / Write'}</span>
              </div>
            </div>

          </div>
        )})}
      </div>

      <p className="admin-table-footer">Showing {admins.length} administrator{admins.length !== 1 ? 's' : ''}</p>
    </section>
  );
};

export default AdminManagementTable;