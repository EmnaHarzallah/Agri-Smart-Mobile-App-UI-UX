import React from 'react';
import { Menu, Bell, MapPin, AlertTriangle, Wind, Droplets, Thermometer } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/d328ba9c42a3ac8512d9ed6e0905ef3d7652276f.png';

interface DashboardProps {
  onMenuClick: () => void;
  onViewMap: (parcelId: string) => void;
  onViewAlerts: () => void;
  onViewParcelDetails?: (parcelId: string) => void;
}

const URGENT_ACTIONS = [
  {
    id: 1,
    type: 'Maladie détectée',
    parcelle: 'Parcelle C',
    icon: AlertTriangle,
    color: 'text-red-500 bg-red-50',
    description: 'Mildiou possible détecté',
    priority: 'Urgent'
  },
  {
    id: 2,
    type: 'Irrigation recommandée',
    parcelle: 'Parcelle A',
    icon: Droplets,
    color: 'text-blue-500 bg-blue-50',
    description: 'Humidité du sol: 25%',
    priority: 'Important'
  },
  {
    id: 3,
    type: 'Température élevée',
    parcelle: 'Parcelle B',
    icon: Thermometer,
    color: 'text-orange-500 bg-orange-50',
    description: '32°C prévu demain',
    priority: 'Attention'
  }
];

const PARCELS = [
  {
    id: 'A',
    name: 'Parcelle A',
    crop: 'Blé',
    surface: '12 ha',
    status: 'Bon',
    statusColor: 'bg-green-500',
    humidity: '45%',
    temperature: '24°C',
    image: 'https://images.unsplash.com/photo-1620559290860-d1848adf78bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwZmllbGQlMjBncmVlbnxlbnwxfHx8fDE3NjM3NjY4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'B',
    name: 'Parcelle B',
    crop: 'Maïs',
    surface: '8 ha',
    status: 'Attention',
    statusColor: 'bg-orange-500',
    humidity: '38%',
    temperature: '26°C',
    image: 'https://images.unsplash.com/photo-1721594489297-963f5e24abe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwZmllbGQlMjBhZXJpYWx8ZW58MXx8fHwxNzYzNzA1NjkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'C',
    name: 'Parcelle C',
    crop: 'Tomates',
    surface: '5 ha',
    status: 'Critique',
    statusColor: 'bg-red-500',
    humidity: '52%',
    temperature: '25°C',
    image: 'https://images.unsplash.com/photo-1743742566156-f1745850281a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwc3lzdGVtJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzYzNzY2ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export default function Dashboard({ onMenuClick, onViewMap, onViewAlerts, onViewParcelDetails }: DashboardProps) {
  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="Agri-Smart AI" 
              className="h-10 w-auto"
            />
            <span className="text-white text-lg">Agri-Smart</span>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-white/80 text-xs mb-1">Parcelles</div>
            <div className="text-white">3 actives</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-white/80 text-xs mb-1">Alertes</div>
            <div className="text-white">5 nouvelles</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-white/80 text-xs mb-1">Surface</div>
            <div className="text-white">25 ha</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* Actions urgentes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">Actions urgentes</h2>
            <button 
              onClick={onViewAlerts}
              className="text-sm text-green-400 hover:text-green-300"
            >
              Voir tout
            </button>
          </div>
          
          <div className="space-y-3">
            {URGENT_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Card key={action.id} className="p-4 border-l-4 border-l-red-500 hover:shadow-md transition-shadow cursor-pointer bg-[#2a2a2a] border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <div className="text-white">{action.type}</div>
                          <div className="text-sm text-gray-400">{action.parcelle}</div>
                        </div>
                        <Badge variant="destructive" className="text-xs shrink-0">
                          {action.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-300">{action.description}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Vue d'ensemble */}
        <div>
          <h2 className="text-white mb-4">Vue d'ensemble</h2>
          
          <div className="space-y-4">
            {PARCELS.map((parcel) => (
              <Card 
                key={parcel.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-[#2a2a2a] border-gray-700"
                onClick={() => onViewMap(parcel.id)}
              >
                <div className="relative h-32">
                  <ImageWithFallback
                    src={parcel.image}
                    alt={parcel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <div>{parcel.name}</div>
                      <div className={`w-2 h-2 rounded-full ${parcel.statusColor}`} />
                    </div>
                    <div className="text-sm text-white/90">{parcel.crop} • {parcel.surface}</div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">État</div>
                      <div className="text-sm text-white">{parcel.status}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Humidité</div>
                      <div className="text-sm text-white flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        {parcel.humidity}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Temp.</div>
                      <div className="text-sm text-white flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-orange-500" />
                        {parcel.temperature}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-800 bg-[#1a1a1a]">
        <div className="grid grid-cols-4 h-16">
          <button className="flex flex-col items-center justify-center gap-1 text-green-500">
            <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
            <span className="text-xs">Tableau</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-400"
            onClick={() => onViewMap('A')}
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">Carte</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-400"
            onClick={onViewAlerts}
          >
            <AlertTriangle className="w-6 h-6" />
            <span className="text-xs">Alertes</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-400">
            <Wind className="w-6 h-6" />
            <span className="text-xs">Météo</span>
          </button>
        </div>
      </div>
    </div>
  );
}