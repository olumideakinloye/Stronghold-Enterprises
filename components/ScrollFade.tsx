"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

export function ScrollFade({
    children,
    className,
    delay = 0,
    as: Tag = "div",
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: keyof JSX.IntrinsicElements;
}) {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const Comp = Tag as any;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                const timer = window.setTimeout(() => {
                    setIsVisible(true);
                }, delay);

                observer.unobserve(element);
                return () => window.clearTimeout(timer);
            },
            { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <Comp
            ref={ref}
            className={clsx("scroll-fade", className, isVisible && "is-visible")}
            data-delay={delay}
        >
            {children}
        </Comp>
    );
}