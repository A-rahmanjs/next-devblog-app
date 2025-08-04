import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import Header from "@/components/Header/Header";
import ThemeProvider from "@/components/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });
import {LIGHT_TOKENS, DARK_TOKENS} from "@/utils/constants";

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
    <html lang="en"
    data-color-theme={theme}
        style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
        >
      <body className={inter.className}>
        <ThemeProvider initialTheme={theme}>

          <Header />
          
          
            {children}
          
        </ThemeProvider>
      

      </body>
    </html>
  );
}