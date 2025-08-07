'use client'
import React from 'react';
import styles from "./navLinksContainer.module.css";
import { LINKS } from "@/utils/constants";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { ToastContext } from '../ToastProvider';

function NavLinksContainer() {
  const {createToast} = React.useContext(ToastContext)
  const pathname = usePathname()
  return (
    <ul className={styles.links}>
                {LINKS.map(({ label, href, id }) => (
                  <li key={id} className={styles.link}>
                    <Link onClick={() => {
                      if (!localStorage.getItem('userEmail') && pathname === "/") {
                        createToast('You must be logged in to access this page', 'notice')
                      }
                    }} href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
  );
}

export default NavLinksContainer;
