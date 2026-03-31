import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import PermissionTable from "../../components/superAdmin/PermissionControl/PermissionTable";
import { Copy } from "lucide-react";
import "./PermissionControl.css";

const PermissionsControlPage = () => {
  return (
    <div className="super-admin-page">
      <Sidebar />

      <div className="super-admin-main">
        <Topbar />

        <div className="permissions-page">
          {/* Header */}
          <div className="permissions-header">
            <div>
              <h1>Permissions Control</h1>
              <p>Manage role-based permissions for admin roles</p>
            </div>

            <select className="role-select">
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Editor</option>
            </select>
          </div>

          {/* Table */}
          <PermissionTable />

          {/* Actions */}
          <div className="permissions-actions">
            <button className="save-btn">Save Changes</button>

            <button className="clone-btn">
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