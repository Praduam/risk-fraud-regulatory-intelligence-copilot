import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CopilotChat from './components/Copilot/CopilotChat';
import SignalMonitor from './components/Signals/SignalMonitor';
import SignalDetailModal from './components/Signals/SignalDetailModal';
import PolicyExplorer from './components/Evidence/PolicyExplorer';
import WorkflowWizard from './components/Workflow/WorkflowWizard';
import RiskSandbox from './components/Sandbox/RiskSandbox';

export default function App() {
  const [activeTab, setActiveTab] = useState('copilot');
  const [currentRole, setCurrentRole] = useState('Compliance Manager');

  // Modal & Navigation states
  const [inspectedSignal, setInspectedSignal] = useState(null);
  const [workflowInitialSignal, setWorkflowInitialSignal] = useState(null);
  const [selectedPolicyCode, setSelectedPolicyCode] = useState(null);

  const handleLaunchWorkflowFromCopilot = (answer) => {
    setActiveTab('workflow');
  };

  const handleLaunchWorkflowFromSignal = (signal) => {
    setWorkflowInitialSignal(signal);
    setActiveTab('workflow');
  };

  const handleOpenPolicyModal = (policyCode) => {
    setSelectedPolicyCode(policyCode);
    setActiveTab('policies');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="app-container">
        
        {/* Header with Enterprise Telemetry strip */}
        <Header 
          currentRole={currentRole} 
          setCurrentRole={setCurrentRole}
          activeTab={activeTab}
        />

        {/* Tab Navigation */}
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Dynamic Workspace Views */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'copilot' && (
            <CopilotChat 
              onLaunchWorkflow={handleLaunchWorkflowFromCopilot}
              onOpenPolicyModal={handleOpenPolicyModal}
            />
          )}

          {activeTab === 'signals' && (
            <SignalMonitor 
              onSelectSignal={(sig) => setInspectedSignal(sig)}
              onLaunchWorkflowFromSignal={handleLaunchWorkflowFromSignal}
            />
          )}

          {activeTab === 'policies' && (
            <PolicyExplorer 
              initialSelectedCode={selectedPolicyCode}
            />
          )}

          {activeTab === 'workflow' && (
            <WorkflowWizard 
              initialSignal={workflowInitialSignal}
            />
          )}

          {activeTab === 'sandbox' && (
            <RiskSandbox />
          )}
        </main>

        {/* Footer */}
        <footer style={{ 
          marginTop: 'auto', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.78rem',
          color: 'var(--text-subtle)'
        }}>
          <div>
            © 2026 Risk, Fraud & Regulatory Intelligence Copilot Suite • FinCEN § 1010.311 & Basel III Compliant
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>Role: <strong style={{ color: 'var(--cyan-400)' }}>{currentRole}</strong></span>
            <span>Audit Trail Ledger: <strong style={{ color: 'var(--emerald-400)' }}>ACTIVE</strong></span>
          </div>
        </footer>

      </div>

      {/* Signal Inspector Modal */}
      {inspectedSignal && (
        <SignalDetailModal 
          signal={inspectedSignal}
          onClose={() => setInspectedSignal(null)}
          onLaunchWorkflow={handleLaunchWorkflowFromSignal}
        />
      )}
    </div>
  );
}
