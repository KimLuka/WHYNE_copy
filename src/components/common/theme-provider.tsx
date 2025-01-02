"use client";

import { ThemeProvider } from "next-themes";

interface DarkThemeProviderProps {
  children: React.ReactNode;
}

export default function DarkThemeProvider({
  children,
}: DarkThemeProviderProps) {
  return (
    <>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </>
  );
}
