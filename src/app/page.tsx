"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from "./page.module.css";


const LoginForm = dynamic(() => import('@/components/LoginForm/LoginForm'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // This code will only run on the client side
    setIsClient(true);
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      router.push('/blog');
    }
  }, [router]);




  if (!isClient) {
    return null;
  }


  // Show the login form if not authenticated
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
}
