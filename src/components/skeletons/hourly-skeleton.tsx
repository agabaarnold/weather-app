import Card from "../cards/card";
import { Skeleton } from "../ui/skeleton";

const HourlySkeleton = () => (
    <Card
        title="Hourly Forecast (48 hours)"
        childrenClassName="flex gap-6 overflow-x-scroll"
    >
        {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-2">
                <Skeleton className="h-6 w-15" />

                <Skeleton className="size-14 rounded-full" />

                <Skeleton className="h-6 w-8" />
            </div>
        ))}
    </Card>
);

export default HourlySkeleton;
