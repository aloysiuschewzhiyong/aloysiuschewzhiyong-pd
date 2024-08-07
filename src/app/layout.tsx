import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aloysius Portfolio🔥",
  description: "This is the portfolio for Aloysius Chew Zhi Yong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollable-container" >
      <body className={cn("min-h-screen w-full flex overflow-auto bg-background", inter.className, "scrollable-container", { "debug-screens": process.env.NODE_ENV === "development" })}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
