import React from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  rows?: number; // 텍스트 여러 줄 생성용 [확실]
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

export const Skeleton = ({ 
  className = "", 
  variant = "rectangular", 
  rows = 1,
  width,
  height,
  style 
}: SkeletonProps) => {
  const customStyle = {
    width: width,
    height: height,
    ...style
  };

  if (variant === "text" && rows > 1) {
    return (
      <div className={styles.textWrapper}>
        {Array.from({ length: rows }).map((_, i) => (
          <div 
            key={i} 
            className={`${styles.skeleton} ${styles.text} ${className}`} 
            style={{ 
              ...customStyle, 
              width: i === rows - 1 && !width ? "70%" : width // 마지막 줄은 자연스럽게 짧게 [확실]
            }} 
          />
        ))}
      </div>
    );
  }

  const variantClass = styles[variant] || styles.rectangular;
  
  return (
    <div 
      className={`${styles.skeleton} ${variantClass} ${className}`} 
      style={customStyle} 
    />
  );
};
