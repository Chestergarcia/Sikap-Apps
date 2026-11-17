import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Notifications · Sikap" };
export default function AdminNotificationsRoute() { return <AdminPage section="notifications" />; }
