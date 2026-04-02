import { useState } from "react";
import layout from "../../shared/SharedLayout.module.css";
import styles from "./UserManagementPage.module.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import UserStats from "../../components/superAdmin/UserManagement/UserStats";
import UserTable from "../../components/superAdmin/UserManagement/UserTable";

const UserManagementPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <UserStats />
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;