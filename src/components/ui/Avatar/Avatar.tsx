"use client";
import React, { useState } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  src?: string;
  name?: string;
  initials?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
  variant?: "circle" | "square";
  className?: string;
}

export const Avatar = ({ 
  src, 
  name, 
  initials, 
  size = "md", 
  status, 
  variant = "circle",
  className = "" 
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  // 이니셜 추출 로직
  const getInitials = () => {
    if (initials) return initials;
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClass = styles[size] || styles.md;
  const variantClass = variant === "square" ? styles.square : styles.circle;

  return (
    <div className={`${styles.avatarWrapper} ${sizeClass} ${className}`}>
      <div className={`${styles.avatar} ${variantClass}`}>
        {src && !imgError ? (
          <img 
            src={src} 
            alt={name || "Avatar"} 
            className={styles.image} 
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.initials}>{getInitials()}</span>
        )}
      </div>
      {status && (
        <span className={`${styles.status} ${styles[status]}`} aria-label={status} />
      )}
    </div>
  );
};
