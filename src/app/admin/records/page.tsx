import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Review records · Sikap" };
export default function ReviewRecordsRoute() { return <AdminPage section="records" />; }
