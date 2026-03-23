import "./Sidebar.css";
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  UserCog,
  Bot,
  BadgeDollarSign,
  CreditCard,
  FileText,
  ShieldAlert,
  Settings,
  BookOpen,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Admin Management", icon: UserCog },
  { label: "Permissions Control", icon: ShieldCheck },
  { label: "User Management", icon: Users },
  { label: "AI Engine Control", icon: Bot },
  { label: "Subscriptions", icon: BadgeDollarSign },
  { label: "Payments", icon: CreditCard },
  { label: "Reports", icon: FileText },
  { label: "Security & Logs", icon: ShieldAlert },
  { label: "Platform Settings", icon: Settings },
  { label: "Course Requests", icon: BookOpen },
];

const Sidebar = () => {
  return (
    <aside className="super-admin-sidebar">
      <div>
        <div className="super-admin-sidebar-header">
          <div className="super-admin-sidebar-brand">
            <img
              src="/logo.png"
              alt="Vormirex logo"
              className="super-admin-sidebar-logo"
            />
            <span>Vormirex</span>
          </div>
        </div>

        <div className="super-admin-sidebar-divider" />

        <nav className="super-admin-sidebar-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`super-admin-sidebar-item ${
                  index === 0 ? "active" : ""
                }`}
                type="button"
              >
                <Icon size={16} strokeWidth={1.8} className="sidebar-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="super-admin-sidebar-footer">
        <div className="super-admin-sidebar-divider" />
        <button className="super-admin-logout-btn" type="button">
          <LogOut size={16} strokeWidth={1.8} className="sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;