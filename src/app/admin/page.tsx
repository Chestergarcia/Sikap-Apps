import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = {
  title: "Admin preview · Sikap",
};

export default function AdminRoute() {
  return <AdminPage />;
}
