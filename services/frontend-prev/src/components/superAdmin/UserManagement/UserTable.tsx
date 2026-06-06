import "./UserTable.css";
import { Search, Filter, Plus, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

interface UserTableProps {
  users: any[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const roleLabel = (role: string) => {
  if (!role) return "User";
  if (role === "super-admin") return "Super Admin";
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const getInitials = (name: string) => {
  if (!name) return "US";
  const parts = name.split(" ");
  if (parts.length > 1) return parts[0][0] + parts[1][0];
  return parts[0][0] + (parts[0][1] || "");
};

const formatTimeAgo = (dateString: string) => {
  if (!dateString) return "--";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString();
};

const UserTable = ({ users, currentPage, totalPages, onPageChange, searchQuery, onSearchChange }: UserTableProps) => {
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
            <input 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
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
          <span>JOINED</span>
          <span>ACTIONS</span>
        </div>

        {users.map((user) => (
          <div key={user._id} className="table-row">
            <div className="select-circle" />
            <div className="user-info">
              <div className="user-table-avatar">
                {getInitials(user.name).toUpperCase()}
              </div>
              <div>
                <p>{user.name}</p>
                <span>{user.email}</span>
              </div>
            </div>
            <span className={`role ${user.role}`}>{roleLabel(user.role)}</span>
            <span style={{ color: "#c8d8ee", fontSize: "14px" }}>--</span>
            <span className={`status ${user.isVerified ? "active" : "inactive"}`}>
              {user.isVerified ? "Verified" : "Pending"}
            </span>
            <span className="last-active">{formatTimeAgo(user.createdAt)}</span>
            <button className="actions-btn">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
        
        {users.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>
            No users found.
          </div>
        )}
      </div>

      {/* ── MOBILE CARDS ── */}
      <div className="user-mobile-cards">
        {users.map((user) => (
          <div key={user._id} className="user-mobile-card">
            <div className="user-mobile-card-top">
              <div className="user-table-avatar">
                {getInitials(user.name).toUpperCase()}
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
                <span className="user-mobile-card-val">--</span>
              </div>
              <div className="user-mobile-card-row">
                <span className="user-mobile-card-label">STATUS</span>
                <span className={`status ${user.isVerified ? "active" : "inactive"}`}>
                  {user.isVerified ? "Verified" : "Pending"}
                </span>
              </div>
              <div className="user-mobile-card-row">
                <span className="user-mobile-card-label">JOINED</span>
                <span className="user-mobile-card-val">{formatTimeAgo(user.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="table-footer">
        <span>Page {currentPage} of {totalPages || 1}</span>
        <div className="pagination">
          <button 
            disabled={currentPage <= 1} 
            onClick={() => onPageChange(currentPage - 1)}
            style={{ opacity: currentPage <= 1 ? 0.5 : 1, cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={14} />
          </button>
          <button className="active">{currentPage}</button>
          <button 
            disabled={currentPage >= totalPages} 
            onClick={() => onPageChange(currentPage + 1)}
            style={{ opacity: currentPage >= totalPages ? 0.5 : 1, cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer' }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserTable;