import "./UserTable.css";
import { Search, Filter, Plus } from "lucide-react";

const users = [
  {
    name: "Sarah Johnson",
    email: "sarah@vormirex.com",
    role: "admin",
    courses: 12,
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    name: "Alex Chen",
    email: "alex@vormirex.com",
    role: "user",
    courses: 8,
    status: "active",
    lastActive: "3 hours ago",
  },
  {
    name: "Maya Patel",
    email: "maya@vormirex.com",
    role: "super",
    courses: 24,
    status: "active",
    lastActive: "30 min ago",
  },
  {
    name: "James Wilson",
    email: "james@vormirex.com",
    role: "user",
    courses: 5,
    status: "inactive",
    lastActive: "2 days ago",
  },
];

const UserTable = () => {
  return (
    <div className="user-table-container">
      {/* Header */}
      <div className="user-table-header">
        <div>
          <h3>All Users</h3>
          <p>Manage user accounts, roles, and permissions</p>
        </div>

        <div className="table-actions">
          <div className="search-box">
            <Search size={14} />
            <input placeholder="Search users..." />
          </div>

          <button className="filter-btn">
            <Filter size={14} /> All Roles
          </button>

          <button className="filter-btn">All Status</button>

          <button className="add-user-btn">
            <Plus size={14} /> Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="user-table">
        <div className="table-row header">
          <span></span>
          <span>Name</span>
          <span>Role</span>
          <span>Courses</span>
          <span>Status</span>
          <span>Last Active</span>
          <span>Actions</span>
        </div>

        {users.map((user) => (
          <div key={user.email} className="table-row">
            <div className="select-circle" />

            <div className="user-info">
              <div className="avatar">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p>{user.name}</p>
                <span>{user.email}</span>
              </div>
            </div>

            <span className={`role ${user.role}`}>
              {user.role === "super" ? "Super Admin" : user.role}
            </span>

            <span>{user.courses}</span>

            <span className={`status ${user.status}`}>
              {user.status}
            </span>

            <span>{user.lastActive}</span>
            

            <span className="actions">⋮</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="table-footer">
        <span>Showing 1–4 of 10</span>

        <div className="pagination">
          <button>{"<"}</button>
          <button className="active">1</button>
          <button>2</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;