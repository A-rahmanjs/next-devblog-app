"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Set both localStorage and cookie for auth
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      
      // Set cookie that will be available on the server
      document.cookie = 'isAuthenticated=true; path=/; max-age=86400'; // 24 hours
      
      router.push('/blog');
      window.location.reload();
    }, 800);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to continue to Devblog</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading || !email}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className={styles.note}>
          <p>This is a demo login. Any email will work.</p>
        </div>
      </div>
    </div>
  );
}
