"use client";
import devblogLogo from "@/images/devblogLogo.png";
import React, { useState, useEffect, useContext } from 'react';
import { Mail } from 'react-feather';
import styles from './LoginForm.module.css';
import { ToastContext } from '../ToastProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { createToast, setToasts } = useContext(ToastContext);
  const router = useRouter();

  const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    localStorage.setItem('isLoggedIn', 'false');
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loggedIn) {
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      createToast('Please enter a valid Email', 'warning');
      return;
    }

    if (!name) {
      createToast('Please enter a username', 'warning');
      return;
    }

    // Save auth info to localStorage and cookie
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    document.cookie = 'isAuthenticated=true; path=/; max-age=86400'; // 24 hours

    setToasts([]); // Clear previous toasts if needed

    // Dispatch login event and refresh
    window.dispatchEvent(new Event('authChanged'));
    router.refresh();

    createToast('Successfully logged in', 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
      <Image src={devblogLogo} alt="logo" height={25} />
        </div>

        <header>
          <h1>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to access your Devblog dashboard and start creating content
          </p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Your Name"
              required
              aria-required="true"
            />

            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="your@email.com"
                required
                aria-required="true"
              />
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-gray-400)',
                  pointerEvents: 'none'
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.button}
            aria-live="polite"
          >
            Sign In
          </button>
        </form>

        <div className={styles.note}>
          <p>This is a demo login. Any valid email format will work.</p>
        </div>
      </div>
    </div>
  );
}
