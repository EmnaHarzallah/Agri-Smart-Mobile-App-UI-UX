import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import AlertsCenter from './components/AlertsCenter';
import ParcelDetails from './components/ParcelDetails';
import Settings from './components/Settings';
import HistoryAnalysis from './components/HistoryAnalysis';
import Weather from './components/Weather';
import AgriMenu from './components/AgriMenu';

type ViewMode = 'dashboard' | 'map' | 'alerts' | 'parcelDetails' | 'settings' | 'profile' | 'help' | 'history' | 'weather';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [selectedParcel, setSelectedParcel] = useState<string>('A');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleViewMap = (parcelId: string) => {
    setSelectedParcel(parcelId);
    setViewMode('map');
  };

  const handleViewParcelDetails = (parcelId: string) => {
    setSelectedParcel(parcelId);
    setViewMode('parcelDetails');
  };

  const handleMenuNavigation = (screen: string) => {
    setViewMode(screen as ViewMode);
  };

  const renderCurrentView = () => {
    switch (viewMode) {
      case 'dashboard':
        return (
          <Dashboard
            onMenuClick={() => setIsMenuOpen(true)}
            onViewMap={handleViewMap}
            onViewAlerts={() => setViewMode('alerts')}
            onViewParcelDetails={handleViewParcelDetails}
          />
        );
      
      case 'map':
        return (
          <MapView
            parcelId={selectedParcel}
            onBack={() => setViewMode('dashboard')}
          />
        );
      
      case 'alerts':
        return (
          <AlertsCenter
            onBack={() => setViewMode('dashboard')}
          />
        );
      
      case 'parcelDetails':
        return (
          <ParcelDetails
            parcelId={selectedParcel}
            onBack={() => setViewMode('dashboard')}
          />
        );
      
      case 'settings':
        return (
          <Settings
            onBack={() => setViewMode('dashboard')}
          />
        );
      
      case 'history':
        return (
          <HistoryAnalysis
            onBack={() => setViewMode('dashboard')}
          />
        );
      
      case 'weather':
        return (
          <Weather
            onMenuClick={() => setIsMenuOpen(true)}
            onBack={() => setViewMode('dashboard')}
          />
        );
      
      default:
        return (
          <Dashboard
            onMenuClick={() => setIsMenuOpen(true)}
            onViewMap={handleViewMap}
            onViewAlerts={() => setViewMode('alerts')}
            onViewParcelDetails={handleViewParcelDetails}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      {/* iPhone 16 Container */}
      <div className="w-[393px] h-[852px] bg-[#1a1a1a] relative overflow-hidden rounded-[40px] shadow-2xl border-8 border-gray-900">
        {renderCurrentView()}
        
        {/* Menu */}
        <AgriMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={handleMenuNavigation}
        />
      </div>
    </div>
  );
}