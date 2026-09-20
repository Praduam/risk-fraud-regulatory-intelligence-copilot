import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Play, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  Zap,
  Globe,
  CreditCard,
  DollarSign
} from 'lucide-react';

export default function RiskSandbox() {
  const [accountName, setAccountName] = useState('Global Logistics Trading Ltd');
  const [amount, setAmount] = useState(380000);
  const [originCountry, setOriginCountry] = useState('Panama (High Risk OFC)');
  const [assetClass, setAssetClass] = useState('Cross-Border Wire Transfer');
  const [isTorIP, setIsTorIP] = useState(true);
  const [kycTier, setKycTier] = useState('Standard KYC');

  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleSimulate = () => {
    setIsEvaluating(true);
    setEvaluationResult(null);

    setTimeout(() => {
      // Calculate dynamic risk score based on parameters
      let score = 30;
      if (amount > 250000) score += 25;
      if (originCountry.includes('High Risk')) score += 30;
      if (isTorIP) score += 20;

      const severity = score > 80 ? 'critical' : score > 50 ? 'warning' : 'low';
      
      setEvaluationResult({
        score: Math.min(score, 99),
        severity: severity,
        verdict: score > 75 ? 'HIGH RISK ANOMALY - SUSPICIOUS TRANSACTION' : 'STANDARD RISK PROFILE',
        rulesTriggered: [
          amount > 250000 ? 'FinCEN § 1010.311 Threshold Evading Trigger' : null,
          originCountry.includes('High Risk') ? 'FATF High-Risk Offshore Jurisdiction Rule' : null,
          isTorIP ? 'TOR Anonymizer Exit Node IP Anomaly' : null
        ].filter(Boolean),
        recommendedAction: score > 75 ? 'Block wire settlement & file SAR' : 'Allow with standard log'
      });

      setIsEvaluating(false);
    }, 600);
  };

  return (
    <div className="grid-3 animate-fade-in" style={{ gridTemplateColumns: '1fr 2fr' }}>
      
      {/* Left Column: Synthetic Transaction Parameters Form */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <SlidersHorizontal size={18} color="var(--cyan-400)" />
            <h3 style={{ fontSize: '1rem' }}>Synthetic Transaction Tester</h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Inject custom banking parameters into the AI Copilot to test real-time risk scoring and rule triggers.
          </p>
        </div>

        {/* Input 1: Account Name */}
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Account Entity Name</label>
          <input 
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', color: '#FFFFFF', fontSize: '0.84rem' }}
          />
        </div>

        {/* Input 2: Amount Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Transfer Amount ($)</span>
            <span style={{ color: 'var(--emerald-400)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>${amount.toLocaleString()}</span>
          </div>
          <input 
            type="range"
            min="10000"
            max="2000000"
            step="10000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--emerald-400)', cursor: 'pointer' }}
          />
        </div>

        {/* Input 3: Origin Country */}
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Origin Jurisdiction</label>
          <select 
            value={originCountry}
            onChange={(e) => setOriginCountry(e.target.value)}
            style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', color: '#FFFFFF', fontSize: '0.84rem' }}
          >
            <option value="United States (Low Risk)">United States (Low Risk)</option>
            <option value="United Kingdom (Low Risk)">United Kingdom (Low Risk)</option>
            <option value="Panama (High Risk OFC)">Panama (High Risk OFC)</option>
            <option value="Cayman Islands (High Risk OFC)">Cayman Islands (High Risk OFC)</option>
            <option value="Cyprus (High Risk OFC)">Cyprus (High Risk OFC)</option>
          </select>
        </div>

        {/* Input 4: TOR Checkbox */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'rgba(15,23,42,0.6)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <input 
            type="checkbox"
            id="tor-check"
            checked={isTorIP}
            onChange={(e) => setIsTorIP(e.target.checked)}
            style={{ accentColor: 'var(--rose-500)', width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <label htmlFor="tor-check" style={{ fontSize: '0.82rem', color: '#FFFFFF', cursor: 'pointer' }}>
            Flag TOR / VPN Anonymizer IP Node
          </label>
        </div>

        <button className="btn-primary" onClick={handleSimulate} disabled={isEvaluating} style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
          <Play size={16} />
          <span>Run AI Risk Evaluation</span>
        </button>
      </div>

      {/* Right Column: Dynamic Copilot Verdict Output */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'center' }}>
        {isEvaluating ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <RefreshCw size={36} color="var(--cyan-400)" style={{ animation: 'spin 1.5s linear infinite', marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1rem', color: '#FFFFFF' }}>Evaluating Synthetic Transaction Model</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Executing rule engine & RAG policy check...</p>
          </div>
        ) : evaluationResult ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ 
              background: evaluationResult.severity === 'critical' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              border: evaluationResult.severity === 'critical' ? '1px solid var(--rose-500)' : '1px solid var(--emerald-500)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className={evaluationResult.severity === 'critical' ? 'badge badge-critical' : 'badge badge-success'}>
                  {evaluationResult.verdict}
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: evaluationResult.severity === 'critical' ? 'var(--rose-400)' : 'var(--emerald-400)', fontFamily: 'var(--font-mono)' }}>
                  Risk Score: {evaluationResult.score} / 100
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#FFFFFF', marginTop: '0.5rem' }}>
                Recommended Compliance Action: <strong>{evaluationResult.recommendedAction}</strong>
              </div>
            </div>

            {/* Triggered Rules List */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--amber-400)', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
                Governance Rules Triggered
              </div>
              {evaluationResult.rulesTriggered.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {evaluationResult.rulesTriggered.map((rule, idx) => (
                    <div key={idx} style={{ fontSize: '0.8rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertTriangle size={14} color="var(--rose-400)" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--emerald-400)' }}>
                  No regulatory policy breaches detected.
                </div>
              )}
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>
            <Zap size={36} color="var(--primary-400)" style={{ marginBottom: '1rem', opacity: 0.6 }} />
            <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.35rem' }}>Ready for Simulation</h4>
            <p style={{ fontSize: '0.8rem' }}>Adjust transaction parameters on the left and click "Run AI Risk Evaluation".</p>
          </div>
        )}
      </div>

    </div>
  );
}
