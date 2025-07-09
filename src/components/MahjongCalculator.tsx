'use client'  
import React, { useState } from 'react';
import { Calculator, Settings, Users, DollarSign } from 'lucide-react';

type Result = {
  name: string;
  score: number;
  originalIndex: number;
  rank: number;
  rawScore: number;
  umaPoints: number;
  totalPoints: number;
};

const MahjongCalculator = () => {
  const [players, setPlayers] = useState([
    { name: 'プレイヤー1', score: 25000 },
    { name: 'プレイヤー2', score: 25000 },
    { name: 'プレイヤー3', score: 25000 },
    { name: 'プレイヤー4', score: 25000 }
  ]);
  
  const [settings, setSettings] = useState({
    oka: 20000,
    uma: { first: 20, second: 10, third: -10, fourth: -20 },
    rate: 3
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
  };

  const updatePlayerScore = (index: number, score: string) => {
    const newPlayers = [...players];
    newPlayers[index].score = parseInt(score) || 0;
    setPlayers(newPlayers);
  };

  const calculateResults = () => {
    // プレイヤーをスコア順にソート
    const sortedPlayers = [...players]
      .map((player, index) => ({ ...player, originalIndex: index }))
      .sort((a, b) => b.score - a.score);

    // 精算計算
    const calculations = sortedPlayers.map((player, rank) => {
      const rawScore = player.score - settings.oka;
      const umaPoints = Object.values(settings.uma)[rank];
      const totalPoints = Math.floor((rawScore / 1000) * settings.rate) + umaPoints;
      
      return {
        ...player,
        rank: rank + 1,
        rawScore,
        umaPoints,
        totalPoints
      };
    });

    setResults(calculations);
  };

  const resetScores = () => {
    setPlayers(players.map(player => ({ ...player, score: 25000 })));
    setResults(null);
  };

  const getRankColor = (rank: number) => {  
    const colors = {
      1: 'bg-gradient-to-r from-pink-200 to-rose-200 border-pink-300',
      2: 'bg-gradient-to-r from-blue-200 to-cyan-200 border-blue-300',
      3: 'bg-gradient-to-r from-green-200 to-emerald-200 border-green-300',
      4: 'bg-gradient-to-r from-purple-200 to-violet-200 border-purple-300'
    };
    return colors[rank as keyof typeof colors] || 'bg-gray-100';
  };

  const getRankEmoji = (rank: number) => {
    const emojis = { 1: '🏆', 2: '🥈', 3: '🥉', 4: '🌸' };
    return emojis[rank as keyof typeof emojis] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border border-pink-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 rounded-full">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  麻雀精算アプリ
                </h1>
                <p className="text-gray-600 text-sm">点数を入力して精算を計算しましょう</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 設定パネル */}
        {showSettings && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border border-purple-100">
            <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              ゲーム設定
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200">
                <label className="block text-sm font-medium text-purple-700 mb-2">オカ</label>
                <input
                  type="number"
                  value={settings.oka}
                  onChange={(e) => setSettings({...settings, oka: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                <label className="block text-sm font-medium text-blue-700 mb-2">レート</label>
                <select
                  value={settings.rate}
                  onChange={(e) => setSettings({...settings, rate: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value={3}>点3</option>
                  <option value={5}>点5</option>
                  <option value={10}>点10</option>
                </select>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <label className="block text-sm font-medium text-green-700 mb-2">ウマ設定</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-green-600">1位:</span>
                    <input
                      type="number"
                      value={settings.uma.first}
                      onChange={(e) => setSettings({
                        ...settings,
                        uma: {...settings.uma, first: parseInt(e.target.value) || 0}
                      })}
                      className="w-full px-2 py-1 border border-green-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-green-600">2位:</span>
                    <input
                      type="number"
                      value={settings.uma.second}
                      onChange={(e) => setSettings({
                        ...settings,
                        uma: {...settings.uma, second: parseInt(e.target.value) || 0}
                      })}
                      className="w-full px-2 py-1 border border-green-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-green-600">3位:</span>
                    <input
                      type="number"
                      value={settings.uma.third}
                      onChange={(e) => setSettings({
                        ...settings,
                        uma: {...settings.uma, third: parseInt(e.target.value) || 0}
                      })}
                      className="w-full px-2 py-1 border border-green-200 rounded text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-green-600">4位:</span>
                    <input
                      type="number"
                      value={settings.uma.fourth}
                      onChange={(e) => setSettings({
                        ...settings,
                        uma: {...settings.uma, fourth: parseInt(e.target.value) || 0}
                      })}
                      className="w-full px-2 py-1 border border-green-200 rounded text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* プレイヤー入力 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            プレイヤー情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.map((player, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      placeholder="プレイヤー名"
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
                    />
                    <input
                      type="number"
                      value={player.score}
                      onChange={(e) => updatePlayerScore(index, e.target.value)}
                      placeholder="最終点数"
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={calculateResults}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>精算計算</span>
          </button>
          <button
            onClick={resetScores}
            className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            リセット
          </button>
        </div>

        {/* 結果表示 */}
        {results && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-green-100">
            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              精算結果
            </h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 ${getRankColor(result.rank)} transition-all duration-200`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getRankEmoji(result.rank)}</div>
                      <div>
                        <h3 className="font-bold text-lg">{result.name}</h3>
                        <p className="text-sm text-gray-600">{result.rank}位 - {result.score.toLocaleString()}点</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        <span className={result.totalPoints >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {result.totalPoints >= 0 ? '+' : ''}{result.totalPoints}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        素点: {result.rawScore >= 0 ? '+' : ''}{result.rawScore.toLocaleString()} | 
                        ウマ: {result.umaPoints >= 0 ? '+' : ''}{result.umaPoints}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
              <p className="text-sm text-gray-600 text-center">
                計算式: (素点 - {settings.oka.toLocaleString()}) ÷ 1000 × {settings.rate} + ウマ
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MahjongCalculator;