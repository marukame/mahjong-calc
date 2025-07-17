// src/constants/mahjong.ts
import { Player, Settings } from '@/types/mahjong';

export const DEFAULT_PLAYERS: Player[] = [
  { name: 'プレイヤー1', score: 25000 },
  { name: 'プレイヤー2', score: 25000 },
  { name: 'プレイヤー3', score: 25000 },
  { name: 'プレイヤー4', score: 25000 }
];

export const DEFAULT_SETTINGS: Settings = {
  oka: 20000,
  uma: { first: 20, second: 10, third: -10, fourth: -20 },
  rate: 3
};

export const RATE_OPTIONS = [
  { value: 3, label: '点3' },
  { value: 5, label: '点5' },
  { value: 10, label: '点10' }
];

export const RANK_COLORS = {
  1: 'bg-gradient-to-r from-pink-200 to-rose-200 border-pink-300',
  2: 'bg-gradient-to-r from-blue-200 to-cyan-200 border-blue-300',
  3: 'bg-gradient-to-r from-green-200 to-emerald-200 border-green-300',
  4: 'bg-gradient-to-r from-purple-200 to-violet-200 border-purple-300'
} as const;

export const RANK_EMOJIS = {
  1: '🏆',
  2: '🥈', 
  3: '🥉',
  4: '🌸'
} as const;