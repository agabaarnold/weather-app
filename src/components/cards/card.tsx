import { clsx } from "clsx";
import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
    childrenClassName?: string;
}

const Card = ({ children, title, className, childrenClassName }: CardProps) => (
    <div
        className={clsx(
            className,
            "from-card to-card/60 flex flex-col gap-4 rounded-xl bg-zinc-900 bg-linear-to-br p-4 shadow-md 2xl:h-full"
        )}
    >
        <h2 className="text-2xl font-semibold">{title}</h2>

        <div
            className={clsx(
                childrenClassName,
                "animate-[fade-in_0.6s_ease-out_forwards] 2xl:flex-1"
            )}
        >
            {children}
        </div>
    </div>
);

export default Card;
