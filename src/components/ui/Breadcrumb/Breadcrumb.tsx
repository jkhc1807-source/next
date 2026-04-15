"use client";

import React from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const Breadcrumb = ({
  items,
  separator = <ChevronRight />,
  className = "",
}: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ul className={styles.breadcrumb}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.active || isLast;
          const key = `${item.label}-${index}`;
          
          return (
            <li key={key} className={styles.item}>
              {item.href ? (
                <Link 
                  href={item.href} 
                  className={`${styles.link} ${isCurrent ? styles.current : ""}`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={`${styles.link} ${isCurrent ? styles.current : ""}`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
