import "./Topbar.css";

const Topbar = () => {
  return (
    <header className="super-admin-topbar">
      <div className="super-admin-topbar-spacer" />
      
      <div className="super-admin-profile">
        <div className="super-admin-avatar">SA</div>
        <span className="super-admin-profile-name">Super Admin</span>
      </div>
    </header>
  );
};

export default Topbar;