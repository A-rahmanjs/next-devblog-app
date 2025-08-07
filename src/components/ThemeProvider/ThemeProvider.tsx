"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  LIGHT_TOKENS,
  DARK_TOKENS,
} from "@/utils/constants";
import Cookie from 'js-cookie'

const ThemeContext = createContext<{
  theme: string;
  handleToggleTheme: () => void;
}>({
  theme: "light",
  handleToggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ 
  initialTheme = "light", 
  children 
}: { 
  initialTheme: string; 
  children: React.ReactNode 
}) {
  const [theme, setTheme] = useState(initialTheme);

  // Apply theme on initial render and when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const newTokens = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    
    // Apply each token as a CSS variable
    for (const [key, value] of Object.entries(newTokens)) {
      root.style.setProperty(key, value);
    }
    
    root.setAttribute("data-color-theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    Cookie.set("color-theme", newTheme, {
      expires: 1000,
    });
  }
  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
