"use client";
import React, { type InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = ({ label, className = "", disabled, ...props }: CheckboxProps) => {
  return (
    <label className={`${styles.checkboxGroup} ${disabled ? styles.disabled : ""} ${className}`}>
      <div className={styles.checkboxInner}>
        <input type="checkbox" style={{ display: 'none' }} disabled={disabled} {...props} />
        <div className={styles.checkboxBox} />
        <svg className={styles.checkboxCheck} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
