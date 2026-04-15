import React from "react";
import styles from "./Radio.module.css";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; }

export const Radio = ({ label, className = "", ...props }: RadioProps) => {
  return (
    <label className={`${styles.radioGroup} ${props.disabled ? styles.disabled : ""} ${className}`}>
      <div className={styles.radioInner}>
        <input type="radio" className={styles.radioInput} {...props} />
        <div className={styles.radioCircle} />
        <div className={styles.radioDot} />
      </div>
      <span className={styles.radioLabel}>{label}</span>
    </label>
  );
};
