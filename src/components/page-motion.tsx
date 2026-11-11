import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function PageMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver || !Element.prototype.animate) return;
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (reduced.matches) continue;
        const animation = entry.target.animate(
          [{ opacity: 0.15, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.08 });
    function scan() {
      document.querySelectorAll("main [data-reveal]").forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    }
    function stopMotion() {
      if (reduced.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    }
    scan();
    // Catalog and gallery entries can arrive after the initial Supabase request.
    const updates = new MutationObserver(scan);
    const main = document.querySelector("main");
    if (main) updates.observe(main, { childList: true, subtree: true });
    reduced.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      updates.disconnect();
      reduced.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);

  return null;
}
