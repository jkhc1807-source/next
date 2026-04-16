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
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div 
            key={item.id} 
            className={`
              ${styles.accordionItem} 
              ${item.disabled ? styles.disabled : ""} 
              ${item.error ? styles.error : ""}
              ${isOpen ? styles.openItem : ""}
            `}
          >
            <button
              onClick={() => {
                if (item.disabled) return;
                setOpenId(isOpen ? null : item.id);
              }}
              className={`${styles.accordionHeader} ${isOpen ? styles.active : ""}`}
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
            <div className={`${styles.accordionBody} ${isOpen ? styles.open : ""}`}>
              {/* 그리드 애니메이션의 완벽한 작동을 위한 래퍼 [확실] */}
              <div className={styles.accordionInner}>
                <div className={styles.accordionContent}>
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
