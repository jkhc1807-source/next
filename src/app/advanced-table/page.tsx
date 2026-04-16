"use client";

import React, { useState, useMemo } from "react";
import { 
  Navbar, 
  Table, 
  Badge, 
  Button, 
  Checkbox, 
  Avatar, 
  SearchBar, 
  SegmentedControl,
  Dropdown,
  Toast,
  useTable
} from "@/components/ui";
import { TableDensity } from "@/components/ui/Table/Table";
import styles from "./AdvancedTable.module.css";

const Section = ({ index, title, desc, children }: { index: string; title: string; desc: string; children: React.ReactNode }) => (
  <section className="gm-animate">
    <header className="gm-section-header">
      <span className="gm-label">{index}. {title}</span>
      <h2 className="gm-title-md">{desc}</h2>
    </header>
    {children}
  </section>
);

// Define type for useTable return to avoid 'any'
type TableInstance<T extends Record<string, unknown>> = ReturnType<typeof useTable<T>>;

export default function AdvancedTableShowcase() {
  // --- Global UI State ---
  const [density, setDensity] = useState<TableDensity>("standard");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // --- 1. Main Data Table Logic ---
  const initialData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? "Byungheon Jung" : i % 3 === 0 ? "Sarah Connor" : "John Doe",
    email: `member${i+1}@gemini-ui.com`,
    role: i % 4 === 0 ? "Admin" : "Member",
    status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Disabled" : "Pending"
  })), []);

  const table1 = useTable({
    data: initialData,
    filterFn: (item, query) => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.email.toLowerCase().includes(query.toLowerCase())
  });

  // --- 2. Frozen Data Table Logic ---
  const initialFrozenData = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: `NODE-00${String(i + 1).padStart(2, '0')}`,
    name: `Cluster Node ${i + 1}`,
    status: i % 4 === 0 ? "Active" : "Idle",
    cpu: `${(i * 7 + 10) % 100}%`,
    memory: `${(i * 3 + 40) % 100}%`,
    region: i % 3 === 0 ? "Asia-East" : i % 3 === 1 ? "US-West" : "EU-Central",
    uptime: `${(i * 12 + 100) % 1000}h`,
    traffic: `${((i * 0.5 + 1.2) % 10).toFixed(1)} GB/s`,
    latency: `${(i * 2 + 5) % 50}ms`,
    security: "v2.1.0",
    owner: i % 2 === 0 ? "DevOps" : "Infra",
  })), []);

  const table2 = useTable({ data: initialFrozenData.slice(0, 8) }); // Bidirectional
  const table3 = useTable({ data: initialFrozenData }); // Vertical
  const table4 = useTable({ data: initialFrozenData.slice(0, 3) }); // Horizontal (Analytics)

  const simulateLoading = () => {
    setIsLoading(true);
    setShowToast(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Helper to get Sort Props for HeadCell without 'any'
  const getSortProps = <T extends Record<string, unknown>>(table: TableInstance<T>, key: string) => ({
    sortable: true,
    isActive: table.sortConfig?.key === key,
    direction: table.sortConfig?.key === key ? table.sortConfig.direction : null,
    onSort: () => table.handleSort(key)
  });

  return (
    <div className="gm-root">
      <Navbar />

      <main className="gm-container gm-mt-24 gm-mb-100">
        <section className="gm-hero gm-animate gm-mb-100" style={{ textAlign: 'center' }}>
          <div className="gm-flex-col-gap-24" style={{ alignItems: 'center' }}>
            <Badge variant="primary" size="lg">Architectural Upgrade</Badge>
            <h1 className="gm-hero-title">Compound <br />Architecture</h1>
            <p className="gm-hero-desc">커스텀 훅과 컴파운드 패턴으로 설계된 최상급 테이블 시스템입니다.</p>
          </div>
        </section>

        <div className="gm-flex-col-gap-140">
          {/* 01. Cell Merging */}
          <Section index="01" title="Merging" desc="Hierarchical Data Structure">
            <Table density={density}>
              <Table.Header>
                <Table.Row>
                  <Table.HeadCell>Group</Table.HeadCell>
                  <Table.HeadCell>Module</Table.HeadCell>
                  <Table.HeadCell>Details</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell rowSpan={2} className={styles.cellLabel} style={{ background: 'var(--gm-gray-50)' }}>Core</Table.Cell>
                  <Table.Cell>Database Node</Table.Cell>
                  <Table.Cell>PostgreSQL Cluster HA</Table.Cell>
                  <Table.Cell><Badge variant="success">OK</Badge></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Auth Service</Table.Cell>
                  <Table.Cell>OAuth 2.0 Integration</Table.Cell>
                  <Table.Cell><Badge variant="success">OK</Badge></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Section>

          {/* 02. Enterprise Grid */}
          <Section index="02" title="Interaction" desc="Real-time Data Control">
            <Table
              density={density}
              isLoading={isLoading}
              isEmpty={table1.data.length === 0}
              totalCount={table1.data.length}
              selectedCount={table1.selectedIds.length}
              topActions={
                <div className={styles.topActions}>
                  <div className={styles.searchArea}>
                    <SearchBar 
                      placeholder="Search members..." 
                      value={table1.searchQuery} 
                      onChange={table1.setSearchQuery} 
                      onClear={() => table1.setSearchQuery("")} 
                    />
                  </div>
                  <div className={styles.controlArea}>
                    <Button variant="outline" size="sm" onClick={simulateLoading}>Refresh</Button>
                    <SegmentedControl 
                      options={[{ label: "C", value: "compact" }, { label: "S", value: "standard" }, { label: "B", value: "comfortable" }]}
                      value={density} onChange={(val) => setDensity(val as TableDensity)}
                    />
                  </div>
                </div>
              }
              bulkActions={<Button variant="primary" size="sm" onClick={() => setShowToast(true)}>Activate Items</Button>}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeadCell width="60px" textAlign="center">
                    <Checkbox checked={table1.isAllSelected} onChange={table1.toggleSelectAll} />
                  </Table.HeadCell>
                  <Table.HeadCell {...getSortProps(table1, "name")}>Name</Table.HeadCell>
                  <Table.HeadCell {...getSortProps(table1, "email")}>Email</Table.HeadCell>
                  <Table.HeadCell>Role</Table.HeadCell>
                  <Table.HeadCell {...getSortProps(table1, "status")}>Status</Table.HeadCell>
                  <Table.HeadCell textAlign="right">Actions</Table.HeadCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {table1.data.map(u => (
                  <Table.Row key={u.id}>
                    <Table.Cell textAlign="center">
                      <Checkbox checked={table1.selectedIds.includes(u.id)} onChange={() => table1.toggleSelectRow(u.id)} />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="gm-avatar-row"><Avatar initials={u.name.charAt(0)} size="sm" /><span className="gm-user-name">{u.name}</span></div>
                    </Table.Cell>
                    <Table.Cell className="gm-font-mono">{u.email}</Table.Cell>
                    <Table.Cell><Badge variant="neutral">{u.role}</Badge></Table.Cell>
                    <Table.Cell><Badge variant={u.status === "Active" ? "info" : "warning"}>{u.status}</Badge></Table.Cell>
                    <Table.Cell textAlign="right">
                      <Dropdown trigger={<Button variant="ghost" size="sm">•••</Button>} items={[{ label: "Edit", onClick: () => setShowToast(true) }]} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Section>

          {/* 03. Frozen Grid Layouts */}
          <Section index="03" title="Layouts" desc="High-Volume Data Management">
            <div className={styles.container}>
              {/* Vertical Only */}
              <div>
                <span className="gm-label" style={{ marginBottom: '16px', display: 'block' }}>Frozen Header (Vertical Only)</span>
                <Table maxHeight="300px" stickyHeader density={density}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeadCell {...getSortProps(table3, "id")}>ID</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell {...getSortProps(table3, "cpu")}>CPU</Table.HeadCell>
                      <Table.HeadCell {...getSortProps(table3, "memory")}>RAM</Table.HeadCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {table3.data.map(d => (
                      <Table.Row key={d.id}>
                        <Table.Cell className="gm-font-mono">{d.id}</Table.Cell>
                        <Table.Cell><Badge variant={d.status === "Active" ? "success" : "neutral"}>{d.status}</Badge></Table.Cell>
                        <Table.Cell className={styles.cellLabel}>{d.cpu}</Table.Cell>
                        <Table.Cell>{d.memory}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              {/* Bidirectional */}
              <div>
                <span className="gm-label" style={{ marginBottom: '16px', display: 'block' }}>Bidirectional Frozen (16 Columns)</span>
                <Table maxHeight="350px" stickyHeader stickyColumn density={density}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeadCell {...getSortProps(table2, "id")}>Node ID</Table.HeadCell>
                      <Table.HeadCell {...getSortProps(table2, "status")}>Status</Table.HeadCell>
                      <Table.HeadCell {...getSortProps(table2, "name")}>Name</Table.HeadCell>
                      <Table.HeadCell {...getSortProps(table2, "cpu")}>CPU</Table.HeadCell>
                      <Table.HeadCell>RAM</Table.HeadCell>
                      <Table.HeadCell>Region</Table.HeadCell>
                      <Table.HeadCell>Uptime</Table.HeadCell>
                      <Table.HeadCell>Owner</Table.HeadCell>
                      <Table.HeadCell>Col 1</Table.HeadCell>
                      <Table.HeadCell>Col 2</Table.HeadCell>
                      <Table.HeadCell>Col 3</Table.HeadCell>
                      <Table.HeadCell>Col 4</Table.HeadCell>
                      <Table.HeadCell>Col 5</Table.HeadCell>
                      <Table.HeadCell>Col 6</Table.HeadCell>
                      <Table.HeadCell>Col 7</Table.HeadCell>
                      <Table.HeadCell>Col 8</Table.HeadCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {table2.data.map(d => (
                      <Table.Row key={d.id}>
                        <Table.Cell className={`${styles.cellLabel} ${styles.idCell}`}>{d.id}</Table.Cell>
                        <Table.Cell><Badge variant="info">{d.status}</Badge></Table.Cell>
                        <Table.Cell className={styles.nameCell}>{d.name}</Table.Cell>
                        <Table.Cell>{d.cpu}</Table.Cell>
                        <Table.Cell>{d.memory}</Table.Cell>
                        <Table.Cell>{d.region}</Table.Cell>
                        <Table.Cell>{d.uptime}</Table.Cell>
                        <Table.Cell>{d.owner}</Table.Cell>
                        <Table.Cell>Data</Table.Cell><Table.Cell>Data</Table.Cell><Table.Cell>Data</Table.Cell><Table.Cell>Data</Table.Cell><Table.Cell>Data</Table.Cell><Table.Cell>Data</Table.Cell><Table.Cell>Data</Table.Cell><Table.Cell>Data</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              {/* Horizontal Analytics (Added back to use table4) */}
              <div>
                <span className="gm-label" style={{ marginBottom: '16px', display: 'block' }}>Frozen Column Analytics</span>
                <Table stickyColumn density={density}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeadCell {...getSortProps(table4, "id")}>Identifier</Table.HeadCell>
                      <Table.HeadCell>Region</Table.HeadCell>
                      <Table.HeadCell {...getSortProps(table4, "uptime")}>Uptime</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {table4.data.map(d => (
                      <Table.Row key={d.id}>
                        <Table.Cell className={styles.cellLabel}>{d.id}</Table.Cell>
                        <Table.Cell>{d.region}</Table.Cell>
                        <Table.Cell>{d.uptime}</Table.Cell>
                        <Table.Cell><Badge variant="info">Stable</Badge></Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer className="gm-footer gm-mt-100">
        <div className="gm-container gm-footer-inner">
          <span className="gm-label">GEMINI MASTER ARCH v1.0</span>
        </div>
      </footer>

      {showToast && <Toast message={isLoading ? "Loading..." : "Success"} variant={isLoading ? "info" : "success"} onClose={() => setShowToast(false)} />}
    </div>
  );
}
