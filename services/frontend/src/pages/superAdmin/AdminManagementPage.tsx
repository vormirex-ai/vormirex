import { useState, useEffect } from "react";
import layout from "../../shared/SharedLayout.module.css";
import styles from "./AdminManagementPage.module.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import AdminManagementStats from "../../components/superAdmin/AdminManagement/AdminManagementstats";
import AdminManagementFilters from "../../components/superAdmin/AdminManagement/AdminManagementFilters";
import AdminManagementTable from "../../components/superAdmin/AdminManagement/AdminManagementTable";
import AddAdminModal from "../../components/superAdmin/AddAdminModal/AddAdminModal";
import { UserPlus } from "lucide-react";
import { fetchAdminAccounts } from "../../api/admin";

const AdminManagementPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Lifted API State
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // 2. Lifted Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Centralized Database Fetch
  const loadAdmins = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const data = await fetchAdminAccounts(token);
      setAdmins(data.admins || []);
    } catch (err: any) {
      setError(err.message || "Failed to load admin accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  // 4. Computed Search Logic
  const filteredAdmins = admins.filter(admin => 
    (admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     admin.email?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={layout.page}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={layout.main}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className={`${layout.body} ${styles.body}`}>
          
          <div className={styles.header}>
            <div>
              <h1>Admin Management</h1>
              <p>Manage admin users, roles, and permissions</p>
            </div>
            <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
              <UserPlus size={20} />
              Add Admin
            </button>
          </div>
          
          <AddAdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdminCreated={loadAdmins} />
          
          {loading && <div style={{ color: '#00d4d4', padding: '40px', fontWeight: 'bold' }}>Loading Live Administrators...</div>}
          {error && <div style={{ color: '#f43f5e', padding: '40px' }}>{error}</div>}
          
          {/* 5. Blast data downward via Props! */}
          {!loading && !error && (
            <>
              <AdminManagementStats admins={admins} />
              <AdminManagementFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <AdminManagementTable admins={filteredAdmins} />
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminManagementPage;