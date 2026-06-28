"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import useSound from "use-sound";

type Theme = "blue" | "matrix" | "cyberpunk";

interface ThemeSoundContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  playHover: () => void;
  playClick: () => void;
}

const ThemeSoundContext = createContext<ThemeSoundContextType | undefined>(undefined);

// Using public domain/Google free sound assets for reliability
const HOVER_SOUND_URL = "https://actions.google.com/sounds/v1/water/water_drop.ogg";
const CLICK_SOUND_URL = "https://actions.google.com/sounds/v1/ui/button_click.ogg";

export function ThemeSoundProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("blue");

  // Load sounds
  const [playHover] = useSound(HOVER_SOUND_URL, { volume: 0.2 });
  const [playClick] = useSound(CLICK_SOUND_URL, { volume: 0.5 });

  useEffect(() => {
    // Check local storage for saved theme
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeSoundContext.Provider value={{ theme, setTheme, playHover, playClick }}>
      {children}
    </ThemeSoundContext.Provider>
  );
}

export function useThemeSound() {
  const context = useContext(ThemeSoundContext);
  if (context === undefined) {
    throw new Error("useThemeSound must be used within a ThemeSoundProvider");
  }
  return context;
}
