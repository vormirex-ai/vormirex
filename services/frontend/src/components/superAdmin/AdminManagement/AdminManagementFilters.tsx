import "./AdminManagement.css";
import { ChevronDown, Search } from "lucide-react";

const AdminManagementFilters = () => {
  return (
    <section className="admin-management-filters">
      <div className="admin-search-box">
        <Search size={16} />
        <input type="text" placeholder="Search by name, email..." />
      </div>

      <button type="button" className="admin-filter-btn">
        <span>All Roles</span>
        <ChevronDown size={16} />
      </button>

      <button type="button" className="admin-filter-btn">
        <span>All Status</span>
        <ChevronDown size={16} />
      </button>
    </section>
  );
};

export default AdminManagementFilters;