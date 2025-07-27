// src/types/mahjong.ts

export interface Player {
  name: string;
  score: number;
}

export interface Uma {
  first: number;
  second: number;
  third: number;
  fourth: number;
}

export interface Settings {
  oka: number;        // 保持（互換性のため）
  uma: Uma;
  rate: number;       // 保持（今回は使用しない）
  startingPoints: number; // 持ち点（開始時の点数）
  returnPoints: number;   // 返し点（精算時の基準点）
}

export interface Result {
  name: string;
  score: number;
  originalIndex: number;
  rank: number;
  rawScore: number;
  umaPoints: number;
  totalPoints: number;
  roundedRawScore?: number; // 5捨6入後の素点（デバッグ用）
  isFirstPlace?: boolean;   // 1位フラグ
}

export interface MahjongCalculatorProps {
  players: Player[];
  settings: Settings;
  results: Result[] | null;
  showSettings: boolean;
  onPlayerNameChange: (index: number, name: string) => void;
  onPlayerScoreChange: (index: number, score: string) => void;
  onSettingsChange: (settings: Settings) => void;
  onToggleSettings: () => void;
  onCalculate: () => void;
  onReset: () => void;
}

export interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  isVisible: boolean;
}

export interface PlayerInputProps {
  players: Player[];
  onPlayerNameChange: (index: number, name: string) => void;
  onPlayerScoreChange: (index: number, score: string) => void;
}

export interface ResultsDisplayProps {
  results: Result[];
  settings: Settings;
}

export interface ActionButtonsProps {
  onCalculate: () => void;
  onReset: () => void;
}