import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

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
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' ||
                    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}`,
            }}
          />
        </head>
        <ThemeProvider>
          <body className={poppins.className}>
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
