"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const socials = [
  {
    name: "Gallery",
    link: "/gallery",
  },
  {
    name: "Twitter",
    link: "https://www.twitter.com/realbluex/",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/0xheet/",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/heetvavadiya/",
  },
  {
    name: "Github",
    link: "https://www.github.com/xrealblue/",
  },
];

const Footer = () => {
  const [position, setPosition] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const baseText =
    "CREATIVE_DEVELOPER_▞▚▞▚▞▚▞_NEXT.JS_VERCEL_▞▚▞▚▞▚▞_INPUT_MONO_▞▚▞▚▞▚▞_Copyright_2025_▞▚▞▚▞▚▞_";

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setPosition((prev) => prev - 10);
      }, 300);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    if (position <= -2000) {
      setPosition(0);
    }
  }, [position]);

  return (
    <div className="flex flex-col w-full">
      <div className="h-full bg-[#1f1f1f] tracking-tight w-full relative flex flex-col items-center justify-center overflow-hidden">
        <div
          className="flex flex-col md:flex-row w-[95%] h-full "
          style={{
            padding:
              "clamp(2rem, 1.5vw, 20rem)  clamp(0.25rem, 0.5vw, 00rem)  ",
            gap: "clamp(3rem, 2vw, 20rem) ",
          }}
        >
          <div
            className=" flex h-fit md:w-[50%] items-center"
            style={{
              fontSize: "clamp(0.75rem, 0.5vw, 240rem)",
            }}
          >
            <div
              className="border-[#FDE037] mono flex text-[#FDE037] border rounded-full"
              style={{
                padding:
                  "clamp(0.25rem, 0.25vw, 20rem) clamp(0.5rem, 0.5vw, 20rem)",
              }}
            >
              {"v1.1.1"}
            </div>
            <div className="flex text-white/50 mono scale-90 tracking-tight uppercase">
              Last updated 2026-1-15
            </div>
          </div>

          <div className="flex flex-col md:w-[15%]">
            {socials.map((social, index) => (
              <Link
                href={social.link}
                target={index !== 0 ? "_blank" : undefined}
                rel="noopener noreferrer"
                key={index}
              >
                <div className="flex gap-0.5">
                  <span className="text-white hover:text-[#FDE037] cursor-pointer hover:border-b hover:border-[#FDE037] border-dotted">
                    {social.name}
                  </span>
                  <span className=" text-xs mono text-[#FDE037]">{index}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:w-[35%]">
            <span className="text-white">
              Let{"'"}s build something together{"."}
            </span>
            <div className="flex gap-0.5">
              <Link
                href={"mailto:heetvavadiya099@gmail.com"}
                className="text-white hover:border-b hover:border-[#FDE037] border-dotted hover:text-[#FDE037] cursor-pointer"
              >
                {"heetvavadiya099@gmail.com"}
              </Link>
              <span className=" text-xs mono text-[#FDE037]">5</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full overflow-hidden  "
        style={{
          padding: "clamp(0.5rem, 0.5vw, 20rem) 0",
        }}
      >
        <div
          className="uppercase hover:text-[#FDE037] pb-2 cursor-pointer text-white/50 scale-y-[0.9] whitespace-nowrap"
          style={{
            fontSize: "clamp(0.75rem, 0.8vw, 240rem)",
            fontFamily: "monospace",
            transform: `translateX(${position}px)`,
            display: "inline-block",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {baseText.repeat(20)}
        </div>
      </div>
    </div>
  );
};

export default Footer;
