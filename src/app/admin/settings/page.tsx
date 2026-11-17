import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Admin settings · Sikap" };
export default function AdminSettingsRoute() { return <AdminPage section="settings" />; }
