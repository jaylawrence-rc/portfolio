"use client";

import { useEffect } from "react";

const AWAY_TITLE = "pay attention..";

export function AttentionTitle() {
  useEffect(() => {
    let pageTitle = document.title;

    function syncTitle() {
      // Keep the latest route title, even if its metadata arrives while away.
      if (document.title && document.title !== AWAY_TITLE) pageTitle = document.title;

      const nextTitle = document.hidden || !document.hasFocus() ? AWAY_TITLE : pageTitle;
      if (document.title !== nextTitle) document.title = nextTitle;
    }

    const observer = new MutationObserver(syncTitle);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    document.addEventListener("visibilitychange", syncTitle);
    window.addEventListener("blur", syncTitle);
    window.addEventListener("focus", syncTitle);
    syncTitle();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncTitle);
      window.removeEventListener("blur", syncTitle);
      window.removeEventListener("focus", syncTitle);
      if (document.title === AWAY_TITLE) document.title = pageTitle;
    };
  }, []);

  return null;
}
