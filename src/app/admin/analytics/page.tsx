import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Analytics · Sikap" };
export default function AnalyticsRoute() { return <AdminPage section="analytics" />; }
