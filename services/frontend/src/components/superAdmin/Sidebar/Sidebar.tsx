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

import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/super-admin" },
  { label: "Admin Management", icon: UserCog, path: "/super-admin/admin-management" },
  { label: "Permissions Control", icon: ShieldCheck, path: "/super-admin/permission-control" },
  { label: "User Management", icon: Users, path: "/super-admin/user-management" },
  { label: "AI Engine Control", icon: Bot, path: "/super-admin/ai-engine-control" },
  { label: "Subscriptions", icon: BadgeDollarSign, path: "/super-admin/subscriptions" },
  { label: "Payments", icon: CreditCard, path: "/super-admin/payments" },
  { label: "Reports", icon: FileText, path: "/super-admin/reports" },
  { label: "Security & Logs", icon: ShieldAlert, path: "/super-admin/security-logs" },
  { label: "Platform Settings", icon: Settings, path: "/super-admin/platform-settings" },
  { label: "Course Requests", icon: BookOpen, path: "/super-admin/course-requests" },
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
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `super-admin-sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={16} strokeWidth={1.8} className="sidebar-icon" />
                <span>{item.label}</span>
              </NavLink>
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