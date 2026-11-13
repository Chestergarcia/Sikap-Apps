import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile/profile-page";

export const metadata: Metadata = {
  title: "Profile · Sikap",
};

export default function ProfileRoute() {
  return <ProfilePage />;
}
