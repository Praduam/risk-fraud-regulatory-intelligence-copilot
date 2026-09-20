import React from 'react';
import { 
  X, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Globe, 
  CreditCard, 
  FileText, 
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';

export default function SignalDetailModal({ signal, onClose, onLaunchWorkflow }) {
  if (!signal) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }} className="animate-fade-in">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--border-highlight)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className={signal.severity === 'critical' ? 'badge badge-critical' : 'badge badge-warning'}>
                {signal.signalType}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
                {signal.id}
              </span>
            </div>
            <h2 style={{ fontSize: '1.2rem' }}>{signal.account}</h2>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Telemetry Summary Cards */}
        <div className="grid-3">
          <div style={{ background: 'rgba(15,23,42,0.6)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Transaction Amount</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
              {signal.amount}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--cyan-400)' }}>{signal.type}</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI Anomaly Score</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: signal.riskScore > 80 ? 'var(--rose-400)' : 'var(--amber-400)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
              {signal.riskScore} / 100
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--rose-400)' }}>{signal.severity.toUpperCase()} THREAT</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.6)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Governed Rule Match</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--amber-400)', marginTop: '4px' }}>
              {signal.policyReference}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>KYC: {signal.kycStatus}</div>
          </div>
        </div>

        {/* Flagged Reason & Anomaly Explanation */}
        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <AlertTriangle size={16} color="var(--rose-400)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--rose-400)' }}>Signal Flag Reason</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: '#FFFFFF', lineHeight: '1.4' }}>
            {signal.flaggedReason}
          </p>
        </div>

        {/* Deep Telemetry Breakdown Table */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', padding: '1rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-400)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            Deep Telemetry Lineage
          </div>
          <div className="grid-2" style={{ gap: '0.75rem' }}>
            {Object.entries(signal.details).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.35rem' }}>
                <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span style={{ color: '#FFFFFF', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close Inspector
          </button>
          <button 
            className="btn-primary" 
            onClick={() => {
              onClose();
              if (onLaunchWorkflow) onLaunchWorkflow(signal);
            }}
          >
            <ArrowUpRight size={16} />
            <span>Launch Signal → SAR Report Workflow</span>
          </button>
        </div>

      </div>
    </div>
  );
}
