import React from "react";
import styles from "./Radio.module.css";

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> { 
  label: string; 
  size?: "sm" | "md" | "lg";
}

export const Radio = ({ label, size = "md", className = "", ...props }: RadioProps) => {
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;

  return (
    <label className={`${styles.radioGroup} ${sizeClass} ${props.disabled ? styles.disabled : ""} ${className}`}>
      <div className={styles.radioInner}>
        <input type="radio" className={styles.radioInput} {...props} />
        <div className={styles.radioCircle} />
        <div className={styles.radioDot} />
      </div>
      <span className={styles.radioLabel}>{label}</span>
    </label>
  );
};
