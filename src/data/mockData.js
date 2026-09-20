// Mock telemetry & regulatory knowledge database for Banking & NBFC Intelligence Copilot

export const ENTERPRISE_METRICS = {
  fraudExposure: "$3,420,850",
  fraudExposureChange: "+12.4% vs last week",
  lcrRatio: "114.8%",
  lcrMinRequirement: "100.0%",
  lcrStatus: "Compliant",
  carRatio: "14.2%",
  carMinRequirement: "10.5%",
  activeSARs: 18,
  pendingAudits: 4,
  monitoredAccounts: 485200,
  realtimeTps: 3420
};

export const LIVE_TRANSACTIONS = [
  {
    id: "TX-98402",
    timestamp: "2026-09-20 21:18:42",
    account: "ACC-8849201 (Apex Global Corp)",
    amount: "$240,000",
    rawAmount: 240000,
    type: "Cross-Border Wire Transfer",
    origin: "New York, USA (IP: 198.51.100.42)",
    destination: "Nicosia, Cyprus (Bank OFC-99)",
    riskScore: 94,
    severity: "critical",
    signalType: "AML Structuring & Off-shore Velocity",
    flaggedReason: "3rd high-value transfer under $250k threshold within 48h to shell company jurisdiction.",
    evidenceCount: 4,
    policyReference: "FinCEN AML § 1010.311 / FATF Rec 16",
    status: "Pending Investigation",
    kycStatus: "Enhanced Due Diligence (EDD) Required",
    details: {
      velocity24h: "$710,000",
      historicalAverage: "$15,000/mo",
      deviceFingerprint: "Unrecognized macOS (TOR Exit Node)",
      counterpartyName: "Zephyr Holdings Ltd",
      taxId: "CY-9948201-B"
    }
  },
  {
    id: "TX-98401",
    timestamp: "2026-09-20 21:14:10",
    account: "ACC-7193044 (Horizon Logistics LLC)",
    amount: "$1,850,000",
    rawAmount: 1850000,
    type: "Trade Finance LC Drawdown",
    origin: "Singapore (DBS Bank)",
    destination: "Hong Kong (HSBC HK)",
    riskScore: 78,
    severity: "warning",
    signalType: "Trade-Based Money Laundering (TBML)",
    flaggedReason: "Invoice unit value 450% above benchmark shipping commodity prices.",
    evidenceCount: 3,
    policyReference: "OCC Trade Finance Risk Guidelines (2023-14)",
    status: "Flagged for Compliance Review",
    kycStatus: "Verified Standard",
    details: {
      velocity24h: "$1,850,000",
      historicalAverage: "$400,000/mo",
      deviceFingerprint: "Corporate SWIFT Terminal #42",
      counterpartyName: "Orient Maritime Supplies",
      taxId: "HK-883910"
    }
  },
  {
    id: "TX-98400",
    timestamp: "2026-09-20 21:05:19",
    account: "ACC-4491022 (Vanguard Tech Capital)",
    amount: "$4,500,000",
    rawAmount: 4500000,
    type: "Interbank Call Money Repurchase",
    origin: "JPMorgan Chase Treasury",
    destination: "Internal Liquidity Reserve",
    riskScore: 22,
    severity: "low",
    signalType: "Intraday Liquidity Movement",
    flaggedReason: "Routine LCR buffer adjustment.",
    evidenceCount: 1,
    policyReference: "Basel III LCR Article 412",
    status: "Auto-Approved",
    kycStatus: "Institutional Tier 1",
    details: {
      velocity24h: "$12,000,000",
      historicalAverage: "$15,000,000/day",
      deviceFingerprint: "API Treasury Gateway",
      counterpartyName: "JPMorgan Chase NA",
      taxId: "US-13-55928"
    }
  },
  {
    id: "TX-98399",
    timestamp: "2026-09-20 20:54:02",
    account: "ACC-3029188 (Retail Credit Line #88)",
    amount: "$98,500",
    rawAmount: 98500,
    type: "Commercial Credit Card Cash Advance",
    origin: "Dubai, UAE (ATM Terminal #991)",
    destination: "Cash Withdrawal",
    riskScore: 88,
    severity: "critical",
    signalType: "Card Velocity & Geolocation Anomaly",
    flaggedReason: "Physical ATM cash withdrawal 30 minutes after card swipe in London, UK.",
    evidenceCount: 3,
    policyReference: "Visa/MC Fraud Risk Protocol Rule 4.2",
    status: "Account Temporarily Frozen",
    kycStatus: "Standard KYC",
    details: {
      velocity24h: "$145,000",
      historicalAverage: "$4,200/mo",
      deviceFingerprint: "ATM Hard Card Terminal",
      counterpartyName: "ATM Cash Dispenser 991",
      taxId: "N/A"
    }
  },
  {
    id: "TX-98398",
    timestamp: "2026-09-20 20:41:33",
    account: "ACC-1029481 (Metropolitan Commercial NBFC)",
    amount: "$12,200,000",
    rawAmount: 12200000,
    type: "Corporate Loan Disbursement",
    origin: "NBFC Primary Credit Facility",
    destination: "Solaris Infrastructure Ltd",
    riskScore: 65,
    severity: "warning",
    signalType: "Concentration Credit Risk Spike",
    flaggedReason: "Single borrower exposure exceeds 14.5% of total Tier 1 Capital.",
    evidenceCount: 2,
    policyReference: "Central Bank Large Exposure Framework (LEF) Art 7",
    status: "Under Risk Officer Approval",
    kycStatus: "Institutional Verified",
    details: {
      velocity24h: "$12,200,000",
      historicalAverage: "$2,000,000/qtr",
      deviceFingerprint: "Loan Origination Engine",
      counterpartyName: "Solaris Infrastructure Ltd",
      taxId: "US-88-10294"
    }
  }
];

