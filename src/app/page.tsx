"use client";

import React, { useState } from "react";
import {
  Accordion,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DateRangePicker,
  Dropdown,
  EmptyState,
  Input,
  Modal,
  MultiSelect,
  Navbar,
  Pagination,
  ProgressBar,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Switch,
  Table,
  Tabs,
  Textarea,
  ToastContainer,
  Tooltip,
  Drawer,
  SearchBar,

  type ToastType, // 타입 추가
  type ToastItem, // 타입 추가
} from "@/components/ui";

export default function Home() {
  // --- States for Intelligent Inputs ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"standard" | "action" | "destructive">("standard");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerPos, setDrawerPos] = useState<"left" | "right">("right");
  const [drawerSize, setDrawerSize] = useState<"md" | "lg">("md");
  
  // 멀티 토스트 전용 상태
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  
  const [inputValue, setInputValue] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("gmail.com");
  const [directDomain, setDirectDomain] = useState("");
  const [isDirectInput, setIsDirectInput] = useState(false);

  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>(["next", "ts", "react", "tailwind", "node", "py"]);
  
  const [startDate, setStartDate] = useState("2026-04-15");
  const [endDate, setEndDate] = useState("2026-04-20");
  const [checkedItems, setCheckedItems] = useState<string[]>(["read", "write"]);
  const [radioValue, setRadioValue] = useState("medium");
  const [switchState, setSwitchState] = useState(true);
  const [passwordValue, setPasswordValue] = useState("gemini_master_123");

  // --- Constants ---
  const options = [
    { label: "Next.js", value: "next" },
    { label: "React", value: "react" },
    { label: "TypeScript", value: "ts" },
    { label: "Tailwind CSS", value: "tailwind" },
    { label: "Node.js", value: "node" },
    { label: "Python", value: "py" },
  ];

  const groupOptions = [
    { label: "Read Access", value: "read" },
    { label: "Write Access", value: "write" },
    { label: "Delete Access", value: "delete", disabled: true },
    { label: "Admin Sync", value: "sync" },
  ];

  const radioOptions = [
    { label: "Small 48px", value: "small" },
    { label: "Medium 60px", value: "medium" },
    { label: "Large 72px", value: "large" },
  ];

  const domainOptions = [
    { label: "gmail.com", value: "gmail.com" },
    { label: "naver.com", value: "naver.com" },
    { label: "daum.net", value: "daum.net" },
    { label: "직접 입력", value: "direct" },
  ];

  // --- Icons ---
  const PlusIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  const MailIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const SearchIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

  // --- Handlers ---
  const handleShowToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, message, type, duration: 3000 };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDomainChange = (val: string) => {
    if (val === "direct") {
      setIsDirectInput(true);
      setEmailDomain("");
    } else {
      setIsDirectInput(false);
      setEmailDomain(val);
    }
  };

  return (
    <div className="gm-root">
      <Navbar />

      <main className="gm-container gm-mt-24 gm-mb-100">
        
        {/* --- Hero Section --- */}
        <section className="gm-hero gm-animate gm-mb-100" style={{ textAlign: 'center' }}>
          <div className="gm-flex-col-gap-24" style={{ alignItems: 'center' }}>
            <Badge variant="primary" size="lg">Ultimate Master Edition v3.0</Badge>
            <h1 className="gm-hero-title">Universal <br />Specification</h1>
            <p className="gm-hero-desc">정밀한 간격 설계와 일렬 배치를 통한 최상의 가독성 환경입니다.</p>
          </div>
        </section>

        <div className="gm-flex-col-gap-140">
          
          {/* 01. BUTTON SYSTEM */}
          <section className="gm-animate">
            <header className="gm-section-header">
              <span className="gm-label">01. Buttons</span>
              <h2 className="gm-title-md">Action Components</h2>
            </header>
            
            <div className="gm-flex-col-gap-48">
              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Variants & Icons</span>
                <div className="gm-flex-wrap" style={{ alignItems: 'center', gap: '16px' }}>
                  <Button variant="primary" leftIcon={PlusIcon}>Primary Left Icon</Button>
                  <Button variant="secondary" rightIcon={MailIcon}>Secondary Right Icon</Button>
                  <Button variant="outline" leftIcon={SearchIcon} rightIcon={PlusIcon}>Dual Icon Button</Button>
                  <Button variant="danger" leftIcon={MailIcon}>Danger with Icon</Button>
                </div>
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Size Variations</span>
                <div className="gm-flex-wrap" style={{ alignItems: 'center', gap: '16px' }}>
                  <Button size="lg">Large 72px</Button>
                  <Button size="md">Medium 60px</Button>
                  <Button size="sm">Small 48px</Button>
                </div>
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Interaction States</span>
                <div className="gm-flex-wrap" style={{ alignItems: 'center', gap: '16px' }}>
                  <Button isLoading>Loading State</Button>
                  <Button disabled>Disabled State</Button>
                  <Button variant="outline" fullWidth>Full Width Primary Button</Button>
                </div>
              </div>
            </div>
          </section>

          {/* 02. BADGE & IDENTITY */}
          <section className="gm-animate">
            <header className="gm-section-header">
              <span className="gm-label">02. Identity</span>
              <h2 className="gm-title-md">Badges & Avatars</h2>
            </header>

            <div className="gm-flex-col-gap-48">
              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Badge Sizes & Colors</span>
                <div className="gm-flex-wrap" style={{ alignItems: 'center' }}>
                  <Badge size="lg" variant="primary">Large Badge</Badge>
                  <Badge size="md" variant="success">Success</Badge>
                  <Badge size="sm" variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Avatar Complex States</span>
                <div className="gm-flex-wrap" style={{ alignItems: 'center', gap: '32px' }}>
                  <Avatar name="Jung" size="xl" status="online" />
                  <Avatar name="Sarah" size="lg" status="busy" src="https://i.pravatar.cc/150?u=1" />
                  <Avatar name="Alex" size="md" status="away" />
                  <Avatar name="Square" variant="square" size="lg" status="online" />
                  <div style={{ display: 'flex' }}>
                    <Avatar name="A" size="sm" className="gm-avatar-stack" />
                    <Avatar name="B" size="sm" className="gm-avatar-stack" />
                    <Avatar name="C" size="sm" className="gm-avatar-stack" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 03. FORM ELEMENTS */}
          <section className="gm-animate">
            <header className="gm-section-header">
              <span className="gm-label">03. Forms</span>
              <h2 className="gm-title-md">Data Entry System</h2>
            </header>

            <div className="gm-flex-col-gap-60" style={{ maxWidth: '800px' }}>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Premium Search Bar</span>
                <SearchBar 
                  placeholder="Search projects, members, or settings..." 
                  onSearch={(val) => handleShowToast(`Searching for: ${val}`, "info")}
                />
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Composite Email (Dynamic Domain)</span>

                <div className="gm-flex-col-gap-16">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <Input placeholder="이메일 아이디" value={emailId} onChange={(e) => setEmailId(e.target.value)} onClear={() => setEmailId("")} />
                    </div>
                    <div style={{ paddingTop: '20px', fontWeight: 900, fontSize: '20px', color: 'var(--gm-gray-300)' }}>@</div>
                    <div style={{ flex: 1 }}>
                      {isDirectInput ? (
                        <Input placeholder="도메인 직접 입력" value={directDomain} onChange={(e) => setDirectDomain(e.target.value)} onClear={() => { setIsDirectInput(false); setDirectDomain(""); }} />
                      ) : (
                        <Select options={domainOptions} value={emailDomain} onChange={handleDomainChange} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Standard Fields & Errors</span>
                <div className="gm-flex-col-gap-32">
                  <Input label="Display Name" placeholder="Your full name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onClear={() => setInputValue("")} />
                  <Input 
                    label="Account Password" 
                    type="password" 
                    placeholder="Enter secure password" 
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    onClear={() => setPasswordValue("")}
                  />
                  <Input label="Security Check" defaultValue="user@invalid" error="입력하신 이메일 형식이 시스템 보안 규정에 맞지 않습니다." />
                  <Textarea label="Project Vision" placeholder="Describe your long-term goals..." maxLength={200} value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} onClear={() => setTextareaValue("")} />
                </div>
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Field Size Variations</span>
                <div className="gm-flex-col-gap-16">
                  <Input size="sm" placeholder="Small Input 48px" />
                  <Input size="md" placeholder="Medium Input 60px (Default)" />
                  <Input size="lg" placeholder="Large Input 72px" />
                </div>
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Advanced Selections</span>
                <div className="gm-flex-col-gap-32">
                  <Select label="Single Choice" options={options} value={selectValue} onChange={setSelectValue} />
                  <div className="gm-flex-col-gap-16">
                    <span className="gm-label">Select Sizes</span>
                    <Select size="sm" options={options} value={selectValue} onChange={setSelectValue} placeholder="Small Select" />
                    <Select size="lg" options={options} value={selectValue} onChange={setSelectValue} placeholder="Large Select" />
                  </div>
                  <MultiSelect label="Capabilities (Responsive + Clear All)" options={options} value={multiValue} onChange={setMultiValue} />
                </div>
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Temporal Selection</span>
                <div className="gm-flex-col-gap-32">
                  <DateRangePicker label="Project Schedule" startDate={startDate} endDate={endDate} onStartChange={setStartDate} onEndChange={setEndDate} />
                  <DatePicker label="Final Milestone" value={startDate} onChange={setStartDate} />
                </div>
              </div>

              <div className="gm-flex-col-gap-12">
                <span className="gm-label">Choices & States</span>
                <div className="gm-flex-col-gap-40">
                  <div className="gm-flex-col-gap-16">
                    <span className="gm-label">Switches</span>
                    <div className="gm-flex-wrap" style={{ gap: '24px' }}>
                      <Switch label="Active Sync" checked={switchState} onChange={(e) => setSwitchState(e.target.checked)} />
                      <Switch label="Disabled Off" disabled />
                      <Switch label="Disabled On" disabled checked />
                    </div>
                  </div>
                  
                  <div className="gm-flex-col-gap-16">
                    <span className="gm-label">Checkboxes (Size Variations & States)</span>
                    <div className="gm-flex-wrap" style={{ gap: '32px' }}>
                      <Checkbox label="Small 48px" size="sm" defaultChecked />
                      <Checkbox label="Medium 60px" size="md" defaultChecked />
                      <Checkbox label="Large 72px" size="lg" defaultChecked />
                      <Checkbox label="Disabled" disabled />
                      <Checkbox label="Disabled Active" disabled defaultChecked />
                    </div>
                  </div>

                  <div className="gm-flex-col-gap-16">
                    <span className="gm-label">Radio Buttons (Size Variations & States)</span>
                    <div className="gm-flex-wrap" style={{ gap: '32px' }}>
                      <Radio label="Small 48px" name="sz1" size="sm" defaultChecked />
                      <Radio label="Medium 60px" name="sz2" size="md" defaultChecked />
                      <Radio label="Large 72px" name="sz3" size="lg" defaultChecked />
                      <Radio label="Disabled" name="ds1" disabled />
                      <Radio label="Disabled Active" name="ds2" disabled defaultChecked />
                    </div>
                  </div>

                  <div className="gm-flex-col-gap-32" style={{ borderTop: '1px solid var(--gm-gray-100)', paddingTop: '32px' }}>
                    <div className="gm-flex-col-gap-16">
                      <span className="gm-label">Complex Selection Groups (Group Size Control)</span>
                      <div className="gm-flex-wrap" style={{ gap: '60px', alignItems: 'flex-start' }}>
                        <CheckboxGroup 
                          label="Access Control Group (Small)" 
                          size="sm"
                          options={groupOptions} 
                          value={checkedItems} 
                          onChange={setCheckedItems} 
                        />
                        <RadioGroup 
                          label="Size Selection Group (Large)" 
                          name="size-group"
                          size="lg"
                          options={radioOptions} 
                          value={radioValue} 
                          onChange={setRadioValue} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 04. DATA DISPLAY */}
          <section className="gm-animate">
            <header className="gm-section-header">
              <span className="gm-label">04. Display</span>
              <h2 className="gm-title-md">Information Visualization</h2>
            </header>

            <div className="gm-flex-col-gap-60">
              
              <div className="gm-flex-col-gap-16">
                <span className="gm-label">Detailed Data Table</span>
                <Table totalCount={256} simpleHeaders={["Member Profile", "Status", "Activity", "Actions"]}>
                  <tr>
                    <td>
                      <div className="gm-flex-wrap" style={{ alignItems: 'center', gap: '12px' }}>
                        <Avatar name="JB" size="sm" status="online" />
                        <span className="gm-user-name">Jung Byungheon</span>
                      </div>
                    </td>
                    <td><Badge variant="success">Synchronized</Badge></td>
                    <td style={{ width: '240px' }}><ProgressBar value={92} size="sm" isAnimated /></td>
                    <td>
                      <Dropdown 
                        trigger={<Button variant="outline" size="sm">Manage</Button>}
                        items={[{ header: "User Ops" }, { label: "Edit Details", shortcut: "⌘E" }, { divider: true }, { label: "Terminate", variant: "danger" }]}
                      />
                    </td>
                  </tr>
                </Table>
              </div>

              <div className="gm-flex-col-gap-16">
                <span className="gm-label">Progress Bar Variations</span>
                <div className="gm-flex-col-gap-24" style={{ maxWidth: '700px' }}>
                  <ProgressBar label="System Integrity" value={100} size="lg" variant="success" />
                  <ProgressBar label="Processing Load" value={65} size="md" variant="info" isAnimated />
                  <ProgressBar label="Storage Quota" value={15} size="sm" variant="error" />
                </div>
              </div>

              <div className="gm-flex-col-gap-16">
                <span className="gm-label">Extended Navigation Tabs (10 Items)</span>
                <Tabs tabs={[
                  { id: '1', label: 'Overview', content: <div className="gm-mt-16">Main system summary and insights.</div> },
                  { id: '2', label: 'Security', content: <div className="gm-mt-16">Firewall and network logs.</div> },
                  { id: '3', label: 'Cluster', content: <div className="gm-mt-16">Active nodes and worker status.</div> },
                  { id: '4', label: 'Database', content: <div className="gm-mt-16">Query performance and index health.</div> },
                  { id: '5', label: 'Storage', content: <div className="gm-mt-16">Block storage and bucket metrics.</div> },
                  { id: '6', label: 'Network', content: <div className="gm-mt-16">CDN edge and DNS configurations.</div> },
                  { id: '7', label: 'API Keys', content: <div className="gm-mt-16">Access tokens and credentials.</div> },
                  { id: '8', label: 'Webhooks', content: <div className="gm-mt-16">External integration triggers.</div> },
                  { id: '9', label: 'Compliance', content: <div className="gm-mt-16">Audit logs and regulatory data.</div> },
                  { id: '10', label: 'Settings', content: <div className="gm-mt-16">Global workspace configuration.</div> },
                ]} />
              </div>

              <div className="gm-flex-col-gap-32">
                <span className="gm-label">Interactive Carousel & Accordion</span>
                <Carousel items={[
                  <div key="c1" style={{ background: '#000', color: '#fff', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h3>Premium Presentation 1</h3></div>,
                  <div key="c2" style={{ background: '#f3f3f3', color: '#000', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h3>Premium Presentation 2</h3></div>
                ]} slidesPerView="auto" spaceBetween={32} />
                
                <div className="gm-flex-col-gap-16">
                  <span className="gm-label">Stacked Card Accordions (Separated)</span>
                  <div className="gm-flex-col-gap-16">
                    <Accordion 
                      variant="separated"
                      items={[{ id: "s1", title: "Security Module", content: "Advanced military-grade encryption for all data points." }]} 
                    />
                    <Accordion 
                      variant="separated"
                      items={[{ id: "s2", title: "Performance Module", content: "Edge computing infrastructure for sub-second latency." }]} 
                    />
                  </div>
                </div>

                <div className="gm-flex-col-gap-16">
                  <span className="gm-label">Grouped FAQ System (Integrated)</span>
                  <Accordion 
                    variant="grouped"
                    items={[
                      { id: "f1", title: "How does it handle edge cases?", content: "Meticulously covered with defensive programming." },
                      { id: "f2", title: "Is it fully responsive?", content: "Every component is fluid across all screen sizes." },
                      { id: "f3", title: "Smart Positioning logic?", content: "Built-in boundary detection for all overlays." }
                    ]} 
                  />
                </div>
              </div>

              <div className="gm-flex-col-gap-48">
                <span className="gm-label">Loading & Placeholder States</span>
                <div className="gm-flex-col-gap-48">
                  <Card title="Skeletons">
                    <div className="gm-flex-col-gap-16">
                      <Skeleton variant="card" style={{ height: '120px' }} />
                    </div>
                  </Card>
                  <EmptyState title="No Search Results" description="Adjust your parameters and try again." />
                </div>
              </div>
            </div>
          </section>

          {/* 05. OVERLAYS & FEEDBACK */}
          <section className="gm-animate">
            <header className="gm-section-header">
              <span className="gm-label">05. Interaction</span>
              <h2 className="gm-title-md">Overlays & Multi-Feedback</h2>
            </header>

            <div className="gm-flex-col-gap-60">
              
              {/* Toast Variations */}
              <div className="gm-flex-col-gap-16">
                <span className="gm-label">Toast Notifications (4 Types)</span>
                <div className="gm-flex-wrap" style={{ gap: '16px' }}>
                  <Button variant="success" onClick={() => handleShowToast("Operation successful!", "success")}>Success Toast</Button>
                  <Button variant="danger" onClick={() => handleShowToast("System error occurred.", "error")}>Error Toast</Button>
                  <Button variant="warning" onClick={() => handleShowToast("Low storage warning.", "warning")}>Warning Toast</Button>
                  <Button variant="outline" onClick={() => handleShowToast("Information updated.", "info")}>Info Toast</Button>
                </div>
              </div>

              {/* Modal Variations */}
              <div className="gm-flex-col-gap-16">
                <span className="gm-label">Modal Purpose Patterns</span>
                <div className="gm-flex-wrap" style={{ gap: '16px' }}>
                  <Button onClick={() => { setModalType("standard"); setIsModalOpen(true); }}>Standard Info</Button>
                  <Button variant="secondary" onClick={() => { setModalType("action"); setIsModalOpen(true); }}>Action Form</Button>
                  <Button variant="danger" onClick={() => { setModalType("destructive"); setIsModalOpen(true); }}>Destructive Action</Button>
                </div>
              </div>

              {/* Drawer Variations */}
              <div className="gm-flex-col-gap-16">
                <span className="gm-label">Side Drawers (Position & Size)</span>
                <div className="gm-flex-wrap" style={{ gap: '16px' }}>
                  <Button variant="outline" onClick={() => { setDrawerPos("right"); setDrawerSize("md"); setIsDrawerOpen(true); }}>Standard Right</Button>
                  <Button variant="outline" onClick={() => { setDrawerPos("left"); setDrawerSize("md"); setIsDrawerOpen(true); }}>Standard Left</Button>
                  <Button variant="outline" onClick={() => { setDrawerPos("right"); setDrawerSize("lg"); setIsDrawerOpen(true); }}>Wide Detail View</Button>
                </div>
              </div>

              {/* Tooltip Directions */}
              <div className="gm-flex-col-gap-16">
                <span className="gm-label">Tooltip Directions (Smart Positioning)</span>
                <div className="gm-flex-wrap" style={{ gap: '40px', padding: '40px 0' }}>
                  <Tooltip content="Tooltip on Top" position="top"><Button variant="outline" size="sm">Top</Button></Tooltip>
                  <Tooltip content="Tooltip on Bottom" position="bottom"><Button variant="outline" size="sm">Bottom</Button></Tooltip>
                  <Tooltip content="Tooltip on Left" position="left"><Button variant="outline" size="sm">Left</Button></Tooltip>
                  <Tooltip content="Tooltip on Right" position="right"><Button variant="outline" size="sm">Right</Button></Tooltip>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="gm-flex-col-gap-32">
                <span className="gm-label">Core Navigation</span>
                <Breadcrumb items={[{label: 'Admin', href: '#'}, {label: 'Library', href: '#'}, {label: 'Interactive Specs', active: true}]} />
                <Pagination totalPages={10} currentPage={1} onPageChange={() => {}} />
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* --- Overlay Implementations (Dynamic) --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={
          modalType === "destructive" ? "Delete Database?" : 
          modalType === "action" ? "Create New Project" : "System Overview"
        } 
        description={
          modalType === "destructive" ? "이 작업은 되돌릴 수 없으며 모든 데이터가 영구 삭제됩니다." : 
          modalType === "action" ? "새로운 프로젝트 구성을 위해 정보를 입력해주세요." : "현재 시스템의 통합 상태를 확인합니다."
        } 
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button 
              variant={modalType === "destructive" ? "danger" : "primary"} 
              onClick={() => setIsModalOpen(false)}
            >
              {modalType === "destructive" ? "Delete Forever" : "Confirm"}
            </Button>
          </>
        }
      >
        <div className="gm-flex-col-gap-16">
          {modalType === "action" ? (
            <>
              <Input label="Project Name" placeholder="Enter name" />
              <Select label="Category" options={[{label: 'Software', value: 'sw'}]} value="sw" onChange={() => {}} />
            </>
          ) : (
            <p>Experience the smooth blur backdrop and professional easing of our design system.</p>
          )}
        </div>
      </Modal>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title={drawerSize === "lg" ? "Detailed Analytics" : "Quick Settings"}
        position={drawerPos}
        size={drawerSize}
        footer={<Button fullWidth onClick={() => setIsDrawerOpen(false)}>Apply Changes</Button>}
      >
        <div className="gm-flex-col-gap-32">
          {drawerSize === "lg" ? (
            <div className="gm-flex-col-gap-40">
              <ProgressBar label="Active Users" value={82} size="md" variant="success" />
              <ProgressBar label="Server Uptime" value={99} size="md" variant="info" />
              <Table simpleHeaders={["Task", "Status"]} totalCount={5}>
                <tr><td>Database Sync</td><td><Badge variant="success">OK</Badge></td></tr>
                <tr><td>CDN Refresh</td><td><Badge variant="warning">Wait</Badge></td></tr>
              </Table>
            </div>
          ) : (
            <div className="gm-flex-col-gap-24">
              <Input label="Workspace Alias" defaultValue="Gemini Master Pro" />
              <Switch label="Enable Real-time Metrics" defaultChecked />
            </div>
          )}
        </div>
      </Drawer>

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <footer className="gm-footer gm-mt-100">
        <div className="gm-container gm-footer-inner">
          <span className="gm-label">GEMINI MASTER UI SYSTEM © 2026</span>
          <div className="gm-flex-wrap" style={{ gap: '32px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gm-gray-400)', cursor: 'pointer' }}>DOCUMENTATION</span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gm-gray-400)', cursor: 'pointer' }}>GITHUB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
