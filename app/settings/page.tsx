"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/lib/stores/game-store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  const { settings, updateSettings } = useGameStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-card p-8 shadow-xl"
      >
        <h1 className="mb-8 text-center text-4xl font-bold">Settings</h1>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(value) => updateSettings({ theme: value as any })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sound">Sound Effects</Label>
            <Switch
              id="sound"
              checked={settings.soundEffects}
              onCheckedChange={(checked) => updateSettings({ soundEffects: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="animation">Animation Intensity</Label>
            <Select
              value={settings.animationIntensity}
              onValueChange={(value) => updateSettings({ animationIntensity: value as any })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Animation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="voice">Voice Control</Label>
            <Switch
              id="voice"
              checked={settings.voiceControl}
              onCheckedChange={(checked) => updateSettings({ voiceControl: checked })}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}