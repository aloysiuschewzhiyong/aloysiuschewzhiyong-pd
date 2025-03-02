"use client";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function LenisScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);
    (window as any).lenis = lenisInstance;

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Listen for dialog state changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLElement) {
          const dialog = document.querySelector('[role="dialog"]');
          if (dialog) {
            lenisInstance.stop();
          } else {
            lenisInstance.start();
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["role"],
    });

    return () => {
      lenisInstance.destroy();
      observer.disconnect();
      (window as any).lenis = null;
    };
  }, []);

  return null;
}
