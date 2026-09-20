import React from 'react';
import { 
  Bot, 
  Activity, 
  BookOpen, 
  Workflow, 
  SlidersHorizontal 
} from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'copilot', label: 'Governed AI Copilot', icon: Bot, badge: 'NL Reasoning' },
    { id: 'signals', label: 'Real-Time Risk & Signals', icon: Activity, badge: 'Live Telemetry' },
    { id: 'policies', label: 'Regulatory Policy RAG', icon: BookOpen, badge: 'FinCEN / Basel' },
    { id: 'workflow', label: 'Signal → Evidence → Audit Studio', icon: Workflow, badge: 'SAR Filing' },
    { id: 'sandbox', label: 'Risk & Liquidity Simulator', icon: SlidersHorizontal, badge: 'Stress Test' }
  ];

  return (
    <nav style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: isActive 
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.15))' 
                : 'rgba(15, 23, 42, 0.6)',
              color: isActive ? '#FFFFFF' : 'var(--text-muted)',
              border: isActive ? '1px solid var(--primary-500)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.88rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s ease',
              boxShadow: isActive ? '0 4px 15px rgba(99, 102, 241, 0.2)' : 'none'
            }}
          >
            <Icon size={18} color={isActive ? 'var(--cyan-400)' : 'var(--text-subtle)'} />
            <span>{tab.label}</span>
            <span style={{
              fontSize: '0.68rem',
              padding: '0.15rem 0.45rem',
              borderRadius: 'var(--radius-full)',
              background: isActive ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.05)',
              color: isActive ? 'var(--cyan-400)' : 'var(--text-subtle)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              {tab.badge}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
