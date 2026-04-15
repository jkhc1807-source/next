"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export const Tooltip = ({
  children,
  content,
  position = "top",
  delay = 200,
  className = "",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // 툴팁 위치 자동 조정 로직
  useEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const triggerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      let newPos = position;

      // 상하 반전 체크
      if (position === "top" && triggerRect.top < tooltipRect.height + 20) {
        newPos = "bottom";
      } else if (position === "bottom" && windowHeight - triggerRect.bottom < tooltipRect.height + 20) {
        newPos = "top";
      }

      // 좌우 반전 체크
      if (position === "left" && triggerRect.left < tooltipRect.width + 20) {
        newPos = "right";
      } else if (position === "right" && windowWidth - triggerRect.right < tooltipRect.width + 20) {
        newPos = "left";
      }

      setAdjustedPosition(newPos);
    }
    // isVisible이 false일 때 즉시 초기화하지 않음 (페이드 아웃 애니메이션 유지)
  }, [isVisible, position]);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const toggleTooltip = (e: React.MouseEvent | React.TouchEvent) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsVisible(!isVisible);
    }
  };

  if (!isMounted) return <div className={`${styles.tooltipWrapper} ${className}`}>{children}</div>;

  return (
    <div 
      ref={containerRef}
      className={`${styles.tooltipWrapper} ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={toggleTooltip}
    >
      {children}
      <div 
        ref={tooltipRef}
        className={`${styles.tooltip} ${styles[adjustedPosition]} ${isVisible ? styles.visible : ""}`}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
};
