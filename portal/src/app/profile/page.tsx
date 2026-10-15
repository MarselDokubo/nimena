import type { Metadata } from "next";
import { ProfileDocument } from "@/app/profile/profile-document";

export const metadata: Metadata = { title: "Member profile" };

export default function ProfilePage() {
  return <ProfileDocument />;
}
