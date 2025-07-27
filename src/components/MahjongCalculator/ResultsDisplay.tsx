// src/components/MahjongCalculator/ResultsDisplay.tsx
'use client'

import React from 'react';
import { DollarSign } from 'lucide-react';
import { ResultsDisplayProps } from '@/types/mahjong';
import { RANK_COLORS, RANK_EMOJIS } from '@/constants/mahjong';

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  settings
}) => {
  const getRankColor = (rank: number) => {
    return RANK_COLORS[rank as keyof typeof RANK_COLORS] || 'bg-gray-100';
  };

  const getRankEmoji = (rank: number) => {
    return RANK_EMOJIS[rank as keyof typeof RANK_EMOJIS] || '';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-green-100">
      <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2" />
        精算結果
      </h2>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-xl border-2 ${getRankColor(result.rank)} transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getRankEmoji(result.rank)}</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{result.name}</h3>
                  <p className="text-sm text-gray-700">
                    {result.rank}位 - {result.score.toLocaleString()}点
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  <span className={result.totalPoints >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {result.totalPoints >= 0 ? '+' : ''}{result.totalPoints}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {result.rank === 1 ? (
                    <span>1位調整ポイント（2-4位の逆数）</span>
                  ) : (
                    <span>
                      素点: {result.rawScore >= 0 ? '+' : ''}{result.rawScore.toLocaleString()}
                      {result.roundedRawScore !== undefined && (
                        <span> → {result.roundedRawScore >= 0 ? '+' : ''}{result.roundedRawScore.toLocaleString()}</span>
                      )}
                      {' | '}ウマ: {result.umaPoints >= 0 ? '+' : ''}{result.umaPoints}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
        <p className="text-sm text-gray-700 text-center mb-2">
          <strong>計算式</strong>
        </p>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>2-4位:</strong> (素点を5捨6入 ÷ 1000) + ウマ</p>
          <p><strong>1位:</strong> -(2位+3位+4位のポイント)</p>
          <p><strong>素点:</strong> 最終点数 - {settings.returnPoints.toLocaleString()}点</p>
          <p><strong>5捨6入:</strong> 500以下切り捨て、600以上切り上げ</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;