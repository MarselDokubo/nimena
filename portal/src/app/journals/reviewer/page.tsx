import type { Metadata } from "next";
import { ReviewerWorkspace } from "./reviewer-workspace";

export const metadata: Metadata = {
  title: "Reviewer Workspace Preview",
  description: "Interactive demonstration of a confidential journal peer-review workflow.",
};

export default function ReviewerPage() {
  return <ReviewerWorkspace />;
}
