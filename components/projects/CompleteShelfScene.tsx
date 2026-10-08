"use client";

import { useEffect, useRef } from "react";
import { CompleteShelfLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

function postShelfVisibility(iframe: HTMLIFrameElement | null, visible: boolean) {
  iframe?.contentWindow?.postMessage(
    { type: "threeui-shelf-visibility", visible },
    "*",
  );
}

export function CompleteShelfScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let iframe = root.querySelector("iframe");
    let visible = false;

    const sync = () => {
      iframe = root.querySelector("iframe");
      postShelfVisibility(iframe, visible);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Require a meaningful share of the frame on screen before waking WebGL.
        visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.35);
        sync();
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.75], rootMargin: "0px" },
    );
    observer.observe(root);

    const mo = new MutationObserver(sync);
    mo.observe(root, { childList: true, subtree: true });

    const onLoad = () => sync();
    root.addEventListener("load", onLoad, true);

    const onVisibility = () => {
      if (document.hidden) {
        postShelfVisibility(iframe, false);
      } else {
        sync();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      mo.disconnect();
      root.removeEventListener("load", onLoad, true);
      document.removeEventListener("visibilitychange", onVisibility);
      postShelfVisibility(iframe, false);
    };
  }, []);

  return (
    <div ref={rootRef} className="shader-frame">
      <CompleteShelfLandingPage
        headingFont="iowan-old-style"
        bodyFont="inter"
        headingWeight="400"
        bodyWeight="400"
        primaryColor="#c87046"
        headingSize={60}
        bodySize={12}
        headingLetterSpacing={-0.055}
      />
    </div>
  );
}
