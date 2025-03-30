"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/lib/stores/game-store";
import { GameBoard } from "@/components/game/game-board";

const practiceWords = [
  { word: "LEARN", hint: "To gain knowledge or skills" },
  { word: "PLAY", hint: "To engage in activity for enjoyment" },
  { word: "THINK", hint: "To use one's mind actively" },
  { word: "GROW", hint: "To increase in size or development" },
];

export default function PracticePage() {
  const { addXp } = useGameStore();
  const randomWord = practiceWords[Math.floor(Math.random() * practiceWords.length)];

  const handleGameComplete = (score) => {
    addXp(Math.floor(score / 2)); // Half XP for practice mode
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-card p-8 shadow-xl"
      >
        <h1 className="mb-8 text-center text-4xl font-bold">Practice Mode</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Practice your word skills without affecting your daily streak.
          Earn half XP for completing practice puzzles.
        </p>
        <GameBoard
          word={randomWord.word}
          hint={randomWord.hint}
          onComplete={handleGameComplete}
        />
      </motion.div>
    </div>
  );
}