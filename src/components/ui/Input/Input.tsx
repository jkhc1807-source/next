import React, { useState } from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onClear?: () => void;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Input = ({ label, error, onClear, rightIcon, className = "", size = "md", value, onChange, type, defaultValue, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;
  const isDisabled = props.disabled;
  const isPassword = type === "password";
  const hasValue = currentValue !== undefined && currentValue !== null && String(currentValue).length > 0;
  
  // onClear가 있거나 onChange가 있거나, 비제어 상태일 때도 지우기 버튼 노출 가능 [확실]
  // DatePicker처럼 readOnly이면서 onClear를 사용하는 경우를 위해 조건 수정
  const canClear = (!props.readOnly || onClear) && !isDisabled;
  const showClear = hasValue && canClear;
  
  const hasToggle = isPassword && !isDisabled;
  const hasRightIcon = !!rightIcon && !isPassword;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isControlled) {
      setInternalValue("");
    }
    
    if (onClear) {
      onClear();
    }
    
    if (onChange) {
      const event = { 
        target: { ...props, value: "" },
        currentTarget: { ...props, value: "" }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`${styles.inputGroup} ${sizeClass} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputMain}>
        <div className={styles.inputWrapper}>
          <input
            {...props}
            type={inputType}
            value={isControlled ? value : internalValue}
            onChange={handleInputChange}
            className={`${styles.input} ${error ? styles.error : ""}`}
          />
          <div className={styles.inputActions}>
            {showClear && (
              <button type="button" onClick={handleClear} className={styles.inputActionBtn} aria-label="Clear input">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            {hasToggle && (
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.inputActionBtn}>
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            )}
            {hasRightIcon && <div className={styles.rightIconWrapper}>{rightIcon}</div>}
          </div>
        </div>
        <div className={styles.errorArea}>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      </div>
    </div>
  );
};
