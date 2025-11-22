import React, { useState } from 'react';
import { ArrowLeft, Download, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface HistoryAnalysisProps {
  onBack: () => void;
}

const CHART_DATA = [
  { date: '15/07', value: 42 },
  { date: '16/07', value: 38 },
  { date: '17/07', value: 45 },
  { date: '18/07', value: 40 },
  { date: '19/07', value: 48 },
  { date: '20/07', value: 35 },
  { date: '21/07', value: 52 }
];

const INTERVENTIONS = [
  {
    id: 1,
    type: 'Irrigation',
    icon: '💧',
    value: '25mm',
    date: '14/07 - 08:30',
    bgColor: 'bg-blue-900/20'
  },
  {
    id: 2,
    type: 'Fertilisation',
    icon: '🌿',
    subtype: 'Type: NPK',
    date: '12/07 - 11:00',
    bgColor: 'bg-green-900/20'
  },
  {
    id: 3,
    type: 'Irrigation',
    icon: '💧',
    value: '20mm',
    date: '10/07 - 09:00',
    bgColor: 'bg-blue-900/20'
  }
];

export default function HistoryAnalysis({ onBack }: HistoryAnalysisProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedParcel, setSelectedParcel] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('humidity');

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#2a2a2a] px-5 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="text-white">Historique et Analyse</div>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Download className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <button className="flex-1 bg-[#3a3a3a] border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center justify-between hover:bg-[#444] transition-colors">
            <span>Toutes les parcelles</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex-1 bg-[#3a3a3a] border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center justify-between hover:bg-[#444] transition-colors">
            <span>Humidité du sol</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Period Tabs */}
        <div className="px-5 py-4 border-b border-gray-800">
          <div className="flex gap-2">
            {['Jour', 'Semaine', 'Mois', 'Saison'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  period === 'Semaine'
                    ? 'bg-amber-700 text-white'
                    : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-6">
          {/* Main Chart */}
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">
              Humidité du sol - Parcelle A7 - Dernière Semaine
            </div>
            
            <div className="mb-4">
              <div className="text-4xl text-white mb-1">45%</div>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>Derniers 7 jours: +2.5%</span>
              </div>
            </div>

            <Card className="bg-[#2a2a2a] border-gray-700 p-4">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#888"
                    tick={{ fill: '#888', fontSize: 11 }}
                  />
                  <YAxis 
                    stroke="#888"
                    tick={{ fill: '#888', fontSize: 11 }}
                    domain={[0, 70]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2a2a2a', 
                      border: '1px solid #444',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#d97706" 
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="bg-[#2a2a2a] border-gray-700 p-4">
              <div className="text-sm text-gray-400 mb-2">Humidité Moy.</div>
              <div className="text-2xl text-white mb-2">45%</div>
              <div className="flex items-center gap-1 text-sm text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>+2.5%</span>
              </div>
            </Card>

            <Card className="bg-[#2a2a2a] border-gray-700 p-4">
              <div className="text-sm text-gray-400 mb-2">Eau d'irrigation</div>
              <div className="text-2xl text-white mb-2">150m³</div>
              <div className="flex items-center gap-1 text-sm text-red-400">
                <TrendingDown className="w-3 h-3" />
                <span>-5%</span>
              </div>
            </Card>
          </div>

          {/* Interventions History */}
          <div>
            <h3 className="text-white mb-4">Historique des Interventions</h3>
            
            <div className="space-y-3">
              {INTERVENTIONS.map((intervention) => (
                <Card key={intervention.id} className={`${intervention.bgColor} border-gray-700`}>
                  <div className="p-4 flex items-center gap-4">
                    <div className="text-2xl">{intervention.icon}</div>
                    <div className="flex-1">
                      <div className="text-white mb-1">
                        {intervention.type}
                        {intervention.value && (
                          <>
                            <br />
                            <span className="text-sm text-gray-400">Valeur: {intervention.value}</span>
                          </>
                        )}
                        {intervention.subtype && (
                          <>
                            <br />
                            <span className="text-sm text-gray-400">{intervention.subtype}</span>
                          </>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{intervention.date}</div>
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
