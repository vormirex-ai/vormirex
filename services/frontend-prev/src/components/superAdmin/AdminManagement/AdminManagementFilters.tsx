import "./AdminManagement.css";
import { ChevronDown, Search } from "lucide-react";

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const AdminManagementFilters = ({ searchQuery, setSearchQuery }: FilterProps) => {
  return (
    <section className="admin-management-filters">
      <div className="admin-search-box">
        <Search size={16} />
        <input 
          type="text" 
          placeholder="Search by name, email..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button type="button" className="admin-filter-btn" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
        <span>All Roles</span>
        <ChevronDown size={16} />
      </button>

      <button type="button" className="admin-filter-btn" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
        <span>All Status</span>
        <ChevronDown size={16} />
      </button>
    </section>
  );
};

export default AdminManagementFilters;