"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Star } from "lucide-react";
import { useGameStore } from "@/lib/stores/game-store";

export function UserStats() {
  const { level, xp, streak } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 grid grid-cols-3 gap-4"
    >
      <div className="flex items-center justify-center rounded-lg bg-card p-4 shadow-lg">
        <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
        <div>
          <p className="text-sm text-muted-foreground">Level</p>
          <p className="text-2xl font-bold">{level}</p>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-card p-4 shadow-lg">
        <Star className="mr-2 h-6 w-6 text-purple-500" />
        <div>
          <p className="text-sm text-muted-foreground">XP</p>
          <p className="text-2xl font-bold">{xp}</p>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-card p-4 shadow-lg">
        <Zap className="mr-2 h-6 w-6 text-orange-500" />
        <div>
          <p className="text-sm text-muted-foreground">Streak</p>
          <p className="text-2xl font-bold">{streak}</p>
        </div>
      </div>
    </motion.div>
  );
}