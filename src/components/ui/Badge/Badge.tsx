import React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "info" | "success" | "error" | "warning" | "neutral" | "outline-info" | "outline-success" | "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

export const Badge = ({ children, variant = "info", size = "md", className = "", style }: BadgeProps) => {
  const variantMap = {
    info: styles.badgeInfo,
    primary: styles.badgeInfo,
    success: styles.badgeSuccess,
    error: styles.badgeError,
    warning: styles.badgeWarning,
    neutral: styles.badgeNeutral,
    "outline-info": styles.badgeOutlineInfo,
    outline: styles.badgeOutlineInfo,
    "outline-success": styles.badgeOutlineSuccess,
  };

  const variantClass = variantMap[variant] || styles.badgeInfo;

  const sizeClass = 
    size === "sm" ? styles.badgeSm : 
    size === "md" ? styles.badgeMd : 
    styles.badgeLg;

  return (
    <span className={`${styles.badge} ${variantClass} ${sizeClass} ${className}`} style={style}>
      {children}
    </span>
  );
};
