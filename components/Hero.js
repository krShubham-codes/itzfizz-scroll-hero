"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ";

const STATS = [
  { value: 58, label: "Increase in pick up point use", side: "left", at: 0.22 },
  { value: 23, label: "Decreased in customer phone calls", side: "right", at: 0.42 },
  { value: 27, label: "Increase in pick up point use", side: "left", at: 0.62 },
  { value: 40, label: "Decreased in customer phone calls", side: "right", at: 0.82 },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    // gsap.context scopes selectors to `root` and cleans everything up on unmount.
    const ctx = gsap.context(() => {
      // Centre the car with GSAP (xPercent) so it doesn't fight the x/rotate tweens below.
      gsap.set(".car", { xPercent: -50 });

      /* ---------- 1. INTRO (time-based, runs once on load) ---------- */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".letter", { opacity: 0, y: 40, duration: 1, stagger: 0.05 })
        .from(".car-inner", { opacity: 0, y: 80, scale: 0.9, duration: 1.2 }, "-=0.6")
        .from(".scroll-hint", { opacity: 0, duration: 0.8 }, "-=0.4");

      /* ---------- 2. SCROLL (progress-based) ---------- */
      // Only transforms/opacity are animated => compositor-friendly, no layout reflow.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current, // the scoped root IS the hero, so pass the element itself
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1, // 1s of smoothing/interpolation behind the scrollbar
          anticipatePin: 1,
        },
      });

      // Car drives down the road, growing slightly (perspective feel) with a gentle sway.
      tl.to(".car", { y: () => window.innerHeight * 0.55, scale: 1.25, duration: 1 }, 0)
        .to(".car", { x: -30, rotate: -4, duration: 0.25, ease: "sine.inOut" }, 0.1)
        .to(".car", { x: 30, rotate: 4, duration: 0.3, ease: "sine.inOut" }, 0.35)
        .to(".car", { x: 0, rotate: 0, duration: 0.3, ease: "sine.inOut" }, 0.7)
        // Road markings slide upward faster than the car => sense of speed.
        .to(".lane", { y: -560, duration: 1 }, 0)
        // Headline drifts up and fades as the car passes.
        .to(".headline", { y: -60, opacity: 0.15, duration: 0.5 }, 0);

      // Stats are revealed as the car passes them.
      STATS.forEach((s, i) => {
        const sel = `.stat-${i}`;
        const dir = s.side === "left" ? -60 : 60;
        tl.fromTo(sel, { opacity: 0, x: dir }, { opacity: 1, x: 0, duration: 0.12, ease: "power2.out" }, s.at);

        // count-up number tied to the same scroll position
        const counter = { n: 0 };
        tl.to(
          counter,
          {
            n: s.value,
            duration: 0.15,
            onUpdate: () => {
              const el = root.current?.querySelector(`${sel} .num`);
              if (el) el.textContent = Math.round(counter.n);
            },
          },
          s.at
        );
      });
      tl.to(".scroll-hint", { opacity: 0, duration: 0.05 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero relative h-screen w-full overflow-hidden bg-asphalt">
      {/* Road */}
      <div className="absolute inset-y-0 left-1/2 w-[46%] min-w-[260px] max-w-[520px] -translate-x-1/2 bg-[#1b1b1f]">
        <div className="absolute inset-y-0 left-0 w-1 bg-white/20" />
        <div className="absolute inset-y-0 right-0 w-1 bg-white/20" />
        <div
          className="lane absolute -top-[600px] bottom-0 left-1/2 w-1 -translate-x-1/2 will-change-transform"
          style={{ height: "calc(100% + 1200px)" }}
        />
      </div>

      {/* Headline */}
      <h1
        className="headline absolute inset-x-0 top-[12vh] z-20 flex flex-wrap justify-center px-4 text-center text-2xl font-extrabold text-white sm:text-4xl md:text-6xl"
        aria-label="Welcome ItzFizz"
      >
        {HEADLINE.split("").map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`letter inline-block will-change-transform ${
              ch === " " ? "w-[0.9em] md:w-[1.4em]" : "mx-[0.18em] md:mx-[0.28em]"
            }`}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h1>

      {/* Car */}
      <div className="car absolute left-1/2 top-[26vh] z-10 h-[34vh] w-[16vh] will-change-transform">
        <div className="car-inner h-full w-full">
          <Car />
        </div>
      </div>

      {/* Stats */}
      {STATS.map((s, i) => (
        <div
          key={i}
          className={`stat stat-${i} absolute z-20 w-[38%] max-w-xs opacity-0 will-change-transform ${
            s.side === "left" ? "left-[4%] text-left md:left-[8%]" : "right-[4%] text-right md:right-[8%]"
          }`}
          style={{ top: `${28 + i * 15}%` }}
        >
          <div className="text-5xl font-extrabold text-fizz md:text-7xl">
            <span className="num">0</span>%
          </div>
          <p className="mt-1 text-xs text-white/70 md:text-base">{s.label}</p>
        </div>
      ))}

      <div className="scroll-hint absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-white/50">
        Scroll
      </div>
    </section>
  );
}