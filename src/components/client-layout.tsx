"use client";

import { useDialogStore } from "@/store/use-dialog-store";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import LenisScroll from "@/components/LenisScroll";
import { cn } from "@/lib/utils";

interface ClientLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ClientLayout({ children, className }: ClientLayoutProps) {
  const isDialogOpen = useDialogStore((state) => state.isOpen);

  return (
    <>
      {!isDialogOpen && <LenisScroll />}
      <ThemeProvider attribute="class" defaultTheme="light">
        <Navbar />
        <div>{children}</div>
      </ThemeProvider>
    </>
  );
}
