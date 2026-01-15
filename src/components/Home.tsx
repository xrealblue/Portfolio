import React from "react";
import { LanyardResponse } from "react-use-lanyard";
import ActivityCard from "./ActivityCard";
import Link from "next/link";
import JsonLd from "./JsonLd";

const creativity = [
  {
    name: "Reading",
    link: "/reading",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
  {
    name: "Play",
    link: "/play",
  },
  {
    name: "Write",
    link: "/write",
  },
  {
    name: "EthGlobal",
    link: "/https://ethglobal.com/showcase/unipay-exchange-ev92h",
  },
];

const socials = [
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

const Home = ({ activity }: { activity: LanyardResponse | undefined }) => {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Heet Vavadiya",
    url: "https://heet.pro",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/heetvadiya",
      "https://linkedin.com/in/heetvadiya",
      "https://twitter.com/heetvavadiya",
    ],
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "UI/UX Design",
    ],
    alumniOf: "VGEC, Ahmedabad",
    email: "heetvavadiya099@gmail.com",
  };

  return (
    <div className="min-h-[35vh] bg-[#131313] text-white pt-16">
      <JsonLd data={personData} />
      <div
        className="mx-auto flex "
        style={{
          fontSize: "clamp(0.9rem, 1.1vw, 240rem)",
          padding:
            "clamp(1.5rem, 2.5vw, 240rem) clamp(0.75rem, 0.75vw, 240rem) clamp(1rem, 1vw, 240rem)",
        }}
      >
        <div
          className="w-full flex flex-col md:flex-row
        "
          style={{
            gap: "clamp(1.25rem, 1vw, 240rem)",
          }}
        >
          <div
            className="flex flex-col md:w-1/2 w-full"
            style={{
              gap: "clamp(0.5rem, 0.5vw, 240rem)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(0.75rem, 0.7vw, 240rem)",
              }}
              className="uppercase mono font-medium mb-0 text-white/40"
            >
              About
            </h3>
            <p className="mb-4 md:w-[70%] w-full leading-[1.35]">
              {
                " A full-stack developer who builds scalable applications people actually use. He loves creating creative frontends, while scaling backends. Passionate about real-world problems, I'm constantly exploring new ideas—whether it's for smoother user experience or user's enjoyment. I currently studying Computer Engineering at VGEC, Ahmedabad. If you have an interesting idea, please   "
              }{" "}
              <Link
                href="mailto:heetvavadiya099@gmail.com"
                className="hover:text-[#FDE037] hover:border-b hover:border-[#FDE037] border-dotted cursor-pointer"
              >
                get in touch↗.
              </Link>
            </p>

            <div className=" p-4  w-fit">
              <ActivityCard
                userId="1118212847613247558"
                initialData={activity}
              />
            </div>
          </div>

          <div className="flex w-full  md:w-1/2 ">
            <div
              className="w-[35%] flex flex-col"
              style={{
                gap: "clamp(0.5rem, 0.5vw, 240rem)",
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(0.75rem, 0.7vw, 240rem)",
                }}
                className="uppercase mono font-medium mb-0 text-white/40"
              >
                Creativity
              </h3>
              <div className="flex flex-col md:w-[15%]">
                {creativity.map((can, index) => (
                  <Link
                    href={can.link}
                    target={index !== 0 ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <div className="flex gap-0.5 leading-[1.35]">
                      <span className="text-white hover:text-[#FDE037] cursor-pointer border-b border-white/30 hover:border-b hover:border-[#FDE037] border-dotted">
                        {can.name}
                      </span>
                      <span className="text-[9px] mono  text-[#FDE037]">
                        {index + 1}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="w-[65%] flex flex-col"
              style={{
                gap: "clamp(0.5rem, 0.5vw, 240rem)",
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(0.75rem, 0.7vw, 240rem)",
                }}
                className="uppercase mono font-medium mb-0 text-white/40"
              >
                links
              </h3>
              <div className="flex flex-col md:w-[15%]">
                {socials.map((social, index) => (
                  <Link
                    href={social.link}
                    target={index !== 0 ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <div className="flex gap-0.5 leading-[1.35]">
                      <span className="text-white hover:text-[#FDE037] cursor-pointer border-b border-white/30 hover:border-b hover:border-[#FDE037] border-dotted">
                        {social.name}
                      </span>
                      <span className=" text-[10px] medium-font font-bold text-[#FDE037]">
                        ↗
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
