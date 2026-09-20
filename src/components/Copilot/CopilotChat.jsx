import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  FileCheck2, 
  ArrowRight,
  CheckCircle2,
  Cpu,
  CornerDownRight,
  Download
} from 'lucide-react';
import { PRESET_PROMPTS, MOCK_COPILOT_ANSWERS } from '../../data/mockData';

export default function CopilotChat({ onLaunchWorkflow, onOpenPolicyModal }) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(MOCK_COPILOT_ANSWERS['prompt-1']);

  const handleRunQuery = (selectedPrompt) => {
    const qText = selectedPrompt ? selectedPrompt.query : query;
    if (!qText.trim()) return;

    setQuery(qText);
    setIsProcessing(true);
    setCurrentStepIndex(0);

    // Simulate step-by-step stream reasoning
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          setIsProcessing(false);
          // Pick response template or synthesize dynamic response
          if (selectedPrompt && MOCK_COPILOT_ANSWERS[selectedPrompt.id]) {
            setActiveAnswer(MOCK_COPILOT_ANSWERS[selectedPrompt.id]);
          } else {
            // Dynamic synthesis for custom text query
            setActiveAnswer({
              query: qText,
              verdict: "EVIDENCE-BACKED REVIEW COMPLETED",
              confidence: "96.8%",
              summary: `Copilot queried SWIFT transaction feeds and regulatory knowledge base for: "${qText}". No immediate critical breach detected, but enhanced monitoring is active.`,
              governanceChain: [
                { step: "1. Data Telemetry Extraction", status: "Complete", detail: "Scanned account ledgers and real-time wire logs." },
                { step: "2. Regulatory Cross-Check", status: "Verified", detail: "Compared parameters against FinCEN AML and Basel regulatory rules." },
                { step: "3. Explainable Risk Synthesis", status: "Generated", detail: "Constructed evidence trail and compliance log." }
              ],
              citations: [
                { code: "FinCEN AML § 1010.311", text: "Standard currency transaction and SAR reporting guidance." },
                { code: "OCC Risk Advisory 2023", text: "Governance baseline for banking transactions." }
              ],
              evidenceItems: [
                { key: "Target Query", val: qText },
                { key: "Telemetry Scanned", val: "485,200 Accounts" },
                { key: "Rule Match Score", val: "Compliant / Low Anomaly" }
              ],
              recommendedActions: [
                "Log query outcome in compliance audit ledger.",
                "Set automated rule trigger for account balance variances > $500k."
              ],
              sarDraft: null
            });
          }
          return 3;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <div className="grid-3 animate-fade-in" style={{ gridTemplateColumns: '1fr 2fr' }}>
      {/* Left Column: Preset Prompts & Quick Controls */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={18} color="var(--cyan-400)" />
            <h3 style={{ fontSize: '1rem' }}>Governance Prompt Library</h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Ask natural language questions across live transaction telemetry, credit/liquidity metrics, and regulatory filing text.
          </p>
        </div>

        {/* Prompt Chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {PRESET_PROMPTS.map(p => (
            <div 
              key={p.id}
              className="glass-card-interactive"
              onClick={() => handleRunQuery(p)}
              style={{ padding: '0.85rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{p.category}</span>
                <ArrowRight size={14} color="var(--text-subtle)" />
              </div>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#FFFFFF', lineHeight: '1.3' }}>
                {p.label}
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Governance Guarantee Box */}
        <div style={{ 
          background: 'rgba(99, 102, 241, 0.08)', 
          border: '1px solid rgba(99, 102, 241, 0.2)', 
          borderRadius: 'var(--radius-md)', 
          padding: '0.85rem',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <ShieldCheck size={16} color="var(--primary-400)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-400)' }}>100% Governed & Explainable</span>
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            Every answer includes explicit data lineage, source citations, rule triggers, and audit log entries suitable for regulatory examination.
          </p>
        </div>
      </div>

      {/* Right Column: Interactive Chat & Reasoning Console */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', minHeight: '650px' }}>
        
        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunQuery(null)}
              placeholder="Ask a natural language risk, fraud, or regulatory question (e.g. Audit TX-98402 for structuring)..."
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid var(--border-highlight)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem 0.85rem 2.5rem',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            />
            <Bot size={18} color="var(--primary-400)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button 
            className="btn-primary" 
            onClick={() => handleRunQuery(null)}
            disabled={isProcessing}
          >
            <Send size={16} />
            <span>Ask Copilot</span>
          </button>
        </div>

        {/* Streaming Reasoning Console / Answer Display */}
        {isProcessing ? (
          <div style={{ 
            flex: 1, 
            background: 'rgba(15, 23, 42, 0.7)', 
            borderRadius: 'var(--radius-md)', 
            border: '1px solid var(--border-color)', 
            padding: '2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={48} color="var(--cyan-400)" style={{ animation: 'spin 4s linear infinite' }} />
              <Sparkles size={20} color="var(--primary-400)" style={{ position: 'absolute' }} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>Synthesizing Governed Banking Telemetry</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Executing multi-hop query across core ledger, SWIFT wire data, and regulatory policy clauses...</p>
            </div>

            {/* Live Steps Pipeline Indicator */}
            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                "Extracting Transaction & Account Telemetry...",
                "Matching FinCEN & Basel III Policy Rules...",
                "Verifying Device Fingerprint & IP Lineage...",
                "Constructing Explainable Audit Output..."
              ].map((stepText, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.82rem',
                    color: idx <= currentStepIndex ? 'var(--cyan-400)' : 'var(--text-subtle)',
                    fontWeight: idx === currentStepIndex ? 700 : 400
                  }}
                >
                  {idx < currentStepIndex ? (
                    <CheckCircle2 size={16} color="var(--emerald-400)" />
                  ) : idx === currentStepIndex ? (
                    <span className="status-dot status-dot-active"></span>
                  ) : (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span>
                  )}
                  <span>{stepText}</span>
                </div>
              ))}
            </div>
          </div>
        ) : activeAnswer ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
            
            {/* Verdict Header Card */}
            <div style={{ 
              background: activeAnswer.verdict.includes('VIOLATION') 
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(15, 23, 42, 0.8))'
                : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.8))',
              border: activeAnswer.verdict.includes('VIOLATION') ? '1px solid var(--rose-500)' : '1px solid var(--emerald-500)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className={activeAnswer.verdict.includes('VIOLATION') ? 'badge badge-critical' : 'badge badge-success'}>
                  {activeAnswer.verdict}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--cyan-400)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  Confidence Score: {activeAnswer.confidence}
                </span>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#FFFFFF', lineHeight: '1.5', fontWeight: 500 }}>
                {activeAnswer.summary}
              </p>
            </div>

            {/* Governed Reasoning Steps */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-400)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Governed Execution & Reasoning Chain
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {activeAnswer.governanceChain.map((g, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.84rem' }}>
                    <CornerDownRight size={16} color="var(--cyan-400)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{g.step}: </span>
                      <span style={{ color: 'var(--text-muted)' }}>{g.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence & Policy Citations Grid */}
            <div className="grid-2">
              {/* Evidence Telemetry */}
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-400)', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                  Extracted Telemetry & Evidence
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {activeAnswer.evidenceItems.map((e, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{e.key}:</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{e.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy Citations */}
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--amber-400)', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                  Cited Regulatory Frameworks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {activeAnswer.citations.map((c, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => onOpenPolicyModal && onOpenPolicyModal(c.code)}
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.03)', 
                        padding: '0.5rem 0.75rem', 
                        borderRadius: 'var(--radius-sm)', 
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--amber-400)' }}>{c.code}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>{c.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar (Launch SAR Workflow or Export Audit Note) */}
            <div style={{ 
              display: 'flex', 
              justify: 'space-between', 
              alignItems: 'center', 
              background: 'rgba(99, 102, 241, 0.1)', 
              padding: '0.85rem 1.1rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--primary-glow)',
              marginTop: 'auto' 
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Ready for Workflow & Regulatory Filing
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Package signal + telemetry evidence + cited clauses into an audit-ready filing.
                </div>
              </div>

              <button 
                className="btn-primary"
                onClick={() => onLaunchWorkflow && onLaunchWorkflow(activeAnswer)}
              >
                <FileCheck2 size={16} />
                <span>Launch Signal-to-Report Workflow</span>
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}
