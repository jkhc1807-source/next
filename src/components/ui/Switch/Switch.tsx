import React from "react";
import styles from "./Switch.module.css";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; }

export const Switch = ({ label, className = "", ...props }: SwitchProps) => {
  return (
    <label className={`${styles.switchGroup} ${props.disabled ? styles.disabled : ""} ${className}`}>
      <div className={styles.switchTrack}>
        <input type="checkbox" className={styles.switchInput} {...props} />
        <div className={styles.switchSlider} />
        <div className={styles.switchKnob} />
      </div>
      {label && <span className={styles.switchLabel}>{label}</span>}
    </label>
  );
};
