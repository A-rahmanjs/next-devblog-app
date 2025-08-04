"use client";
import React, {useState, useRef, useCallback} from 'react'
import { User as UserIcon, LogOut } from 'react-feather';
import styles from './UserMenu.module.css';
import useOnClickOutside from '@/hooks/useOnClickOutside/useOnClickOutside'

export default function UserMenu() {

  const [isOpen, setIsOpen] = useState(false);
  const userEmail = 
    typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, useCallback(() => {
      setIsOpen(false)
  }, [])
);

  const handleLogout = () => {
   
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    

    document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    

    window.location.href = '/';
  };

  if (!userEmail) return null;

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button 
        className={styles.userButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <UserIcon size={20} className={styles.userIcon} />
        <span className={styles.userEmail}>
          {userEmail}
        </span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <button 
            className={styles.menuItem}
            onClick={handleLogout}
          >
            <LogOut size={16} className={styles.menuIcon} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
