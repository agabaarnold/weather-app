import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    title: string;
    childrenClassName?: string;
}

const Card = ({ children, title, childrenClassName }: CardProps) => (
    <div className="from-card to-card/60 flex flex-col gap-4 rounded-xl bg-zinc-900 bg-linear-to-br p-4 shadow-md">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <div className={childrenClassName}>{children}</div>
    </div>
);

export default Card;
