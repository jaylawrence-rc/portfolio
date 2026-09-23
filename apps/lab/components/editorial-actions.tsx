"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import styles from "./editorial.module.css";

export function EditorialActions({ markdown, href, slug }: { markdown: string; href: string; slug: string }) {
  const [message, setMessage] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setMessage("Markdown copied.");
    } catch {
      setMessage("Copy unavailable. Open the raw Markdown link instead.");
    }
  }

  return <div className={styles.actions} role="group" aria-label="Markdown export actions">
    <Button className={styles.primaryAction} type="button" onClick={copy}>Copy Markdown</Button>
    <Button className={styles.action} variant="outline" asChild><a href={`${href}/download.md`} download={`${slug}.md`}>Download .md</a></Button>
    <Button className={styles.action} variant="outline" asChild><a href={`${href}/raw.md`}>View raw Markdown</a></Button>
    <span className={styles.copyStatus} role="status" aria-live="polite">{message}</span>
  </div>;
}
