import React from 'react';
import { GameStats } from '../types/game';
import { Sparkles } from 'lucide-react';

interface ResultScreenProps {
  stats: GameStats;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ stats, onRestart }) => {
  const getPerformanceMessage = () => {
    if (stats.wpm > 80) return "Excellent! You're a typing champion!";
    if (stats.wpm > 60) return "Great job! You have impressive typing skills!";
    if (stats.wpm > 40) return "Good work! Keep practicing to improve.";
    return "Nice start! Regular practice will help you improve.";
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
      <div className="flex justify-center mb-4">
        <Sparkles className="h-12 w-12 text-yellow-500" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Typing Complete!</h2>
      <p className="text-gray-600 mb-6">{getPerformanceMessage()}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Speed</p>
          <p className="text-3xl font-bold text-blue-600">{stats.wpm} WPM</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Accuracy</p>
          <p className="text-3xl font-bold text-green-600">{stats.accuracy}%</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Time</p>
          <p className="text-3xl font-bold text-purple-600">{stats.time.toFixed(1)}s</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Errors</p>
          <p className="text-3xl font-bold text-red-600">{stats.errorCount}</p>
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
      >
        Try Again
      </button>
    </div>
  );
};

export default ResultScreen;