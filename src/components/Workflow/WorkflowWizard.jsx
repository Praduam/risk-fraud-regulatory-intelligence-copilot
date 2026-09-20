import React, { useState } from 'react';
import { 
  Workflow, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  Download, 
  Printer, 
  ShieldCheck, 
  Copy,
  Check
} from 'lucide-react';
import { LIVE_TRANSACTIONS, REGULATORY_POLICIES } from '../../data/mockData';
import AuditReportView from './AuditReportView';

export default function WorkflowWizard({ initialSignal }) {
  const [step, setStep] = useState(1);
  const [selectedSignal, setSelectedSignal] = useState(initialSignal || LIVE_TRANSACTIONS[0]);
  const [copied, setCopied] = useState(false);

  const activePolicy = REGULATORY_POLICIES.find(p => p.code.includes('FinCEN')) || REGULATORY_POLICIES[0];

  const handleCopyNarrative = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* 3-Step Wizard Navigation Header */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Step 1 */}
          <div 
            onClick={() => setStep(1)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              cursor: 'pointer',
              opacity: step === 1 ? 1 : 0.6 
            }}
          >
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: step === 1 ? 'var(--primary-500)' : 'rgba(255,255,255,0.1)', 
              color: '#FFFFFF',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)'
            }}>
              1
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: step === 1 ? '#FFFFFF' : 'var(--text-muted)' }}>
                Signal & Anomaly Detection
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Select Telemetry Anomaly</div>
            </div>
          </div>

          <ArrowRight size={18} color="var(--text-subtle)" />

          {/* Step 2 */}
          <div 
            onClick={() => setStep(2)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              cursor: 'pointer',
              opacity: step === 2 ? 1 : 0.6 
            }}
          >
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: step === 2 ? 'var(--primary-500)' : 'rgba(255,255,255,0.1)', 
              color: '#FFFFFF',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)'
            }}>
              2
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: step === 2 ? '#FFFFFF' : 'var(--text-muted)' }}>
                Evidence & Lineage Fusion
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Package Telemetry + Policy</div>
            </div>
          </div>

          <ArrowRight size={18} color="var(--text-subtle)" />

          {/* Step 3 */}
          <div 
            onClick={() => setStep(3)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              cursor: 'pointer',
              opacity: step === 3 ? 1 : 0.6 
            }}
          >
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: step === 3 ? 'var(--emerald-500)' : 'rgba(255,255,255,0.1)', 
              color: '#FFFFFF',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)'
            }}>
              3
            </div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: step === 3 ? '#FFFFFF' : 'var(--text-muted)' }}>
                Audit-Ready Regulatory Output
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Generate & File SAR Form</div>
            </div>
          </div>

        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Step 1: Select Telemetry Anomaly Signal</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Choose a flagged transaction signal from the real-time stream to initiate the end-to-end evidence packaging process.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {LIVE_TRANSACTIONS.map(tx => (
              <div 
                key={tx.id}
                onClick={() => setSelectedSignal(tx)}
                style={{
                  background: selectedSignal.id === tx.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                  border: selectedSignal.id === tx.id ? '1px solid var(--primary-500)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>{tx.id}</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>{tx.account}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {tx.type} • {tx.signalType}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                    {tx.amount}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: tx.riskScore > 80 ? 'var(--rose-400)' : 'var(--amber-400)' }}>
                    Risk Score: {tx.riskScore}/100
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button className="btn-primary" onClick={() => setStep(2)}>
              <span>Proceed to Step 2: Evidence Packaging</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Step 2: Evidence & Policy Lineage Packaging</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Fusing account telemetry, counterparty history, IP logs, and regulatory text into an evidence package.
            </p>
          </div>

          <div className="grid-2">
            {/* Account & Transaction Evidence Box */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-400)', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                Signal Telemetry Evidence
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Transaction ID:</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{selectedSignal.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Account Name:</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{selectedSignal.account}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Wire Amount:</span>
                  <span style={{ color: 'var(--emerald-400)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{selectedSignal.amount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Origin / IP:</span>
                  <span style={{ color: '#FFFFFF' }}>{selectedSignal.origin}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>24h Velocity:</span>
                  <span style={{ color: 'var(--rose-400)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{selectedSignal.details.velocity24h}</span>
                </div>
              </div>
            </div>

            {/* Matched Policy & Governance Box */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--amber-400)', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                Governed Policy Match
              </div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                {activePolicy.code}: {activePolicy.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                {activePolicy.summary}
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.76rem', color: 'var(--amber-400)' }}>
                Rule Breach: {selectedSignal.flaggedReason}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <button className="btn-secondary" onClick={() => setStep(1)}>
              Back to Signal Selection
            </button>
            <button className="btn-primary" onClick={() => setStep(3)}>
              <span>Generate Audit-Ready SAR Filing</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <AuditReportView signal={selectedSignal} policy={activePolicy} />
      )}

    </div>
  );
}
