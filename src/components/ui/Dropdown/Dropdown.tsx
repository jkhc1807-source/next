"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

interface DropdownItem {
  label: string;
  description?: string;
  shortcut?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "danger" | "primary";
  divider?: boolean;
  header?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
}

export const Dropdown = ({
  trigger,
  items,
  className = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [align, setAlign] = useState<"left" | "right">("right");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current && typeof window !== 'undefined') {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // 수직 위치 계산
      const spaceBelow = windowHeight - rect.bottom;
      const estimatedMenuHeight = items.length * 56 + 40;
      setPlacement(spaceBelow < estimatedMenuHeight ? "top" : "bottom");

      // 수평 위치 계산 (우측 공간 확인)
      const spaceRight = windowWidth - rect.left;
      const menuWidth = 240;
      setAlign(spaceRight < menuWidth ? "right" : "left");
    }
  }, [isOpen, items.length]);

  const handleTriggerClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (!isMounted) return <div className={`${styles.dropdownContainer} ${className}`}>{trigger}</div>;

  return (
    <div className={`${styles.dropdownContainer} ${className}`} ref={containerRef}>
      <div 
        className={styles.trigger} 
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>

      {isOpen && (
        <div className={`${styles.menu} ${styles[placement]} ${styles[align]} gm-animate`} role="menu" onClick={(e) => e.stopPropagation()}>
          {items.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              {item.header && <div className={styles.menuHeader}>{item.header}</div>}
              <button
                className={`${styles.item} ${item.variant ? styles[item.variant] : ""} ${item.disabled ? styles.disabled : ""} ${item.description ? styles.hasDesc : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!item.disabled && item.onClick) {
                    item.onClick();
                    setIsOpen(false);
                  }
                }}
                disabled={item.disabled}
                role="menuitem"
              >
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                <div className={styles.itemContent}>
                  <div className={styles.labelWrapper}>
                    <span className={styles.label}>{item.label}</span>
                    {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
                  </div>
                  {item.description && <p className={styles.description}>{item.description}</p>}
                </div>
              </button>
              {item.divider && <div className={styles.divider} />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
