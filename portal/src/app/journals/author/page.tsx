import type { Metadata } from "next";
import { AuthorWorkspace } from "./author-workspace";

export const metadata: Metadata = {
  title: "Author Submission Preview",
  description: "Interactive demonstration of the proposed NIMENA journal submission workflow.",
};

export default function AuthorPage() {
  return <AuthorWorkspace />;
}
