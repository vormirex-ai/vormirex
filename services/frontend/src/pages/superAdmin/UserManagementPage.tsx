import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import UserStats from "../../components/superAdmin/UserManagement/UserStats";
import UserTable from "../../components/superAdmin/UserManagement/UserTable";
import "./UserManagementPage.css";

const UserManagementPage = () => {
  return (
    <div className="super-admin-page">
      <Sidebar />

      <div className="super-admin-main">
        <Topbar />

        <div className="user-page">
          {/* Header */}
          <div className="user-header">
            <h1>User Management</h1>
            <p>Manage all platform users and their roles</p>
          </div>

          {/* Stats */}
          <UserStats />

          {/* Table */}
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;