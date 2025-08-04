"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from "./page.module.css";

// Dynamically import the LoginForm component with no SSR
const LoginForm = dynamic(() => import('@/components/LoginForm/LoginForm'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This code will only run on the client side
    setIsClient(true);
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      router.push('/blog');
    }
  }, [router]);

  // Show nothing until we're on the client side to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  // If authenticated, we'll redirect in the useEffect, but show loading in the meantime
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
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
