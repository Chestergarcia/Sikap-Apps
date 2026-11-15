import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Safety and review · Sikap" };
export default function SafetyReviewRoute() { return <AdminPage section="safety" />; }
