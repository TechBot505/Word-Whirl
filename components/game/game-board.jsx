"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/lib/stores/game-store";
import { WordTile } from "./word-tile";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
import { calculateScore } from "@/lib/utils/game-utils";
import useSound from "use-sound";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// interface GameBoardProps {
//   word: string;
//   hint: string;
//   onComplete: (score: number) => void;
// }

export function GameBoard({ word, hint, onComplete }) {
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [placedLetters, setPlacedLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isComplete, setIsComplete] = useState(false);
  const { settings, useHint, addXp } = useGameStore();
  // const { toast } = useToast();
  const { width, height } = useWindowSize();

  const [playSuccess] = useSound('/sounds/success.mp3', {
    volume: settings.soundEffects ? 0.5 : 0,
  });

  useEffect(() => {
    setScrambledLetters(word.split('').sort(() => Math.random() - 0.5));
  }, [word]);

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isComplete]);

  const handleDrag = (letter, index) => {
    if (placedLetters.length < word.length) {
      setPlacedLetters([...placedLetters, letter]);
      setScrambledLetters(scrambledLetters.filter((_, i) => i !== index));
    }
  };

  const checkWord = () => {
    const currentWord = placedLetters.join('');
    if (currentWord === word) {
      setIsComplete(true);
      playSuccess();
      const score = calculateScore(timeLeft, 0);
      addXp(score);
      onComplete(score);
      
    //   toast({
    //     title: "Congratulations!",
    //     description: `You solved the puzzle! Score: ${score}`,
    //   });
    // } else {
    //   toast({
    //     title: "Not quite right",
    //     description: "Try rearranging the letters",
    //     variant: "destructive",
    //   });
      
      // Reset the board
      setScrambledLetters([...placedLetters, ...scrambledLetters].sort(() => Math.random() - 0.5));
      setPlacedLetters([]);
    }
  };

  const useHintAction = () => {
    if (useHint('revealLetter')) {
      const correctPosition = word.split('').findIndex((letter, index) => 
        !placedLetters.includes(letter)
      );
      if (correctPosition !== -1) {
        const letter = word[correctPosition];
        setPlacedLetters([...placedLetters, letter]);
        setScrambledLetters(scrambledLetters.filter(l => l !== letter));
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {isComplete && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">Unscramble the Word</h2>
        <p className="text-muted-foreground">Hint: {hint}</p>
        <div className="mt-4 text-xl font-bold">Time: {timeLeft}s</div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {placedLetters.map((letter, index) => (
          <WordTile
            key={`placed-${index}`}
            letter={letter}
            index={index}
            isPlaced={true}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {scrambledLetters.map((letter, index) => (
          <WordTile
            key={`scrambled-${index}`}
            letter={letter}
            index={index}
            onDrag={handleDrag}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={checkWord}
          disabled={placedLetters.length !== word.length || isComplete}
        >
          Check Word
        </Button>
        <Button
          variant="outline"
          onClick={useHintAction}
          disabled={isComplete}
        >
          Use Hint
        </Button>
      </div>
    </div>
  );
}