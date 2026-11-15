import type { Metadata } from "next";
import { ThemeInitializer } from "@/components/theme-initializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sikap — Your Effort. Your Growth. Your Reward.",
  description:
    "Share your learning journey, celebrate steady progress, and grow with a supportive community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
