"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameWord } from "../utils/game-utils";

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
  date?: string;
}

interface GameProgress {
  completedDays: string[];
  currentDay: {
    completed: boolean;
    progress: {
      wordWhirl: { completed: boolean; score: number };
      wordChain: { completed: boolean; progress: number };
      letterLingo: { completed: boolean; attempts: number };
      wordConstructor: { completed: boolean; words: string[] };
    };
  };
}

interface GameState {
  level: number;
  xp: number;
  streak: number;
  hasDailyChallenge: boolean;
  hints: number;
  currentWords: GameWord[];
  achievements: Achievement[];
  gameProgress: GameProgress;
  settings: {
    theme: "light" | "dark" | "system";
    soundEffects: boolean;
    animationIntensity: "high" | "medium" | "low" | "none";
    voiceControl: boolean;
  };
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  updateSettings: (settings: Partial<GameState["settings"]>) => void;
  useHint: (type: string) => boolean;
  unlockAchievement: (id: string) => void;
  updateProgress: (gameType: string, progress: any) => void;
}

const initialAchievements: Achievement[] = [
  {
    id: "first_win",
    title: "First Victory",
    description: "Complete your first daily challenge",
    unlocked: false
  },
  {
    id: "three_streak",
    title: "On Fire",
    description: "Maintain a 3-day streak",
    unlocked: false
  },
  {
    id: "word_master",
    title: "Word Master",
    description: "Complete 10 perfect games",
    unlocked: false,
    progress: 0,
    total: 10
  }
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      level: 1,
      xp: 0,
      streak: 0,
      hasDailyChallenge: true,
      hints: 3,
      currentWords: [],
      achievements: initialAchievements,
      gameProgress: {
        completedDays: [],
        currentDay: {
          completed: false,
          progress: {
            wordWhirl: { completed: false, score: 0 },
            wordChain: { completed: false, progress: 0 },
            letterLingo: { completed: false, attempts: 0 },
            wordConstructor: { completed: false, words: [] }
          }
        }
      },
      settings: {
        theme: "system",
        soundEffects: true,
        animationIntensity: "high",
        voiceControl: false
      },
      addXp: (amount) =>
        set((state) => {
          const newXp = state.xp + amount;
          const newLevel = Math.floor(newXp / 1000) + 1;
          return { xp: newXp, level: newLevel };
        }),
      incrementStreak: () =>
        set((state) => {
          const newStreak = state.streak + 1;
          if (newStreak === 3) {
            get().unlockAchievement("three_streak");
          }
          return { streak: newStreak };
        }),
      resetStreak: () => set({ streak: 0 }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      useHint: (type) => {
        const state = get();
        const cost = state.hints >= 1 ? 1 : 0;
        if (cost > 0) {
          set({ hints: state.hints - cost });
          return true;
        }
        return false;
      },
      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id
              ? { ...achievement, unlocked: true, date: new Date().toISOString() }
              : achievement
          ),
        })),
      updateProgress: (gameType, progress) =>
        set((state) => ({
          gameProgress: {
            ...state.gameProgress,
            currentDay: {
              ...state.gameProgress.currentDay,
              progress: {
                ...state.gameProgress.currentDay.progress,
                [gameType]: progress
              }
            }
          }
        }))
    }),
    {
      name: "word-whirl-storage",
    }
  )
);