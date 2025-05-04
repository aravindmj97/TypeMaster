import { useState, useEffect, useCallback } from 'react';
import { GameState, GameStats, Paragraph } from '../types/game';
import { getRandomParagraph, calculateWPM, calculateAccuracy } from '../utils/paragraphs';

export const useTypingGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'idle',
    currentParagraph: null,
    currentPosition: 0,
    startTime: null,
    endTime: null,
    errorCount: 0,
    correctCount: 0,
  });

  const startGame = useCallback(async () => {
    const paragraph = await getRandomParagraph();
    setGameState({
      status: 'playing',
      currentParagraph: paragraph,
      currentPosition: 0,
      startTime: Date.now(),
      endTime: null,
      errorCount: 0,
      correctCount: 0,
    });
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState.status !== 'playing' || !gameState.currentParagraph) return;

    const expectedChar = gameState.currentParagraph.text[gameState.currentPosition];
    
    if (key === expectedChar) {
      // Correct key
      setGameState((prev) => ({
        ...prev,
        currentPosition: prev.currentPosition + 1,
        correctCount: prev.correctCount + 1,
      }));
    } else {
      // Incorrect key
      setGameState((prev) => ({
        ...prev,
        errorCount: prev.errorCount + 1,
      }));
    }
  }, [gameState]);

  // Check if game is complete
  useEffect(() => {
    if (
      gameState.status === 'playing' &&
      gameState.currentParagraph &&
      gameState.currentPosition === gameState.currentParagraph.text.length
    ) {
      setGameState((prev) => ({
        ...prev,
        status: 'finished',
        endTime: Date.now(),
      }));
    }
  }, [gameState.currentPosition, gameState.currentParagraph, gameState.status]);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.status === 'playing') {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState.status, handleKeyPress]);

  const getStats = useCallback((): GameStats | null => {
    if (
      gameState.status !== 'finished' ||
      !gameState.startTime ||
      !gameState.endTime ||
      !gameState.currentParagraph
    ) {
      return null;
    }

    const totalTime = (gameState.endTime - gameState.startTime) / 1000; // in seconds
    const totalChars = gameState.currentParagraph.text.length;
    
    return {
      wpm: calculateWPM(totalChars, totalTime),
      accuracy: calculateAccuracy(gameState.correctCount, totalChars + gameState.errorCount),
      time: totalTime,
      errorCount: gameState.errorCount,
      totalCharacters: totalChars,
    };
  }, [gameState]);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  return {
    gameState,
    startGame,
    handleKeyPress,
    getStats,
    restartGame,
  };
};