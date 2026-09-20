import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  AlertTriangle, 
  Eye, 
  ArrowUpRight, 
  CheckCircle, 
  XCircle,
  Clock,
  Shield
} from 'lucide-react';
import { LIVE_TRANSACTIONS } from '../../data/mockData';
import LiquidityStress from './LiquidityStress';

export default function SignalMonitor({ onSelectSignal, onLaunchWorkflowFromSignal }) {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('transactions'); // 'transactions' | 'liquidity'

  const filteredTransactions = LIVE_TRANSACTIONS.filter(tx => {
    const matchesSeverity = filterSeverity === 'all' || tx.severity === filterSeverity;
    const matchesSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.signalType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Sub-navigation bar: Transactions Telemetry Stream vs Liquidity & Credit Risk Stress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveSubTab('transactions')}
            style={{
              background: activeSubTab === 'transactions' ? 'var(--primary-500)' : 'transparent',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Activity size={16} />
            <span>Real-time Telemetry Stream ({LIVE_TRANSACTIONS.length})</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('liquidity')}
            style={{
              background: activeSubTab === 'liquidity' ? 'var(--primary-500)' : 'transparent',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Shield size={16} />
            <span>Liquidity & Credit Risk Stress Engine</span>
          </button>
        </div>

        {activeSubTab === 'transactions' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tx, account, signal..."
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.45rem 0.85rem 0.45rem 2.2rem',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              />
              <Search size={14} color="var(--text-subtle)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Severity Filter Chips */}
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {['all', 'critical', 'warning', 'low'].map(sev => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  style={{
                    background: filterSeverity === sev ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.6)',
                    color: filterSeverity === sev ? '#FFFFFF' : 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeSubTab === 'transactions' ? (
        /* Real-time Signals Data Grid */
        <div className="glass-panel" style={{ padding: '1.25rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.75rem' }}>Signal ID / Time</th>
                <th style={{ padding: '0.75rem' }}>Account Name</th>
                <th style={{ padding: '0.75rem' }}>Amount</th>
                <th style={{ padding: '0.75rem' }}>Signal Anomaly</th>
                <th style={{ padding: '0.75rem' }}>Risk Score</th>
                <th style={{ padding: '0.75rem' }}>Cited Policy</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => (
                <tr 
                  key={tx.id}
                  style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    transition: 'background 0.2s ease',
                    cursor: 'pointer'
                  }}
                  className="table-row-hover"
                >
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
                      {tx.id}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
                      <Clock size={12} />
                      <span>{tx.timestamp}</span>
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#FFFFFF' }}>
                      {tx.account}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {tx.type}
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                      {tx.amount}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                      {tx.origin.split(' ')[0]}
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {tx.severity === 'critical' && <AlertTriangle size={14} color="var(--rose-400)" />}
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: tx.severity === 'critical' ? 'var(--rose-400)' : tx.severity === 'warning' ? 'var(--amber-400)' : 'var(--text-main)' }}>
                        {tx.signalType}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {tx.flaggedReason}
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '45px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${tx.riskScore}%`, 
                          height: '100%', 
                          background: tx.riskScore > 80 ? 'var(--rose-500)' : tx.riskScore > 50 ? 'var(--amber-500)' : 'var(--emerald-500)' 
                        }} />
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: tx.riskScore > 80 ? 'var(--rose-400)' : tx.riskScore > 50 ? 'var(--amber-400)' : 'var(--emerald-400)' }}>
                        {tx.riskScore}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>
                      {tx.policyReference}
                    </span>
                  </td>

                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span className={tx.severity === 'critical' ? 'badge badge-critical' : tx.severity === 'warning' ? 'badge badge-warning' : 'badge badge-success'}>
                      {tx.status}
                    </span>
                  </td>

                  <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button 
                        className="btn-secondary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        onClick={() => onSelectSignal && onSelectSignal(tx)}
                      >
                        <Eye size={13} />
                        <span>Inspect</span>
                      </button>

                      <button 
                        className="btn-primary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        onClick={() => onLaunchWorkflowFromSignal && onLaunchWorkflowFromSignal(tx)}
                      >
                        <ArrowUpRight size={13} />
                        <span>SAR Flow</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Liquidity & Credit Risk Stress Engine Sub-component */
        <LiquidityStress />
      )}

    </div>
  );
}
