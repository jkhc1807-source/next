"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../Button";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Components", href: "/" },
    { name: "Advanced Table", href: "/advanced-table" },
    { name: "Documentation", href: "#" },
    { name: "GitHub", href: "#" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "#") return false;
    return pathname === href;
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`gm-container ${styles.navbarInner}`}>
        <Link href="/" className={styles.navbarLogo}>
          <div className={styles.logoIcon}><div className={styles.logoDot} /></div>
          <span>Gemini UI</span>
        </Link>

        <nav className={styles.navbarNav}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`${styles.navbarLink} ${isLinkActive(link.href) ? styles.active : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="primary" size="sm">Get Started</Button>
        </nav>

        <button className={styles.navbarMobileToggle} onClick={() => setIsOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
        </button>
      </div>

      {isOpen && (
        <div className={`${styles.navbarMobileOverlay} gm-animate`}>
          <div className={styles.navbarMobileHeader}>
            <span className={styles.navbarLogo}><span>Gemini UI</span></span>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Close menu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className={styles.navbarMobileNav}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                style={{ 
                  color: isLinkActive(link.href) ? 'black' : 'var(--gm-gray-400)',
                  fontWeight: isLinkActive(link.href) ? 900 : 700
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: 'auto', padding: '40px 0' }}>
            <Button variant="primary" size="lg" style={{ width: '100%' }}>Get Started Free</Button>
          </div>
        </div>
      )}
    </header>
  );
};
