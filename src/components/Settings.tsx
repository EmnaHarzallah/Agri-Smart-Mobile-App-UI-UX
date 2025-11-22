import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, User, Globe, LogOut, Plus, Wifi, WifiOff } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SettingsProps {
  onBack: () => void;
}

export default function Settings({ onBack }: SettingsProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [cropType, setCropType] = useState('wheat');

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#2a2a2a] px-5 py-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="text-white">Paramètres et Gestion</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mon Compte */}
        <div className="px-5 py-6">
          <h3 className="text-amber-600 mb-4">Mon Compte</h3>
          
          <div className="space-y-3 mb-6">
            <Card className="bg-[#2a2a2a] border-gray-700 hover:bg-[#333] transition-colors cursor-pointer">
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-900/30 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="text-white">Nom, email, mot de passe</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </Card>

            <Card className="bg-[#2a2a2a] border-gray-700 hover:bg-[#333] transition-colors cursor-pointer">
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-900/30 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="text-white">Langue et Unités</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </Card>

            <Card className="bg-[#2a2a2a] border-gray-700 hover:bg-[#333] transition-colors cursor-pointer">
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="text-red-400">Déconnexion</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Mon Exploitation */}
          <h3 className="text-amber-600 mb-4">Mon Exploitation</h3>
          
          <Card className="bg-[#2a2a2a] border-gray-700 mb-6">
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Nom de l'exploitation</label>
                <input 
                  type="text"
                  defaultValue="Ferme Martin"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-600"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Type de culture principale</label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger className="w-full bg-[#1a1a1a] border-gray-700 text-white">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-gray-700">
                    <SelectItem value="wheat" className="text-white hover:bg-gray-700">Blé</SelectItem>
                    <SelectItem value="corn" className="text-white hover:bg-gray-700">Maïs</SelectItem>
                    <SelectItem value="tomato" className="text-white hover:bg-gray-700">Tomates</SelectItem>
                    <SelectItem value="potato" className="text-white hover:bg-gray-700">Pommes de terre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Gestion des Capteurs */}
          <h3 className="text-amber-600 mb-4">Gestion des Capteurs</h3>
          
          <div className="space-y-3 mb-6">
            <Card className="bg-[#2a2a2a] border-gray-700">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Wifi className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white">Capteur Humidité #1</div>
                      <div className="text-sm text-gray-400">Parcelle A - Actif</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      92%
                    </div>
                    <button className="text-amber-600 text-sm hover:underline">
                      Configurer
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#2a2a2a] border-gray-700">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Wifi className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white">Capteur Nutriments #2</div>
                      <div className="text-sm text-gray-400">Parcelle B - Actif</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-orange-900/30 text-orange-400 px-2 py-1 rounded text-xs">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      40%
                    </div>
                    <button className="text-amber-600 text-sm hover:underline">
                      Configurer
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              variant="outline" 
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-[#2a2a2a]"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="text-amber-600">Ajouter un capteur</span>
            </Button>
          </div>

          {/* Alertes et Notifications */}
          <h3 className="text-amber-600 mb-4">Alertes et Notifications</h3>
          
          <Card className="bg-[#2a2a2a] border-gray-700 mb-6">
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Seuil d'humidité du sol</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="text"
                    defaultValue="30%"
                    className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-600"
                  />
                  <span className="text-gray-500">-</span>
                  <input 
                    type="text"
                    defaultValue="75%"
                    className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-white">Notifications Push</div>
                  <Switch 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-white">Notifications par Email</div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-white">Notifications par SMS</div>
                  <Switch 
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <Button className="w-full bg-amber-700 hover:bg-amber-600 text-white py-6 mb-6">
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  );
}
