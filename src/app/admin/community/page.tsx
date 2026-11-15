import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Community pulse · Sikap" };
export default function CommunityPulseRoute() { return <AdminPage section="community-pulse" />; }
