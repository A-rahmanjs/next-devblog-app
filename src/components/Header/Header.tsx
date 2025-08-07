import React from 'react'
import Link from "next/link";
import styles from "./Header.module.css";
import devblogLogo from "@/images/devblogLogo.png";
import Image from "next/image";
import NavLinksContainer from '../NavLinksContainer/NavLinksContainer';
import UserMenuWrapper from "@/components/UserMenuWrapper/UserMenuWrapper";
import ToggleThemeWrapper from '@/components/ToggleThemeWrapper/ToggleThemeWrapper';


export default function Header() {


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src={devblogLogo} alt="logo" height={40} />
        </Link>
        <div className={styles.navContainer}>
          <ul className={styles.links}>
          <NavLinksContainer />
          </ul>
          <div className={styles.actions}>
            <UserMenuWrapper />
            <ToggleThemeWrapper />
      </div>
        </div>
      </div>
    </header>
  );
}
