"use client";
import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pagination}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={styles.paginationBtn}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        <span>Prev</span>
      </button>
      <div className={styles.paginationList}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.paginationItem} ${currentPage === page ? styles.active : ""}`}
          >
            {page}
          </button>
        ))}
      </div>
      <button onClick={() => onPageChange(currentPage + totalPages > totalPages ? totalPages : currentPage + 1)} disabled={currentPage === totalPages} className={styles.paginationBtn}>
        <span>Next</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </nav>
  );
};
