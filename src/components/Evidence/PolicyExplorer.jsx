import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Scale, 
  FileCode, 
  ShieldCheck, 
  ExternalLink,
  Tag
} from 'lucide-react';
import { REGULATORY_POLICIES } from '../../data/mockData';

export default function PolicyExplorer({ initialSelectedCode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState(
    REGULATORY_POLICIES.find(p => p.code === initialSelectedCode) || REGULATORY_POLICIES[0]
  );

  const filteredPolicies = REGULATORY_POLICIES.filter(p => {
    return p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="grid-3 animate-fade-in" style={{ gridTemplateColumns: '1fr 2fr' }}>
      
      {/* Left Column: Regulatory Policy Directory */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <BookOpen size={18} color="var(--cyan-400)" />
            <h3 style={{ fontSize: '1rem' }}>Regulatory & Policy RAG Hub</h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Fused text knowledge base mapping live banking telemetry to international & central bank filing rules.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FinCEN, Basel, OCC, RBI..."
            style={{
              width: '100%',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 0.85rem 0.5rem 2.2rem',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
          <Search size={14} color="var(--text-subtle)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Policy Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filteredPolicies.map(pol => {
            const isSelected = selectedPolicy.id === pol.id;
            return (
              <div
                key={pol.id}
                onClick={() => setSelectedPolicy(pol)}
                style={{
                  background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                  border: isSelected ? '1px solid var(--primary-500)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{pol.category}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>{pol.jurisdiction}</span>
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {pol.code}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pol.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Selected Policy Document Deep-Dive */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Document Title Header */}
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>{selectedPolicy.code}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--amber-400)', fontWeight: 600 }}>Risk Weight: {selectedPolicy.riskWeight}</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>{selectedPolicy.title}</h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
            <span>Jurisdiction: <strong style={{ color: '#FFFFFF' }}>{selectedPolicy.jurisdiction}</strong></span>
            <span>Last Regulatory Revision: <strong style={{ color: '#FFFFFF' }}>{selectedPolicy.lastUpdated}</strong></span>
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-400)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
            Policy Regulatory Summary
          </div>
          <p style={{ fontSize: '0.88rem', color: '#FFFFFF', lineHeight: '1.5' }}>
            {selectedPolicy.summary}
          </p>
        </div>

        {/* Governed Key Clauses */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--amber-400)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
            Auditable Policy Clauses & Threshold Rules
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {selectedPolicy.keyClauses.map((clause, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '0.75rem 0.85rem', 
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--amber-500)',
                  fontSize: '0.84rem',
                  color: 'var(--text-main)',
                  lineHeight: '1.4'
                }}
              >
                {clause}
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry Fusion Mapping Explanation */}
        <div className="code-block" style={{ fontSize: '0.78rem' }}>
          <div>[RAG VECTOR INDEX MAPPING]</div>
          <div>Document ID: {selectedPolicy.id} ({selectedPolicy.code})</div>
          <div>Indexed Chunks: 14 Clause Embeddings</div>
          <div>Connected Live Datasets: SWIFT Wire Gateway, Core Banking Ledger, Corporate Credit Bureau</div>
        </div>

      </div>

    </div>
  );
}
