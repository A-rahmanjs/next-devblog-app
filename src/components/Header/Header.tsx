import React from "react";

import { clsx } from "clsx";

import Link from "next/link";

import styles from "./Header.module.css";

import { LINKS } from "@/utils/constants";

function Header() {
  return (
    <header className={clsx(styles.header)}>
      <div className={styles.container}>
        <ul className={styles.links}>
          {LINKS.map(({ label, href, id }) => (
            <li key={id} className={styles.link}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
