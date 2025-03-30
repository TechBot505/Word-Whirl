"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/lib/stores/game-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function Stats() {
  const { level, xp, streak, achievements } = useGameStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-center text-4xl font-bold">Statistics</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Level Progress</CardTitle>
              <CardDescription>Current Level: {level}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(xp % 1000) / 10}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {xp % 1000} / 1000 XP to next level
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Streak</CardTitle>
              <CardDescription>Days in a row</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-5xl font-bold text-orange-500">{streak}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keep playing daily to maintain your streak!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3"
                  >
                    <Trophy
                      className={`h-5 w-5 ${
                        achievement.unlocked
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      {achievement.progress !== undefined && (
                        <div className="mt-1 h-1 w-full rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{
                              width: `${
                                (achievement.progress / achievement.total) * 100
                              }%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}