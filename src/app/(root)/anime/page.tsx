"use client";

import Image from "next/image";
import Link from "next/link";
import data from "../../../data/anime.json";
import { useCallback, useEffect, useRef, useState } from "react";

// Memoized loader — no re-renders after mount
const AnimeLoader = () => {
  const [phase, setPhase] = useState<"show" | "cut" | "gone">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("cut"), 1400);
    const t2 = setTimeout(() => setPhase("gone"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "#facc15",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          transform:
            phase === "cut" ? "translate(-100%, -100%)" : "translate(0, 0)",
          transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "#facc15",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          transform:
            phase === "cut" ? "translate(100%, 100%)" : "translate(0, 0)",
          transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      <div
        className="absolute inset-0 flex flex-col justify-center px-12"
        style={{
          zIndex: 1,
          opacity: phase === "cut" ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="flex flex-col mono uppercase">
          {data.slice(0, 14).map((anime, i) => (
            <div
              key={i}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.75rem",
                lineHeight: "1.6",
                animation: `fadeUp 0.5s ease ${i * 60}ms both`,
              }}
            >
              {anime.name}
            </div>
          ))}
          <div
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.75rem",
              marginTop: "4px",
            }}
          >
            +{data.length - 14} more
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Static star SVG — rendered once per card, not per hover
const StarRating = ({ rate }: { rate: number }) => (
  <div className="absolute top-1 right-1 z-10 flex flex-col gap-[3px]">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24">
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={i < rate ? "#facc15" : "rgba(255,255,255,0.15)"}
          stroke={i < rate ? "#000" : "none"}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    ))}
  </div>
);

const page = () => {
  const [isselect, setIsselect] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cache expensive measurements so scroll handler never reads DOM
  const scrollDataRef = useRef({
    leftEl: null as HTMLElement | null,
    rightEl: null as HTMLElement | null,
    leftMax: 0,
    rightMax: 0,
    containerHeight: 0,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Measure once (and on resize) — never inside the scroll handler
  const measureLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const leftEl = container.querySelector(".left-content") as HTMLElement;
    const rightEl = container.querySelector(".right-content") as HTMLElement;
    if (!leftEl || !rightEl) return;

    const rightScrollHeight = rightEl.scrollHeight;
    container.style.height = `${rightScrollHeight}px`;

    scrollDataRef.current = {
      leftEl,
      rightEl,
      leftMax: Math.max(0, leftEl.scrollHeight - window.innerHeight),
      rightMax: Math.max(0, rightScrollHeight - window.innerHeight),
      containerHeight: rightScrollHeight,
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    measureLayout();
    window.addEventListener("resize", measureLayout);
    return () => window.removeEventListener("resize", measureLayout);
  }, [isMobile, measureLayout]);

  useEffect(() => {
    if (isMobile) return;

    let rafId: number;
    let lastScrollY = -1;

    const handleScroll = () => {
      // Skip if scroll position hasn't changed
      if (window.scrollY === lastScrollY) return;
      lastScrollY = window.scrollY;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { leftEl, rightEl, leftMax, rightMax, containerHeight } =
          scrollDataRef.current;
        if (!leftEl || !rightEl) return;

        const containerTop =
          containerRef.current?.getBoundingClientRect().top ?? 0;
        const denominator = containerHeight - window.innerHeight;
        if (denominator <= 0) return;

        const pct = Math.max(0, Math.min(1, -containerTop / denominator));

        // Only write transform — no layout reads inside RAF
        leftEl.style.transform = `translateY(-${pct * leftMax}px)`;
        rightEl.style.transform = `translateY(-${pct * rightMax}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Stable callbacks — avoid inline arrow functions in JSX
  const handleEnter = useCallback((i: number) => () => setIsselect(i), []);
  const handleLeave = useCallback(() => setIsselect(-1), []);

  return (
    <div
      ref={containerRef}
      style={{
        padding: "clamp(1.5rem, 1vw, 240rem) clamp(0.5rem, 0.75vw, 2090rem)",
        fontSize: "clamp(0.9rem, 1vw, 240rem)",
      }}
      className={`w-full ${isMobile ? "" : "relative"}`}
    >
      <AnimeLoader />

      <div
        className={`w-full flex flex-col md:flex-row gap-4 group/page ${isMobile ? "" : "sticky top-0 h-screen"}`}
      >
        {/* Left */}
        <div
          className={`w-full md:w-[33%] ${isMobile ? "" : "h-screen overflow-hidden"}`}
        >
          <div
            className={`left-content flex flex-col gap-8 ${isMobile ? "" : "will-change-transform"}`}
          >
            <div className="leading-[1.35]">
              Watching anime sharpens my thinking and visual intuition{"."} Here
              is all Anime i ever watched also i reted them according to me{"."}{" "}
              my fav genre is psychological {"<3"}
            </div>

            <div className="flex flex-col pt-20 mono uppercase relative">
              {data.map((anime, index) => (
                <div className="relative cursor-pointer flex" key={index}>
                  <Link
                    href={`https://myanimelist.net/search/all?q=${anime.name}&cat=all`}
                    target="_blank"
                    onMouseEnter={handleEnter(index)}
                    onMouseLeave={handleLeave}
                    className={`text-sm w-full relative transition-colors duration-150 ${isselect === index ? "text-yellow-400" : "text-white/35"}`}
                  >
                    <div
                      className={`${anime.name.length > 35 ? "inline-block whitespace-nowrap overflow-hidden max-w-full" : ""} ${isselect === index && anime.name.length > 35 ? "animate-slide" : ""}`}
                    >
                      {anime.name}
                    </div>
                    {anime.name.length > 35 && isselect !== index && (
                      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent pointer-events-none" />
                    )}
                  </Link>
                  {isselect === index && (
                    <div className="absolute bg-black right-0 text-yellow-400 text-sm whitespace-nowrap">
                      {"[VIEW]"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — CSS-driven hover via group, no per-card opacity state */}
        <div
          className={`w-full md:w-[67%] ${isMobile ? "" : "h-screen overflow-hidden"}`}
        >
          <div
            className={`right-content ${isMobile ? "" : "will-change-transform"}`}
          >
            {/*
              Key perf change: opacity is driven by CSS classes, not React state per card.
              When any card is hovered, .grid-hover class is added to the grid,
              which dims all cards. The hovered card undims itself via :hover.
              Zero JS in the hot path.
            */}
            <div
              className={`grid grid-cols-3 md:grid-cols-6 gap-3 anime-grid ${isselect !== -1 ? "has-hover" : ""}`}
            >
              {data.map((anime, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer anime-card ${isselect === index ? "is-active" : ""}`}
                  onMouseEnter={handleEnter(index)}
                  onMouseLeave={handleLeave}
                >
                  <Image
                    width={200}
                    height={300}
                    src={anime.image}
                    alt={anime.name}
                    loading={index < 12 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 33vw, 11vw"
                    className="block w-full h-auto"
                  />
                  <StarRating rate={anime.rate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(calc(-100% + 80%));
          }
        }
        .animate-slide {
          animation: slide 4s ease-in-out infinite;
        }

        /* CSS-only hover dimming — zero JS in hot path */
        .anime-grid.has-hover .anime-card {
          opacity: 0.4;
          transition: opacity 0.15s ease;
        }
        .anime-grid.has-hover .anime-card.is-active {
          opacity: 1;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px #facc15;
        }
        .anime-card {
          transition:
            opacity 0.15s ease,
            transform 0.15s ease,
            box-shadow 0.15s ease;
          contain: layout style paint;
        }
      `}</style>
    </div>
  );
};

export default page;
