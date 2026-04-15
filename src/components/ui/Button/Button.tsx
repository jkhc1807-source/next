import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  // Variant class mapping
  const variantClass =
    variant === "primary"
      ? styles.btnPrimary
      : variant === "secondary"
      ? styles.btnSecondary
      : variant === "danger"
      ? styles.btnDanger
      : variant === "success"
      ? styles.btnSuccess
      : variant === "warning"
      ? styles.btnWarning
      : styles.btnOutline;

  // Size class mapping
  const sizeClass =
    size === "sm" ? styles.btnSm : size === "md" ? styles.btnMd : styles.btnLg;

  const gmClassName = `${styles.btn} ${variantClass} ${sizeClass} ${fullWidth ? styles.fullWidth : ""} ${className}`.trim();

  return (
    <button className={gmClassName} disabled={disabled} {...props}>
      {isLoading ? (
        <svg className={styles.spinner} fill="none" viewBox="0 0 24 24">
          <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
          <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        leftIcon && <span className={styles.btnIcon}>{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && <span className={styles.btnIcon}>{rightIcon}</span>}
    </button>
  );
};
