import { useState, useEffect } from "react";
import layout from "../../shared/SharedLayout.module.css";
import styles from "./UserManagementPage.module.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import UserStats from "../../components/superAdmin/UserManagement/UserStats";
import UserTable from "../../components/superAdmin/UserManagement/UserTable";
import { fetchAllUsers } from "../../api/admin";

const UserManagementPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Data State
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, admins: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Debounce the search input by 500ms
    const timer = setTimeout(() => {
      loadUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery]);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      
      const data = await fetchAllUsers(currentPage, 10, searchQuery, token);
      setUsers(data.users || []);
      setTotalPages(data.pages || 1);
      
      // Update global platform stats
      if (data.total !== undefined) {
        setStats({
          total: data.total,
          active: data.activeCount || 0,
          admins: data.adminsCount || 0
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 if the user starts typing a new search query
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  return (
    <div className={layout.page}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={layout.main}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className={`${layout.body} ${styles.body}`}>
          
          <div className={styles.header}>
            <h1>User Management</h1>
            <p>Manage all platform users and their roles</p>
          </div>

          {error && <div style={{ color: "#ef4444", padding: "10px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px", marginBottom: "15px" }}>{error}</div>}

          <UserStats 
            total={stats.total} 
            active={stats.active} 
            admins={stats.admins} 
          />
          
          <UserTable 
            users={users}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          
          {loading && <div style={{ color: '#00d4d4', padding: '20px', textAlign: 'center', marginTop: '10px' }}>Loading Database Array...</div>}

        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;