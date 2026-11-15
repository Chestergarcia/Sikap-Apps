import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Members · Sikap" };
export default function MembersRoute() { return <AdminPage section="members" />; }
