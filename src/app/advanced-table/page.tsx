"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar, Table, Badge, Button, Checkbox, Pagination, Avatar } from "@/components/ui";

const Section = ({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) => (
  <section className="gm-section">
    <div className="gm-container">
      <div className="gm-section-header">
        <h2 className="gm-title-md">{title}</h2>
        <p className="gm-section-desc">{desc}</p>
      </div>
      {children}
    </div>
  </section>
);

export default function AdvancedTableShowcase() {
  const [vSelectedIds, setVSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const vData = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? "Byungheon Jung" : "Sarah Connor",
    email: `member${i+1}@gemini-ui.com`,
    status: i % 2 === 0 ? "Active" : "Disabled"
  }));

  // Data for Frozen Table
  const frozenData = Array.from({ length: 20 }, (_, i) => ({
    id: `NODE-${i + 1}`,
    name: `Cluster Node ${i + 1}`,
    region: i % 3 === 0 ? "Asia-East" : i % 3 === 1 ? "US-West" : "EU-Central",
    status: i % 4 === 0 ? "Active" : "Idle",
    cpu: `${Math.floor(Math.random() * 100)}%`,
    memory: `${Math.floor(Math.random() * 100)}%`,
    disk: `${Math.floor(Math.random() * 100)}%`,
    uptime: `${Math.floor(Math.random() * 1000)}h`,
    traffic: `${(Math.random() * 10).toFixed(2)} GB/s`,
    latency: `${Math.floor(Math.random() * 50)}ms`,
    backup: i % 5 === 0 ? "Completed" : "Pending",
  }));

  return (
    <div className="gm-root">
      <Navbar />

      <div className="gm-hero">
        <div className="gm-container">
          <Badge variant="info">Table Pro</Badge>
          <h1 className="gm-hero-title">ADVANCED <br/> <span style={{ opacity: 0.1 }}>TABLES.</span></h1>
          <p className="gm-hero-desc">
            복잡한 데이터 구조를 위한 Rowspan/Colspan 지원 및 <br/>
            상하좌우 고정(Frozen) 그리드 시스템입니다.
          </p>
        </div>
      </div>

      <Section title="Rowspan & Colspan" desc="시맨틱한 셀 병합을 통해 복잡한 계층 구조의 데이터를 표현합니다.">
        <Table 
          simpleHeaders={["Category", "Feature", "Details", "Status"]}
        >
          <tr>
            <td rowSpan={3} className="gm-font-bold-lg" style={{ verticalAlign: 'top', background: 'var(--gm-gray-50)' }}>Infrastructure</td>
            <td>Compute Engine</td>
            <td>High-performance virtual machines</td>
            <td><Badge variant="success">Operational</Badge></td>
          </tr>
          <tr>
            <td>Cloud Storage</td>
            <td>Scalable object storage system</td>
            <td><Badge variant="success">Operational</Badge></td>
          </tr>
          <tr>
            <td>Edge Network</td>
            <td>Global content delivery network</td>
            <td><Badge variant="warning">Maintenance</Badge></td>
          </tr>
          <tr>
            <td rowSpan={2} className="gm-font-bold-lg" style={{ verticalAlign: 'top', background: 'var(--gm-gray-50)' }}>Security</td>
            <td>Identity Management</td>
            <td>OAuth 2.0 & SAML integration</td>
            <td><Badge variant="success">Operational</Badge></td>
          </tr>
          <tr>
            <td>Threat Detection</td>
            <td>AI-powered security monitoring</td>
            <td><Badge variant="info">Scanning</Badge></td>
          </tr>
          <tr>
            <td colSpan={3} style={{ textAlign: 'right', fontWeight: 800 }}>System Health Score</td>
            <td className="gm-font-bold-lg">98/100</td>
          </tr>
        </Table>
      </Section>

      <Section title="Frozen Header (Vertical)" desc="데이터가 많아도 헤더를 상단에 고정하여 맥락을 잃지 않습니다.">
        <Table 
          simpleHeaders={["Node ID", "Status", "CPU", "Memory", "Traffic", "Latency"]}
          maxHeight="400px"
          stickyHeader
        >
          {frozenData.map(d => (
            <tr key={d.id}>
              <td className="gm-font-mono">{d.id}</td>
              <td><Badge variant={d.status === "Active" ? "info" : "neutral"}>{d.status}</Badge></td>
              <td className="gm-font-bold-lg">{d.cpu}</td>
              <td>{d.memory}</td>
              <td>{d.traffic}</td>
              <td className="gm-font-mono">{d.latency}</td>
            </tr>
          ))}
        </Table>
      </Section>

      <Section title="Frozen Column (Horizontal)" desc="가로로 긴 테이블에서 주요 식별자(ID)를 왼쪽에 고정합니다.">
        <Table 
          simpleHeaders={["Node Identifier", "Node Name", "Region", "Status", "Uptime", "Backup Status", "Disk Usage", "Network Load", "Security Patch"]}
          stickyColumn
        >
          {frozenData.slice(0, 5).map(d => (
            <tr key={d.id}>
              <td className="gm-font-bold-lg" style={{ background: 'white' }}>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.region}</td>
              <td><Badge variant="info">{d.status}</Badge></td>
              <td className="gm-font-mono">{d.uptime}</td>
              <td><Badge variant="outline-success">{d.backup}</Badge></td>
              <td>{d.disk}</td>
              <td>{d.traffic}</td>
              <td>v1.4.2</td>
            </tr>
          ))}
        </Table>
      </Section>

      <Section title="Both Frozen (Bidirectional)" desc="상하좌우 모든 방향으로 스크롤하면서도 헤더와 첫 열을 고정합니다.">
        <Table 
          simpleHeaders={["Node Identifier", "Node Name", "Region", "Status", "CPU", "Memory", "Disk", "Uptime", "Traffic", "Latency", "Backup"]}
          maxHeight="450px"
          stickyHeader
          stickyColumn
        >
          {frozenData.map(d => (
            <tr key={d.id}>
              <td className="gm-font-bold-lg" style={{ background: 'white' }}>{d.id}</td>
              <td style={{ minWidth: '200px' }}>{d.name}</td>
              <td style={{ minWidth: '150px' }}>{d.region}</td>
              <td><Badge variant={d.status === "Active" ? "info" : "neutral"}>{d.status}</Badge></td>
              <td className="gm-font-bold-lg">{d.cpu}</td>
              <td>{d.memory}</td>
              <td>{d.disk}</td>
              <td>{d.uptime}</td>
              <td>{d.traffic}</td>
              <td>{d.latency}</td>
              <td><Badge variant="outline-info">{d.backup}</Badge></td>
            </tr>
          ))}
        </Table>
      </Section>

      <Section title="Data Grids" desc="상하 및 좌우 스크롤링을 모두 지원하는 강력한 그리드 시스템입니다.">
        <div className="gm-flex-col-gap-80">
          <div className="gm-flex-col-gap-32">
            <div className="gm-table-header">
              <h3 className="gm-title-md" style={{ fontSize: '28px' }}>1. Vertical Scrolling View</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span className="gm-label-simple">{vData.length} TOTAL ITEMS</span>
              </div>
            </div>
            <Table
              simpleHeaders={["Member Name", "Identifier", "Status"]}
              totalCount={vData.length}
              selectedCount={vSelectedIds.length}
              isAllSelected={vSelectedIds.length === vData.length}
              onSelectAll={(checked: boolean) => setVSelectedIds(checked ? vData.map(d => d.id) : [])}
              maxHeight="400px"
            >
              {vData.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Checkbox checked={vSelectedIds.includes(u.id)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVSelectedIds(e.target.checked ? [...vSelectedIds, u.id] : vSelectedIds.filter(id => id !== u.id))} />
                    </div>
                  </td>
                  <td style={{ minWidth: '200px', whiteSpace: 'nowrap' }}>
                    <div className="gm-avatar-row">
                      <Avatar initials={u.name ? u.name.charAt(0) : "U"} size="sm" />
                      <span className="gm-user-name">{u.name}</span>
                    </div>
                  </td>
                  <td className="gm-font-mono">{u.email}</td>
                  <td><Badge variant={u.status === "Active" ? "info" : "success"}>{u.status}</Badge></td>
                </tr>
              ))}
            </Table>
          </div>

          <div className="gm-flex-col-gap-32">
            <h3 className="gm-label">2. Horizontal Analytics View</h3>
            <Table simpleHeaders={["ID", "Project Name", "Cluster", "Owner", "Traffic", "Uptime", "Latency", "Status", "Deployment"]} totalCount={5}>
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i}>
                  <td className="gm-font-mono" style={{ color: 'var(--gm-gray-400)' }}>#00{i}</td>
                  <td className="gm-font-bold-lg">Enterprise Node {i}</td>
                  <td>Cluster-Alpha</td>
                  <td>Byungheon Jung</td>
                  <td className="gm-font-bold-lg" style={{ fontSize: '15px' }}>2.4 TB</td>
                  <td>99.99%</td>
                  <td className="gm-font-mono">12ms</td>
                  <td><Badge variant="info">Online</Badge></td>
                  <td className="gm-font-mono">2026.04.14</td>
                </tr>
              ))}
            </Table>
            <div className="gm-pagination-container">
              <Pagination currentPage={currentPage} totalPages={10} onPageChange={(p: number) => setCurrentPage(p)} />
            </div>
          </div>
        </div>
      </Section>

      <footer className="gm-footer">
        <div className="gm-container gm-footer-inner">
          <div>
            <span className="gm-footer-logo-text">GEMINI UI ADVANCED</span>
            <p className="gm-section-desc gm-mt-16">Pure CSS Grid & Table Systems</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
