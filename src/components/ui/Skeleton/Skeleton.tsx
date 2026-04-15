import React from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  style?: React.CSSProperties;
}

export const Skeleton = ({ className = "", variant = "rectangular", style }: SkeletonProps) => {
  const variantClass = variant === "card" ? styles.skeletonCard : 
                       variant === "circular" ? styles.skeletonCircular : "";
  
  return <div className={`${styles.skeleton} ${variantClass} ${className}`} style={style} />;
};
