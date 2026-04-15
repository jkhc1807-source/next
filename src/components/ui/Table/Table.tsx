"use client";
import React from "react";
import { Checkbox } from "../Checkbox";
import styles from "./Table.module.css";

interface TableProps {
  headers?: React.ReactNode;
  simpleHeaders?: string[];
  children: React.ReactNode;
  onSelectAll?: (checked: boolean) => void;
  isAllSelected?: boolean;
  maxHeight?: string;
  totalCount?: number;
  selectedCount?: number;
  stickyHeader?: boolean;
  stickyColumn?: boolean;
  className?: string;
}

export const Table = ({ 
  headers, 
  simpleHeaders, 
  children, 
  onSelectAll, 
  isAllSelected, 
  maxHeight,
  totalCount,
  selectedCount,
  stickyHeader,
  stickyColumn,
  className = "" 
}: TableProps) => {
  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <div className={styles.tableHeader}>
        <div className="gm-flex-wrap" style={{ alignItems: 'center', gap: '20px' }}>
          {totalCount !== undefined && (
            <span className={styles.label}>{totalCount} ITEMS TOTAL</span>
          )}
          {selectedCount !== undefined && selectedCount > 0 && (
            <span className={styles.badge}>{selectedCount} SELECTED</span>
          )}
        </div>
      </div>
      
      <div className={styles.tableWrapper}>
        <div className={`${styles.tableScroll} ${stickyHeader ? styles.stickyHeader : ""} ${stickyColumn ? styles.stickyColumn : ""}`} style={{ maxHeight: maxHeight || 'none' }}>
          <table 
            className={styles.table}
          >
            <thead>
              {headers ? headers : (
                <tr>
                  {(onSelectAll || isAllSelected !== undefined) && (
                    <th style={{ width: '80px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Checkbox 
                          checked={isAllSelected}
                          onChange={(e) => onSelectAll?.(e.target.checked)}
                        />
                      </div>
                    </th>
                  )}
                  {simpleHeaders?.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
