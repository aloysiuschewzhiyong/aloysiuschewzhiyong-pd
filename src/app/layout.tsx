import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClientLayout } from "@/components/client-layout";

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
    <html lang="en" className="scrollable-container">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={cn(
          "min-h-screen w-full flex overflow-auto bg-background",
          inter.className,
          "scrollable-container",
          { "debug-screens": process.env.NODE_ENV === "development" }
        )}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
