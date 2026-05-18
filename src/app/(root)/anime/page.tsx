"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

const Anime = [
  {
    name: "One Piece",
    image:
      "https://image.tmdb.org/t/p/original/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
    rate: 4,
  },
  {
    name: "Death Note",
    image:
      "https://image.tmdb.org/t/p/original/nqPFi22qOOi8xnB1mrEasnG02vH.jpg",
    rate: 4,
  },
  {
    name: "Naruto",
    image:
      "https://image.tmdb.org/t/p/original/xppeysfvDKVx775MFuH8Z9BlpMk.jpg",
    rate: 3,
  },
  {
    name: "Naruto Shippūden",
    image:
      "https://image.tmdb.org/t/p/original/71mASgFgSiPl9QUexVH8BubU0lD.jpg",
    rate: 3,
  },
  {
    name: "Bleach",
    image:
      "https://image.tmdb.org/t/p/original/2EewmxXe72ogD0EaWM8gqa0ccIw.jpg",
    rate: 4,
  },
  {
    name: "Attack on Titan",
    image:
      "https://image.tmdb.org/t/p/original/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    rate: 5,
  },
  {
    name: "Link Click",
    image:
      "https://image.tmdb.org/t/p/original/hCt2bLRGTCjHGqtV5FP3Img6w1h.jpg",
    rate: 4,
  },
  {
    name: "pyschopass",
    image:
      "https://image.tmdb.org/t/p/original/uWnP6qTcc4imPJ9ZHaXlPQlcYnB.jpg",
    rate: 5,
  },
  {
    name: "classroom of the elite",
    image:
      "https://image.tmdb.org/t/p/original/yuHanbUUIv2UWRxxQFt9n8jtmOJ.jpg",
    rate: 5,
  },
  {
    name: "Tomodachi Game",
    image:
      "https://image.tmdb.org/t/p/original/l9wfsCpH5Zot8PSskCShqiQc9I4.jpg",
    rate: 4,
  },
  {
    name: "Danganronpa: The Animation",
    image:
      "https://image.tmdb.org/t/p/original/2XKziwAUwPiOonJfSJxnEzFPNSU.jpg",
    rate: 4,
  },
  {
    name: "Frieren",
    image: "https://image.tmdb.org/t/p/w342/dqZENchTd7lp5zht7BdlqM7RBhD.jpg",
    rate: 5,
  },
  {
    name: "Blue Lock",
    image: "https://image.tmdb.org/t/p/w342/sTDTy73OYmKY51EK94Mc6AxogzR.jpg",
    rate: 4,
  },
  {
    name: "The Disastrous Life of Saiki K.",
    image: "https://image.tmdb.org/t/p/w342/tpym31HVeQgenaubvCxkMF3kFHy.jpg",
    rate: 4,
  },
  {
    name: "JUJUTSU KAISEN",
    image:
      "https://image.tmdb.org/t/p/original/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
    rate: 3,
  },
  {
    name: "My Hero Academia",
    image: "https://image.tmdb.org/t/p/w342/1u4HqgEKOmjXM8ENGtlrF4yXIwp.jpg",
    rate: 4,
  },
  {
    name: "Full Metal Panic",
    image: "https://image.tmdb.org/t/p/w342/jjYo5Yl6W3RNZ7SjQlK0A8K20te.jpg",
    rate: 4,
  },
  {
    name: "Ranking of Kings",
    image: "https://image.tmdb.org/t/p/w342/xN3RABgGy26CnD3LQDTRlOAHzwW.jpg",
    rate: 3,
  },
  {
    name: "Zom 100",
    image: "https://image.tmdb.org/t/p/w342/XzOeAppGpnsSAiK82idkg0BoCt.jpg",
    rate: 4,
  },
  {
    name: "Masamune-kun's Revenge",
    image:
      "https://image.tmdb.org/t/p/original/lOkjPZ2EO0K1H0CgRAd8SLBTOav.jpg",
    rate: 2,
  },
  {
    name: "TONIKAWA",
    image:
      "https://image.tmdb.org/t/p/original/jJKTrIfZKoFV66HGMzSa4tkObK0.jpg",
    rate: 1,
  },
  {
    name: "Re:zero",
    image: "https://assets.anime.com/updates-media/49c18f74_rezeroseason4.jpeg",
    rate: 3,
  },
  {
    name: "Chainsaw Man",
    image:
      "https://image.tmdb.org/t/p/original/yVtx7Xn9UxNJqvG2BkvhCcmed9S.jpg",
    rate: 4,
  },
  {
    name: "Chainsaw Man - The Movie: Reze Arc",
    image:
      "https://image.tmdb.org/t/p/original/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg",
    rate: 4,
  },
  {
    name: "Black Clover",
    image:
      "https://image.tmdb.org/t/p/original/kaMisKeOoTBPxPkbC3OW7Wgt6ON.jpg",
    rate: 2,
  },
  {
    name: "Hyouka",
    image:
      "https://image.tmdb.org/t/p/original/qoAig2n9LkukqnizytaBtOSwif7.jpg",
    rate: 3,
  },
  {
    name: "Haikyuu!!",
    image:
      "https://image.tmdb.org/t/p/original/rBXEmHQaYoIAyOWRpu8v3cBGKcT.jpg",
    rate: 4,
  },
  {
    name: "Berserk",
    image:
      "https://image.tmdb.org/t/p/original/48c5cdDOHCGzhH9V1qiIgptc5ma.jpg",
    rate: 4,
  },
  {
    name: "Fullmetal Alchemist: Brotherhood",
    image:
      "https://image.tmdb.org/t/p/original/kKOQbCKbGB75h1d3Jlx9Gy4ZTfv.jpg",
    rate: 5,
  },
  {
    name: "Monster",
    image:
      "https://image.tmdb.org/t/p/original/n5XNKXnoXpoXyfiCtXHOf8q8PFM.jpg",
    rate: 5,
  },
  {
    name: "One punch man",
    image:
      "https://image.tmdb.org/t/p/original/dT10AxJIXVvRwFAew4tt2RhzJrD.jpg",
    rate: 3,
  },
  {
    name: "lookism",
    image:
      "https://image.tmdb.org/t/p/original/qkoM63HDuCOSwxGfb0pljrgns9I.jpg",
    rate: 3,
  },
  {
    name: "hunter x hunter",
    image:
      "https://image.tmdb.org/t/p/original/i2EEr2uBvRlAwJ8d8zTG2Y19mIa.jpg",
    rate: 4,
  },
  {
    name: "your name",
    image:
      "https://image.tmdb.org/t/p/original/q719jXXEzOoYaps6babgKnONONX.jpg",
    rate: 3,
  },
  {
    name: "Steins;Gate",
    image:
      "https://image.tmdb.org/t/p/original/A0wwQHhg3pgg831G43DVoxnDNsQ.jpg",
    rate: 5,
  },
  {
    name: "Code Geass",
    image:
      "https://image.tmdb.org/t/p/original/x316WCogkeIwNY4JR8zTCHbI2nQ.jpg",
    rate: 5,
  },
  {
    name: "The Promised Neverland",
    image:
      "https://image.tmdb.org/t/p/original/oBgRCpAbtMpk1v8wfdsIph7lPQE.jpg",
    rate: 4,
  },
  {
    name: "The future dairy",
    image:
      "https://image.tmdb.org/t/p/original/5MxOVu9eItgGZh4AQrtAnbZIsJr.jpg",
    rate: 4,
  },
  {
    name: "parasyte -the maxim-",
    image:
      "https://image.tmdb.org/t/p/original/cXBfjZSdJelu2r0wKD7qCxS71kb.jpg",
    rate: 4,
  },
  {
    name: "devilman crybaby",
    image:
      "https://image.tmdb.org/t/p/original/2pQ9xfgDa3L3QpoXfkNhISby2R4.jpg",
    rate: 3,
  },
  {
    name: "rising of the shield hero",
    image:
      "https://image.tmdb.org/t/p/original/yjq2n0agGJfmZQ9NpbYIhuBofcq.jpg",
    rate: 3,
  },
  {
    name: "Rokka: Braves of the Six Flowers",
    image: "https://image.tmdb.org/t/p/original/ve6wy4KrcU7Lo6WuGb5Zqru3Ds.jpg",
    rate: 3,
  },
  {
    name: "Dr.stone",
    image:
      "https://image.tmdb.org/t/p/w342/ve1Sv3sVArmE0nlFjzadcNv1G8r.jpg",
    rate: 3,
  },
  {
    name: "Death parade",
    image:
      "https://image.tmdb.org/t/p/original/q95PaZEpjfNzmz3c0TFFAG6lc7S.jpg",
    rate: 3,
  },
  {
    name: "Darling in the FranXX",
    image:
      "https://image.tmdb.org/t/p/original/m6R8gI3brohD6izeVCXFmuGeV2m.jpg",
    rate: 3,
  },
  {
    name: "vinland saga",
    image:
      "https://image.tmdb.org/t/p/original/vUHlpA5c1NXkds59reY3HMb4Abs.jpg",
    rate: 5,
  },
  {
    name: "Charlotte",
    image:
      "https://image.tmdb.org/t/p/original/udiCs1RBGfda1z52cBxu8j9JNmP.jpg",
    rate: 4,
  },
  {
    name: "Food Wars",
    image:
      "https://m.media-amazon.com/images/M/MV5BNTZlYjcxOWQtOGE2ZS00NjJiLTgwMjgtYTg2OWJlZmZkOTA3XkEyXkFqcGc@._V1_QL75_UY562_CR9,0,380,562_.jpg",
    rate: 4,
  },
  {
    name: "Kakegurui",
    image:
      "https://image.tmdb.org/t/p/original/xsZOMx3ojsER12lRHNe7TcT7YqM.jpg",
    rate: 4,
  },
  {
    name: "fire force",
    image:
      "https://image.tmdb.org/t/p/original/q2lTO2j4Nzn3zLab0xMHeBya5sw.jpg",
    rate: 2,
  },
  {
    name: "my dressup darling",
    image:
      "https://image.tmdb.org/t/p/original/A6mxBwvvv63JXZm3xXKv4SugE0L.jpg",
    rate: 1,
  },
  {
    name: "Summertime Rendering",
    image:
      "https://image.tmdb.org/t/p/original/m9e7chRW8Q8Go1Dv00RCUHbMoNe.jpg",
    rate: 4,
  },
  {
    name: "Relife",
    image:
      "https://image.tmdb.org/t/p/original/aRK64bB8hMsuZZnitebPyKqOR5d.jpg",
    rate: 0,
  },
  {
    name: "Prison School",
    image:
      "https://m.media-amazon.com/images/M/MV5BYzc3M2VkZjYtOTQyMy00OGMzLWE4ZjUtZmE1ZTIwOWFjMWE3XkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg",
    rate: 3,
  },
  {
    name: "Solo Leveing",
    image:
      "https://image.tmdb.org/t/p/original/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    rate: 3,
  },
  {
    name: "My Love Story with Yamada-kun at Lv999",
    image:
      "https://image.tmdb.org/t/p/original/6RTMDyXZpzACsSg5AcRSUHMO8m2.jpg",
    rate: 2,
  },
  {
    name: "Trapped in a Dating Sim: The World of Otome Games Is Tough for Mobs",
    image:
      "https://image.tmdb.org/t/p/original/8AhHtqY4yPquNrprkVbzUKw8kRh.jpg",
    rate: 2,
  },
  {
    name: "Great pretender",
    image:
      "https://image.tmdb.org/t/p/original/Ang6RR0n5a49lEsKRqQrmGyDekF.jpg",
    rate: 5,
  },
  {
    name: "terror in resonance",
    image:
      "https://image.tmdb.org/t/p/original/wc1PaImHVXIESClpEDwNI1mlYuC.jpg",
    rate: 3,
  },
  {
    name: "The Eminence in Shadow",
    image:
      "https://image.tmdb.org/t/p/original/7JKYmtLydAwo9ZsEmAknZiO4U8g.jpg",
    rate: 3,
  },
  {
    name: "The Genius Prince's Guide to Raising a Nation Out of Debt",
    image:
      "https://image.tmdb.org/t/p/original/jZoU11wB8H02vKIsXtFXd9rjQ4W.jpg",
    rate: 3,
  },
  {
    name: "Errased",
    image: "https://image.tmdb.org/t/p/original/EljUwZJhpuYfVuSfqY8Pt1xxpH.jpg",
    rate: 4,
  },
  {
    name: "Perfect Blue",
    image:
      "https://image.tmdb.org/t/p/original/6WTiOCfDPP8XV4jqfloiVWf7KHq.jpg",
    rate: 4,
  },
  {
    name: "moriarty the patriot",
    image:
      "https://image.tmdb.org/t/p/original/lLcmshfrLg7JUMwMCnp5fuNqtoQ.jpg",
    rate: 4,
  },
  {
    name: "MASHLE: MAGIC AND MUSCLES",
    image:
      "https://image.tmdb.org/t/p/original/yORTvQOQTZzZ9JRIpRH4QaIaQBm.jpg",
    rate: 2,
  },
];

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
          {Anime.slice(0, 14).map((anime, i) => (
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
            +{Anime.length - 14} more
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
              Watching anime sharpens my thinking and visual intuition. I{"'"}m
              drawn to complex characters, layered narratives, and the way
              emotion is conveyed through art, pacing, and music. Many of these
              stories influence how I think about user experience,
              world-building, and design systems, pushing me to approach
              software with more creativity and empathy.
            </div>

            <div className="flex flex-col pt-20 mono uppercase relative">
              {Anime.map((anime, index) => (
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
              {Anime.map((anime, index) => (
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
