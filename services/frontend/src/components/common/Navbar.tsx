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

  // Effect to disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
    navigate('/auth/login');
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
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      )}

      <header className={`nav-wrapper ${isOpen ? 'menu-open' : ''}`}>
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
                    <span>{user?.name || 'User'}</span>
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
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <ChevronDown
                      size={14}
                      className={`chevron ${showProfileMenu ? 'open' : ''}`}
                    />
                  </div>

                  {showProfileMenu && (
                    <div className="profile-dropdown-menu">
                      <div className="dropdown-header">
                        <span className="user-name">
                          {user?.name || 'User'}
                        </span>
                        <span className="user-email">
                          {user?.email || 'No email provided'}
                        </span>
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
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          z-index: 999;
          display: none;
        }
        
        .nav-wrapper {
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(10, 11, 20, 0.95);
          backdrop-filter: blur(12px);
          padding: 12px 0;
        }
        
        .nav-wrapper.menu-open {
          background: rgba(10, 11, 20, 1);
        }
        
        .navbar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          cursor: pointer;
        }
        
        .logo-image {
          width: 32px;
          height: 32px;
        }
        
        .logo-text {
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
        }
        
        /* Desktop Navigation */
        .nav-links {
          display: flex;
          list-style: none;
          gap: 30px;
        }
        
        .nav-links a {
          color: #cbd5f5;
          text-decoration: none;
          font-size: 14px;
        }
        
        /* Desktop Buttons Group */
        .nav-right-group {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .nav-buttons {
          display: flex;
          gap: 15px;
        }
        
        .btn-signin {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-weight: 600;
          white-space: nowrap; /* Prevents text from wrapping */
          display: inline-block; /* Ensures proper layout */
        }
        
        .btn-start {
          background: #6aece1;
          color: #0a0b14;
          padding: 8px 18px;
          border-radius: 20px;
          border: none;
          font-weight: 700;
          cursor: pointer;
        }
        
        /* Mobile Setup */
        .hamburger {
          display: none;
        }
        
        .mobile-buttons {
          display: none;
        }
        
        @media (max-width: 960px) {
          /* Show overlay on mobile when menu is open */
          .mobile-menu-overlay {
            display: block;
          }
          
          /* 1. HIDE THE DESKTOP BUTTONS COMPLETELY */
          .nav-buttons {
            display: none !important;
          }
        
          /* 2. SHOW HAMBURGER */
          .hamburger {
            display: block;
            padding: 8px;
            margin-right: -8px; /* Compensate for padding to keep alignment */
          }
        
          /* 3. MOBILE MENU DROPDOWN */
          .nav-links {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            flex-direction: column;
            background: #0f1123;
            padding: 80px 20px 20px;
            gap: 24px; /* Consistent spacing between items */
            z-index: 1001;
            overflow-y: auto;
            align-items: flex-start;
          }
        
          .nav-links.active {
            display: flex;
          }
        
          /* 4. SHOW BUTTONS INSIDE THE DROPDOWN INSTEAD */
          .mobile-buttons {
            display: flex;
            flex-direction: column;
            gap: 16px; /* Consistent spacing */
            width: 100%;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          /* Mobile menu items styling */
          .nav-links li {
            width: 100%;
          }
          
          .nav-links a {
            display: block;
            padding: 12px 0;
            font-size: 16px;
            color: #e2e8f0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          /* Close button positioning */
          .nav-wrapper.menu-open .hamburger {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1002;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 10px;
          }
        }
        
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
        .mobile-profile-section { padding: 10px 0; display: flex; flex-direction: column; gap: 15px; align-items: flex-start; }
        .mobile-user-info { display: flex; align-items: center; gap: 10px; color: #00d4d4; font-weight: 600; }
        .btn-logout-mobile { display: flex; align-items: center; gap: 8px; background: #1f222a; color: #ff4d4d; border: 1px solid #ff4d4d; padding: 12px 16px; border-radius: 8px; font-size: 14px; cursor: pointer; width: 100%; justify-content: center; }
       
        .btn-back-dashboard, .btn-back-dashboard-mobile {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          justify-content: center;
        }
        .btn-back-dashboard:hover, .btn-back-dashboard-mobile:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        @media (max-width: 480px) {
          .nav-links {
            padding: 80px 16px 20px;
          }
          
          .hamburger {
            padding: 12px;
            margin-right: -12px;
          }
          
          .nav-wrapper.menu-open .hamburger {
            top: 16px;
            right: 16px;
            padding: 12px;
          }
        }
       
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
};

export default Navbar;
