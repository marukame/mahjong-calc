// src/components/MahjongCalculator/PlayerInput.tsx
'use client'

import React from 'react';
import { Users } from 'lucide-react';
import { PlayerInputProps } from '@/types/mahjong';

const PlayerInput: React.FC<PlayerInputProps> = ({
  players,
  onPlayerNameChange,
  onPlayerScoreChange
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border border-blue-100">
      <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2" />
        プレイヤー情報
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map((player, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => onPlayerNameChange(index, e.target.value)}
                  placeholder="プレイヤー名"
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2 text-gray-800"
                />
                <input
                  type="number"
                  value={player.score}
                  onChange={(e) => onPlayerScoreChange(index, e.target.value)}
                  placeholder="最終点数"
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerInput;