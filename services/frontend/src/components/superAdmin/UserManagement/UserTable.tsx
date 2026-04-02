import "./UserTable.css";
import { Search, Filter, Plus, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

const users = [
  { name: "Sarah Johnson",  email: "sarah@vormirex.com",  role: "admin", courses: 12, status: "active",    lastActive: "1 hour ago" },
  { name: "Alex Chen",      email: "alex@vormirex.com",   role: "user",  courses: 8,  status: "active",    lastActive: "3 hours ago" },
  { name: "Maya Patel",     email: "maya@vormirex.com",   role: "super", courses: 24, status: "active",    lastActive: "30 min ago" },
  { name: "James Wilson",   email: "james@vormirex.com",  role: "user",  courses: 5,  status: "inactive",  lastActive: "2 days ago" },
  { name: "Emma Davis",     email: "emma@vormirex.com",   role: "user",  courses: 15, status: "active",    lastActive: "5 hours ago" },
  { name: "Ryan Kim",       email: "ryan@vormirex.com",   role: "admin", courses: 19, status: "suspended", lastActive: "1 week ago" },
];

const roleLabel = (role: string) =>
  role === "super" ? "Super Admin" : role.charAt(0).toUpperCase() + role.slice(1);

const UserTable = () => {
  return (
    <div className="user-table-container">

      {/* ── Header ── */}
      <div className="user-table-header">
        <div>
          <h3>All Users</h3>
          <p>Manage user accounts, roles, and permissions</p>
        </div>
        <div className="table-actions">
          <div className="search-box">
            <Search size={14} color="#7f8da3" />
            <input placeholder="Search users..." />
          </div>
          <button className="filter-btn">
            <Filter size={14} />
            All Roles
          </button>
          <button className="filter-btn">
            All Status
          </button>
          <button className="add-user-btn">
            <Plus size={14} />
            Add User
          </button>
        </div>
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div className="user-table">
        <div className="table-row header">
          <span></span>
          <span>NAME</span>
          <span>ROLE</span>
          <span>COURSES</span>
          <span>STATUS</span>
          <span>LAST ACTIVE</span>
          <span>ACTIONS</span>
        </div>

        {users.map((user) => (
          <div key={user.email} className="table-row">
            <div className="select-circle" />
            <div className="user-info">
              <div className="user-table-avatar">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p>{user.name}</p>
                <span>{user.email}</span>
              </div>
            </div>
            <span className={`role ${user.role}`}>{roleLabel(user.role)}</span>
            <span style={{ color: "#c8d8ee", fontSize: "14px" }}>{user.courses}</span>
            <span className={`status ${user.status}`}>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
            <span className="last-active">{user.lastActive}</span>
            <button className="actions-btn">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* ── MOBILE CARDS ── */}
      <div className="user-mobile-cards">
        {users.map((user) => (
          <div key={user.email} className="user-mobile-card">
            <div className="user-mobile-card-top">
              <div className="user-table-avatar">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="user-mobile-card-name">
                <p>{user.name}</p>
                <span>{user.email}</span>
              </div>
              <button className="actions-btn">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="user-mobile-card-info">
              <div className="user-mobile-card-row">
                <span className="user-mobile-card-label">ROLE</span>
                <span className={`role ${user.role}`}>{roleLabel(user.role)}</span>
              </div>
              <div className="user-mobile-card-row">
                <span className="user-mobile-card-label">COURSES</span>
                <span className="user-mobile-card-val">{user.courses}</span>
              </div>
              <div className="user-mobile-card-row">
                <span className="user-mobile-card-label">STATUS</span>
                <span className={`status ${user.status}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
              <div className="user-mobile-card-row">
                <span className="user-mobile-card-label">LAST ACTIVE</span>
                <span className="user-mobile-card-val">{user.lastActive}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="table-footer">
        <span>Showing 1–6 of 10</span>
        <div className="pagination">
          <button><ChevronLeft size={14} /></button>
          <button className="active">1</button>
          <button>2</button>
          <button><ChevronRight size={14} /></button>
        </div>
      </div>

    </div>
  );
};

export default UserTable;