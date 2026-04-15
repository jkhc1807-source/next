import React from "react";
import styles from "./Textarea.module.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { 
  label?: string; 
  error?: string; 
  onClear?: () => void; 
  maxLength?: number; 
}

export const Textarea = ({ label, error, onClear, maxLength, className = "", value, onChange, ...props }: TextareaProps) => {
  const currentLength = value ? value.toString().length : 0;
  const hasValue = value && String(value).length > 0;
  const isDisabled = props.disabled;
  const showClear = hasValue && (onClear || (onChange && !props.readOnly)) && !isDisabled;

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClear) onClear();
    else if (onChange) {
      const event = { target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(event);
    }
  };

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputMain}>
        <div className={styles.inputWrapper}>
          <textarea 
            {...props} 
            value={value} 
            onChange={onChange} 
            className={`${styles.textarea} ${error ? styles.error : ""} ${isDisabled ? styles.disabled : ""}`} 
          />
          {showClear && (
            <button 
              type="button" 
              onClick={handleClear} 
              className={styles.clearBtn} 
              aria-label="Clear textarea"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          {maxLength && (
            <div className={styles.charCounter}>
              <span className={currentLength >= maxLength ? styles.error : ""}>{currentLength}</span>
              <span>/</span>
              <span>{maxLength}</span>
            </div>
          )}
        </div>
        <div className={styles.errorArea}>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      </div>
    </div>
  );
};
