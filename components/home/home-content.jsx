"use client";

import { motion } from "framer-motion";
import { UserStats } from "./user-stats";
import { MainMenu } from "./main-menu";
import { DailyChallengeBanner } from "./daily-challenge-banner";

export function HomeContent() {
  return (
    <div className="relative z-10 min-h-screen w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <UserStats />
        <MainMenu />
        <DailyChallengeBanner />
      </motion.div>
    </div>
  );
}