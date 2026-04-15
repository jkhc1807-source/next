"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import styles from "./SegmentedControl.module.css";

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

export const SegmentedControl = ({
  options,
  value,
  onChange,
  size = "md",
  className = "",
  fullWidth = false,
}: SegmentedControlProps) => {
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;

  const updateActiveRect = useCallback((shouldScroll = false) => {
    if (!containerRef.current) return;
    
    const activeBtn = containerRef.current.querySelector(`[data-value="${value}"]`) as HTMLElement;
    
    if (activeBtn) {
      setActiveRect({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });

      // Smart Scroll: ONLY scroll the internal container, not the entire page [확실]
      if (shouldScroll) {
        const container = containerRef.current;
        const scrollLeft = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2);
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [value]);

  useEffect(() => {
    // Initial mount and value changes
    updateActiveRect(true);
    
    const handleResize = () => updateActiveRect(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateActiveRect]);

  return (
    <div 
      className={`${styles.container} ${sizeClass} ${fullWidth ? styles.fullWidth : ""} ${className}`} 
      ref={containerRef}
    >
      <div 
        className={styles.activeIndicator} 
        style={{ 
          transform: `translateX(${activeRect.left}px)`, 
          width: `${activeRect.width}px` 
        }} 
      />
      {options.map((option) => (
        <button
          key={option.value}
          data-value={option.value}
          className={`${styles.segment} ${value === option.value ? styles.active : ""}`}
          onClick={() => {
            onChange(option.value);
            // updateActiveRect(true) will be called by useEffect on value change
          }}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
