"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Toast.module.css";

export type ToastType = "info" | "success" | "warning" | "error";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const Icons = {
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
};

// 개별 토스트 컴포넌트
const Toast = ({ item, onRemove }: { item: ToastItem; onRemove: (id: string) => void }) => {
  const duration = item.duration || 3000;
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 10));
    }, 10);
    return () => clearInterval(interval);
  }, [isPaused, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) onRemove(item.id);
  }, [timeLeft, item.id, onRemove]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div 
      className={`${styles.toast} ${styles[item.type]} gm-animate`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.iconWrapper}>{Icons[item.type]}</div>
      <div className={styles.toastContent}>
        <div className={styles.toastTitle}>{item.message}</div>
      </div>
      <button className={styles.closeButton} onClick={() => onRemove(item.id)} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div 
        className={styles.progressBar} 
        style={{ 
          transform: `scaleX(${progress / 100})`, 
          transition: isPaused ? 'none' : 'transform 0.1s linear' 
        }} 
      />
    </div>
  );
};

// 전역 토스트 컨테이너
export const ToastContainer = ({ toasts, onRemove }: { toasts: ToastItem[]; onRemove: (id: string) => void }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast key={toast.id} item={toast} onRemove={onRemove} />
      ))}
    </div>,
    document.body
  );
};
