import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CampaignForm from './components/CampaignForm';
import { Campaign } from './types';
import { campaigns as initialCampaigns } from './data/mockData';

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const handleCreateCampaign = (campaign: Campaign) => {
    setCampaigns(prev => [campaign, ...prev]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard campaigns={campaigns} />} />
        <Route path="/create-campaign" element={<CampaignForm onSubmit={handleCreateCampaign} />} />
      </Routes>
    </Router>
  );
}

export default App;