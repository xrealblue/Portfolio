'use client'

import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

const Anime = [
    { name: "One Piece", image: "https://image.tmdb.org/t/p/original/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg" },
    { name: "Death Note", image: "https://image.tmdb.org/t/p/original/nqPFi22qOOi8xnB1mrEasnG02vH.jpg" },
    { name: "Naruto", image: "https://image.tmdb.org/t/p/original/xppeysfvDKVx775MFuH8Z9BlpMk.jpg" },
    { name: "Naruto Shippūden", image: "https://image.tmdb.org/t/p/original/71mASgFgSiPl9QUexVH8BubU0lD.jpg" },

    { name: "Bleach", image: "https://image.tmdb.org/t/p/original/2EewmxXe72ogD0EaWM8gqa0ccIw.jpg" },
    { name: "Attack on Titan", image: "https://image.tmdb.org/t/p/original/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg" },
    { name: "Link Click", image: "https://image.tmdb.org/t/p/original/hCt2bLRGTCjHGqtV5FP3Img6w1h.jpg" },
    { name: "pyschopass", image: "https://image.tmdb.org/t/p/original/uWnP6qTcc4imPJ9ZHaXlPQlcYnB.jpg" },
    { name: "classroom of the elite", image: "https://image.tmdb.org/t/p/original/yuHanbUUIv2UWRxxQFt9n8jtmOJ.jpg" },
    { name: "Tomodachi Game", image: "https://image.tmdb.org/t/p/original/l9wfsCpH5Zot8PSskCShqiQc9I4.jpg" },
    { name: "Danganronpa: The Animation", image: "https://image.tmdb.org/t/p/original/2XKziwAUwPiOonJfSJxnEzFPNSU.jpg" },
     { name: "JUJUTSU KAISEN", image: "https://image.tmdb.org/t/p/original/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg" },
    { name: "Masamune-kun's Revenge", image: "https://image.tmdb.org/t/p/original/lOkjPZ2EO0K1H0CgRAd8SLBTOav.jpg" },
    { name: "TONIKAWA", image: "https://image.tmdb.org/t/p/original/jJKTrIfZKoFV66HGMzSa4tkObK0.jpg" },
    { name: "Re:zero", image: "https://assets.anime.com/updates-media/49c18f74_rezeroseason4.jpeg" },
    { name: "Chainsaw Man", image: "https://image.tmdb.org/t/p/original/yVtx7Xn9UxNJqvG2BkvhCcmed9S.jpg" },
    { name: "Chainsaw Man - The Movie: Reze Arc", image: "https://image.tmdb.org/t/p/original/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg" },
    { name: "Black Clover", image: "https://image.tmdb.org/t/p/original/kaMisKeOoTBPxPkbC3OW7Wgt6ON.jpg" },
    { name: "Hyouka", image: "https://image.tmdb.org/t/p/original/qoAig2n9LkukqnizytaBtOSwif7.jpg" },

    { name: "Haikyuu!!", image: "https://image.tmdb.org/t/p/original/rBXEmHQaYoIAyOWRpu8v3cBGKcT.jpg" },
    { name: "Berserk", image: "https://image.tmdb.org/t/p/original/48c5cdDOHCGzhH9V1qiIgptc5ma.jpg" },
    { name: "Fullmetal Alchemist: Brotherhood", image: "https://image.tmdb.org/t/p/original/kKOQbCKbGB75h1d3Jlx9Gy4ZTfv.jpg" },
    { name: "Monster", image: "https://image.tmdb.org/t/p/original/n5XNKXnoXpoXyfiCtXHOf8q8PFM.jpg" },
    { name: "One punch man", image: "https://image.tmdb.org/t/p/original/dT10AxJIXVvRwFAew4tt2RhzJrD.jpg" },
    { name: "lookism", image: "https://image.tmdb.org/t/p/original/qkoM63HDuCOSwxGfb0pljrgns9I.jpg" },

    { name: "hunter x hunter", image: "https://image.tmdb.org/t/p/original/i2EEr2uBvRlAwJ8d8zTG2Y19mIa.jpg" },
    { name: "your name", image: "https://image.tmdb.org/t/p/original/q719jXXEzOoYaps6babgKnONONX.jpg" },
    { name: "Steins;Gate", image: "https://image.tmdb.org/t/p/original/A0wwQHhg3pgg831G43DVoxnDNsQ.jpg" },
    { name: "Code Geass", image: "https://image.tmdb.org/t/p/original/x316WCogkeIwNY4JR8zTCHbI2nQ.jpg" },
    { name: "The Promised Neverland", image: "https://image.tmdb.org/t/p/original/oBgRCpAbtMpk1v8wfdsIph7lPQE.jpg" },
    { name: "The future dairy", image: "https://image.tmdb.org/t/p/original/5MxOVu9eItgGZh4AQrtAnbZIsJr.jpg" },
    { name: "parasyte -the maxim-", image: "https://image.tmdb.org/t/p/original/cXBfjZSdJelu2r0wKD7qCxS71kb.jpg" },
    { name: "devilman crybaby", image: "https://image.tmdb.org/t/p/original/2pQ9xfgDa3L3QpoXfkNhISby2R4.jpg" },
    { name: "rising of the shield hero", image: "https://image.tmdb.org/t/p/original/yjq2n0agGJfmZQ9NpbYIhuBofcq.jpg" },
    { name: "Rokka: Braves of the Six Flowers", image: "https://image.tmdb.org/t/p/original/ve6wy4KrcU7Lo6WuGb5Zqru3Ds.jpg" },
    { name: "Dr.stone", image: "https://assets.anime.com/updates-media/bfcb7f4b_drstonesciencefuture.jpg" },
    { name: "Death parade", image: "https://image.tmdb.org/t/p/original/q95PaZEpjfNzmz3c0TFFAG6lc7S.jpg" },
    { name: "Darling in the FranXX", image: "https://image.tmdb.org/t/p/original/m6R8gI3brohD6izeVCXFmuGeV2m.jpg" },
    { name: "vinland sage", image: "https://image.tmdb.org/t/p/original/vUHlpA5c1NXkds59reY3HMb4Abs.jpg" },
    { name: "Charlotte", image: "https://image.tmdb.org/t/p/original/udiCs1RBGfda1z52cBxu8j9JNmP.jpg" },
    { name: "Food Wars", image: "https://m.media-amazon.com/images/M/MV5BNTZlYjcxOWQtOGE2ZS00NjJiLTgwMjgtYTg2OWJlZmZkOTA3XkEyXkFqcGc@._V1_QL75_UY562_CR9,0,380,562_.jpg" },
    { name: "Kakegurui", image: "https://image.tmdb.org/t/p/original/xsZOMx3ojsER12lRHNe7TcT7YqM.jpg" },
    { name: "fire force", image: "https://image.tmdb.org/t/p/original/q2lTO2j4Nzn3zLab0xMHeBya5sw.jpg" },
    { name: "my dressup darling", image: "https://image.tmdb.org/t/p/original/A6mxBwvvv63JXZm3xXKv4SugE0L.jpg" },
    { name: "Summertime Rendering", image: "https://image.tmdb.org/t/p/original/m9e7chRW8Q8Go1Dv00RCUHbMoNe.jpg" },
    { name: "Relife", image: "https://image.tmdb.org/t/p/original/aRK64bB8hMsuZZnitebPyKqOR5d.jpg" },
    { name: "Prison School", image: "https://m.media-amazon.com/images/M/MV5BYzc3M2VkZjYtOTQyMy00OGMzLWE4ZjUtZmE1ZTIwOWFjMWE3XkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg" },
    { name: "Solo Leveing ", image: "https://image.tmdb.org/t/p/original/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg" },
    { name: "My Love Story with Yamada-kun at Lv999", image: "https://image.tmdb.org/t/p/original/6RTMDyXZpzACsSg5AcRSUHMO8m2.jpg" },
    { name: "Trapped in a Dating Sim: The World of Otome Games Is Tough for Mobs", image: "https://image.tmdb.org/t/p/original/8AhHtqY4yPquNrprkVbzUKw8kRh.jpg" },
    { name: "Great pretender", image: "https://image.tmdb.org/t/p/original/Ang6RR0n5a49lEsKRqQrmGyDekF.jpg" },
    { name: "terror in resonance", image: "https://image.tmdb.org/t/p/original/wc1PaImHVXIESClpEDwNI1mlYuC.jpg" },
    { name: "The Eminence in Shadow", image: "https://image.tmdb.org/t/p/original/7JKYmtLydAwo9ZsEmAknZiO4U8g.jpg" },
    { name: "The Genius Prince's Guide to Raising a Nation Out of Debt", image: "https://image.tmdb.org/t/p/original/jZoU11wB8H02vKIsXtFXd9rjQ4W.jpg" },
    { name: "Errased", image: "https://image.tmdb.org/t/p/original/EljUwZJhpuYfVuSfqY8Pt1xxpH.jpg" },
    { name: "Perfect Blue", image: "https://image.tmdb.org/t/p/original/6WTiOCfDPP8XV4jqfloiVWf7KHq.jpg" },
    { name: "moriarty the patriot", image: "https://image.tmdb.org/t/p/original/lLcmshfrLg7JUMwMCnp5fuNqtoQ.jpg" },
    { name: "MASHLE: MAGIC AND MUSCLES", image: "https://image.tmdb.org/t/p/original/yORTvQOQTZzZ9JRIpRH4QaIaQBm.jpg" },
];


