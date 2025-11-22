import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Droplets, Thermometer, Wind, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

interface ParcelDetailsProps {
  parcelId: string;
  onBack: () => void;
}

const CHART_DATA = [
  { day: '1', depth30: 35, depth50: 38, depth80: 42 },
  { day: '2', depth30: 40, depth50: 42, depth80: 45 },
  { day: '3', depth30: 32, depth50: 35, depth80: 40 },
  { day: '4', depth30: 38, depth50: 40, depth80: 43 },
  { day: '5', depth30: 30, depth50: 33, depth80: 38 },
  { day: '6', depth30: 42, depth50: 45, depth80: 48 },
  { day: '7', depth30: 38, depth50: 40, depth80: 44 }
];

const OPERATIONS_LOG = [
  {
    id: 1,
    type: 'Irrigation',
    icon: '💧',
    value: '20mm',
    date: '15/07/2024 - 08:30',
    bgColor: 'bg-blue-900/20'
  },
  {
    id: 2,
    type: 'Fertilisation NPK',
    icon: '🌿',
    value: '',
    date: '11/06 - 11:00',
    bgColor: 'bg-green-900/20'
  },
  {
    id: 3,
    type: 'Événement Météo : Pluie (15mm)',
    icon: '🌧️',
    value: '',
    date: '10/07 - 16:00',
    bgColor: 'bg-cyan-900/20'
  }
];

export default function ParcelDetails({ parcelId, onBack }: ParcelDetailsProps) {
  const [showRecommendation, setShowRecommendation] = useState(true);

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#2a2a2a] px-5 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="text-white">Parcelle A-12</div>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <MoreVertical className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="text-sm text-gray-400 text-center">Culture actuelle : Maïs</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Recommendation Card */}
        {showRecommendation && (
          <div className="p-5">
            <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-700/50 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-3xl">💧</div>
                  <div className="flex-1">
                    <div className="text-sm text-amber-200 mb-1">Recommandation Actuelle</div>
                    <div className="text-white mb-2">Irrigation Recommandée : 25mm</div>
                    <p className="text-sm text-gray-300">
                      Le sol est sec en profondeur. Une irrigation est nécessaire pour éviter le stress hydrique.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-amber-700 hover:bg-amber-600 text-white"
                    onClick={() => setShowRecommendation(false)}
                  >
                    <span className="mr-2">💧</span>
                    Lancer l'irrigation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => setShowRecommendation(false)}
                  >
                    Ignorer
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Live Data */}
        <div className="px-5 pb-5">
          <h3 className="text-white mb-4">Données en Direct</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-5">
            <Card className="bg-[#2a2a2a] border-gray-700">
              <div className="p-4">
                <div className="text-sm text-gray-400 mb-2">Humidité du Sol</div>
                <div className="text-3xl text-white mb-2">38%</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>30cm: 35%</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>50cm: 38%</span>
                  </div>
                  <div className="flex justify-between text-amber-400">
                    <span>80cm: 25%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#2a2a2a] border-gray-700">
              <div className="p-4">
                <div className="text-sm text-gray-400 mb-2">Température du Sol</div>
                <div className="text-3xl text-white mb-2">22°C</div>
                <div className="flex items-center gap-1 text-sm text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>+0,5°C vs hier</span>
                </div>
              </div>
            </Card>
          </div>

          {/* CO2 Level */}
          <Card className="bg-[#2a2a2a] border-gray-700 mb-5">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-400 mb-1">CO₂</div>
                  <div className="text-2xl text-white">110 ppm</div>
                </div>
                <Badge className="bg-amber-900/30 text-amber-400 border-amber-700">
                  Léger
                </Badge>
              </div>
              <Badge variant="destructive" className="text-xs">
                Bas
              </Badge>
              <div className="text-xs text-gray-400 mt-2">Tendance à la hausse</div>
            </div>
          </Card>

          {/* 7 Days History Chart */}
          <div className="mb-5">
            <h3 className="text-white mb-4">Historique des 7 derniers jours</h3>
            
            <Card className="bg-[#2a2a2a] border-gray-700 p-4">
              <div className="text-sm text-gray-400 mb-4">Humidité du Sol (%)</div>
              
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#888"
                    tick={{ fill: '#888', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#888"
                    tick={{ fill: '#888', fontSize: 12 }}
                    domain={[0, 60]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="depth30" 
                    stroke="#d97706" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="depth50" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="depth80" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="flex items-center justify-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-600" />
                  <span className="text-gray-400">30cm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-400">50cm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-gray-400">80cm</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Operations Log */}
          <div>
            <h3 className="text-white mb-4">Journal des Opérations</h3>
            
            <div className="space-y-3">
              {OPERATIONS_LOG.map((operation) => (
                <Card key={operation.id} className={`${operation.bgColor} border-gray-700`}>
                  <div className="p-4 flex items-center gap-4">
                    <div className="text-2xl">{operation.icon}</div>
                    <div className="flex-1">
                      <div className="text-white mb-1">
                        {operation.type}
                        {operation.value && `: ${operation.value}`}
                      </div>
                      <div className="text-sm text-gray-400">{operation.date}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
