import { Paragraph } from '../types/game';
import { Paragraphs } from '../assets/paragraph';

export const getRandomParagraph = async (): Promise<Paragraph> => {
  try {

    const text = Paragraphs[Math.floor(Math.random() * Paragraphs.length)]["paragraph"];
    // Split the text into words and assign difficulties based on length
    const words = text.split(' ').map(word => ({
      text: word,
      difficulty: word.length <= 4 ? 'easy' : word.length <= 7 ? 'medium' : 'hard'
    }));

    return {
      id: Math.random(), // Generate a random ID
      words,
      text: text.trim(),
    };
  } catch (error) {
    // Fallback paragraph in case the API fails
    return {
      id: 0,
      words: [
        { text: 'The', difficulty: 'easy' },
        { text: 'quick', difficulty: 'medium' },
        { text: 'brown', difficulty: 'easy' },
        { text: 'fox', difficulty: 'easy' },
        { text: 'jumps', difficulty: 'medium' },
        { text: 'over', difficulty: 'easy' },
        { text: 'the', difficulty: 'easy' },
        { text: 'lazy', difficulty: 'easy' },
        { text: 'dog', difficulty: 'easy' },
      ],
      text: 'The quick brown fox jumps over the lazy dog',
    };
  }
};

export const calculateWPM = (characters: number, timeInSeconds: number): number => {
  return Math.round((characters / 5) / (timeInSeconds / 60));
};

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  return Math.round((correctChars / totalChars) * 100);
};