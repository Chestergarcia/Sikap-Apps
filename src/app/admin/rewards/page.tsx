import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Rewards · Sikap" };
export default function RewardsRoute() { return <AdminPage section="rewards" />; }
