"use client";
import React, { useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: "separated" | "grouped";
}

export const Accordion = ({ items, variant = "separated" }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const containerClass = `${styles.accordion} ${variant === "grouped" ? styles.grouped : styles.separated}`;

  return (
    <div className={containerClass}>
      {items.map((item) => (
        <div 
          key={item.id} 
          className={`
            ${styles.accordionItem} 
            ${item.disabled ? styles.disabled : ""} 
            ${item.error ? styles.error : ""}
          `}
        >
          <button
            onClick={() => {
              if (item.disabled) return;
              setOpenId(openId === item.id ? null : item.id);
            }}
            className={`${styles.accordionHeader} ${openId === item.id ? styles.active : ""}`}
            disabled={item.disabled}
          >
            <span>{item.title}</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              className={styles.accordionIcon}
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={`${styles.accordionBody} ${openId === item.id ? styles.open : ""}`}>
            <div style={{ minHeight: 0 }}>
              <div className={styles.accordionContent}>
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
