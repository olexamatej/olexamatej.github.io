import React, { useState } from 'react';
import WriteupLanding from './WriteupLanding';
import WriteupViewer from './WriteupViewer';

export default function Writeups() {
  const [view, setView] = useState('landing'); // 'landing' or 'viewer'
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleSelectRepo = (repoId) => {
    setSelectedRepo(repoId);
    setView('viewer');
  };

  const handleBack = () => {
    setView('landing');
    setSelectedRepo(null);
  };

  if (view === 'viewer') {
    return <WriteupViewer selectedRepo={selectedRepo} onBack={handleBack} />;
  }

  return <WriteupLanding onSelectRepo={handleSelectRepo} />;
}
