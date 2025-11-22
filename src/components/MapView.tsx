import React from 'react';
import { ArrowLeft, Droplets, Calendar, Clock, MapPin, Thermometer, Wind } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MapViewProps {
  parcelId: string;
  onBack: () => void;
}

const PARCEL_DATA = {
  A: {
    name: 'Parcelle A',
    crop: 'Blé',
    surface: '12 ha',
    location: { lat: 48.8566, lng: 2.3522 },
    irrigation: {
      system: 'Irrigation par aspersion',
      lastIrrigation: 'Il y a 3 jours',
      nextIrrigation: 'Dans 2 jours',
      waterUsed: '45,000 L',
      soilHumidity: '45%',
      temperature: '24°C',
      windSpeed: '12 km/h'
    }
  },
  B: {
    name: 'Parcelle B',
    crop: 'Maïs',
    surface: '8 ha',
    location: { lat: 48.8606, lng: 2.3376 },
    irrigation: {
      system: 'Irrigation goutte-à-goutte',
      lastIrrigation: 'Il y a 1 jour',
      nextIrrigation: 'Aujourd\'hui',
      waterUsed: '28,000 L',
      soilHumidity: '38%',
      temperature: '26°C',
      windSpeed: '8 km/h'
    }
  },
  C: {
    name: 'Parcelle C',
    crop: 'Tomates',
    surface: '5 ha',
    location: { lat: 48.8530, lng: 2.3499 },
    irrigation: {
      system: 'Irrigation localisée',
      lastIrrigation: 'Il y a 2 jours',
      nextIrrigation: 'Demain',
      waterUsed: '32,000 L',
      soilHumidity: '52%',
      temperature: '25°C',
      windSpeed: '10 km/h'
    }
  }
};

export default function MapView({ parcelId, onBack }: MapViewProps) {
  const parcel = PARCEL_DATA[parcelId as keyof typeof PARCEL_DATA] || PARCEL_DATA.A;

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-gray-800 px-5 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1">
            <div className="text-white">{parcel.name}</div>
            <div className="text-sm text-gray-400">{parcel.crop} • {parcel.surface}</div>
          </div>
          <Badge className="bg-green-900/30 text-green-400 border-green-700">
            Actif
          </Badge>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[300px] bg-gradient-to-br from-green-900/30 to-green-800/20">
        {/* Simplified map representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Parcel polygon */}
            <svg width="300" height="200" viewBox="0 0 300 200" className="drop-shadow-lg">
              <polygon 
                points="50,30 250,40 240,170 60,160" 
                fill="#4ade80" 
                fillOpacity="0.4"
                stroke="#22c55e"
                strokeWidth="3"
              />
              <circle cx="150" cy="100" r="8" fill="#22c55e" />
            </svg>
            
            {/* Location pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-green-600 text-white p-3 rounded-full shadow-lg animate-pulse">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="bg-[#2a2a2a] p-2 rounded-lg shadow-md hover:bg-gray-700 text-white border border-gray-700">
            <span className="text-xl">+</span>
          </button>
          <button className="bg-[#2a2a2a] p-2 rounded-lg shadow-md hover:bg-gray-700 text-white border border-gray-700">
            <span className="text-xl">−</span>
          </button>
        </div>
      </div>

      {/* Irrigation Details */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <Card className="overflow-hidden shadow-lg bg-[#2a2a2a] border-gray-700">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5" />
              <h3>Détails d'irrigation</h3>
            </div>
            <div className="text-sm text-blue-100">{parcel.irrigation.system}</div>
          </div>
          
          <div className="p-5 space-y-4">
            {/* Last and Next Irrigation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Dernière irrigation</span>
                </div>
                <div className="text-white">{parcel.irrigation.lastIrrigation}</div>
              </div>
              
              <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-800">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Prochaine</span>
                </div>
                <div className="text-white">{parcel.irrigation.nextIrrigation}</div>
              </div>
            </div>

            {/* Water Usage */}
            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl p-4 border border-blue-800">
              <div className="text-sm text-gray-400 mb-1">Eau utilisée (7 derniers jours)</div>
              <div className="text-2xl text-white mb-2">{parcel.irrigation.waterUsed}</div>
              <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                  style={{ width: '68%' }}
                />
              </div>
            </div>

            {/* Environmental Data */}
            <div className="space-y-3">
              <div className="text-sm text-gray-400 mb-3">Conditions actuelles</div>
              
              <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <Droplets className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Humidité du sol</div>
                    <div className="text-white">{parcel.irrigation.soilHumidity}</div>
                  </div>
                </div>
                <Badge variant={parseInt(parcel.irrigation.soilHumidity) < 40 ? 'destructive' : 'default'} className="bg-green-900/30 text-green-400 border-green-700">
                  {parseInt(parcel.irrigation.soilHumidity) < 40 ? 'Faible' : 'Normal'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-900/30 rounded-lg">
                    <Thermometer className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Température</div>
                    <div className="text-white">{parcel.irrigation.temperature}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-900/30 rounded-lg">
                    <Wind className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Vitesse du vent</div>
                    <div className="text-white">{parcel.irrigation.windSpeed}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-[#1a1a1a]">
                Historique
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Programmer
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}