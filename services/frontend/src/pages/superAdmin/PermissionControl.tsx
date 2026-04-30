import { useState, useEffect } from "react";
import layout from "../../shared/SharedLayout.module.css";
import styles from "./PermissionControl.module.css";
import Sidebar from "../../components/superAdmin/Sidebar/Sidebar";
import Topbar from "../../components/superAdmin/Topbar/Topbar";
import PermissionTable, { ModulePermission, PermissionKey } from "../../components/superAdmin/PermissionControl/PermissionTable";
import { Copy } from "lucide-react";
import { fetchRoleConfig, updateRoleConfig } from "../../api/admin";

const permissionKeys: PermissionKey[] = ["view", "create", "edit", "delete"];

const PermissionsControlPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleName, setRoleName] = useState("Super Admin");
  const [matrix, setMatrix] = useState<ModulePermission[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const isSuperAdmin = roleName === "Super Admin";

  useEffect(() => {
    const loadMatrix = async () => {
      setLoading(true);
      setError("");
      setSuccessMsg("");
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const data = await fetchRoleConfig(roleName, token);
        setMatrix(data.matrix || []);
      } catch (err: any) {
        setError(err.message || "Failed to load permissions.");
      } finally {
        setLoading(false);
      }
    };
    loadMatrix();
  }, [roleName]);

  const handleToggle = (index: number, key: PermissionKey) => {
    if (isSuperAdmin) return;
    const updated = [...matrix];
    updated[index].permissions[key] = !updated[index].permissions[key];
    setMatrix(updated);
    setSuccessMsg("");
  };

  const handleToggleAll = (index: number) => {
    if (isSuperAdmin) return;
    const updated = [...matrix];
    const allEnabled = permissionKeys.every((key) => updated[index].permissions[key]);
    permissionKeys.forEach((key) => {
      updated[index].permissions[key] = !allEnabled;
    });
    setMatrix(updated);
    setSuccessMsg("");
  };

  const handleSave = async () => {
    if (isSuperAdmin) return;
    setSaving(true);
    setError("");
    setSuccessMsg("");
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      await updateRoleConfig({ roleName, matrix }, token);
      setSuccessMsg("Permissions saved successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to save permissions.");
    } finally {
      setSaving(false);
    }
  };

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
            <select 
              className={styles.roleSelect} 
              value={roleName} 
              onChange={(e) => setRoleName(e.target.value)}
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          {error && <div style={{ color: "#ef4444", padding: "15px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px", marginBottom: "15px" }}>{error}</div>}
          {successMsg && <div style={{ color: "#10b981", padding: "15px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "6px", marginBottom: "15px" }}>{successMsg}</div>}

          {loading ? (
            <div style={{ color: '#00d4d4', padding: '40px', textAlign: 'center' }}>Loading Matrix...</div>
          ) : (
            <PermissionTable 
              data={matrix} 
              disabled={isSuperAdmin}
              onToggle={handleToggle}
              onToggleAll={handleToggleAll}
            />
          )}

          <div className={styles.actions}>
            <button 
              className={styles.saveBtn} 
              onClick={handleSave} 
              disabled={saving || isSuperAdmin || loading}
              style={{ opacity: isSuperAdmin ? 0.4 : (saving ? 0.7 : 1), cursor: isSuperAdmin ? 'not-allowed' : 'pointer' }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button className={styles.cloneBtn} disabled={isSuperAdmin} style={{ opacity: isSuperAdmin ? 0.4 : 1 }}>
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