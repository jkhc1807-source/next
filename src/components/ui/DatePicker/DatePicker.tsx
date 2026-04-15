"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "../Input";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  label?: string;
  value?: string; // Format: YYYY-MM-DD
  onChange?: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  minDate?: string; // Format: YYYY-MM-DD
  maxDate?: string; // Format: YYYY-MM-DD
  size?: "sm" | "md" | "lg";
}

export const DatePicker = ({
  label,
  value = "",
  onChange,
  placeholder = "Select Date",
  disabled = false,
  error,
  minDate,
  maxDate,
  size = "md",
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"days" | "months" | "years">("days");
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [align, setAlign] = useState<"left" | "right">("left");
  const containerRef = useRef<HTMLDivElement>(null);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Helper: Convert "YYYY-MM-DD" to a comparable number YYYYMMDD
  const dateToNum = (dateStr: string) => {
    if (!dateStr) return null;
    return parseInt(dateStr.replace(/-/g, ""), 10);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Internal view date (the month currently being looked at)
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });

  // Sync viewDate when value changes from outside
  useEffect(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      setViewDate(new Date(y, m - 1, 1));
    }
  }, [value]);

  // Floating placement logic
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // 수직 위치
      const spaceBelow = windowHeight - rect.bottom;
      const calendarHeight = 420;
      setPlacement(spaceBelow < calendarHeight ? "top" : "bottom");

      // 수평 위치 (우측 공간 확인)
      const spaceRight = windowWidth - rect.left;
      const calendarWidth = 320;
      setAlign(spaceRight < calendarWidth ? "right" : "left");
    }
  }, [isOpen]);

  const isDateDisabled = (date: Date) => {
    const targetNum = dateToNum(formatDate(date)) || 0;
    const minNum = dateToNum(minDate || "");
    const maxNum = dateToNum(maxDate || "");

    if (minNum !== null && targetNum < minNum) return true;
    if (maxNum !== null && targetNum > maxNum) return true;
    return false;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setView("days");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleMonthChange = (month: number) => {
    setViewDate(new Date(viewDate.getFullYear(), month, 1));
    setView("days");
  };

  const handleYearChange = (year: number) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
    setView("days");
  };

  const handleDateSelect = (d: number) => {
    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
    if (isDateDisabled(selectedDate)) return;
    
    onChange?.(formatDate(selectedDate));
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    if (isDateDisabled(today)) return;
    
    onChange?.(formatDate(today));
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setIsOpen(false);
    setView("days");
  };

  const renderDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const todayStr = formatDate(new Date());
    const selectedStr = value;

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.empty} />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const currentDateObj = new Date(year, month, d);
      const currentDateStr = formatDate(currentDateObj);
      const isToday = currentDateStr === todayStr;
      const isSelected = currentDateStr === selectedStr;
      const isDisabled = isDateDisabled(currentDateObj);

      days.push(
        <div 
          key={d} 
          className={`${styles.day} ${isToday ? styles.today : ""} ${isSelected ? styles.selected : ""} ${isDisabled ? styles.disabledDay : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled) handleDateSelect(d);
          }}
        >
          {d}
        </div>
      );
    }
    return days;
  };

  const renderMonths = () => {
    return shortMonthNames.map((name, i) => (
      <div
        key={name}
        className={`${styles.monthItem} ${viewDate.getMonth() === i ? styles.selectedItem : ""}`}
        onClick={() => handleMonthChange(i)}
      >
        {name}
      </div>
    ));
  };

  const renderMonthsYears = () => {
    const currentYear = viewDate.getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 9; i++) {
      years.push(
        <div
          key={i}
          className={`${styles.yearItem} ${viewDate.getFullYear() === i ? styles.selectedItem : ""}`}
          onClick={() => handleYearChange(i)}
        >
          {i}
        </div>
      );
    }
    return years;
  };

  return (
    <div className={styles.datePickerWrapper} ref={containerRef}>
      <Input
        label={label}
        value={value}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        error={error}
        size={size}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onClear={() => onChange?.("")}
        rightIcon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        }
      />

      {isOpen && (
        <div className={`${styles.calendar} ${styles[placement]} ${styles[align]}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <button 
              className={styles.navBtn} 
              onClick={handlePrevMonth} 
              disabled={view !== "days"}
              style={{ visibility: view === "days" ? "visible" : "hidden" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className={styles.selectors}>
              <button 
                className={`${styles.viewBtn} ${view === "months" ? styles.activeView : ""}`} 
                onClick={() => setView(view === "months" ? "days" : "months")}
              >
                {monthNames[viewDate.getMonth()]}
              </button>
              <button 
                className={`${styles.viewBtn} ${view === "years" ? styles.activeView : ""}`} 
                onClick={() => setView(view === "years" ? "days" : "years")}
              >
                {viewDate.getFullYear()}
              </button>
            </div>
            <button 
              className={styles.navBtn} 
              onClick={handleNextMonth} 
              disabled={view !== "days"}
              style={{ visibility: view === "days" ? "visible" : "hidden" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {view === "days" && (
            <>
              <div className={styles.weekdays}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                  <div key={d} className={styles.weekday}>{d}</div>
                ))}
              </div>
              <div className={styles.days}>
                {renderDays()}
              </div>
            </>
          )}

          {view === "months" && (
            <div className={styles.monthsGrid}>
              {renderMonths()}
            </div>
          )}

          {view === "years" && (
            <div className={styles.yearsGrid}>
              {renderMonthsYears()}
            </div>
          )}

          <div className={styles.footer}>
            <button className={styles.todayBtn} onClick={handleToday}>Go to Today</button>
          </div>
        </div>
      )}
    </div>
  );
};
