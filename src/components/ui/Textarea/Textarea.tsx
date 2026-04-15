import React, { useState } from "react";
import styles from "./Textarea.module.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { 
  label?: string; 
  error?: string; 
  onClear?: () => void; 
  maxLength?: number; 
}

export const Textarea = ({ label, error, onClear, maxLength, className = "", value, onChange, defaultValue, ...props }: TextareaProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  const currentLength = currentValue ? currentValue.toString().length : 0;
  const hasValue = currentValue !== undefined && currentValue !== null && String(currentValue).length > 0;
  const isDisabled = props.disabled;
  
  // onClear가 있거나 onChange가 있거나, 비제어 상태일 때도 지우기 버튼 노출 가능 [확실]
  const canClear = !props.readOnly && !isDisabled;
  const showClear = hasValue && canClear;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
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
            value={isControlled ? value : internalValue} 
            onChange={handleTextareaChange} 
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
