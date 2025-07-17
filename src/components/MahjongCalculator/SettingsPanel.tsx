// src/components/MahjongCalculator/SettingsPanel.tsx
'use client'

import React from 'react';
import { Settings } from 'lucide-react';
import { SettingsPanelProps } from '@/types/mahjong';
import { RATE_OPTIONS } from '@/constants/mahjong';

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  isVisible
}) => {
  if (!isVisible) return null;

  const updateUma = (position: keyof typeof settings.uma, value: number) => {
    onSettingsChange({
      ...settings,
      uma: { ...settings.uma, [position]: value }
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border border-purple-100">
      <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        ゲーム設定
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* オカ設定 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200">
          <label className="block text-sm font-medium text-purple-800 mb-2">
            オカ
          </label>
          <input
            type="number"
            value={settings.oka}
            onChange={(e) => onSettingsChange({
              ...settings, 
              oka: parseInt(e.target.value) || 0
            })}
            className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* レート設定 */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
          <label className="block text-sm font-medium text-blue-800 mb-2">
            レート
          </label>
          <select
            value={settings.rate}
            onChange={(e) => onSettingsChange({
              ...settings, 
              rate: parseInt(e.target.value)
            })}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {RATE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* ウマ設定 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <label className="block text-sm font-medium text-green-800 mb-2">
            ウマ設定
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-green-700">1位:</span>
              <input
                type="number"
                value={settings.uma.first}
                onChange={(e) => updateUma('first', parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 border border-green-200 rounded text-xs"
              />
            </div>
            <div>
              <span className="text-green-700">2位:</span>
              <input
                type="number"
                value={settings.uma.second}
                onChange={(e) => updateUma('second', parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 border border-green-200 rounded text-xs"
              />
            </div>
            <div>
              <span className="text-green-700">3位:</span>
              <input
                type="number"
                value={settings.uma.third}
                onChange={(e) => updateUma('third', parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 border border-green-200 rounded text-xs"
              />
            </div>
            <div>
              <span className="text-green-700">4位:</span>
              <input
                type="number"
                value={settings.uma.fourth}
                onChange={(e) => updateUma('fourth', parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 border border-green-200 rounded text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;