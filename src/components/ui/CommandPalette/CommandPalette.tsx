"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./CommandPalette.module.css";
import { Input } from "../Input";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  onClick: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void; // Added for internal trigger support
  items: CommandItem[];
  placeholder?: string;
}

export const CommandPalette = ({
  isOpen,
  onClose,
  onOpen,
  items,
  placeholder = "Type a command or search...",
}: CommandPaletteProps) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global toggle listener (⌘ K / Ctrl K)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpen?.();
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      }
      if (e.key === "Enter" && filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].onClick();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, onOpen]);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setSearch("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className={`${styles.overlay} ${styles.visible}`} onClick={onClose}>
      <div className={`${styles.palette} ${styles.scaleIn}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchWrapper}>
          <Input 
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            autoFocus={isOpen}
            className={styles.searchInput}
            size="lg"
          />
        </div>
        <div className={styles.list}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.item} ${index === selectedIndex ? styles.selected : ""}`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  item.onClick();
                  onClose();
                }}
              >
                <div className={styles.itemIcon}>{item.icon || "•"}</div>
                <div className={styles.itemContent}>
                  <div className={styles.itemLabel}>{item.label}</div>
                  {item.description && <div className={styles.itemDesc}>{item.description}</div>}
                </div>
                {item.category && <div className={styles.itemCategory}>{item.category}</div>}
              </div>
            ))
          ) : (
            <div className={styles.empty}>No results found for "{search}"</div>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.shortcut}>
            <kbd>↑↓</kbd> <span>Navigate</span>
          </div>
          <div className={styles.shortcut}>
            <kbd>Enter</kbd> <span>Select</span>
          </div>
          <div className={styles.shortcut}>
            <kbd>ESC</kbd> <span>Close</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
