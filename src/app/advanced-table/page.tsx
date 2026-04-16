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
  Toast
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

export default function AdvancedTableShowcase() {
  // --- States ---
  const [vSelectedIds, setVSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [density, setDensity] = useState<TableDensity>("standard");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [sort1, setSort1] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [sort2, setSort2] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [sort3, setSort3] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [sort4, setSort4] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  // --- Data ---
  const initialData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? "Byungheon Jung" : i % 3 === 0 ? "Sarah Connor" : "John Doe",
    email: `member${i+1}@gemini-ui.com`,
    role: i % 4 === 0 ? "Admin" : "Member",
    status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Disabled" : "Pending"
  })), []);

  const filteredData = useMemo(() => {
    let data = [...initialData];
    if (searchQuery) {
      data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (sort1) {
      data.sort((a, b) => {
        const aVal = a[sort1.key as keyof typeof a];
        const bVal = b[sort1.key as keyof typeof b];
        return sort1.direction === "asc" ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
      });
    }
    return data;
  }, [initialData, searchQuery, sort1]);

  // --- Rich Data for Frozen Tables (Huge Columns) ---
  const initialFrozenData = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: `NODE-00${String(i + 1).padStart(2, '0')}`,
    name: `Cluster Node ${i + 1}`,
    status: i % 4 === 0 ? "Active" : "Idle",
    cpu: `${(i * 7 + 10) % 100}%`, // 결정론적 계산으로 변경
    memory: `${(i * 3 + 40) % 100}%`, // 결정론적 계산으로 변경
    disk: "SSD 1TB",
    region: i % 3 === 0 ? "Asia-East" : i % 3 === 1 ? "US-West" : "EU-Central",
    uptime: `${(i * 12 + 100) % 1000}h`,
    traffic: `${((i * 0.5 + 1.2) % 10).toFixed(1)} GB/s`,
    latency: `${(i * 2 + 5) % 50}ms`,
    security: "v2.1.0",
    owner: i % 2 === 0 ? "DevOps" : "Infra",
    cluster: "Alpha-X",
    zone: "Zone-A",
    deployment: "2026.04.16",
    compliance: "Certified",
    load: "Balanced"
  })), []);

  const sortData = (data: any[], config: { key: string; direction: "asc" | "desc" } | null) => {
    if (!config) return data;
    return [...data].sort((a, b) => {
      const aVal = a[config.key];
      const bVal = b[config.key];
      return config.direction === "asc" ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
    });
  };

  const sortedFrozen2 = useMemo(() => sortData(initialFrozenData.slice(0, 8), sort2), [initialFrozenData, sort2]);
  const sortedFrozen3 = useMemo(() => sortData(initialFrozenData, sort3), [initialFrozenData, sort3]);
  const sortedFrozen4 = useMemo(() => sortData(initialFrozenData.slice(0, 3), sort4), [initialFrozenData, sort4]);

  const handleSortChange = (setter: any, current: any, key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (current && current.key === key && current.direction === "asc") direction = "desc";
    setter({ key, direction });
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setShowToast(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleSelection = (id: number) => {
    setVSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div className="gm-root">
      <Navbar />

      <main className="gm-container gm-mt-24 gm-mb-100">
        
        {/* --- Hero Section --- */}
        <section className="gm-hero gm-animate gm-mb-100" style={{ textAlign: 'center' }}>
          <div className="gm-flex-col-gap-24" style={{ alignItems: 'center' }}>
            <Badge variant="primary" size="lg">Ultimate Data Grid</Badge>
            <h1 className="gm-hero-title">Master <br />Specification</h1>
            <p className="gm-hero-desc">정렬, 검색, 고정 레이아웃이 통합된 엔터프라이즈급 데이터 시스템입니다.</p>
          </div>
        </section>

        <div className="gm-flex-col-gap-140">
          {/* 01. Cell Merging */}
          <Section index="01" title="Merging" desc="Hierarchical Data Structure">
            <Table simpleHeaders={["Group", "Module", "Details", "Status", "Last Scan"]} density={density}>
              <tr>
                <td rowSpan={2} className={`${styles.cellLabel} ${styles.idCell}`} style={{ background: 'var(--gm-gray-50)' }}>Core</td>
                <td>Database Node</td>
                <td>PostgreSQL Cluster HA</td>
                <td><Badge variant="success">OK</Badge></td>
                <td className="gm-font-mono">2026.04.16</td>
              </tr>
              <tr>
                <td>Auth Service</td>
                <td>OAuth 2.0 Integration</td>
                <td><Badge variant="success">OK</Badge></td>
                <td className="gm-font-mono">2026.04.16</td>
              </tr>
            </Table>
          </Section>

          {/* 02. Enterprise Grid */}
          <Section index="02" title="Interaction" desc="Real-time Data Control">
            <Table
              simpleHeaders={[
                { key: "name", label: "Name", sortable: true },
                { key: "email", label: "Email", sortable: true },
                { key: "role", label: "Role", sortable: false },
                { key: "status", label: "Status", sortable: true },
                { key: "actions", label: "", sortable: false }
              ]}
              totalCount={filteredData.length}
              selectedCount={vSelectedIds.length}
              isAllSelected={vSelectedIds.length > 0 && vSelectedIds.length === filteredData.length}
              onSelectAll={(checked) => setVSelectedIds(checked ? filteredData.map(d => d.id) : [])}
              density={density}
              isLoading={isLoading}
              sortConfig={sort1}
              onSort={(key) => handleSortChange(setSort1, sort1, key)}
              topActions={
                <div className={styles.topActions}>
                  <div className={styles.searchArea}><SearchBar placeholder="Search members..." value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery("")} /></div>
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
              {filteredData.map(u => (
                <tr key={u.id}>
                  <td style={{ width: '60px', textAlign: 'center' }}><Checkbox checked={vSelectedIds.includes(u.id)} onChange={() => toggleSelection(u.id)} /></td>
                  <td><div className="gm-avatar-row"><Avatar initials={u.name.charAt(0)} size="sm" /><span className="gm-user-name">{u.name}</span></div></td>
                  <td className="gm-font-mono">{u.email}</td>
                  <td><Badge variant="neutral">{u.role}</Badge></td>
                  <td><Badge variant={u.status === "Active" ? "info" : "warning"}>{u.status}</Badge></td>
                  <td className={styles.actionCell}>
                    <Dropdown trigger={<Button variant="ghost" size="sm">•••</Button>} items={[{ label: "Edit", onClick: () => setShowToast(true) }, { label: "Details", onClick: () => setShowToast(true) }]} />
                  </td>
                </tr>
              ))}
            </Table>
          </Section>

          {/* 03. Frozen Grid Layouts */}
          <Section index="03" title="Layouts" desc="High-Volume Data Management">
            <div className={styles.container}>
              <div>
                <span className="gm-label" style={{ marginBottom: '16px', display: 'block' }}>Frozen Header (Vertical Only)</span>
                <Table 
                  simpleHeaders={[
                    {key:"id", label:"Identifier", sortable:true}, 
                    {key:"status", label:"Status", sortable:true}, 
                    {key:"cpu", label:"CPU Load", sortable:true}, 
                    {key:"memory", label:"RAM Usage", sortable:true},
                    {key:"owner", label:"Owner", sortable:true}
                  ]} 
                  maxHeight="300px" stickyHeader density={density}
                  sortConfig={sort3} onSort={(key) => handleSortChange(setSort3, sort3, key)}
                >
                  {sortedFrozen3.map(d => (
                    <tr key={d.id}>
                      <td className="gm-font-mono">{d.id}</td>
                      <td><Badge variant={d.status === "Active" ? "success" : "neutral"}>{d.status}</Badge></td>
                      <td className={styles.cellLabel}>{d.cpu}</td>
                      <td>{d.memory}</td>
                      <td>{d.owner}</td>
                    </tr>
                  ))}
                </Table>
              </div>

              <div>
                <span className="gm-label" style={{ marginBottom: '16px', display: 'block' }}>Bidirectional Frozen (16 Columns)</span>
                <Table 
                  simpleHeaders={[
                    {key:"id", label:"Node ID", sortable:true}, "Status", "Name", "CPU", "RAM", "Region", "Uptime", "Owner", "Cluster", "Zone", "Version", "Stable", "Backup", "Network", "Latency", "Traffic"
                  ]} 
                  maxHeight="350px" stickyHeader stickyColumn density={density}
                  sortConfig={sort2} onSort={(key) => handleSortChange(setSort2, sort2, key)}
                >
                  {sortedFrozen2.map(d => (
                    <tr key={d.id}>
                      <td className={`${styles.cellLabel} ${styles.idCell}`}>{d.id}</td>
                      <td><Badge variant="info">{d.status}</Badge></td>
                      <td>{d.name}</td>
                      <td className={styles.cellLabel}>{d.cpu}</td>
                      <td>{d.memory}</td>
                      <td>{d.region}</td>
                      <td>{d.uptime}</td>
                      <td>{d.owner}</td>
                      <td>{d.cluster}</td>
                      <td>{d.zone}</td>
                      <td className="gm-font-mono">{d.security}</td>
                      <td>Yes</td>
                      <td><Badge variant="outline-success" size="sm">Done</Badge></td>
                      <td>Gigabit</td>
                      <td>{d.latency}</td>
                      <td>{d.traffic}</td>
                    </tr>
                  ))}
                </Table>
              </div>

              <div>
                <span className="gm-label" style={{ marginBottom: '16px', display: 'block' }}>Frozen Column Analytics (10 Columns)</span>
                <Table 
                  simpleHeaders={[
                    {key:"id", label:"Fixed ID", sortable:true}, "Region", "Traffic", "Latency", "Uptime", "Cluster", "Node Type", "Current Load", "Team", "Env"
                  ]} 
                  stickyColumn density={density}
                  sortConfig={sort4} onSort={(key) => handleSortChange(setSort4, sort4, key)}
                >
                  {sortedFrozen4.map(d => (
                    <tr key={d.id}>
                      <td className={`${styles.cellLabel} ${styles.idCell}`}>{d.id}</td>
                      <td>{d.region}</td>
                      <td className={styles.cellLabel}>{d.traffic}</td>
                      <td>{d.latency}</td>
                      <td>{d.uptime}</td>
                      <td>{d.cluster}</td>
                      <td>Worker</td>
                      <td>Balanced</td>
                      <td>{d.owner}</td>
                      <td>Prod</td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer className="gm-footer gm-mt-100">
        <div className="gm-container gm-footer-inner">
          <span className="gm-label">GEMINI MASTER UI SYSTEM © 2026</span>
          <div className="gm-flex-wrap" style={{ gap: '32px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gm-gray-400)', cursor: 'pointer' }}>DOCUMENTATION</span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gm-gray-400)', cursor: 'pointer' }}>GITHUB</span>
          </div>
        </div>
      </footer>

      {showToast && <Toast message={isLoading ? "Updating Data..." : "Action Successful"} variant={isLoading ? "info" : "success"} onClose={() => setShowToast(false)} />}
    </div>
  );
}
