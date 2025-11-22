import React from 'react';
import { Menu, Bell, CloudRain, Cloud, Sun, Wind, Droplets, Eye, Gauge, Sunrise, Sunset, CloudDrizzle, CloudSnow, Thermometer } from 'lucide-react';
import { Card } from './ui/card';
import logoImage from 'figma:asset/d328ba9c42a3ac8512d9ed6e0905ef3d7652276f.png';

interface WeatherProps {
  onMenuClick: () => void;
  onBack: () => void;
}

export default function Weather({ onMenuClick, onBack }: WeatherProps) {
  const weatherData = {
    current: {
      temp: 18,
      condition: 'Partiellement nuageux',
      icon: Cloud,
      humidity: 65,
      wind: 12,
      pressure: 1013,
      visibility: 10,
      uvIndex: 4,
      feelsLike: 16,
    },
    hourly: [
      { time: '14:00', temp: 18, icon: Cloud, precipitation: 10 },
      { time: '15:00', temp: 19, icon: Sun, precipitation: 5 },
      { time: '16:00', temp: 20, icon: Sun, precipitation: 0 },
      { time: '17:00', temp: 19, icon: Cloud, precipitation: 15 },
      { time: '18:00', temp: 17, icon: CloudRain, precipitation: 40 },
      { time: '19:00', temp: 16, icon: CloudRain, precipitation: 60 },
    ],
    daily: [
      { day: 'Aujourd\'hui', maxTemp: 20, minTemp: 12, icon: Cloud, precipitation: 40, description: 'Nuageux avec averses' },
      { day: 'Demain', maxTemp: 22, minTemp: 14, icon: Sun, precipitation: 10, description: 'Ensoleillé' },
      { day: 'Lundi', maxTemp: 24, minTemp: 15, icon: Sun, precipitation: 5, description: 'Beau temps' },
      { day: 'Mardi', maxTemp: 21, minTemp: 13, icon: CloudRain, precipitation: 70, description: 'Pluie modérée' },
      { day: 'Mercredi', maxTemp: 19, minTemp: 11, icon: CloudRain, precipitation: 80, description: 'Pluie forte' },
      { day: 'Jeudi', maxTemp: 23, minTemp: 14, icon: Cloud, precipitation: 20, description: 'Partiellement nuageux' },
      { day: 'Vendredi', maxTemp: 25, minTemp: 16, icon: Sun, precipitation: 0, description: 'Ensoleillé' },
    ],
    alerts: [
      { type: 'warning', message: 'Alerte pluie : 15mm attendus demain après-midi', impact: 'Éviter l\'irrigation' },
      { type: 'info', message: 'Conditions idéales pour traitement phytosanitaire mercredi', impact: 'Planifier traitement' },
    ],
  };

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-6 pb-8 flex-shrink-0">
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
        
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={onBack}
            className="text-white/80 hover:text-white"
          >
            ← Retour
          </button>
        </div>

        <h1 className="text-white text-2xl mb-1">Météo Agricole</h1>
        <p className="text-green-100 text-sm">Ferme Martin - Beauce</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-6 pb-8">
          {/* Current Weather */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-white/80 text-sm mb-1">Maintenant</div>
                <div className="text-white text-6xl mb-2">{weatherData.current.temp}°</div>
                <div className="text-white/90 text-lg">{weatherData.current.condition}</div>
                <div className="text-white/70 text-sm mt-1">Ressenti {weatherData.current.feelsLike}°</div>
              </div>
              <weatherData.current.icon className="w-20 h-20 text-white/80" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <Droplets className="w-5 h-5 text-white/60 mx-auto mb-1" />
                <div className="text-white/60 text-xs">Humidité</div>
                <div className="text-white">{weatherData.current.humidity}%</div>
              </div>
              <div className="text-center">
                <Wind className="w-5 h-5 text-white/60 mx-auto mb-1" />
                <div className="text-white/60 text-xs">Vent</div>
                <div className="text-white">{weatherData.current.wind} km/h</div>
              </div>
              <div className="text-center">
                <Gauge className="w-5 h-5 text-white/60 mx-auto mb-1" />
                <div className="text-white/60 text-xs">Pression</div>
                <div className="text-white">{weatherData.current.pressure} hPa</div>
              </div>
            </div>
          </Card>

          {/* Agricultural Alerts */}
          {weatherData.alerts.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-white">Alertes Agricoles</h2>
              {weatherData.alerts.map((alert, index) => (
                <Card 
                  key={index}
                  className={`border-0 p-4 ${
                    alert.type === 'warning' 
                      ? 'bg-orange-900/30 border-l-4 border-orange-500' 
                      : 'bg-blue-900/30 border-l-4 border-blue-500'
                  }`}
                >
                  <div className="text-white text-sm mb-1">{alert.message}</div>
                  <div className="text-gray-400 text-xs">💡 {alert.impact}</div>
                </Card>
              ))}
            </div>
          )}

          {/* Hourly Forecast */}
          <div>
            <h2 className="text-white mb-3">Prévisions horaires</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {weatherData.hourly.map((hour, index) => (
                <Card key={index} className="bg-[#2a2a2a] border-gray-700 p-4 flex-shrink-0 w-[100px]">
                  <div className="text-gray-400 text-sm text-center mb-2">{hour.time}</div>
                  <hour.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-white text-center mb-2">{hour.temp}°</div>
                  <div className="flex items-center justify-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400 text-xs">{hour.precipitation}%</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Daily Forecast */}
          <div>
            <h2 className="text-white mb-3">Prévisions 7 jours</h2>
            <div className="space-y-2">
              {weatherData.daily.map((day, index) => (
                <Card key={index} className="bg-[#2a2a2a] border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <day.icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-white">{day.day}</div>
                        <div className="text-gray-400 text-xs">{day.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm">{day.precipitation}%</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white">{day.maxTemp}°</span>
                        <span className="text-gray-500 text-sm"> / {day.minTemp}°</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h2 className="text-white mb-3">Détails supplémentaires</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-[#2a2a2a] border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400 text-sm">Visibilité</span>
                </div>
                <div className="text-white text-xl">{weatherData.current.visibility} km</div>
              </Card>

              <Card className="bg-[#2a2a2a] border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-400 text-sm">Indice UV</span>
                </div>
                <div className="text-white text-xl">{weatherData.current.uvIndex} / 10</div>
              </Card>

              <Card className="bg-[#2a2a2a] border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sunrise className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-400 text-sm">Lever du soleil</span>
                </div>
                <div className="text-white text-xl">06:45</div>
              </Card>

              <Card className="bg-[#2a2a2a] border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sunset className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-400 text-sm">Coucher du soleil</span>
                </div>
                <div className="text-white text-xl">20:30</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
