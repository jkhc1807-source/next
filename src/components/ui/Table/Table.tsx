"use client";

import React, { createContext, useContext } from "react";
import { Checkbox } from "../Checkbox";
import { Skeleton } from "../Skeleton";
import { EmptyState } from "../EmptyState";
import styles from "./Table.module.css";

// --- Context for Compound Pattern ---
export type TableDensity = "compact" | "standard" | "comfortable";

interface TableContextProps {
  density: TableDensity;
  stickyHeader?: boolean;
  stickyColumn?: boolean;
}

const TableContext = createContext<TableContextProps>({ density: "standard" });
const useTableContext = () => useContext(TableContext);

// --- 1. Root Component ---
export interface TableProps {
  children: React.ReactNode;
  simpleHeaders?: (string | { key: string; label: string; sortable?: boolean })[];
  density?: TableDensity;
  stickyHeader?: boolean;
  stickyColumn?: boolean;
  maxHeight?: string;
  className?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  topActions?: React.ReactNode;
  bulkActions?: React.ReactNode;
  selectedCount?: number;
  totalCount?: number;
}

export const Table = ({
  children,
  simpleHeaders,
  density = "standard",
  stickyHeader,
  stickyColumn,
  maxHeight,
  className = "",
  isLoading,
  isEmpty,
  topActions,
  bulkActions,
  selectedCount,
  totalCount,
}: TableProps) => {
  const renderContent = () => {
    if (isLoading) return <TableBodySkeleton />;
    if (isEmpty) {
      return (
        <tbody>
          <tr>
            <td colSpan={100}>
              <EmptyState 
                title="No matching results found" 
                description="Try adjusting your filters or search query." 
              />
            </td>
          </tr>
        </tbody>
      );
    }

    // Check if children already contain Table parts to avoid invalid nesting
    const childrenArray = React.Children.toArray(children);
    const hasTableParts = childrenArray.some(
      (child) => 
        React.isValidElement(child) && 
        (child.type === TableHeader || child.type === TableBody)
    );

    if (hasTableParts) {
      return children;
    }

    // Simple pattern: wrap children (usually rows) in tbody
    return <tbody>{children}</tbody>;
  };

  return (
    <TableContext.Provider value={{ density, stickyHeader, stickyColumn }}>
      <div className={`${styles.tableContainer} ${className} ${styles[density]}`}>
        {topActions && <div className={styles.tableTopActions}>{topActions}</div>}

        {selectedCount !== undefined && selectedCount > 0 && (
          <div className={styles.bulkActionBar}>
            <span className={styles.selectedBadge}>{selectedCount} Selected Items</span>
            <div className={styles.bulkButtons}>{bulkActions}</div>
          </div>
        )}

        {totalCount !== undefined && (
          <div style={{ marginBottom: "8px" }}>
            <span className={styles.label}>{totalCount} ITEMS TOTAL</span>
          </div>
        )}

        <div className={`${styles.tableWrapper} ${stickyHeader ? styles.hasStickyHeader : ""} ${stickyColumn ? styles.stickyColumn : ""}`}>
          <div className={`${styles.tableScroll} ${stickyHeader ? styles.stickyHeader : ""}`} style={{ maxHeight: maxHeight || "none" }}>
            <table className={styles.table}>
              {simpleHeaders && (
                <thead>
                  <Table.Row>
                    {simpleHeaders.map((header, idx) => {
                      const label = typeof header === "string" ? header : header.label;
                      return <Table.HeadCell key={idx}>{label}</Table.HeadCell>;
                    })}
                  </Table.Row>
                </thead>
              )}
              {renderContent()}
            </table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
};

// --- 2. Header Components ---
interface TableHeaderProps {
  children: React.ReactNode;
}
export const TableHeader = ({ children }: TableHeaderProps) => {
  const { stickyHeader } = useTableContext();
  return <thead className={stickyHeader ? styles.stickyHeader : ""}>{children}</thead>;
};

interface TableHeadCellProps {
  children?: React.ReactNode;
  sortable?: boolean;
  isActive?: boolean;
  direction?: "asc" | "desc" | null;
  onSort?: () => void;
  width?: string;
  textAlign?: "left" | "center" | "right";
}
export const TableHeadCell = ({ children, sortable, isActive, direction, onSort, width, textAlign }: TableHeadCellProps) => {
  return (
    <th 
      onClick={sortable ? onSort : undefined}
      className={sortable ? styles.sortableHeader : ""}
      style={{ width, textAlign }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: textAlign === "center" ? "center" : "flex-start" }}>
        {children}
        {sortable && (
          <div className={`${styles.sortIconWrapper} ${isActive ? styles.active : ""}`}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`${styles.sortArrow} ${direction === "asc" ? styles.highlight : ""}`}>
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`${styles.sortArrow} ${direction === "desc" ? styles.highlight : ""}`}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        )}
      </div>
    </th>
  );
};

// --- 3. Body & Row Components ---
export const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>;

export const TableRow = ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>;

interface TableCellProps {
  children: React.ReactNode;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  style?: React.CSSProperties;
  textAlign?: "left" | "center" | "right";
}
export const TableCell = ({ children, rowSpan, colSpan, className = "", style, textAlign }: TableCellProps) => (
  <td rowSpan={rowSpan} colSpan={colSpan} className={className} style={{ ...style, textAlign }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start" }}>
      {children}
    </div>
  </td>
);

// --- Helpers ---
const TableBodySkeleton = () => (
  <tbody>
    {Array.from({ length: 5 }).map((_, i) => (
      <tr key={i}>
        {Array.from({ length: 5 }).map((_, j) => (
          <td key={j}><Skeleton width="80%" height="20px" /></td>
        ))}
      </tr>
    ))}
  </tbody>
);

// 컴파운드 컴포넌트 바인딩
Table.Header = TableHeader;
Table.HeadCell = TableHeadCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
