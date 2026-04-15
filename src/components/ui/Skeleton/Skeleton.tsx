import React from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return <div className={`${styles.skeleton} ${className}`} />;
};
