"use client";

import { motion } from "framer-motion";
import { Calendar, Brain, BarChart2, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const menuItems = [
  {
    icon: Calendar,
    label: "Daily Challenge",
    href: "/daily",
    highlight: true,
  },
  {
    icon: Brain,
    label: "Practice Mode",
    href: "/practice",
  },
  {
    icon: BarChart2,
    label: "Statistics",
    href: "/stats",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: HelpCircle,
    label: "How to Play",
    href: "/help",
  },
];

export function MainMenu() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={item.href}>
            <Button
              variant={item.highlight ? "default" : "secondary"}
              className={`w-full justify-start p-6 text-lg ${
                item.highlight ? "bg-primary" : ""
              }`}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}