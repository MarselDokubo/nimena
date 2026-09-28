import type { Metadata } from "next";
import { EditorWorkspace } from "./editor-workspace";

export const metadata: Metadata = {
  title: "Editorial Workspace Preview",
  description: "Interactive demonstration of the proposed NIMENA journal editorial and production workflow.",
};

export default function EditorPage() {
  return <EditorWorkspace />;
}
