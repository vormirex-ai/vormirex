import React, { useState } from "react";
import "./AddAdminModal.css"
import { X, UserPlus } from "lucide-react";
import { createAdminAccount } from "../../../api/admin";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminCreated: () => void;
}

const AddAdminModal = ({ isOpen, onClose, onAdminCreated }: AddAdminModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "admin",
    password: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validations
    if (!formData.name || !formData.email || !formData.password) {
      return setError("Please fill in all required fields.");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    // 2. Submission
    try {
      setLoading(true);
      setError("");
      
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication missing");

      await createAdminAccount({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        password: formData.password
      }, token);

      // 3. Success cleanup
      onAdminCreated();
      onClose();
      
      // Reset form
      setFormData({
        name: "", email: "", phoneNumber: "", role: "admin", password: "", confirmPassword: ""
      });

    } catch (err: any) {
      setError(err.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

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
        <form className="modal-form" onSubmit={handleSubmit}>
          
          {error && <div style={{ color: "#ef4444", padding: "10px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px", marginBottom: "15px", fontSize: "14px" }}>{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@vormirex.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+91 XXXXXXXXXX" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions" style={{ marginTop: "20px" }}>
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="primary-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddAdminModal;