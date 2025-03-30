import seedrandom from 'seedrandom';
import { format } from 'date-fns';

export interface GameWord {
  word: string;
  hint: string;
  category: string;
}

const wordList: GameWord[] = [
  { word: "PUZZLE", hint: "A game or problem that tests ingenuity", category: "Games" },
  { word: "WHIRL", hint: "To rotate or spin rapidly", category: "Motion" },
  { word: "BRAIN", hint: "The control center of the nervous system", category: "Science" },
  { word: "QUEST", hint: "A long search or pursuit", category: "Adventure" },
  { word: "LOGIC", hint: "Reasoning conducted according to strict principles", category: "Thinking" },
  // Add more words as needed
];

export function getDailyWords(date: Date = new Date()): GameWord[] {
  const dateString = format(date, 'yyyy-MM-dd');
  const rng = seedrandom(dateString);
  
  // Shuffle array using seeded random
  const shuffled = [...wordList].sort(() => rng() - 0.5);
  return shuffled.slice(0, 5); // Return 5 words for daily challenge
}

export function scrambleWord(word: string): string {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

export function calculateScore(timeLeft: number, hintsUsed: number): number {
  const baseScore = 100;
  const timeBonus = Math.floor(timeLeft * 2);
  const hintPenalty = hintsUsed * 10;
  
  return Math.max(0, baseScore + timeBonus - hintPenalty);
}

export function isWordValid(word: string, dictionary: Set<string>): boolean {
  return dictionary.has(word.toLowerCase());
}

export const animationPresets = {
  high: {
    transition: { type: "spring", stiffness: 300, damping: 15 },
    effects: { particle: true, trail: true, confetti: true }
  },
  medium: {
    transition: { type: "spring", stiffness: 200, damping: 20 },
    effects: { particle: true, trail: false, confetti: true }
  },
  low: {
    transition: { type: "tween", duration: 0.2 },
    effects: { particle: false, trail: false, confetti: false }
  },
  none: {
    transition: { duration: 0 },
    effects: { particle: false, trail: false, confetti: false }
  }
};

export const hintTypes = {
  revealLetter: {
    cost: 1,
    description: "Reveal a random letter"
  },
  eliminateWrong: {
    cost: 2,
    description: "Eliminate incorrect letters"
  },
  giveClue: {
    cost: 1,
    description: "Show a helpful clue"
  },
  freezeTime: {
    cost: 3,
    description: "Freeze timer for 15 seconds"
  }
};