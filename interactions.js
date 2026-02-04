import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenisInstance;
let scrollerProxySet = false;
let scrollTriggerRegistered = false;
let bgWordObserver;

const ensureScrollTrigger = () => {
  if (scrollTriggerRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  scrollTriggerRegistered = true;
};

export function mountCursor() {
  if (typeof window === "undefined") return;
  document.documentElement.classList.add("is-js");

  if (document.querySelector(".cursor-dot")) return;

  const cursor = document.createElement("div");
  cursor.className = "cursor-dot";
  cursor.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.className = "cursor-dot__label";
  label.textContent = "View more";
  cursor.appendChild(label);

  document.body.appendChild(cursor);
  document.documentElement.classList.add("has-custom-cursor");

  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;
  let scale = 0;
  let targetScale = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;
    scale += (targetScale - scale) * 0.15;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${Math.max(
      scale,
      0.2
    )})`;
    requestAnimationFrame(render);
  };
  render();

  const showCursor = () => {
    targetScale = Math.max(targetScale, 1);
    cursor.classList.add("cursor-dot--visible");
  };

  const hideCursor = () => {
    targetScale = 0;
    cursor.classList.remove("cursor-dot--visible");
    cursor.classList.remove("cursor-dot--active");
    label.classList.remove("is-visible");
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    showCursor();
  });

  window.addEventListener("pointerleave", hideCursor);

  const setActive = (state) => {
    if (state) {
      targetScale = 1.8;
      cursor.classList.add("cursor-dot--active");
      label.classList.add("is-visible");
    } else {
      targetScale = 1;
      cursor.classList.remove("cursor-dot--active");
      label.classList.remove("is-visible");
    }
  };

  document.addEventListener(
    "pointerover",
    (event) => {
      if (event.target.closest('[data-cursor="view-more"]')) {
        setActive(true);
      }
    },
    true
  );

  document.addEventListener(
    "pointerout",
    (event) => {
      const isCurrent = event.target.closest('[data-cursor="view-more"]');
      if (!isCurrent) return;
      const related = event.relatedTarget?.closest?.('[data-cursor="view-more"]');
      if (!related) setActive(false);
    },
    true
  );
}

export function initSmoothScroll() {
  if (typeof window === "undefined" || lenisInstance || prefersReducedMotion())
    return;

  ensureScrollTrigger();

  lenisInstance = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    smoothTouch: false,
    lerp: 0.09,
  });

  const raf = (time) => {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  if (!scrollerProxySet) {
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (lenisInstance && value !== undefined) {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return lenisInstance ? lenisInstance.scroll : window.scrollY || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });
    ScrollTrigger.defaults({
      scroller: document.body,
    });
    scrollerProxySet = true;
  }

  lenisInstance.on("scroll", ScrollTrigger.update);
  window.lenis = lenisInstance;
}

const applyBgWordScroll = () => {
  document.querySelectorAll(".bg-word").forEach((word, index) => {
    if (word.dataset.bgWordAnimated === "true") return;
    const section = word.closest(".section") || word.parentElement;
    if (!section) return;
    word.dataset.bgWordAnimated = "true";
    gsap.fromTo(
      word,
      { x: "-20vw", y: 60, opacity: 0.08 },
      {
        x: "10vw",
        y: -40,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          id: `bg-word-${index}`,
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
};

export function initBgWordScroll() {
  if (typeof window === "undefined" || prefersReducedMotion()) return;

  ensureScrollTrigger();
  applyBgWordScroll();

  if (!bgWordObserver) {
    bgWordObserver = new MutationObserver((mutations) => {
      const hasBgWord = mutations.some((mutation) =>
        Array.from(mutation.addedNodes || []).some(
          (node) =>
            node.nodeType === 1 &&
            (node.classList?.contains("bg-word") ||
              node.querySelector?.(".bg-word"))
        )
      );
      if (hasBgWord) {
        requestAnimationFrame(applyBgWordScroll);
      }
    });
    bgWordObserver.observe(document.body, { childList: true, subtree: true });
  }
}
