import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Card = ({ title, description, children, footer, className = "" }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {(title || description) && (
        <div className={styles.cardHeader}>
          {title && <h3 className={styles.cardTitle}>{title}</h3>}
          {description && <p className={styles.cardDesc}>{description}</p>}
        </div>
      )}
      <div className={styles.cardBody}>{children}</div>
      {footer && (
        <div className={styles.cardFooter}>
          {footer}
        </div>
      )}
    </div>
  );
};
