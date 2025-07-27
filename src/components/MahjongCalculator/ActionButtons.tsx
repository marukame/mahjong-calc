// src/components/MahjongCalculator/ActionButtons.tsx
'use client'

import React from 'react';
import { Calculator } from 'lucide-react';
import { ActionButtonsProps } from '@/types/mahjong';

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCalculate,
  onReset
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={onCalculate}
        className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
      >
        <Calculator className="w-5 h-5" />
        <span>精算計算</span>
      </button>
      
      <button
        onClick={onReset}
        className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        リセット
      </button>
    </div>
  );
};

export default ActionButtons;