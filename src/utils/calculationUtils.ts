// src/utils/calculationUtils.ts
import { Player, Settings, Result } from '@/types/mahjong';

/**
 * 5捨6入で1000点単位に丸める
 * @param score 点数
 * @returns 丸めた点数
 */
export const roundToThousand = (score: number): number => {
  const remainder = score % 1000;
  if (remainder >= 600) {
    return score + (1000 - remainder);
  } else if (remainder <= 500) {
    return score - remainder;
  } else {
    return score - remainder; // 501-599は切り捨て
  }
};

/**
 * 素点を計算する（オカを差し引いた点数）
 * @param finalScore 最終点数
 * @param settings 設定情報
 * @returns 素点
 */
export const calculateRawScore = (finalScore: number, settings: Settings): number => {
  return finalScore - settings.returnPoints;
};

/**
 * ウマ点数を取得する
 * @param rank 順位（1-4）
 * @param settings 設定情報
 * @returns ウマ点数
 */
export const getUmaPoints = (rank: number, settings: Settings): number => {
  const umaValues = Object.values(settings.uma);
  return umaValues[rank - 1] || 0;
};

/**
 * 2-4位のポイント計算
 * @param finalScore 最終点数
 * @param rank 順位
 * @param settings 設定情報
 * @returns ポイント数
 */
export const calculateOtherPlacePoints = (
  finalScore: number,
  rank: number,
  settings: Settings
): number => {
  // 素点計算
  const rawScore = calculateRawScore(finalScore, settings);
  
  // 5捨6入で1000点単位に丸める
  const roundedScore = roundToThousand(rawScore);
  
  // ポイント計算
  const basePoints = roundedScore / 1000;
  const umaPoints = getUmaPoints(rank, settings);
  
  return basePoints + umaPoints;
};

/**
 * 1位のポイント計算（2-4位の合計の逆数）
 * @param otherPlayersPoints 2-4位のポイント合計
 * @returns 1位のポイント数
 */
export const calculateFirstPlacePoints = (otherPlayersPoints: number): number => {
  return -otherPlayersPoints;
};

/**
 * 全プレイヤーの精算結果を計算する
 * @param players プレイヤー情報
 * @param settings 設定情報
 * @returns 精算結果
 */
export const calculateMahjongResults = (players: Player[], settings: Settings): Result[] => {
  // プレイヤーをスコア順にソート
  const sortedPlayers = [...players]
    .map((player, index) => ({ ...player, originalIndex: index }))
    .sort((a, b) => b.score - a.score);

  // まず2-4位のポイントを計算
  const otherPlayersResults: Result[] = [];
  let otherPlayersPointsSum = 0;

  for (let i = 1; i < sortedPlayers.length; i++) { // インデックス1から（2位から）
    const player = sortedPlayers[i];
    const rank = i + 1;
    const rawScore = calculateRawScore(player.score, settings);
    const roundedRawScore = roundToThousand(rawScore);
    const umaPoints = getUmaPoints(rank, settings);
    const totalPoints = calculateOtherPlacePoints(player.score, rank, settings);
    
    otherPlayersPointsSum += totalPoints;
    
    otherPlayersResults.push({
      ...player,
      rank,
      rawScore,
      umaPoints,
      totalPoints,
      roundedRawScore // デバッグ用
    });
  }

  // 1位のポイントを計算
  const firstPlayer = sortedPlayers[0];
  const firstPlayerRawScore = calculateRawScore(firstPlayer.score, settings);
  const firstPlayerUmaPoints = getUmaPoints(1, settings);
  const firstPlayerTotalPoints = calculateFirstPlacePoints(otherPlayersPointsSum);

  const firstPlayerResult: Result = {
    ...firstPlayer,
    rank: 1,
    rawScore: firstPlayerRawScore,
    umaPoints: firstPlayerUmaPoints,
    totalPoints: firstPlayerTotalPoints,
    isFirstPlace: true // 1位であることを示すフラグ
  };

  // 結果をランク順に並べて返す
  return [firstPlayerResult, ...otherPlayersResults];
};

/**
 * 精算の合計がゼロかチェックする（検証用）
 * @param results 精算結果
 * @returns 合計がゼロかどうか
 */
export const validateCalculationSum = (results: Result[]): boolean => {
  const sum = results.reduce((total, result) => total + result.totalPoints, 0);
  return Math.abs(sum) < 0.01; // 浮動小数点の誤差を考慮
};

/**
 * 計算過程をデバッグ用に出力する
 * @param results 精算結果
 * @param settings 設定情報
 */
export const debugCalculation = (results: Result[], settings: Settings): void => {
  console.log('=== 麻雀精算計算デバッグ ===');
  console.log(`設定: ${settings.startingPoints}点持ち${settings.returnPoints}点返し`);
  
  results.forEach(result => {
    if (result.rank === 1) {
      console.log(`${result.rank}位 ${result.name}: ${result.score}点`);
      console.log(`  → 素点: ${result.rawScore}`);
      console.log(`  → ウマ: ${result.umaPoints}`);
      console.log(`  → ポイント: ${result.totalPoints} (2-4位の逆数)`);
    } else {
      const roundedScore = (result as any).roundedRawScore || roundToThousand(result.rawScore);
      console.log(`${result.rank}位 ${result.name}: ${result.score}点`);
      console.log(`  → 素点: ${result.rawScore} → 丸め: ${roundedScore}`);
      console.log(`  → ベース: ${roundedScore/1000} + ウマ: ${result.umaPoints} = ${result.totalPoints}`);
    }
  });
  
  const sum = results.reduce((total, result) => total + result.totalPoints, 0);
  console.log(`合計: ${sum} (0になるべき)`);
  console.log('========================');
};