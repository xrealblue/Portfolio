'use client'
import { useTransitionRouter } from 'next-view-transitions'
import { useEffect, useState } from 'react'

export function usePageTransition() {
    const router = useTransitionRouter()

    const navigate = (href: string) => {
        router.push(href, {
            onTransitionReady: () => {
                document.documentElement.animate(
                    [{ opacity: 1 }, { opacity: 1 }],
                    { duration: 800, easing: 'ease', fill: 'forwards', pseudoElement: '::view-transition-new(root)' }
                )
            }
        })
    }

    return navigate
}