"use client";

import Link from "next/link";
import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <footer className="w-full bg-black text-white py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">&copy; 2025 Getty</span>
            <Link
              href="https://github.com/wtfdivyansh/bm"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={toggleTheme}
              className="text-gray-400 hover:text-white"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
