import { useState } from "react";
import layout from "../../shared/SharedLayout.module.css";
import styles from "./PermissionControl.module.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import PermissionTable from "../../components/superAdmin/PermissionControl/PermissionTable";
import { Copy } from "lucide-react";

const PermissionsControlPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={layout.page}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={layout.main}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className={`${layout.body} ${styles.body}`}>
          <div className={styles.header}>
            <div>
              <h1>Permissions Control</h1>
              <p>Manage role-based permissions for admin roles</p>
            </div>
            <select className={styles.roleSelect}>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Editor</option>
            </select>
          </div>
          <PermissionTable />
          <div className={styles.actions}>
            <button className={styles.saveBtn}>Save Changes</button>
            <button className={styles.cloneBtn}>
              <Copy size={16} />
              Clone Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsControlPage;