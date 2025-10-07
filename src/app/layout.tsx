import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// Prevent theme flash
const themeColorMetaTags = `
  @media (prefers-color-scheme: dark) {
    :root {
      color-scheme: dark;
    }
  }
  @media (prefers-color-scheme: light) {
    :root {
      color-scheme: light;
    }
  }
  :root[class~="dark"] {
    color-scheme: dark;
  }
  :root:not([class~="dark"]) {
    color-scheme: light;
  }
`;

import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import CookieConsent from "@/components/CookieConsent";
import colorSchemeScript from "@/lib/theme-script";

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
      <html lang="en" suppressHydrationWarning>
        <head>
          <style dangerouslySetInnerHTML={{ __html: themeColorMetaTags }} />
          <script dangerouslySetInnerHTML={{ __html: colorSchemeScript }} />
        </head>
        <ThemeProvider>
          <body className={`${poppins.className} `}>
            <div className="w-full antialiased  bg-white dark:bg-gray-900 md:px-4 lg:px-16 xl:px-32 2xl:px-64">
              <Navbar />
            </div>
            <div className="w-full bg-slate-100 dark:bg-gray-800  md:px-4 lg:px-16 xl:px-32 2xl:px-64">
              {children}
            </div>
            <CookieConsent />
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
