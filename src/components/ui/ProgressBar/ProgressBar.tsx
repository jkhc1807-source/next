"use client";

import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  label?: string;
  variant?: "default" | "info" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  isAnimated?: boolean;
  className?: string;
}

export const ProgressBar = ({
  value,
  label,
  variant = "default",
  size = "md",
  showValue = true,
  isAnimated = false,
  className = "",
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max(0, value), 100);

  return (
    <div className={`${styles.progressContainer} ${styles[size]} ${className}`}>
      {(label || showValue) && (
        <div className={styles.labelWrapper}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && (
            <div className={styles.valueBadge}>
              <span className={styles.percentage}>{Math.round(percentage)}%</span>
            </div>
          )}
        </div>
      )}
      <div className={`${styles.track} ${styles[variant]} ${isAnimated ? styles.animated : ""}`}>
        <div 
          className={styles.bar} 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className={styles.barGlow} />
        </div>
      </div>
    </div>
  );
};
