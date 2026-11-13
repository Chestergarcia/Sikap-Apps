import type { Metadata } from "next";
import { RewardsPage } from "@/components/rewards/rewards-page";

export const metadata: Metadata = {
  title: "Rewards wallet · Sikap",
};

export default function RewardsRoute() {
  return <RewardsPage />;
}
