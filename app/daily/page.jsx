"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/lib/stores/game-store";
import { GameBoard } from "@/components/game/game-board";
import { getDailyWords } from "@/lib/utils/game-utils";

export default function DailyChallenge() {
  const { currentWords, gameProgress, updateProgress, addXp, incrementStreak } = useGameStore();

  useEffect(() => {
    const words = getDailyWords();
    // Update store with daily words
    useGameStore.setState({ currentWords: words });
  }, []);

  const handleGameComplete = (score) => {
    updateProgress("wordWhirl", { completed: true, score });
    addXp(score);
    incrementStreak();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-card p-8 shadow-xl"
      >
        <h1 className="mb-8 text-center text-4xl font-bold">Daily Challenge</h1>
        <GameBoard
          word={currentWords[0]?.word || "PUZZLE"}
          hint={currentWords[0]?.hint || "A game or problem that tests ingenuity"}
          onComplete={handleGameComplete}
        />
      </motion.div>
    </div>
  );
}