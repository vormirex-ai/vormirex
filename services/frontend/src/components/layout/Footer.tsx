import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ComingSoonModal from '../common/ComingSoonModal';
import logo from '../../assets/logo.png';

interface FooterLink {
  label: string;
  href: string;
  isComingSoon?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface Props {
  companyName?: string;
  description?: string;
  sections?: FooterSection[];
  copyright?: string;
}

const Footer = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    companyName = 'VORMIREX',
    description = 'Making learning feel like playing. Your AI-powered education companion.',
    sections = [
      {
        title: 'Company',
        links: [
          { label: 'Features', href: '/landing#features' },
          { label: 'Courses', href: '/courses' },
          { label: 'Pricing', href: '/pricings' },
          { label: 'About Us', href: '/about' },
        ],
      },
      {
        title: 'Get in touch',
        links: [
          { label: '+91 8123831056', href: 'tel:+918123831056' },
          { label: 'info@vormirex.com', href: 'mailto:info@vormirex.com' },
        ],
      },
    ],
    copyright = '© 2025 Vormirex. All rights reserved.',
  } = props;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-main">
          {/* BRAND SECTION */}
          <div className="brand-section">
            <div className="logo-wrapper">
              <div className="glow-effect"></div>
              <img src={logo} alt="Logo" className="brand-logo" />
              <span className="brand-name">{companyName}</span>
            </div>

            <p className="brand-description">{description}</p>

            <div className="social-links">
              <a
                href="https://www.facebook.com/profile.php?id=61584727210742"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.linkedin.com/company/vormirex/"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>

          {/* LINKS GRID */}
          <div className="links-grid">
            {sections.map((section, idx) => (
              <div key={idx} className="link-column">
                <h4 className="column-title">{section.title}</h4>
                <ul className="column-list">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      {link.href.startsWith('http') ||
                      link.href.startsWith('mailto') ||
                      link.href.startsWith('tel') ? (
                        <a href={link.href} className="footer-link">
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className={`footer-link ${
                            link.isComingSoon ? 'coming-soon-disabled' : ''
                          }`}
                          onClick={(e) => {
                            if (link.isComingSoon) {
                              e.preventDefault();
                              setIsModalOpen(true);
                            }
                          }}
                        >
                          {link.label}
                          {link.isComingSoon && (
                            <span className="soon-badge">Soon</span>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="footer-bottom">
          <div className="divider"></div>
          <p className="copyright-text">{copyright}</p>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <style>{`
        .footer-container {
          background-color: #050a14;
          color: #94a3b8;
          padding: 80px 20px 40px;
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-content {
          max-width: 1200px;
          margin: auto;
        }

        .footer-main {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 60px;
          align-items: flex-start;
        }

        .brand-section {
          width: 100%;
          max-width: 380px;
          flex-shrink: 0;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          position: relative;
        }

        .glow-effect {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(0,255,200,0.1), transparent 70%);
          top: -40px;
          left: -40px;
          pointer-events: none;
        }

        .brand-logo {
          width: 44px;
          height: 44px;
          object-fit: contain;
          z-index: 1;
        }

        .brand-name {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 1px;
          z-index: 1;
        }

        .brand-description {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(30,41,59,0.5);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          color: #94a3b8;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: #00ffc822;
          color: #00ffc8;
          border-color: #00ffc8;
          transform: translateY(-3px);
        }

        .links-grid {
          display: flex;
          gap: 60px;
        }

        .link-column {
          min-width: 160px; 
        }

        .column-title {
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .column-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .column-list li {
          margin-bottom: 14px;
        }

        .footer-link {
          color: #64748b;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-link:hover {
          color: #00ffc8;
          padding-left: 5px;
        }

        .soon-badge {
          font-size: 10px;
          background: #1e293b;
          color: #00ffc8;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(30,41,59,0.8), transparent);
          margin-bottom: 30px;
        }

        .copyright-text {
          font-size: 13px;
          color: #475569;
          text-align: center;
        }

        @media (max-width: 768px) {
          .links-grid {
            flex-direction: column;
            gap: 40px;
          }
          .footer-main {
            flex-direction: column;
          }
          .brand-section {
            max-width: 100%;
            text-align: center;
          }
          .logo-wrapper, .social-links {
            justify-content: center;
          }
          .footer-link:hover {
            padding-left: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
