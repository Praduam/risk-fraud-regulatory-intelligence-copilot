import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  Copy, 
  Check, 
  CheckCircle2,
  Lock,
  Stamp
} from 'lucide-react';

export default function AuditReportView({ signal, policy }) {
  const [copied, setCopied] = useState(false);
  const [filingStatus, setFilingStatus] = useState('Draft Prepared'); // 'Draft Prepared' | 'Filed & Logged'

  const sarNumber = `SAR-2026-${signal?.id || '98402'}-FIN`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  const narrativeText = `ON SEPTEMBER 20, 2026, AUTOMATED REAL-TIME TELEMETRY MONITORING IDENTIFIED A SUSPICIOUS SERIES OF TRANSACTIONS ORIGINATING FROM ACCOUNT ${signal?.account || 'ACC-8849201'} AGGREGATING ${signal?.details?.velocity24h || '$710,000 USD'}. INDIVIDUAL TRANSFER AMOUNTS (${signal?.amount || '$240,000 USD'}) EXABILITY INDICATORS OF INTENTIONAL STRUCTURING TO EVADE THE $250,000 EXECUTIVE APPROVAL THRESHOLD IN BREACH OF ${policy?.code || 'FinCEN § 1010.311'}. DEVICE GEOLOCATION AND IP FINGERPRINTING REVEALED UNRECOGNIZED ROUTING VIA KNOWN HIGH-RISK ANONYMIZATION NODES TO COUNTERPARTY ENTITY IN OFFSHORE FINANCIAL CENTER JURISDICTION. THE COMPLIANCE OFFICER RECOMMENDS IMMEDIATE ACCOUNT RESTRAINT AND REGULATORY AUDIT ESCALATION.`;

  const handlePrint = () => {
    window.print();
  };

  const handleFileSAR = () => {
    setFilingStatus('Filed & Logged in Regulatory Audit Ledger');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(narrativeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Printable Action Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <ShieldCheck size={24} color="var(--emerald-400)" />
          <div>
            <h3 style={{ fontSize: '1.1rem' }}>Audit-Ready Regulatory Output</h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--emerald-400)', fontWeight: 600 }}>
              Status: {filingStatus}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button className="btn-secondary" onClick={handleCopy}>
            {copied ? <Check size={16} color="var(--emerald-400)" /> : <Copy size={16} />}
            <span>{copied ? 'Copied Narrative' : 'Copy Narrative'}</span>
          </button>
          
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print / Save PDF</span>
          </button>

          <button className="btn-primary" onClick={handleFileSAR} disabled={filingStatus.includes('Filed')}>
            <Lock size={16} />
            <span>{filingStatus.includes('Filed') ? 'Filing Immutable' : 'Submit & Sign Regulatory Filing'}</span>
          </button>
        </div>
      </div>

      {/* Official Audit Document Paper Simulation */}
      <div 
        id="printable-sar-document"
        style={{
          background: '#0D1322',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          color: '#F8FAFC',
          fontFamily: 'var(--font-body)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        {/* Official Header */}
        <div style={{ borderBottom: '2px solid var(--primary-500)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-400)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              OFFICIAL FINANCIAL CRIME & REGULATORY DISCLOSURE FILING
            </div>
            <h1 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginTop: '4px' }}>
              FINANCIAL INSTITUTION SUSPICIOUS ACTIVITY REPORT (SAR)
            </h1>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Prepared under FinCEN § 1010.311 & FATF Recommendation 16 Guidance
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
              {sarNumber}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '2px' }}>
              Timestamp: {timestamp}
            </div>
          </div>
        </div>

        {/* Section A: Reporting Institution & Subject Telemetry */}
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--cyan-400)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            PART I: TELEMETRY & SUBJECT IDENTIFICATION
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)', width: '30%' }}>Reporting Institution:</td>
                <td style={{ padding: '0.5rem 0', color: '#FFFFFF', fontWeight: 600 }}>Apex Global Banking & NBFC Operations LLC</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Target Account / Entity:</td>
                <td style={{ padding: '0.5rem 0', color: '#FFFFFF', fontWeight: 600 }}>{signal?.account || 'ACC-8849201 (Apex Global Corp)'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Flagged Signal / Anomaly:</td>
                <td style={{ padding: '0.5rem 0', color: 'var(--rose-400)', fontWeight: 700 }}>{signal?.signalType || 'AML Structuring & Off-shore Velocity'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Transaction Amount & Velocity:</td>
                <td style={{ padding: '0.5rem 0', color: 'var(--emerald-400)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{signal?.amount || '$240,000 USD'} (24h Total: {signal?.details?.velocity24h || '$710,000 USD'})</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section B: Cited Policy & Governance Rules */}
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--amber-400)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            PART II: GOVERNED REGULATORY RULES BREACHED
          </div>
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.82rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--amber-400)', marginBottom: '0.25rem' }}>
              {policy?.code || 'FinCEN § 1010.311'} - {policy?.title || 'Currency Structuring & SAR Provisions'}
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              {policy?.summary || 'Mandates filing of SAR for transactions evading reporting thresholds or exhibiting unexplainable velocity.'}
            </div>
          </div>
        </div>

        {/* Section C: Executive Evidence Narrative */}
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            PART III: DETAILED EVIDENCE NARRATIVE
          </div>
          <div className="code-block" style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.6', background: '#070B14' }}>
            {narrativeText}
          </div>
        </div>

        {/* Section D: Verification Audit Stamp */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prepared By:</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-400)' }}>
              Risk, Fraud & Regulatory Intelligence Copilot v4.2 Engine
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--emerald-500)' }}>
            <CheckCircle2 size={18} color="var(--emerald-400)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--emerald-400)', fontFamily: 'var(--font-mono)' }}>
              AUDIT STAMP: VERIFIED & SEALED
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
