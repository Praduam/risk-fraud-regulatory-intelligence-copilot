import React, { useState } from 'react';
import { 
  Landmark, 
  Sliders, 
  TrendingDown, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw,
  BarChart3,
  Layers
} from 'lucide-react';

export default function LiquidityStress() {
  const [depositOutflowPct, setDepositOutflowPct] = useState(15);
  const [nplShockPct, setNplShockPct] = useState(3.5);
  const [wholesaleHaircutPct, setWholesaleHaircutPct] = useState(10);

  // Baseline figures
  const initialHQLA = 2450; // $2.45B
  const initialOutflow = 2134; // $2.134B
  const baseTier1Capital = 1420; // $1.42B
  const totalRWA = 10000; // $10B Risk Weighted Assets

  // Recalculated figures
  const additionalOutflow = initialOutflow * (depositOutflowPct / 100) * 0.75 + (initialOutflow * (wholesaleHaircutPct / 100) * 0.25);
  const stressedOutflow = initialOutflow + additionalOutflow;
  const calculatedLCR = ((initialHQLA / stressedOutflow) * 100).toFixed(1);

  const nplLossAmount = totalRWA * (nplShockPct / 100);
  const stressedTier1Capital = baseTier1Capital - nplLossAmount;
  const calculatedCAR = ((stressedTier1Capital / totalRWA) * 100).toFixed(1);

  const isLCRCompliant = calculatedLCR >= 100.0;
  const isCARCompliant = calculatedCAR >= 10.5;

  return (
    <div className="grid-3 animate-fade-in" style={{ gridTemplateColumns: '1fr 2fr' }}>
      
      {/* Left Column: Interactive Stress Sliders */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Sliders size={18} color="var(--cyan-400)" />
            <h3 style={{ fontSize: '1rem' }}>Stress Scenario Simulator</h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Adjust market shock factors to evaluate real-time Basel III LCR and Capital Adequacy under systemic stress.
          </p>
        </div>

        {/* Slider 1: Deposit Outflow */}
        <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Corporate Deposit Outflow</span>
            <span style={{ color: 'var(--cyan-400)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{depositOutflowPct}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="40" 
            step="1"
            value={depositOutflowPct}
            onChange={(e) => setDepositOutflowPct(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--cyan-400)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            <span>0% Normal</span>
            <span>20% Severe</span>
            <span>40% Crisis</span>
          </div>
        </div>

        {/* Slider 2: Non-Performing Loan Shock */}
        <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>NPL Credit Impairment Shock</span>
            <span style={{ color: 'var(--amber-400)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{nplShockPct}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="12" 
            step="0.5"
            value={nplShockPct}
            onChange={(e) => setNplShockPct(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--amber-400)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            <span>0% Baseline</span>
            <span>6% High Default</span>
            <span>12% Credit Freeze</span>
          </div>
        </div>

        {/* Slider 3: Wholesale Funding Haircut */}
        <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Wholesale Liquidity Haircut</span>
            <span style={{ color: 'var(--rose-400)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{wholesaleHaircutPct}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="30" 
            step="1"
            value={wholesaleHaircutPct}
            onChange={(e) => setWholesaleHaircutPct(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--rose-400)', cursor: 'pointer' }}
          />
        </div>

        <button 
          className="btn-secondary"
          onClick={() => {
            setDepositOutflowPct(15);
            setNplShockPct(3.5);
            setWholesaleHaircutPct(10);
          }}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <RefreshCw size={14} />
          <span>Reset to Baseline Ratios</span>
        </button>
      </div>

      {/* Right Column: Live Recalculated Ratios & Visual Stress Matrix */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Recalculated Output Banner */}
        <div className="grid-2">
          {/* LCR Metric Box */}
          <div style={{ 
            background: isLCRCompliant 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.9))' 
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(15, 23, 42, 0.9))',
            border: isLCRCompliant ? '1px solid var(--emerald-500)' : '1px solid var(--rose-500)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Stressed LCR Score</span>
              <span className={isLCRCompliant ? 'badge badge-success' : 'badge badge-critical'}>
                {isLCRCompliant ? 'Pass (>100%)' : 'Breach (<100%)'}
              </span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: isLCRCompliant ? 'var(--emerald-400)' : 'var(--rose-400)', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
              {calculatedLCR}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              HQLA Buffer: ${initialHQLA}M / Net Outflow: ${stressedOutflow.toFixed(0)}M
            </div>
          </div>

          {/* CAR Metric Box */}
          <div style={{ 
            background: isCARCompliant 
              ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(15, 23, 42, 0.9))' 
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(15, 23, 42, 0.9))',
            border: isCARCompliant ? '1px solid var(--cyan-500)' : '1px solid var(--rose-500)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Stressed Basel CAR</span>
              <span className={isCARCompliant ? 'badge badge-info' : 'badge badge-critical'}>
                {isCARCompliant ? 'Pass (>10.5%)' : 'Capital Deficit'}
              </span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: isCARCompliant ? 'var(--cyan-400)' : 'var(--rose-400)', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
              {calculatedCAR}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Tier 1 Capital: ${stressedTier1Capital.toFixed(0)}M / Total RWA: ${totalRWA}M
            </div>
          </div>
        </div>

        {/* Visual Stress Comparison Chart Bars */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.85rem' }}>
            Basel III Regulatory Buffer Breakdown
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Bar 1: Baseline LCR vs Stressed */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>LCR Liquidity Buffer</span>
                <span style={{ color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>114.8% → {calculatedLCR}%</span>
              </div>
              <div style={{ width: '100%', height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${Math.min(calculatedLCR, 150) / 1.5}%`, 
                  height: '100%', 
                  background: isLCRCompliant ? 'linear-gradient(90deg, var(--emerald-500), var(--cyan-400))' : 'var(--rose-500)',
                  transition: 'width 0.4s ease'
                }} />
                {/* 100% Minimum Marker Line */}
                <div style={{ position: 'absolute', left: `${100 / 1.5}%`, top: 0, bottom: 0, width: '2px', background: '#FFFFFF' }} title="100% Regulatory Minimum" />
              </div>
            </div>

            {/* Bar 2: Tier 1 Capital Ratio */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tier 1 Capital Ratio</span>
                <span style={{ color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>14.2% → {calculatedCAR}%</span>
              </div>
              <div style={{ width: '100%', height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${Math.min(calculatedCAR, 20) * 5}%`, 
                  height: '100%', 
                  background: isCARCompliant ? 'linear-gradient(90deg, var(--cyan-500), var(--primary-500))' : 'var(--rose-500)',
                  transition: 'width 0.4s ease'
                }} />
                {/* 10.5% Regulatory Minimum Line */}
                <div style={{ position: 'absolute', left: `${10.5 * 5}%`, top: 0, bottom: 0, width: '2px', background: '#FFFFFF' }} title="10.5% Minimum Threshold" />
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Governance Findings */}
        <div className="code-block" style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>
          <div>[REGULATORY STRESS AUDIT LOG]</div>
          <div>Simulated parameters: Outflow={depositOutflowPct}%, NPL={nplShockPct}%, Haircut={wholesaleHaircutPct}%.</div>
          <div>Calculated Stressed LCR = {calculatedLCR}% ({isLCRCompliant ? 'PASSED BASEL MINIMUM' : 'WARNING: BELOW BASEL MINIMUM'}).</div>
          <div>Calculated Stressed CAR = {calculatedCAR}% ({isCARCompliant ? 'PASSED CAPITAL TIER 1' : 'CRITICAL CAPITAL DEFICIT'}).</div>
          <div>Filing Action: {isLCRCompliant && isCARCompliant ? 'No emergency regulatory report required.' : 'ALCO notification & Contingency Liquidity Plan activation mandatory.'}</div>
        </div>

      </div>

    </div>
  );
}
