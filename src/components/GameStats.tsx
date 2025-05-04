import React from 'react';
import { GameStats as GameStatsType } from '../types/game';

interface GameStatsProps {
  stats: GameStatsType | null;
  inProgress: boolean;
  currentPosition: number;
  totalLength: number;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  stats, 
  inProgress,
  currentPosition,
  totalLength
}) => {
  const progressPercentage = totalLength > 0 
    ? Math.round((currentPosition / totalLength) * 100) 
    : 0;

  return (
    <div className="w-full max-w-4xl bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex-1 min-w-[120px]">
          <p className="text-sm text-gray-500 mb-1">WPM</p>
          <p className="text-2xl font-semibold text-blue-600">
            {stats ? stats.wpm : '0'}
          </p>
        </div>
        
        <div className="flex-1 min-w-[120px]">
          <p className="text-sm text-gray-500 mb-1">Accuracy</p>
          <p className="text-2xl font-semibold text-green-600">
            {stats ? `${stats.accuracy}%` : '100%'}
          </p>
        </div>
        
        <div className="flex-1 min-w-[120px]">
          <p className="text-sm text-gray-500 mb-1">Errors</p>
          <p className="text-2xl font-semibold text-red-600">
            {stats ? stats.errorCount : '0'}
          </p>
        </div>
        
        <div className="flex-1 min-w-[120px]">
          <p className="text-sm text-gray-500 mb-1">Time</p>
          <p className="text-2xl font-semibold text-purple-600">
            {stats ? `${stats.time.toFixed(1)}s` : '0.0s'}
          </p>
        </div>
      </div>

      {inProgress && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">{progressPercentage}% complete</p>
        </div>
      )}
    </div>
  );
};

export default GameStats;