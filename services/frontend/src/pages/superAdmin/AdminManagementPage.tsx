import Sidebar from '../../components/superAdmin/Sidebar/Sidebar';
import Topbar from '../../components/superAdmin/Topbar/Topbar';
import AdminManagementStats from '../../components/superAdmin/AdminManagement/AdminManagementstats';
import AdminManagementFilters from '../../components/superAdmin/AdminManagement/AdminManagementFilters';
import AdminManagementTable from '../../components/superAdmin/AdminManagement/AdminManagementTable';
import './AdminManagementPage.css';
import { UserPlus } from 'lucide-react';
import { useState } from "react";
import AddAdminModal from "../../components/superAdmin/AddAdminModal/AddAdminModal";

const AdminManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="super-admin-page">
      <Sidebar />
      <div className="super-admin-main">
        <Topbar />
        <div className="admin-management-page">
          <div className="admin-management-header">
            <div>
              <h1>Admin Management</h1>
              <p>Manage admin users, roles, and permissions</p>
            </div>

            <button className="add-admin-btn"
              onClick={() => 
              setIsModalOpen(true)}>
              <UserPlus size={20} />
              Add Admin</button>
          </div>

          <AddAdminModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          <AdminManagementStats />
          <AdminManagementFilters />
          <AdminManagementTable />
        </div>
      </div>
    </div>
  );
};

export default AdminManagementPage;