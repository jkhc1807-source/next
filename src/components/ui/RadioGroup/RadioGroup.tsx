"use client";
import React from "react";
import { Radio } from "../Radio";
import styles from "./RadioGroup.module.css";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  name,
  direction = "vertical",
  size = "md",
  className = "",
}: RadioGroupProps) => {
  return (
    <fieldset className={`${styles.groupContainer} ${className}`}>
      {label && <legend className={styles.groupLabel}>{label}</legend>}
      <div className={`${styles.optionsWrapper} ${styles[direction]}`}>
        {options.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            name={name}
            value={option.value}
            size={size}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={option.disabled}
          />
        ))}
      </div>
    </fieldset>
  );
};
