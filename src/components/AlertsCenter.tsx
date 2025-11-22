import React, { useState } from 'react';
import { ArrowLeft, Bug, Droplets, Thermometer, Wind, CloudRain, AlertTriangle, Sprout, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface AlertsCenterProps {
  onBack: () => void;
}

const ALERTS = [
  {
    id: 1,
    type: 'Maladie',
    title: 'Mildiou possible détecté',
    parcelle: 'Parcelle C',
    description: 'Conditions favorables au développement du mildiou observées. Inspection recommandée.',
    timestamp: 'Il y a 1h',
    priority: 'Urgent',
    icon: Bug,
    iconColor: 'text-red-500 bg-red-50',
    status: 'active'
  },
  {
    id: 2,
    type: 'Irrigation',
    title: 'Irrigation recommandée',
    parcelle: 'Parcelle A',
    description: 'Niveau d\'humidité du sol sous le seuil critique (25%). Irrigation nécessaire.',
    timestamp: 'Il y a 2h',
    priority: 'Important',
    icon: Droplets,
    iconColor: 'text-blue-500 bg-blue-50',
    status: 'active'
  },
  {
    id: 3,
    type: 'Température',
    title: 'Alerte canicule prévue',
    parcelle: 'Parcelle B',
    description: 'Températures élevées prévues (>32°C) pour les 3 prochains jours.',
    timestamp: 'Il y a 3h',
    priority: 'Attention',
    icon: Thermometer,
    iconColor: 'text-orange-500 bg-orange-50',
    status: 'active'
  },
  {
    id: 4,
    type: 'Météo',
    title: 'Pluie prévue',
    parcelle: 'Toutes les parcelles',
    description: 'Précipitations attendues (15-20mm) dans les prochaines 24h. Ajuster l\'irrigation.',
    timestamp: 'Il y a 5h',
    priority: 'Info',
    icon: CloudRain,
    iconColor: 'text-indigo-500 bg-indigo-50',
    status: 'active'
  },
  {
    id: 5,
    type: 'Vent',
    title: 'Vents forts attendus',
    parcelle: 'Parcelle A',
    description: 'Vents de 40-50 km/h prévus. Vérifier la stabilité des structures.',
    timestamp: 'Il y a 6h',
    priority: 'Attention',
    icon: Wind,
    iconColor: 'text-cyan-500 bg-cyan-50',
    status: 'active'
  },
  {
    id: 6,
    type: 'Irrigation',
    title: 'Irrigation complétée',
    parcelle: 'Parcelle C',
    description: 'Cycle d\'irrigation terminé avec succès. Humidité du sol: 52%.',
    timestamp: 'Hier',
    priority: 'Info',
    icon: CheckCircle2,
    iconColor: 'text-green-500 bg-green-50',
    status: 'resolved'
  },
  {
    id: 7,
    type: 'Croissance',
    title: 'Stade de croissance critique',
    parcelle: 'Parcelle B',
    description: 'Le maïs entre en phase de floraison. Surveillance accrue recommandée.',
    timestamp: 'Hier',
    priority: 'Important',
    icon: Sprout,
    iconColor: 'text-emerald-500 bg-emerald-50',
    status: 'active'
  }
];

export default function AlertsCenter({ onBack }: AlertsCenterProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredAlerts = activeTab === 'all' 
    ? ALERTS 
    : ALERTS.filter(alert => alert.status === activeTab);

  const activeAlertsCount = ALERTS.filter(a => a.status === 'active').length;
  const resolvedAlertsCount = ALERTS.filter(a => a.status === 'resolved').length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-500';
      case 'Important':
        return 'bg-orange-500';
      case 'Attention':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-gray-800">
        <div className="px-5 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1">
              <div className="text-white">Centre d'alertes</div>
              <div className="text-sm text-gray-400">{activeAlertsCount} alertes actives</div>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <AlertTriangle className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-red-900/20 border border-red-800 rounded-xl p-3 text-center">
              <div className="text-red-400 mb-1">1</div>
              <div className="text-xs text-gray-400">Urgent</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-800 rounded-xl p-3 text-center">
              <div className="text-orange-400 mb-1">3</div>
              <div className="text-xs text-gray-400">Important</div>
            </div>
            <div className="bg-green-900/20 border border-green-800 rounded-xl p-3 text-center">
              <div className="text-green-400 mb-1">{resolvedAlertsCount}</div>
              <div className="text-xs text-gray-400">Résolues</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-800 h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="all" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=active]:text-green-400 text-gray-400 px-5 py-3"
            >
              Toutes ({ALERTS.length})
            </TabsTrigger>
            <TabsTrigger 
              value="active"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=active]:text-green-400 text-gray-400 px-5 py-3"
            >
              Actives ({activeAlertsCount})
            </TabsTrigger>
            <TabsTrigger 
              value="resolved"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=active]:text-green-400 text-gray-400 px-5 py-3"
            >
              Résolues ({resolvedAlertsCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card 
                key={alert.id} 
                className={`p-4 hover:shadow-md transition-shadow cursor-pointer bg-[#2a2a2a] border-gray-700 ${
                  alert.priority === 'Urgent' ? 'border-l-4 border-l-red-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${alert.iconColor} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="text-white mb-1">{alert.title}</div>
                        <div className="text-sm text-gray-400">{alert.parcelle}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge 
                          variant={alert.priority === 'Urgent' ? 'destructive' : 'secondary'}
                          className={`text-xs ${
                            alert.priority === 'Important' ? 'bg-orange-900/30 text-orange-400 border-orange-700' :
                            alert.priority === 'Attention' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-700' :
                            alert.priority === 'Info' ? 'bg-blue-900/30 text-blue-400 border-blue-700' : ''
                          }`}
                        >
                          {alert.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{alert.description}</p>
                    
                    {alert.status === 'active' && (
                      <div className="flex gap-2">
                        <button className="text-sm text-green-400 hover:text-green-300 hover:underline">
                          Voir détails
                        </button>
                        <span className="text-gray-600">•</span>
                        <button className="text-sm text-gray-400 hover:text-gray-300 hover:underline">
                          Marquer comme lu
                        </button>
                      </div>
                    )}
                    
                    {alert.status === 'resolved' && (
                      <div className="flex items-center gap-2 text-sm text-green-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Résolue</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}