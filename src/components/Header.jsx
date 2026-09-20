import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Landmark, 
  FileText, 
  UserCheck, 
  Zap, 
  Search,
  Bell
} from 'lucide-react';
import { ENTERPRISE_METRICS } from '../data/mockData';

export default function Header({ currentRole, setCurrentRole, activeTab }) {
  const roles = [
    { id: 'Risk Officer', label: 'Chief Risk Officer (CRO)' },
    { id: 'Fraud Analyst', label: 'Senior Fraud Analyst' },
    { id: 'Compliance Manager', label: 'Compliance & AML Lead' },
    { id: 'Auditor', label: 'External Regulator / Auditor' }
  ];

  return (
    <header className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '1rem' }}>
      {/* Top Title & Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, var(--primary-500), var(--cyan-500))', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 15px var(--primary-glow)' 
          }}>
            <ShieldAlert size={24} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(90deg, #FFFFFF, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Risk, Fraud & Regulatory Intelligence Copilot
              </h1>
              <span className="badge badge-primary">Enterprise v4.2</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Unified Banking & NBFC Real-time Telemetry, Governed RAG, and Audit-Ready Regulatory Filings
            </p>
          </div>
        </div>

        {/* Right Status Badges & Persona Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.8)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
            <span className="status-dot status-dot-active"></span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600 }}>SWIFT & Core Banking Engine Live</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>3,420 tps</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={16} color="var(--primary-400)" />
            <select 
              value={currentRole} 
              onChange={(e) => setCurrentRole(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                color: 'var(--text-main)',
                border: '1px solid var(--primary-glow)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Metrics Dashboard Strip */}
      <div className="grid-4" style={{ marginTop: '0.85rem' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Fraud Exposure</span>
            <Zap size={16} color="var(--rose-400)" />
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--rose-400)', marginTop: '4px' }}>
            {ENTERPRISE_METRICS.fraudExposure}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--rose-400)', marginTop: '2px' }}>
            {ENTERPRISE_METRICS.fraudExposureChange}
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Liquidity Coverage (LCR)</span>
            <Landmark size={16} color="var(--emerald-400)" />
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--emerald-400)', marginTop: '4px' }}>
            {ENTERPRISE_METRICS.lcrRatio}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--emerald-400)', marginTop: '2px' }}>
            Regulatory Min: {ENTERPRISE_METRICS.lcrMinRequirement} ({ENTERPRISE_METRICS.lcrStatus})
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Basel Capital Adequacy</span>
            <Activity size={16} color="var(--cyan-400)" />
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--cyan-400)', marginTop: '4px' }}>
            {ENTERPRISE_METRICS.carRatio}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Tier 1 Baseline: {ENTERPRISE_METRICS.carMinRequirement}
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active SAR & Regulatory Filings</span>
            <FileText size={16} color="var(--amber-400)" />
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--amber-400)', marginTop: '4px' }}>
            {ENTERPRISE_METRICS.activeSARs} Filings
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--amber-400)', marginTop: '2px' }}>
            {ENTERPRISE_METRICS.pendingAudits} Pending Audit Sign-offs
          </div>
        </div>
      </div>
    </header>
  );
}
