'use client'
import { useRouter } from 'next/navigation'
import { coverScreen } from './TransitionOverlay'

export default function TransitionLink({
    href, children, className, target, ...props
}: {
    href: string
    children: React.ReactNode
    className?: string
    target?: string
    [key: string]: unknown
}) {
    const router = useRouter()

    const handleClick = async (e: React.MouseEvent) => {
        if (target === '_blank') return // let external links open normally
        e.preventDefault()
        await coverScreen()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} className={className} target={target} {...props}>
            {children}
        </a>
    )
}