import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';
import ComingSoonModal from './ComingSoonModal';
import logo from '../../assets/logo.png';
import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
}

const Navbar: React.FC<{ brandName?: string }> = ({
  brandName = 'VORMIREX',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage & handle outside click
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Navbar: Failed to parse user data', e);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      if (location.pathname !== '/landing') {
        navigate('/landing');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    closeMenu();
  };

  const handleSignIn = () => {
    navigate('/auth/login'); // FIXED: Now goes to /auth/login instead of /auth
    closeMenu();
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileMenu(false);
    navigate('/');
    closeMenu();
  };

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Courses', href: '/courses' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      <header className="nav-wrapper">
        <nav className="navbar">
          <div className="logo" onClick={() => navigate('/landing')}>
            <div className="logo-glow-container">
              <img src={logo} alt="Vormirex Logo" className="logo-image" />
              <div className="logo-blur-bg"></div>
            </div>
            <span className="logo-text">{brandName}</span>
          </div>

          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}

            {/* Mobile Auth Buttons / Profile */}
            <li className="mobile-buttons">
              {user ? (
                <div className="mobile-profile-section">
                  <div className="mobile-user-info">
                    <User size={18} />
                    <span>{user.name}</span>
                  </div>
                  <button className="btn-logout-mobile" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <>
                  <button className="btn-signin" onClick={handleSignIn}>
                    Sign In
                  </button>
                  <button
                    className="btn-back-dashboard-mobile"
                    onClick={handleBackToDashboard}
                  >
                    <LayoutDashboard size={16} />
                    Back to Dashboard
                  </button>
                </>
              )}
            </li>
          </ul>

          <div className="nav-right-group">
            <div className="nav-buttons">
              {user ? (
                <div className="profile-dropdown-container" ref={dropdownRef}>
                  <div className="profile-trigger" onClick={toggleProfileMenu}>
                    <div className="profile-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown
                      size={14}
                      className={`chevron ${showProfileMenu ? 'open' : ''}`}
                    />
                  </div>

                  {showProfileMenu && (
                    <div className="profile-dropdown-menu">
                      <div className="dropdown-header">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="btn-signin" onClick={handleSignIn}>
                    Sign In
                  </button>
                  <button
                    className="btn-back-dashboard"
                    onClick={handleBackToDashboard}
                  >
                    <LayoutDashboard size={16} />
                    Back to Dashboard
                  </button>
                </>
              )}
            </div>

            <div className="hamburger" onClick={toggleMenu}>
              {isOpen ? (
                <X size={24} color="white" />
              ) : (
                <Menu size={24} color="white" />
              )}
            </div>
          </div>
        </nav>
      </header>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <style>{`
        .profile-dropdown-container { position: relative; }
        .profile-trigger { display: flex; align-items: center; gap: 8px; cursor: pointer; color: white; padding: 4px; border-radius: 8px; transition: background 0.2s; }
        .profile-trigger:hover { background: rgba(255, 255, 255, 0.1); }
        .profile-avatar { width: 32px; height: 32px; background: linear-gradient(135deg, #00d4d4, #007777); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 14px; }
        .chevron { transition: transform 0.2s; }
        .chevron.open { transform: rotate(180deg); }
        .profile-dropdown-menu { position: absolute; top: 45px; right: 0; background: #1a1d24; border: 1px solid #2a2d35; border-radius: 12px; width: 200px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); overflow: hidden; z-index: 1000; animation: fadeIn 0.15s ease-out; }
        .dropdown-header { padding: 16px; display: flex; flex-direction: column; gap: 4px; }
        .user-name { font-weight: 600; color: white; font-size: 14px; }
        .user-email { color: #9ca3af; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dropdown-divider { height: 1px; background: #2a2d35; width: 100%; }
        .dropdown-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 16px; background: none; border: none; color: #ff4d4d; font-size: 14px; cursor: pointer; transition: background 0.2s; text-align: left; }
        .dropdown-item:hover { background: rgba(255, 77, 77, 0.1); }
        .mobile-profile-section { padding: 10px 0; display: flex; flex-direction: column; gap: 15px; align-items: center; }
        .mobile-user-info { display: flex; align-items: center; gap: 10px; color: #00d4d4; font-weight: 600; }
        .btn-logout-mobile { display: flex; align-items: center; gap: 8px; background: #1f222a; color: #ff4d4d; border: 1px solid #ff4d4d; padding: 8px 16px; border-radius: 8px; font-size: 14px; cursor: pointer; }
        
        .btn-back-dashboard, .btn-back-dashboard-mobile { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          background: rgba(255, 255, 255, 0.05); 
          border: 1px solid rgba(255, 255, 255, 0.2); 
          color: #ffffff; 
          padding: 10px 16px; 
          border-radius: 8px; 
          font-size: 14px; 
          cursor: pointer; 
          transition: all 0.2s ease;
        }
        .btn-back-dashboard:hover, .btn-back-dashboard-mobile:hover { 
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
};

export default Navbar;
