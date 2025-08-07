'use client'
import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Sun, Moon } from "react-feather";
import styles from "./ToggleThemeWrapper.module.css";

function ToggleThemeWrapper() {

  const { theme, handleToggleTheme } = useTheme();
  return (
  <>
    <button onClick={handleToggleTheme} className={styles.action}>
              {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
    </button>
  </>
)
}

export default ToggleThemeWrapper;
