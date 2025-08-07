import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import devblogLogo from '@/images/devblogLogo.png';
import { GitHub } from 'react-feather';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src={devblogLogo} alt="logo" height={40} />
        </div>
        <div className={styles.links}>
          <Link href="https://github.com/A-rahmanjs" target='_blank' className={styles.link}>
            <GitHub size={30}/>
          </Link>
        </div>
      </div>
    </footer>
  );
}



export default Footer;