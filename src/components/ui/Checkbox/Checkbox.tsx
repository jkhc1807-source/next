"use client";
import React, { type InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export const Checkbox = ({ label, size = "md", className = "", disabled, ...props }: CheckboxProps) => {
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;
  
  return (
    <label className={`${styles.checkboxGroup} ${sizeClass} ${disabled ? styles.disabled : ""} ${className}`}>
      <div className={styles.checkboxInner}>
        <input type="checkbox" style={{ display: 'none' }} disabled={disabled} {...props} />
        <div className={styles.checkboxBox} />
        <svg className={styles.checkboxCheck} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
