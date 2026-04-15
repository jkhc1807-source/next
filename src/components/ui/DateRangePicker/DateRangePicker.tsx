"use client";

import React from "react";
import { DatePicker } from "../DatePicker";
import styles from "./DateRangePicker.module.css";

interface DateRangePickerProps {
  label?: string;
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  startPlaceholder?: string;
  endPlaceholder?: string;
  error?: string;
  disabled?: boolean;
}

export const DateRangePicker = ({
  label,
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  startPlaceholder = "Start Date",
  endPlaceholder = "End Date",
  error,
  disabled,
}: DateRangePickerProps) => {
  return (
    <div className={styles.rangeContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.pickerWrapper}>
        <div className={styles.pickerItem}>
          <DatePicker
            value={startDate}
            onChange={onStartChange}
            placeholder={startPlaceholder}
            disabled={disabled}
            maxDate={endDate} // Cannot select start date after end date
            error={error ? " " : undefined}
          />
        </div>
        <div className={styles.separator}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <div className={styles.pickerItem}>
          <DatePicker
            value={endDate}
            onChange={onEndChange}
            placeholder={endPlaceholder}
            disabled={disabled}
            minDate={startDate} // Cannot select end date before start date
            error={error ? " " : undefined}
          />
        </div>
      </div>
      {error && error !== " " && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
