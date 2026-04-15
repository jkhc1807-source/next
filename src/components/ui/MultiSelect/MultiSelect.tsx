"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "./MultiSelect.module.css";
import { Badge } from "../Badge";

interface Option { label: string; value: string; }
interface MultiSelectProps { 
  label?: string; 
  options: Option[]; 
  value: string[]; 
  onChange: (value: string[]) => void; 
  placeholder?: string; 
  className?: string; 
  style?: React.CSSProperties; 
  disabled?: boolean; 
}

export const MultiSelect = ({ label, options, value, onChange, placeholder = "Select options", className = "", style, disabled }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState<"top" | "bottom">("bottom");
  const [align, setAlign] = useState<"left" | "right">("left");
  const [visibleCount, setVisibleCount] = useState(value.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!triggerRef.current || !isMounted) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [isMounted]);

  useLayoutEffect(() => {
    if (!measureRef.current || !triggerRef.current || value.length === 0 || !isMounted) {
      setVisibleCount(value.length);
      return;
    }

    const triggerWidth = triggerRef.current.offsetWidth;
    const arrowWidth = 50; 
    const paddingWidth = 40;
    const availableWidth = triggerWidth - arrowWidth - paddingWidth;

    const measureContainer = measureRef.current;
    const tagElements = Array.from(measureContainer.children) as HTMLElement[];
    
    let currentWidth = 0;
    let count = 0;
    const gap = 8;
    const badgeWidth = 70;

    let totalTagsWidth = tagElements.reduce((sum, el) => sum + el.offsetWidth + gap, 0) - gap;
    if (totalTagsWidth <= availableWidth) {
      setVisibleCount(value.length);
      return;
    }

    for (let i = 0; i < tagElements.length; i++) {
      const tagWidth = tagElements[i].offsetWidth + gap;
      if (currentWidth + tagWidth + badgeWidth > availableWidth) {
        break;
      }
      currentWidth += tagWidth;
      count++;
    }

    setVisibleCount(count > 0 ? count : 1);
  }, [value, isMounted, containerWidth]);

  const toggleOption = (val: string) => {
    if (disabled) return;
    if (value.includes(val)) onChange(value.filter((v) => v !== val));
    else onChange([...value, val]);
  };

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const spaceBelow = windowHeight - rect.bottom;
      setDirection(spaceBelow < 300 ? "top" : "bottom");

      const spaceRight = windowWidth - rect.left;
      setAlign(spaceRight < 300 ? "right" : "left");
    }
    setIsOpen(!isOpen);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange([]);
  };

  const selectedOptions = value.map(v => options.find(o => o.value === v)).filter(Boolean);
  const visibleOptions = selectedOptions.slice(0, visibleCount);
  const remainingCount = value.length - visibleCount;

  return (
    <div 
      className={`${styles.selectContainer} ${disabled ? styles.disabled : ""} ${className}`} 
      ref={containerRef} 
      style={style}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.triggerWrapper}>
        <div 
          className={`${styles.selectTrigger} ${isOpen ? styles.active : ""}`} 
          onClick={handleToggle} 
          ref={triggerRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="multiselect-dropdown"
        >
          <div className={styles.selectValues}>
            {isMounted && value.length > 0 ? (
              <>
                {visibleOptions.map((opt) => (
                  <span key={opt?.value} className={styles.selectTag}>
                    {opt?.label}
                    <button 
                      onClick={(e) => { e.stopPropagation(); if (!disabled) onChange(value.filter((x) => x !== opt?.value)); }} 
                      className={styles.tagClose}
                      aria-label={`Remove ${opt?.label}`}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </span>
                ))}
                {remainingCount > 0 && (
                  <div className={styles.badgeWrapper}>
                    <Badge variant="success">외 {remainingCount}건</Badge>
                  </div>
                )}
              </>
            ) : <span className={styles.placeholder}>{isMounted && value.length > 0 ? "" : placeholder}</span>}
          </div>
          <div className={styles.triggerActions}>
            {isMounted && value.length > 0 && !disabled && (
              <button 
                type="button" 
                onClick={handleClearAll} 
                className={styles.clearAllBtn}
                aria-label="Clear all selections"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg 
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" 
              style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', transform: isOpen ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        {isMounted && isOpen && (
          <ul 
            id="multiselect-dropdown"
            className={`${styles.selectDropdown} ${styles[direction]} ${styles[align]} gm-animate`} 
            onClick={(e) => e.stopPropagation()}
            role="listbox"
          >
            {options.map((opt) => (
              <li 
                key={opt.value} 
                className={`${styles.selectOption} ${value.includes(opt.value) ? styles.selected : ""}`} 
                onClick={() => toggleOption(opt.value)}
                role="option"
                aria-selected={value.includes(opt.value)}
              >
                {opt.label}
                {value.includes(opt.value) && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className={styles.checkIcon}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.measureContainer} ref={measureRef} aria-hidden="true">
        {selectedOptions.map((opt) => (
          <span key={opt?.value} className={styles.selectTag}>{opt?.label}<div style={{ width: '10px' }} /></span>
        ))}
      </div>
    </div>
  );
};
