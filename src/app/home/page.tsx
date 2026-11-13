import type { Metadata } from "next";
import { HomeFeed } from "@/components/feed/home-feed";

export const metadata: Metadata = {
  title: "Home feed · Sikap",
};

export default function HomePage() {
  return <HomeFeed />;
}
