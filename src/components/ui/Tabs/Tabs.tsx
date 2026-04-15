"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Tabs.module.css";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
}

export const Tabs = ({ tabs, defaultValue }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs.find(t => !t.disabled)?.id || tabs[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  
  // 드래그 스크롤 관련 상태
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false); // 드래그 중 클릭 방지용

  const updateIndicator = () => {
    const activeBtn = navRef.current?.querySelector(`.${styles.active}`) as HTMLButtonElement;
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth
      });
    }
  };

  useEffect(() => {
    updateIndicator();
  }, [activeTab]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, []);

  const handleTabClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // 드래그가 일정 수준 이상 발생했다면 클릭 무시
    if (moved.current) return;
    
    setActiveTab(id);

    const target = e.currentTarget;
    const container = navRef.current;
    if (container && target) {
      const containerWidth = container.offsetWidth;
      const targetLeft = target.offsetLeft;
      const targetWidth = target.offsetWidth;

      const scrollPosition = targetLeft - (containerWidth / 2) + (targetWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    isDragging.current = true;
    moved.current = false;
    navRef.current.classList.add(styles.dragging);
    startX.current = e.pageX - navRef.current.offsetLeft;
    scrollLeft.current = navRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    navRef.current?.classList.remove(styles.dragging);
  };

  const onMouseUp = () => {
    isDragging.current = false;
    navRef.current?.classList.remove(styles.dragging);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !navRef.current) return;
    e.preventDefault();
    const x = e.pageX - navRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // 드래그 감도 조절
    
    if (Math.abs(walk) > 5) {
      moved.current = true;
    }
    
    navRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className={styles.tabs}>
      <div 
        className={styles.tabsNav} 
        ref={navRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={(e) => !tab.disabled && handleTabClick(tab.id, e)}
            disabled={tab.disabled}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ""} ${tab.disabled ? styles.disabled : ""}`}
          >
            {tab.label}
          </button>
        ))}
        <div 
          className={styles.indicator}
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: `${indicatorStyle.width}px`
          }}
        />
      </div>
      <div className={styles.tabsContent}>
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
};
