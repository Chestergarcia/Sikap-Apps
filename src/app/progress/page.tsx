import type { Metadata } from "next";
import { ProgressPage } from "@/components/progress/progress-page";

export const metadata: Metadata = {
  title: "Progress tracker · Sikap",
};

export default function ProgressRoute() {
  return <ProgressPage />;
}
