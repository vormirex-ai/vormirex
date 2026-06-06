import "./Topbar.css";
import { Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}


const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <header className="super-admin-topbar">
      {/*Hamburger - only for mobile */}

      <button className="super-admin-hamburger"
        onClick={onMenuClick}
        type="button"
        aria-label="Open menu">
        <Menu size={20} strokeWidth={1.8} />

      </button>

      <div className="super-admin-topbar-spacer" />

      <div className="super-admin-profile">
        <div className="super-admin-avatar">SA</div>
        <span className="super-admin-profile-name">Super Admin</span>
      </div>

    </header>
  );
};
export default Topbar;