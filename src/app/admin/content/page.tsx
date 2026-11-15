import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = { title: "Content review · Sikap" };
export default function ContentReviewRoute() { return <AdminPage section="review-queue" />; }
