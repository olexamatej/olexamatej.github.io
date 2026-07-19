import React, { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Menu,
  Twitter,
  X,
} from 'lucide-react';

const navigation = [
  { label: 'Overview', href: '/#overview' },
  { label: 'Projects', href: '/index-projects.html' },
  { label: 'Writing', href: '/writeups.html' },
];

const contactLinks = [
  {
    label: 'GitHub',
    detail: '@olexamatej',
    href: 'https://github.com/olexamatej',
    icon: Github,
  },
  {
    label: 'Twitter',
    detail: '@metjuas',
    href: 'https://x.com/metjuas',
    icon: Twitter,
  },
  {
    label: 'LinkedIn',
    detail: 'matej-olexa',
    href: 'https://www.linkedin.com/in/matej-olexa',
    icon: Linkedin,
  },
  {
    label: 'Email',
    detail: 'olexa.matej@gmail.com',
    href: 'mailto:olexa.matej@gmail.com',
    icon: Mail,
  },
];

export function SiteHeader({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactMenuId = useId();
  const contactMenuRef = useRef(null);

  useEffect(() => {
    if (!contactOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!contactMenuRef.current?.contains(event.target)) {
        setContactOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setContactOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [contactOpen]);

  return (
    <header className="site-header">
      <nav className="page-shell nav-bar" aria-label="Primary navigation">
        <a href="/" className="brand" aria-label="Matej Olexa — home">
          <span className="brand-copy">
            <strong>Matej Olexa</strong>
            <small>Student researcher</small>
          </span>
        </a>

        <div className="nav-links">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={active === item.label.toLowerCase() ? 'active' : ''}
              aria-current={active === item.label.toLowerCase() ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="contact-popover-wrap" ref={contactMenuRef}>
          <button
            className="nav-contact"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={contactOpen}
            aria-controls={contactMenuId}
            onClick={() => setContactOpen((open) => !open)}
          >
            Contact me <ChevronDown className={contactOpen ? 'rotated' : ''} size={15} />
          </button>

          {contactOpen && (
            <div className="contact-popover" id={contactMenuId} role="dialog" aria-label="Contact links">
              <div className="contact-popover-heading">
                <span>Contact</span>
                <button type="button" aria-label="Close contact menu" onClick={() => setContactOpen(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className="contact-popover-links">
                {contactLinks.map(({ label, detail, href, icon: Icon }) => {
                  const external = href.startsWith('http');

                  return (
                    <a
                      key={label}
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      onClick={() => setContactOpen(false)}
                    >
                      <Icon size={17} />
                      <span>
                        <strong>{label}</strong>
                        <small>{detail}</small>
                      </span>
                      <ArrowUpRight size={14} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((open) => !open);
            setContactOpen(false);
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu page-shell">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label} <ArrowUpRight size={16} />
            </a>
          ))}
          <span className="mobile-menu-label">Contact</span>
          {contactLinks.map(({ label, href, icon: Icon }) => {
            const external = href.startsWith('http');

            return (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label} <Icon size={16} />
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="page-shell footer">
      <div className="brand footer-brand">
        <span className="brand-copy">
          <strong>Matej Olexa</strong>
          <small>Student researcher</small>
        </span>
      </div>

      <p>© {new Date().getFullYear()} Matej Olexa.</p>

      <div className="footer-links">
        {contactLinks.map(({ label, href, icon: Icon }) => {
          const external = href.startsWith('http');

          return (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, description, count, action }) {
  return (
    <header className="page-intro">
      <div className="page-intro-kicker">
        <span>{eyebrow}</span>
        {count && <small>{count}</small>}
      </div>
      <div className="page-intro-copy">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div className="page-intro-action">{action}</div>}
    </header>
  );
}
