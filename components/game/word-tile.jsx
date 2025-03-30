"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/lib/stores/game-store";
import { animationPresets } from "@/lib/utils/game-utils";
import { useState } from "react";
import useSound from "use-sound";

// interface WordTileProps {
//   letter: string;
//   index: number;
//   onDrag?: (letter: string, index: number) => void;
//   isPlaced?: boolean;
// }

export function WordTile({ letter, index, onDrag, isPlaced = false }) {
  const [isDragging, setIsDragging] = useState(false);
  const { settings } = useGameStore();
  const animations = animationPresets[settings.animationIntensity];

  const [playPop] = useSound('/sounds/pop.mp3', { 
    volume: settings.soundEffects ? 0.5 : 0, 
  });

  const handleDragStart = () => {
    setIsDragging(true);
    playPop();
    onDrag?.(letter, index);
  };

  return (
    <motion.div
      drag={!isPlaced}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileDrag={{ scale: 1.1, zIndex: 10 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isDragging ? 1.1 : 1,
        ...animations.transition
      }}
      className={`
        flex h-12 w-12 cursor-grab items-center justify-center
        rounded-lg bg-primary text-xl font-bold text-primary-foreground
        shadow-lg transition-colors
        ${isPlaced ? 'bg-green-500' : ''}
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
    >
      {letter}
    </motion.div>
  );
}