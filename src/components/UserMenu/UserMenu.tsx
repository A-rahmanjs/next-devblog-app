"use client";
import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { User as UserIcon, LogOut } from 'react-feather';
import styles from './UserMenu.module.css';
import useOnClickOutside from '@/hooks/useOnClickOutside/useOnClickOutside';
import { ToastContext } from '../ToastProvider';
import { usePathname, useRouter } from 'next/navigation';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const { createToast } = useContext(ToastContext);
  const pathname = usePathname();
  const router = useRouter();

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.setItem('isLoggedIn', 'false');

    document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    createToast('Logged out', 'notice');

    // Dispatch auth change and refresh
    window.dispatchEvent(new Event('authChanged'));
    router.refresh();
  }, [createToast, router]);

  // Toggle dropdown
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close dropdown on outside click
  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
  }, []);
  useOnClickOutside(menuRef, handleClickOutside);

  // Listen for custom auth change events
  useEffect(() => {
    const handleAuthChange = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      const name = localStorage.getItem('userName');

      setIsLoggedIn(loginStatus === 'true');
      setUserName(name);
      router.refresh(); // This refreshes server components
    };

    // Run once on mount
    handleAuthChange();

    window.addEventListener('authChanged', handleAuthChange);
    return () => {
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, [router]);

  if (!isLoggedIn) return null;

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        className={`${styles.userButton} ${isOpen ? styles.isActive : ''}`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={isOpen ? 'Close user menu' : 'Open user menu'}
      >
        <UserIcon size={20} className={styles.userIcon} />
        <span className={styles.userEmail}>{userName}</span>
      </button>

      {isOpen && (
        <div
          className={styles.dropdown}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <button
            className={styles.menuItem}
            onClick={handleLogout}
            role="menuitem"
            tabIndex={-1}
          >
            <LogOut size={18} className={styles.menuIcon} />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
}