export const REGULATORY_POLICIES = [
  {
    id: "POL-FINCEN-1010",
    code: "FinCEN AML § 1010.311",
    title: "Reports of Transactions in Currency & Structuring Provisions",
    jurisdiction: "United States / International (FATF)",
    category: "Anti-Money Laundering (AML)",
    summary: "Mandates financial institutions to file a Suspicious Activity Report (SAR) within 30 days for any transaction or pattern of transactions aggregating > $10,000 that appears designed to evade reporting requirements (structuring) or lacks business purpose.",
    keyClauses: [
      "1010.311(a): Prohibition on structuring cash or electronic transactions to break amounts under \$10,000 thresholds.",
      "1010.311(c): Red flag indicators include rapid movement of funds to high-risk offshore jurisdictions without clear commercial rationale.",
      "1010.311(f): Minimum evidence package requires 90-day transaction history, device IP logs, counterparty beneficial ownership, and SAR Form 111 XML filing."
    ],
    riskWeight: "High",
    lastUpdated: "2024-01-15"
  },
  {
    id: "POL-BASEL-LCR",
    code: "Basel III Art. 412 / Liquidity Standard",
    title: "Liquidity Coverage Ratio (LCR) & Stress Test Requirements",
    jurisdiction: "Global (BCBS) / Fed / ECB / RBI",
    category: "Liquidity & Capital Risk",
    summary: "Requires banks to maintain an adequate stock of unencumbered High Quality Liquid Assets (HQLA) that can be converted into cash to meet liquidity needs for a 30-day severe stress scenario.",
    keyClauses: [
      "Art 412.1: LCR = Stock of HQLA / Total Net Cash Outflows over 30 Days >= 100%.",
      "Art 412.4: Outflow run-off rates for unsecured wholesale funding from non-financial corporate depositors set at 75% in acute stress.",
      "Art 412.9: Daily reporting required if buffer drops below 105% threshold."
    ],
    riskWeight: "Critical",
    lastUpdated: "2023-11-01"
  },
  {
    id: "POL-OCC-TBML",
    code: "OCC Advisory 2023-14",
    title: "Trade-Based Money Laundering & Documentary Credit Due Diligence",
    jurisdiction: "United States (OCC / FDIC)",
    category: "Trade Finance & Fraud",
    summary: "Establishes baseline controls for banks financing international trade to detect over/under-invoicing, phantom shipments, and multiple invoicing for the same shipment.",
    keyClauses: [
      "Section 3.1: Automatic variance checking against container freight index pricing required for commodity financing.",
      "Section 4.2: Dual-use goods verification against Commerce Control List (CCL) sanctions database."
    ],
    riskWeight: "Medium-High",
    lastUpdated: "2023-09-20"
  },
  {
    id: "POL-RBI-FRAUD",
    code: "RBI Master Direction FMR 2024",
    title: "Real-time Fraud Monitoring & Early Warning Signals (EWS)",
    jurisdiction: "India / Asian Regional Framework",
    category: "Fraud & Credit Risk",
    summary: "Mandates real-time integration of Early Warning Signals (EWS) into core credit scoring engines for corporate loans and instant locking of compromised digital accounts.",
    keyClauses: [
      "EWS Rule 14: Automated flagging if corporate borrower credit lines are drawn >80% within 48 hours of ratings downgrade.",
      "FMR Rule 8: Mandatory board reporting for fraud events exceeding ₹100 Million ($1.2M USD equivalent)."
    ],
    riskWeight: "High",
    lastUpdated: "2024-02-10"
  }
];

