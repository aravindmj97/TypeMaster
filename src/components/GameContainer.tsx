import React, { useEffect, useRef, useState } from 'react';
import TypingArea from './TypingArea';
import GameStats from './GameStats';
import ResultScreen from './ResultScreen';
import { useTypingGame } from '../hooks/useTypingGame';
import { Keyboard, Play } from 'lucide-react';

const GameContainer: React.FC = () => {
  const { gameState, startGame, getStats, restartGame } = useTypingGame();
  const [currentTime, setCurrentTime] = useState<number>(0);

  const hiddenInputRef = useRef(null);

  // Start a timer when the game is in progress
  useEffect(() => {
    let interval: number | null = null;
    
    if (gameState.status === 'playing' && gameState.startTime) {
      interval = window.setInterval(() => {
        setCurrentTime(Date.now());
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.status, gameState.startTime]);

  useEffect(() => {
    // Simulate a trigger (e.g., a button click) to activate the keyboard
    if(gameState.status === 'playing') {
      if (hiddenInputRef.current) {
        console.log('Keybard activated');
        hiddenInputRef.current.focus();
      }
    }
  }, [gameState.status]);

  // Calculate current stats for display during gameplay
  const getCurrentStats = () => {
    if (gameState.status !== 'playing' || !gameState.startTime || !gameState.currentParagraph) {
      return null;
    }
    
    const elapsed = (currentTime - gameState.startTime) / 1000;
    const chars = gameState.currentPosition;
    
    // We can't calculate WPM until at least 1 character is typed
    if (chars === 0) return null;
    
    const wpm = Math.round((chars / 5) / (elapsed / 60));
    const accuracy = Math.round(
      (chars / (chars + gameState.errorCount)) * 100
    );
    
    return {
      wpm,
      accuracy,
      time: elapsed,
      errorCount: gameState.errorCount,
      totalCharacters: chars,
    };
  };
  
  const renderGameContent = () => {
    if (gameState.status === 'idle') {
      return (
        <div className="flex flex-col items-center">
          <div className="mb-6 flex justify-center">
            <Keyboard className="h-16 w-16 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-center">TypeMaster</h1>
          <p className="text-gray-600 mb-8 text-center max-w-md">
            Test your typing speed and accuracy. Type each character correctly to proceed.
          </p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            <Play size={20} />
            Start Typing
          </button>
        </div>
      );
    }
    
    if (gameState.status === 'playing' && gameState.currentParagraph) {
      const currentStats = getCurrentStats();
      
      return (
        <>
          <GameStats 
            stats={currentStats}
            inProgress={true}
            currentPosition={gameState.currentPosition}
            totalLength={gameState.currentParagraph.text.length}
          />
          <TypingArea
            text={gameState.currentParagraph.text}
            currentPosition={gameState.currentPosition}
          />
          <input type="text" style={{ display: 'none' }} ref={hiddenInputRef} />
          <p className="mt-4 text-sm text-gray-500 text-center">
            Type the text above. Fix any errors to continue.
          </p>
        </>
      );
    }
    
    if (gameState.status === 'finished') {
      const finalStats = getStats();
      if (!finalStats) return null;
      
      return <ResultScreen stats={finalStats} onRestart={restartGame} />;
    }
    
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {renderGameContent()}
      </div>
    </div>
  );
};

export default GameContainer;