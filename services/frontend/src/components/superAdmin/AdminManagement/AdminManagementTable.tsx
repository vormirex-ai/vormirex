import "./AdminManagement.css";
import { MoreVertical } from "lucide-react";

const admins = [
  {
    id: 1,
    initials: "PS",
    name: "Pooja Sharma",
    email: "pooja@vormirex.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Mar 19, 2026 10:30 AM",
    permissions: "Full Access",
    avatarClass: "cyan",
  },
  {
    id: 2,
    initials: "RK",
    name: "Ravi Kumar",
    email: "ravi@vormirex.com",
    role: "Admin",
    status: "Active",
    lastLogin: "Mar 18, 2026 4:45 PM",
    permissions: "4 permissions",
    avatarClass: "purple",
  },
  {
    id: 3,
    initials: "NP",
    name: "Neha Patel",
    email: "neha@vormirex.com",
    role: "Editor",
    status: "Active",
    lastLogin: "Mar 17, 2026 9:15 AM",
    permissions: "1 permission",
    avatarClass: "pink",
  },
  {
    id: 4,
    initials: "AM",
    name: "Arjun Mehta",
    email: "arjun@vormirex.com",
    role: "Admin",
    status: "Inactive",
    lastLogin: "Feb 28, 2026 12:00 PM",
    permissions: "3 permissions",
    avatarClass: "orange",
  },
  {
    id: 5,
    initials: "SK",
    name: "Simran Kaur",
    email: "simran@vormirex.com",
    role: "Editor",
    status: "Active",
    lastLogin: "Mar 19, 2026 8:00 AM",
    permissions: "2 permissions",
    avatarClass: "green",
  },
  {
    id: 6,
    initials: "VS",
    name: "Vikram Singh",
    email: "vikram@vormirex.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Mar 19, 2026 7:30 AM",
    permissions: "Full Access",
    avatarClass: "red",
  },
];

const AdminManagementTable = () => {
  return (
    <section className="admin-management-table-section">
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
                <td>
                  <span className="admin-row-radio"></span>
                </td>

                <td>
                  <div className="admin-user-cell">
                    <div className={`admin-avatar ${admin.avatarClass}`}>
                      {admin.initials}
                    </div>
                    <span>{admin.name}</span>
                  </div>
                </td>

                <td className="admin-email">{admin.email}</td>

                <td>
                  <span
                    className={`admin-role-badge ${
                      admin.role === "Super Admin"
                        ? "super-admin"
                        : admin.role === "Admin"
                        ? "admin"
                        : "editor"
                    }`}
                  >
                    {admin.role}
                  </span>
                </td>

                <td>
                  <span
                    className={`admin-status-badge ${
                      admin.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    <span className="status-dot"></span>
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

      <p className="admin-table-footer">Showing 6 of 6 admins</p>
    </section>
  );
};

export default AdminManagementTable;