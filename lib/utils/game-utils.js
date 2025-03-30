const seedrandom = require('seedrandom');
const { format } = require('date-fns');

const wordList = [
  { word: "PUZZLE", hint: "A game or problem that tests ingenuity", category: "Games" },
  { word: "WHIRL", hint: "To rotate or spin rapidly", category: "Motion" },
  { word: "BRAIN", hint: "The control center of the nervous system", category: "Science" },
  { word: "QUEST", hint: "A long search or pursuit", category: "Adventure" },
  { word: "LOGIC", hint: "Reasoning conducted according to strict principles", category: "Thinking" },
  // Add more words as needed
];

function getDailyWords(date = new Date()) {
  const dateString = format(date, 'yyyy-MM-dd');
  const rng = seedrandom(dateString);
  
  // Shuffle array using seeded random
  const shuffled = [...wordList].sort(() => rng() - 0.5);
  return shuffled.slice(0, 5); // Return 5 words for daily challenge
}

function scrambleWord(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

function calculateScore(timeLeft, hintsUsed) {
  const baseScore = 100;
  const timeBonus = Math.floor(timeLeft * 2);
  const hintPenalty = hintsUsed * 10;
  
  return Math.max(0, baseScore + timeBonus - hintPenalty);
}

function isWordValid(word, dictionary) {
  return dictionary.has(word.toLowerCase());
}

const animationPresets = {
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

const hintTypes = {
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

module.exports = {
  getDailyWords,
  scrambleWord,
  calculateScore,
  isWordValid,
  animationPresets,
  hintTypes
};