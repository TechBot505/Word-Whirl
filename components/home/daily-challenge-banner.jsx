"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/lib/stores/game-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DailyChallengeBanner() {
  const { hasDailyChallenge } = useGameStore();

  if (!hasDailyChallenge) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-600 p-6 text-white">
        <h2 className="mb-2 text-2xl font-bold">New Daily Challenge Available!</h2>
        <p className="mb-4">Test your skills with today&apos;s word puzzles.</p>
        <Button variant="secondary" size="lg">
          Start Challenge
        </Button>
      </Card>
    </motion.div>
  );
}