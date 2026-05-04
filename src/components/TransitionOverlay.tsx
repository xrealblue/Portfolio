'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

let triggerCover: (() => Promise<void>) | null = null
export const coverScreen = () => triggerCover?.() ?? Promise.resolve()

export default function TransitionOverlay() {
    const [phase, setPhase] = useState<'idle' | 'enter' | 'cover' | 'open'>('idle')
    const pathname = usePathname()

    useEffect(() => {
        // On route change: triangles already covering (from coverScreen),
        // wait a beat then split open
        const t1 = setTimeout(() => setPhase('open'), 100)
        const t2 = setTimeout(() => setPhase('idle'), 900)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [pathname])

    useEffect(() => {
        triggerCover = () => new Promise(resolve => {
            // Step 1: position triangles off-screen
            setPhase('enter')
            // Step 2: slide them IN to form full rectangle
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setPhase('cover')
                })
            })
            // Step 3: resolve after cover is complete so router navigates
            setTimeout(resolve, 800)
        })
    }, [])

    if (phase === 'idle') return null

    const topLeft = {
        enter: 'translate(-100%, -100%)',  // off screen top-left
        cover: 'translate(0, 0)',           // fully covering
        open: 'translate(-100%, -100%)',   // flies back out
    }[phase]

    const bottomRight = {
        enter: 'translate(100%, 100%)',    // off screen bottom-right
        cover: 'translate(0, 0)',           // fully covering
        open: 'translate(100%, 100%)',     // flies back out
    }[phase]

    const transition = phase === 'enter'
        ? 'transform 0s'                                          // instant reposition
        : 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)'       // animated slide

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
            {/* Top-left triangle */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: '#facc15',
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                transform: topLeft,
                transition,
            }} />
            {/* Bottom-right triangle */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: '#facc15',
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                transform: bottomRight,
                transition,
            }} />
        </div>
    )
}