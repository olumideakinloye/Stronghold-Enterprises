import React from 'react'

export default function ScrollCue({ href, theme }: { href: string; theme?: string }) {
    return (
        <a
            href={href}
            aria-label="Scroll to explore"
            className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 opacity-70 transition hover:opacity-100 sm:bottom-8"
        >
            <span className={`flex h-10 w-6 items-start justify-center rounded-full border-2 ${theme === 'grey' ? 'border-black/30 bg-black/10' : 'border-white/60 bg-white/20'} backdrop-blur p-1.5 sm:h-11 sm:w-7`}>
                <span className={`h-1.5 w-1.5 rounded-full ${theme === 'grey' ? 'bg-black/70' : 'bg-white/90'} animate-scrollWheel`} />
            </span>
        </a>
    )
}

