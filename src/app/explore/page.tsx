import type { Metadata } from "next";
import { ExplorePage } from "@/components/explore/explore-page";

export const metadata: Metadata = {
  title: "Explore · Sikap",
};

export default function ExploreRoute() {
  return <ExplorePage />;
}
