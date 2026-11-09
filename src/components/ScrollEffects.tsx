"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll animations:
 *  - a thin progress bar at the top of the page
 *  - sections (after the first) fade/slide in as they scroll into view,
 *    with grid items appearing one after another.
 * No per-page markup is needed; it tags elements inside <main> automatically.
 * Elements stay fully visible if JS is off or the user prefers reduced motion.
 */
export default function ScrollEffects() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section")).slice(1);
    const targets: HTMLElement[] = [];

    sections.forEach((section) => {
      const container = section.firstElementChild as HTMLElement | null;
      if (!container) return;
      Array.from(container.children).forEach((child) => {
        const el = child as HTMLElement;
        if (el.matches(".grid")) {
          // Stagger the items of a grid
          Array.from(el.children).forEach((item, i) => {
            (item as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 6) * 90}ms`);
            targets.push(item as HTMLElement);
          });
        } else {
          targets.push(el);
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    targets.forEach((el) => {
      // Anything already on screen just shows, without a flash
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) return;
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-[#3D6A46] via-[#8DBF6A] to-[#D9A441]"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
