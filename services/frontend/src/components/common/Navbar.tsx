import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ComingSoonModal from './ComingSoonModal'; // Your modal
import logo from '../../assets/logo.png';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC<{ brandName?: string }> = ({
  brandName = 'VORMIREX',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleSignIn = () => {
    navigate('/auth');
    closeMenu();
  };

  const handleStartFree = () => {
    navigate('/auth/signup');
    closeMenu();
  };

  return (
    <>
      <header className="nav-wrapper">
        <nav className="navbar">
          <div className="logo">
            <div className="logo-glow-container">
              <img src={logo} alt="Vormirex Logo" className="logo-image" />
              <div className="logo-blur-bg"></div>
            </div>
            <span className="logo-text">{brandName}</span>
          </div>

          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            {[
              { label: 'Features', href: '/features' },
              { label: 'Courses', href: '/courses' },
              { label: 'Pricing', href: '/pricings' },
              { label: 'About', href: '/about' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mobile-buttons">
              <button className="btn-signin" onClick={handleSignIn}>
                Sign In
              </button>
              <button className="btn-start" onClick={handleStartFree}>
                Start Free
              </button>
            </li>
          </ul>

          <div className="nav-right-group">
            <div className="nav-buttons">
              <button className="btn-signin" onClick={handleSignIn}>
                Sign In
              </button>
              <button className="btn-start" onClick={handleStartFree}>
                Start Free
              </button>
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
    </>
  );
};

export default Navbar;
