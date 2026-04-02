import { useState } from "react";
import layout from "../../shared/SharedLayout.module.css";
import styles from "./AdminManagementPage.module.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import AdminManagementStats from "../../components/superAdmin/AdminManagement/AdminManagementstats";
import AdminManagementFilters from "../../components/superAdmin/AdminManagement/AdminManagementFilters";
import AdminManagementTable from "../../components/superAdmin/AdminManagement/AdminManagementTable";
import AddAdminModal from "../../components/superAdmin/AddAdminModal/AddAdminModal";
import { UserPlus } from "lucide-react";

const AdminManagementPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <AddAdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <AdminManagementStats />
          <AdminManagementFilters />
          <AdminManagementTable />
        </div>
      </div>
    </div>
  );
};

export default AdminManagementPage;