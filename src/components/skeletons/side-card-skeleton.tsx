import Card from "../cards/card";
import { Skeleton } from "../ui/skeleton";

const SideCardSkeleton = () => (
    <Card
        childrenClassName="flex flex-col gap-3"
        className="from-sidebar-accent to-sidebar-accent/60 gap-0! transition-transform duration-300 hover:scale-105"
    >
        <div className="flex justify-between">
            <Skeleton className="h-7 w-12" />

            <Skeleton className="h-7 w-12" />
        </div>

        <Skeleton className="h-1.5 w-full" />

        <div className="flex justify-between text-xs">
            <Skeleton className="h-4 w-2" />
            <Skeleton className="h-4 w-2" />
        </div>

        <div className="flex justify-between">
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-15" />
            ))}
        </div>
    </Card>
);

export default SideCardSkeleton;
