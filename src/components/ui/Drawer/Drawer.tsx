"use client";
import React, { useEffect } from "react";
import styles from "./Drawer.module.css";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
  footer?: React.ReactNode;
}

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  size = "md",
  footer,
}: DrawerProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.drawerRoot}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.drawer} ${styles[position]} ${styles[size]} gm-animate`}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            {title && <h3 className={styles.title}>{title}</h3>}
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close drawer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};