export const PRESET_PROMPTS = [
  {
    id: "prompt-1",
    label: "Audit Transaction TX-98402 for AML & Structuring Compliance",
    category: "AML & Fraud",
    query: "Analyze transaction TX-98402 (Apex Global Corp, $240,000 to Cyprus). Does this violate FinCEN § 1010.311 structuring rules? Surface all transaction telemetry, policy clauses, evidence, and draft a SAR if required."
  },
  {
    id: "prompt-2",
    label: "Simulate 15% Commercial Deposit Run-off Impact on LCR",
    category: "Liquidity Risk",
    query: "Run a 30-day liquidity stress test on our current HQLA reserve assuming a 15% sudden outflow in corporate deposits. Will our LCR remain above the 100% regulatory minimum? Show calculation steps and recommended liquidity actions."
  },
  {
    id: "prompt-3",
    label: "Evaluate Credit Risk Concentration in Loan TX-98398 ($12.2M)",
    category: "Credit Risk",
    query: "Assess borrower Solaris Infrastructure Ltd ($12.2M disbursement). Does this violate Central Bank Large Exposure limits for Tier 1 capital? Provide credit migration score and mitigation steps."
  },
  {
    id: "prompt-4",
    label: "Cross-Reference Trade LC TX-98401 with OCC TBML Sanctions",
    category: "Trade Finance",
    query: "Check trade invoice #TX-98401 against OCC Advisory 2023-14 for trade-based money laundering indicators and container shipping commodity benchmark prices."
  }
];

