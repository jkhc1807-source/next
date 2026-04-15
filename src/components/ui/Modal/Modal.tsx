import React, { useEffect } from "react";
import { Button } from "../Button";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal = ({ isOpen, onClose, title, description, children, footer, size = "md" }: ModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClass = styles[size] || styles.md;

  return (
    <div className={styles.modalRoot}>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={`${styles.modalContainer} ${sizeClass} gm-animate`}>
        <button onClick={onClose} className={styles.modalClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        <div className={styles.modalHeader}>
          <div style={{ flex: 1 }}>
            <h3 className={styles.modalTitle}>{title}</h3>
            {description && <p className={styles.modalDesc}>{description}</p>}
          </div>
        </div>
        <div className={styles.modalBody}>{children}</div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  );
};
