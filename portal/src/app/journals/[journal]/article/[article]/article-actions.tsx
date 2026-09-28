"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";

export function ArticleActions({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="article-actions">
      <button className="button button--primary" onClick={() => window.print()} type="button"><Icon name="download" /> Print / save PDF</button>
      <button className="button button--outline" onClick={copyCitation} type="button">{copied ? <Icon name="check" /> : <Icon name="file" />}{copied ? "Citation copied" : "Copy citation"}</button>
    </div>
  );
}