export const MOCK_COPILOT_ANSWERS = {
  "prompt-1": {
    query: "Analyze transaction TX-98402 (Apex Global Corp, $240,000 to Cyprus). Does this violate FinCEN § 1010.311 structuring rules?",
    verdict: "VIOLATION DETECTED - SAR FILING REQUIRED",
    confidence: "98.4%",
    summary: "Transaction TX-98402 exhibits clear indicators of intentional structuring and high-risk offshore velocity in breach of FinCEN § 1010.311 and FATF Recommendation 16.",
    governanceChain: [
      { step: "1. Data Ingestion & Telemetry Fusion", status: "Complete", detail: "Queried Core Banking ledger, SWIFT wire logs, and IP geolocation table for Account ACC-8849201." },
      { step: "2. Policy Rule & Threshold Match", status: "Triggered", detail: "Matched 3 transactions totaling $710,000 within 48 hours, all positioned between $230,000 and $245,000 to avoid internal $250k manual sign-off." },
      { step: "3. Evidence & Sanctions Verification", status: "Verified", detail: "Counterparty Zephyr Holdings Ltd registered in Nicosia, Cyprus (high risk OFC jurisdiction). Device IP routed through TOR Exit Node (IP: 198.51.100.42)." },
      { step: "4. Regulatory Report Assembly", status: "Ready", detail: "Generated draft FinCEN Form 111 (Suspicious Activity Report XML) with complete data lineage." }
    ],
    citations: [
      { code: "FinCEN AML § 1010.311(a)", text: "Prohibits structuring transactions to evade reporting thresholds or internal approval controls." },
      { code: "FinCEN AML § 1010.311(c)", text: "Mandates SAR filing within 30 days for unexplained velocity spikes to offshore financial centers." }
    ],
    evidenceItems: [
      { key: "Account ID", val: "ACC-8849201 (Apex Global Corp)" },
      { key: "Transaction ID", val: "TX-98402" },
      { key: "Wire Amount", val: "$240,000 USD" },
      { key: "48h Cumulative Outflow", val: "$710,000 USD (Historical avg: $15k/mo)" },
      { key: "Origin IP Geolocation", val: "198.51.100.42 (Known TOR Anomaly)" },
      { key: "Destination Entity", val: "Zephyr Holdings Ltd (Nicosia, Cyprus)" }
    ],
    recommendedActions: [
      "Place immediate 72-hour administrative lock on Account ACC-8849201.",
      "Submit pre-populated Suspicious Activity Report (SAR #2026-CY-98402) to FinCEN.",
      "Issue EDD (Enhanced Due Diligence) notice to Apex Global Corp compliance officer."
    ],
    sarDraft: {
      reportId: "SAR-2026-98402-A",
      filingType: "FinCEN Form 111 (Suspicious Activity Report)",
      subjectName: "Apex Global Corp / Zephyr Holdings Ltd",
      narrative: "On September 20, 2026, automated risk monitoring identified a series of 3 structured wire transfers aggregating $710,000 USD originating from Apex Global Corp to Zephyr Holdings Ltd in Nicosia, Cyprus. Individual transfer amounts ($240,000, $235,000, $235,000) appear intentionally structured to circumvent the bank's $250,000 executive approval threshold. Furthermore, transaction IP logs reveal TOR network routing, inconsistent with corporate operating history. The bank recommends account restraint and regulatory escalation.",
      timestamp: "2026-09-20 21:20:00 UTC",
      preparedBy: "Risk & Regulatory Intelligence Copilot v4.2"
    }
  },
  "prompt-2": {
    query: "Run a 30-day liquidity stress test assuming a 15% sudden outflow in corporate deposits.",
    verdict: "COMPLIANT WITH BUFFER MARGIN (LCR: 104.2%)",
    confidence: "99.1%",
    summary: "Applying a 15% stress haircut to corporate deposits ($1.2B outflow) reduces available High-Quality Liquid Assets (HQLA) but keeps the Liquidity Coverage Ratio at 104.2%, staying 4.2% above the 100% regulatory baseline.",
    governanceChain: [
      { step: "1. Baseline Reserve Extraction", status: "Complete", detail: "Current HQLA Stock: $2.45B. Baseline 30-day Net Outflows: $2.134B (LCR = 114.8%)." },
      { step: "2. Stress Factor Application", status: "Applied", detail: "Injected +15% run-off rate for non-operational corporate wholesale deposits per Basel III Art. 412." },
      { step: "3. Recalculated Outflow Model", status: "Simulated", detail: "New Net Cash Outflows = $2.351B. Calculated LCR = ($2.45B / $2.351B) = 104.2%." }
    ],
    citations: [
      { code: "Basel III LCR Art. 412.1", text: "Requires HQLA stock to cover at least 100% of 30-day stressed net outflows." },
      { code: "Fed Liquidity Rule § 249.30", text: "Mandates daily intraday liquidity monitoring when LCR drops below 105% buffer zone." }
    ],
    evidenceItems: [
      { key: "Current HQLA Stock", val: "$2,450,000,000 USD" },
      { key: "Baseline Net Outflow (30d)", val: "$2,134,000,000 USD" },
      { key: "Stressed Net Outflow (15% shock)", val: "$2,351,248,000 USD" },
      { key: "Stressed LCR Score", val: "104.2% (Baseline: 114.8%)" },
      { key: "Regulatory Requirement", val: "100.0% Minimum" },
      { key: "Buffer Threshold", val: "+4.2% Surplus ($98.7M Margin)" }
    ],
    recommendedActions: [
      "Alert Asset-Liability Committee (ALCO) of stress buffer drop below 105%.",
      "Activate Tier-1 Contingency Funding Plan (CFP) to mobilize $300M in Repo eligible Treasuries.",
      "Schedule daily LCR reporting for Central Bank regulatory submission."
    ],
    sarDraft: null
  }
};
