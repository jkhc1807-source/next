"use client";
import React from "react";
import { Checkbox, Skeleton, EmptyState } from "@/components/ui";
import styles from "./Table.module.css";

export type TableDensity = "compact" | "standard" | "comfortable";

export interface TableHeader {
  key: string;
  label: string;
  sortable?: boolean;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

interface TableProps {
  headers?: React.ReactNode;
  simpleHeaders?: (TableHeader | string)[];
  children: React.ReactNode;
  onSelectAll?: (checked: boolean) => void;
  isAllSelected?: boolean;
  maxHeight?: string;
  totalCount?: number;
  selectedCount?: number;
  stickyHeader?: boolean;
  stickyColumn?: boolean;
  density?: TableDensity;
  isLoading?: boolean;
  isEmpty?: boolean;
  sortConfig?: SortConfig | null;
  onSort?: (key: string) => void;
  bulkActions?: React.ReactNode;
  topActions?: React.ReactNode;
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
  density = "standard",
  isLoading = false,
  isEmpty = false,
  sortConfig,
  onSort,
  bulkActions,
  topActions,
  className = "" 
}: TableProps) => {
  
  const renderSortIcon = (key: string) => {
    const isActive = sortConfig?.key === key;
    const direction = isActive ? sortConfig.direction : null;

    return (
      <div className={`${styles.sortIconWrapper} ${isActive ? styles.active : ""}`}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`${styles.sortArrow} ${direction === "asc" ? styles.highlight : ""}`}>
          <path d="M18 15l-6-6-6 6"/>
        </svg>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`${styles.sortArrow} ${direction === "desc" ? styles.highlight : ""}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    );
  };

  return (
    <div className={`${styles.tableContainer} ${className} ${styles[density]}`}>
      {/* 1. 상단 액션 바 */}
      {topActions && <div className={styles.tableTopActions}>{topActions}</div>}

      {/* 2. 벌크 액션 바 (선택 시 슬라이드 인) */}
      {selectedCount !== undefined && selectedCount > 0 && (
        <div className={styles.bulkActionBar}>
          <span className={styles.selectedBadge}>{selectedCount} Selected Items</span>
          <div className={styles.bulkButtons}>{bulkActions}</div>
        </div>
      )}

      {/* 3. 아이템 카운트 라벨 */}
      {totalCount !== undefined && (
        <div style={{ marginBottom: '8px' }}>
          <span className={styles.label}>{totalCount} ITEMS TOTAL</span>
        </div>
      )}
      
      {/* 4. 메인 테이블 코어 */}
      <div className={`${styles.tableWrapper} ${stickyHeader ? styles.hasStickyHeader : ""} ${stickyColumn ? styles.stickyColumn : ""}`}>
        <div 
          className={`${styles.tableScroll} ${stickyHeader ? styles.stickyHeader : ""}`}
          style={{ maxHeight: maxHeight || 'none' }}
        >
          <table className={styles.table}>
            <thead>
              {headers ? headers : (
                <tr>
                  {(onSelectAll || isAllSelected !== undefined) && (
                    <th style={{ width: '60px', textAlign: 'center' }}>
                      <Checkbox checked={isAllSelected} onChange={(e) => onSelectAll?.(e.target.checked)} />
                    </th>
                  )}
                  {simpleHeaders?.map((header, idx) => {
                    const isObj = typeof header !== 'string';
                    const key = isObj ? (header as TableHeader).key : header as string;
                    const label = isObj ? (header as TableHeader).label : header as string;
                    const sortable = isObj ? (header as TableHeader).sortable : false;

                    return (
                      <th 
                        key={idx} 
                        onClick={() => sortable && onSort?.(key)}
                        className={sortable ? styles.sortableHeader : ""}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {label}
                          {sortable && renderSortIcon(key)}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              )}
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    {(onSelectAll || isAllSelected !== undefined) && <td><Skeleton width="20px" height="20px" /></td>}
                    {simpleHeaders?.map((_, j) => <td key={`skeleton-cell-${j}`}><Skeleton width="80%" height="20px" /></td>)}
                  </tr>
                ))
              ) : isEmpty ? (
                <tr><td colSpan={100}><EmptyState title="No matching results found" /></td></tr>
              ) : (
                children
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
