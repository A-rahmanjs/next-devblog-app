import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BlogProvider from "@/components/BlogProvider/BlogProvider";
import { cookies } from "next/headers";
import Header from "@/components/Header/Header";
import ThemeProvider from "@/components/ThemeProvider";
import {LIGHT_TOKENS, DARK_TOKENS} from "@/utils/constants";
import ToastProvider from '@/components/ToastProvider'
import ToastShelf from '@/components/ToastShelf'
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Devblog",
  description: "A modern blog for developers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const savedValue = (await cookies()).get("color-theme");
  const theme = savedValue?.value || "light";
  return (
    <BlogProvider>

    <html lang="en"
    data-color-theme={theme}
    style={(theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS) as React.CSSProperties}
    >
          <ToastProvider>

      <body className={inter.className}>
        <ThemeProvider initialTheme={theme}>

          <Header />
          
          
            {children}
          
        </ThemeProvider>
      
        <ToastShelf />
          <Footer />
      </body>
          </ToastProvider>
    </html>
          </BlogProvider>
  );
}