const page = () => {
    const [isselect, setIsselect] = useState(-1)
    const [isMobile, setIsMobile] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (isMobile) return

        const container = containerRef.current
        if (!container) return

        const rightContent = container.querySelector('.right-content') as HTMLElement
        if (rightContent) {
            const totalHeight = rightContent.scrollHeight
            container.style.height = `${totalHeight}px`
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) return

        const handleScroll = () => {
            const container = containerRef.current
            if (!container) return

            const leftContent = container.querySelector('.left-content') as HTMLElement
            const rightContent = container.querySelector('.right-content') as HTMLElement
            
            if (!leftContent || !rightContent) return

            const containerRect = container.getBoundingClientRect()
            const scrollPercentage = Math.max(0, Math.min(1, -containerRect.top / (container.offsetHeight - window.innerHeight)))

            const leftScrollHeight = leftContent.scrollHeight - window.innerHeight
            const rightScrollHeight = rightContent.scrollHeight - window.innerHeight

            leftContent.style.transform = `translateY(-${scrollPercentage * Math.max(0, leftScrollHeight)}px)`
            rightContent.style.transform = `translateY(-${scrollPercentage * Math.max(0, rightScrollHeight)}px)`
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()         
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isMobile])

    return (
        <div
            ref={containerRef}
            style={{
                padding: 'clamp(1.5rem, 1vw, 240rem) clamp(0.5rem, 0.75vw, 2090rem)',
                fontSize: "clamp(0.9rem, 1vw, 240rem)",
            }}
            className={`w-full ${isMobile ? '' : 'relative'}`}>
            
            <div className={`w-full flex flex-col md:flex-row gap-4 group/page ${isMobile ? '' : 'sticky top-0 h-screen'}`}>
                {/* Left Div */}
                <div className={`w-full md:w-[33%] ${isMobile ? '' : 'h-screen overflow-hidden'}`}>
                    <div 
                        className={`left-content flex flex-col gap-8 ${isMobile ? '' : 'will-change-transform'}`}
                    >
                        <div className="leading-[1.35]">
                           Watching anime sharpens my thinking and visual intuition. I{"'"}m drawn to complex characters, layered narratives, and the way emotion is conveyed through art, pacing, and music. Many of these stories influence how I think about user experience, world-building, and design systems, pushing me to approach software with more creativity and empathy.
                        </div>

                        {/* Anime name here */}
                        <div className="flex flex-col pt-20 mono uppercase relative">
                            {Anime.map((anime, index) => (
                                <div className="relative cursor-pointer flex"
                                    key={index}
                                >
                                    <Link
                                        href={`https://myanimelist.net/search/all?q=${anime.name}&cat=all`}
                                        target="_blank"
                                        onMouseEnter={() => setIsselect(index)}
                                        onMouseLeave={() => setIsselect(-1)}
                                        className={`text-sm w-full relative transition-all duration-200 ${
                                            isselect === index ? 'text-yellow-400 translate-x-0' : 'text-white/35 translate-x-0'
                                        }`}
                                    >
                                        <div className={`${anime.name.length > 35 ? 'inline-block whitespace-nowrap' : ''} ${
                                            isselect === index && anime.name.length > 35 ? 'animate-slide' : ''
                                        }`}>
                                            {anime.name}
                                        </div>
                                        {anime.name.length > 35 && isselect !== index && (
                                            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                                        )}
                                    </Link>
                                    {index === isselect && (
                                   <div     
                                        className="absolute bg-black right-0 text-yellow-400 text-sm whitespace-nowrap">{"[VIEW]"}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Div */}
                <div className={`w-full md:w-[67%] ${isMobile ? '' : 'h-screen overflow-hidden'}`}>
                    <div 
                        className={`right-content ${isMobile ? '' : 'will-change-transform'}`}
                    >
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {Anime.map((anime, index) => (
                                <Image
                                    width={200}
                                    height={200}
                                    onMouseEnter={() => setIsselect(index)}
                                    onMouseLeave={() => setIsselect(-1)}
                                    key={index}
                                    src={anime.image}
                                    alt={anime.name}
                                    className={`cursor-pointer transition-opacity duration-200 ${
                                        isselect === index ? 'opacity-100' : isselect === -1 ? 'opacity-100' : 'opacity-50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(calc(-100% + 80%));
                    }
                }
                .animate-slide {
                    animation: slide 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default page