import Link from 'next/link';
import styles from './not-found.module.css'
export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Blog not found</p>
      <Link href="/" className={styles.link}>Go back home</Link>
    </div>
  );
}