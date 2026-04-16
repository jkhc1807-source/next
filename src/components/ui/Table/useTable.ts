"use client";

import { useState, useMemo, useCallback } from "react";

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface UseTableProps<T> {
  data: T[];
  initialSort?: SortConfig | null;
  filterFn?: (item: T, query: string) => boolean;
}

export const useTable = <T extends Record<string, unknown>>({
  data,
  initialSort = null,
  filterFn,
}: UseTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSort);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // 1. 검색 필터링
  const filteredData = useMemo(() => {
    if (!searchQuery || !filterFn) return data;
    return data.filter((item) => filterFn(item, searchQuery));
  }, [data, searchQuery, filterFn]);

  // 2. 정렬 로직
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === undefined || bVal === undefined || aVal === null || bVal === null) return 0;
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }, [filteredData, sortConfig]);

  // 3. 정렬 핸들러
  const handleSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  }, []);

  // 4. 선택 로직
  const toggleSelectAll = useCallback((ids: (string | number)[]) => {
    setSelectedIds((prev) => {
      if (prev.size === ids.length) return new Set();
      return new Set(ids);
    });
  }, []);

  const toggleSelectRow = useCallback((id: string | number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return {
    data: sortedData,
    sortConfig,
    handleSort,
    searchQuery,
    setSearchQuery,
    selectedIds: Array.from(selectedIds),
    isAllSelected: sortedData.length > 0 && selectedIds.size === sortedData.length,
    toggleSelectAll: () => toggleSelectAll(sortedData.map(d => (d.id as string | number) || (d.key as string | number))),
    toggleSelectRow,
    clearSelection: () => setSelectedIds(new Set()),
  };
};
