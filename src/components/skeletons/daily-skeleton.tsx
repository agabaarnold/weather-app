import Card from "../cards/card";
import { Skeleton } from "../ui/skeleton";

const DailySkeleton = () => (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex justify-between">
                <Skeleton className="h-8 w-9" />

                <Skeleton className="size-8 rounded-full" />

                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
            </div>
        ))}
    </Card>
);

export default DailySkeleton;
