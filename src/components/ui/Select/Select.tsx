"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";

interface SelectProps { label?: string; options: { label: string; value: string }[]; value: string; onChange: (value: string) => void; placeholder?: string; className?: string; disabled?: boolean; error?: string; }

export const Select = ({ label, options, value, onChange, placeholder = "Select option", className = "", disabled, error }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState<"top" | "bottom">("bottom");
  const [align, setAlign] = useState<"left" | "right">("left");
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      if (!isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 수직 위치
        const spaceBelow = windowHeight - rect.bottom;
        setDirection(spaceBelow < 300 ? "top" : "bottom");

        // 수평 위치
        const spaceRight = windowWidth - rect.left;
        setAlign(spaceRight < 300 ? "right" : "left");
      }
      setIsOpen(!isOpen);
    }
  };

  if (!isMounted) return <div className={`${styles.selectContainer} ${disabled ? styles.disabled : ""} ${className}`}>{label && <label className={styles.label}>{label}</label>}</div>;

  return (
    <div className={`${styles.selectContainer} ${disabled ? styles.disabled : ""} ${className}`} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputMain}>
        <div 
          className={`${styles.selectTrigger} ${isOpen ? styles.active : ""} ${error ? styles.error : ""}`} 
          onClick={handleToggle}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={selected ? styles.value : styles.placeholder}>
            {selected ? selected.label : placeholder}
          </span>
          <svg 
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" 
            style={{ 
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)", 
              transform: isOpen ? "rotate(180deg)" : "none", 
              color: isOpen ? "var(--gm-black)" : "var(--gm-gray-400)" 
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <div className={styles.errorArea}>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      </div>
      {isOpen && (
        <ul className={`${styles.selectDropdown} ${styles[direction]} ${styles[align]} gm-animate`} role="listbox">
          {options.map((opt) => (
            <li 
              key={opt.value} 
              className={`${styles.selectOption} ${opt.value === value ? styles.selected : ""}`} 
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              role="option"
              aria-selected={opt.value === value}
            >
              {opt.label}
              {opt.value === value && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className={styles.checkIcon}>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
