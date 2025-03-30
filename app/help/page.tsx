"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, Lightbulb, Star, Trophy } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-center text-4xl font-bold">How to Play</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6" />
                Game Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                <li>Unscramble the letters to form the correct word</li>
                <li>Drag and drop letters to arrange them</li>
                <li>Complete the word before time runs out</li>
                <li>Use hints wisely to help you progress</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Time & Scoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                <li>60 seconds to solve each puzzle</li>
                <li>Faster solutions earn more points</li>
                <li>Using hints reduces your final score</li>
                <li>Daily streaks multiply your XP earnings</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6" />
                Hints & Help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                <li>Reveal a random letter in its correct position</li>
                <li>Get additional clues about the word</li>
                <li>Freeze the timer temporarily</li>
                <li>Earn hint tokens through daily play</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                <li>Complete daily challenges to earn XP</li>
                <li>Level up to unlock new features</li>
                <li>Earn achievements for special milestones</li>
                <li>Maintain your streak for bonus rewards</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              <li>Practice mode is great for learning without pressure</li>
              <li>Look for common letter patterns in English words</li>
              <li>Use the hint when you're truly stuck to save time</li>
              <li>Pay attention to the word category in the hint</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}