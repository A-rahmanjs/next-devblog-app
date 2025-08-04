'use client'
import React from 'react'
import Link from "next/link";
import Spinner from '@/components/Spinner'
import { Sun, Moon } from "react-feather";
import styles from "./Header.module.css";
import devblogLogo from "@/images/devblogLogo.png";
import { LINKS } from "@/utils/constants";
import Image from "next/image";

// Dynamically import UserMenu with no SSR
import UserMenuWrapper from "../UserMenuWrapper/UserMenuWrapper";
import { useTheme } from "../ThemeProvider";

export default function Header() {
  const { theme, handleToggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src={devblogLogo} alt="logo" height={40} />
        </Link>
        <div className={styles.navContainer}>
          <ul className={styles.links}>
            {LINKS.map(({ label, href, id }) => (
              <li key={id} className={styles.link}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
          <React.Suspense fallback={<Spinner color="white" size={20} />}>
            <UserMenuWrapper />
          </React.Suspense>
        <button onClick={handleToggleTheme} className={styles.action}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}

        </button>
      </div>
        </div>
      </div>
    </header>
  );
}
