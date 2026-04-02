import "./AdminManagement.css";
import { MoreVertical } from "lucide-react";

const admins = [
  {
    id: 1, initials: "PS", name: "Pooja Sharma",
    email: "pooja@vormirex.com", role: "Super Admin",
    status: "Active", lastLogin: "Mar 19, 2026 10:30 AM",
    permissions: "Full Access", avatarClass: "cyan",
  },
  {
    id: 2, initials: "RK", name: "Ravi Kumar",
    email: "ravi@vormirex.com", role: "Admin",
    status: "Active", lastLogin: "Mar 18, 2026 4:45 PM",
    permissions: "4 permissions", avatarClass: "purple",
  },
  {
    id: 3, initials: "NP", name: "Neha Patel",
    email: "neha@vormirex.com", role: "Editor",
    status: "Active", lastLogin: "Mar 17, 2026 9:15 AM",
    permissions: "1 permission", avatarClass: "pink",
  },
  {
    id: 4, initials: "AM", name: "Arjun Mehta",
    email: "arjun@vormirex.com", role: "Admin",
    status: "Inactive", lastLogin: "Feb 28, 2026 12:00 PM",
    permissions: "3 permissions", avatarClass: "orange",
  },
  {
    id: 5, initials: "SK", name: "Simran Kaur",
    email: "simran@vormirex.com", role: "Editor",
    status: "Active", lastLogin: "Mar 19, 2026 8:00 AM",
    permissions: "2 permissions", avatarClass: "green",
  },
  {
    id: 6, initials: "VS", name: "Vikram Singh",
    email: "vikram@vormirex.com", role: "Super Admin",
    status: "Active", lastLogin: "Mar 19, 2026 7:30 AM",
    permissions: "Full Access", avatarClass: "red",
  },
];

const roleBadgeClass = (role: string) =>
  role === "Super Admin" ? "super-admin" : role === "Admin" ? "admin" : "editor";

const AdminManagementTable = () => {
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
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td><span className="admin-row-radio" /></td>
                <td>
                  <div className="admin-user-cell">
                    <div className={`admin-avatar ${admin.avatarClass}`}>{admin.initials}</div>
                    <span>{admin.name}</span>
                  </div>
                </td>
                <td className="admin-email">{admin.email}</td>
                <td>
                  <span className={`admin-role-badge ${roleBadgeClass(admin.role)}`}>
                    {admin.role}
                  </span>
                </td>
                <td>
                  <span className={`admin-status-badge ${admin.status === "Active" ? "active" : "inactive"}`}>
                    <span className="status-dot" />
                    {admin.status}
                  </span>
                </td>
                <td className="admin-last-login">{admin.lastLogin}</td>
                <td className="admin-permissions">{admin.permissions}</td>
                <td>
                  <button type="button" className="admin-row-action-btn">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARDS  ── */}
      <div className="admin-mobile-cards">
        {admins.map((admin) => (
          <div key={admin.id} className="admin-mobile-card">

            {/* Top: avatar + name + action */}
            <div className="admin-mobile-card-top">
              <div className={`admin-avatar ${admin.avatarClass}`}>{admin.initials}</div>
              <span className="admin-mobile-card-name">{admin.name}</span>
              <button type="button" className="admin-row-action-btn">
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
                  {admin.role}
                </span>
              </div>
              <div className="admin-mobile-card-row">
                <span className="admin-mobile-card-label">STATUS</span>
                <span className={`admin-status-badge ${admin.status === "Active" ? "active" : "inactive"}`}>
                  <span className="status-dot" />
                  {admin.status}
                </span>
              </div>
              <div className="admin-mobile-card-row">
                <span className="admin-mobile-card-label">LAST LOGIN</span>
                <span className="admin-mobile-card-val">{admin.lastLogin}</span>
              </div>
              <div className="admin-mobile-card-row">
                <span className="admin-mobile-card-label">PERMISSIONS</span>
                <span className="admin-mobile-card-val">{admin.permissions}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      <p className="admin-table-footer">Showing 6 of 6 admins</p>
    </section>
  );
};

export default AdminManagementTable;