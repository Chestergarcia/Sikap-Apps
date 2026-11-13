import type { Metadata } from "next";
import { NotificationsPage } from "@/components/notifications/notifications-page";

export const metadata: Metadata = {
  title: "Notifications · Sikap",
};

export default function NotificationsRoute() {
  return <NotificationsPage />;
}
