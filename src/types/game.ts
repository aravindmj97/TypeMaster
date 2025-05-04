export interface Word {
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Paragraph {
  id: number;
  words: Word[];
  text: string;
}

export interface GameStats {
  wpm: number;
  accuracy: number;
  time: number;
  errorCount: number;
  totalCharacters: number;
}

export interface GameState {
  status: 'idle' | 'playing' | 'finished';
  currentParagraph: Paragraph | null;
  currentPosition: number;
  startTime: number | null;
  endTime: number | null;
  errorCount: number;
  correctCount: number;
}