"use client";
import React from "react";
import { Checkbox } from "../Checkbox";
import styles from "./CheckboxGroup.module.css";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CheckboxGroup = ({
  label,
  options,
  value,
  onChange,
  direction = "vertical",
  size = "md",
  className = "",
}: CheckboxGroupProps) => {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <fieldset className={`${styles.groupContainer} ${className}`}>
      {label && <legend className={styles.groupLabel}>{label}</legend>}
      <div className={`${styles.optionsWrapper} ${styles[direction]}`}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            size={size}
            checked={value.includes(option.value)}
            onChange={() => handleToggle(option.value)}
            disabled={option.disabled}
          />
        ))}
      </div>
    </fieldset>
  );
};
