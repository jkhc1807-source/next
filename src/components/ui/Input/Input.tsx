import React, { useState, useEffect } from "react";
import styles from "./Input.module.css";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  onClear?: () => void;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Input = ({ label, error, onClear, rightIcon, className = "", size = "md", value, onChange, type, defaultValue, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  
  // 외부 value와 내부 상태 동기화 (네트워크 지연 및 제어 컴포넌트 대응) [확실]
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value as string);
    }
  }, [value]);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;
  const isDisabled = props.disabled;
  const isPassword = type === "password";
  
  // 값이 있는지 정밀하게 체크
  const hasValue = currentValue !== undefined && currentValue !== null && String(currentValue).length > 0;
  
  // 지우기 버튼 노출 조건 (readOnly여도 onClear가 명시되면 허용)
  const canClear = (!props.readOnly || onClear) && !isDisabled;
  const showClear = hasValue && canClear;
  
  const hasToggle = isPassword && !isDisabled;
  const hasRightIcon = !!rightIcon && !isPassword;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(e);
    }
  };

  // onMouseDown을 사용하여 blur 이벤트보다 먼저 실행되도록 보장 [확실]
  const handleClear = (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault(); // 인풋 포커스 유지를 위해 필요
    e.stopPropagation();
    
    if (!isControlled) {
      setInternalValue("");
    }
    
    if (onClear) {
      onClear();
    }
    
    if (onChange) {
      // 가상 이벤트를 통해 부모 컴포넌트에 빈 값 전달
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
            value={currentValue}
            onChange={handleInputChange}
            className={`${styles.input} ${error ? styles.error : ""}`}
          />
          <div className={styles.inputActions}>
            {showClear && (
              <button 
                type="button" 
                onMouseDown={handleClear} 
                onPointerDown={handleClear}
                className={styles.inputActionBtn} 
                aria-label="Clear input"
              >
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
