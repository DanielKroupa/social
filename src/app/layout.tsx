import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProvider>
          <body className={inter.className}>
            <div className="w-full bg-white dark:bg-gray-900 md:px-4 lg:px-16 xl:px-32 2xl:px-64">
              <Navbar />
            </div>
            <div className="w-full bg-slate-100 dark:bg-gray-800 md:px-4 lg:px-16 xl:px-32 2xl:px-64">
              {children}
            </div>
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
