"use client";
import React from "react";
import styles from "./Steps.module.css";

interface Step {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepsProps {
  steps: Step[];
  current: number; // 0-based
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Steps = ({ steps, current, size = "md", className = "" }: StepsProps) => {
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;

  return (
    <div className={`${styles.stepsContainer} ${sizeClass} ${className}`}>
      {steps.map((step, index) => {
        // Updated logic: if current >= steps.length, all are completed.
        // Otherwise, index < current is completed.
        const isCompleted = index < current;
        const isActive = index === current;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className={`${styles.stepItem} ${isCompleted ? styles.completed : ""} ${isActive ? styles.active : ""}`}>
            <div className={styles.stepHeader}>
              <div className={styles.stepIndicator}>
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {!isLast && <div className={styles.stepLine} />}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>{step.title}</div>
              {step.description && <div className={styles.stepDescription}>{step.description}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
