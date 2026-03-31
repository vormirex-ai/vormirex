import "./AddAdminModal.css"
import { X, UserPlus, ShieldCheck } from "lucide-react";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PermissionItem = {
  label: string;
};

type PermissionSection = {
  title: string;
  items: PermissionItem[];
};

const permissionsData: PermissionSection[] = [
  {
    title: "CORE",
    items: [
      { label: "Projects Management" },
      { label: "Leads Management" },
      { label: "Inspection Requests" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Services Management" },
      { label: "Content Management" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { label: "Invoice Access" },
      { label: "Analytics Access" },
    ],
  },
];

const AddAdminModal = ({ isOpen, onClose }: AddAdminModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <UserPlus size={15} />
            <span className="add-admin">Add New Admin</span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <div className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input placeholder="Enter full name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input placeholder="email@vormirex.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input placeholder="+91 XXXXXXXXXX" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select>
                <option>Editor</option>
                <option>Admin</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
          </div>

          {/* Permissions */}
          <div className="permissions-box">
            <div className="permissions-header">
              <div className="permissions-title">
                <ShieldCheck size={14} />
                Permissions
              </div>
              <button type="button" className="select-all">
                Select All
              </button>
            </div>

            <div className="permissions-card">
              {permissionsData.map((section) => (
                <div key={section.title} className="perm-section">
                  <p className="perm-group-title">{section.title}</p>
                  <div className="permissions-grid">
                    {section.items.map((item) => (
                      <label key={item.label} className="custom-check">
                        <input type="checkbox" />
                        <span className="checkmark" />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-btn">Create Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;