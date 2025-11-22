import React from 'react';
import { X, LayoutDashboard, MapPin, Bell, Settings, User, HelpCircle, LogOut, BarChart3, CloudSun } from 'lucide-react';
import logoImage from 'figma:asset/d328ba9c42a3ac8512d9ed6e0905ef3d7652276f.png';

interface AgriMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

export default function AgriMenu({ isOpen, onClose, onNavigate }: AgriMenuProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'map', label: 'Carte', icon: MapPin },
    { id: 'alerts', label: 'Centre d\'alertes', icon: Bell },
    { id: 'weather', label: 'Météo Agricole', icon: CloudSun },
    { id: 'history', label: 'Historique et Analyse', icon: BarChart3 },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'help', label: 'Aide', icon: HelpCircle },
  ];

  const handleNavigate = (screenId: string) => {
    onNavigate(screenId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-[#1a1a1a] z-50 shadow-2xl">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img 
                  src={logoImage} 
                  alt="Agri-Smart AI" 
                  className="h-12 w-auto"
                />
                <span className="text-white text-xl">Agri-Smart</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div>
              <div className="text-white text-sm">Ferme Martin</div>
              <div className="text-green-200 text-xs">Agriculteur</div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-800 transition-colors text-left"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4">
            <button className="w-full flex items-center gap-4 px-2 py-3 hover:bg-gray-800 rounded-lg transition-colors text-left text-red-400">
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}