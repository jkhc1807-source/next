import React from "react";
import { Button } from "../Button";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState = ({ title, description, actionLabel, onAction, className = "" }: EmptyStateProps) => {
  return (
    <div className={`${styles.emptyState} gm-animate ${className}`}>
      <div className={styles.emptyStateIcon}>
        <div className={styles.iconBg} />
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.iconSvg}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateDesc}>{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction} className={styles.actionBtn}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
