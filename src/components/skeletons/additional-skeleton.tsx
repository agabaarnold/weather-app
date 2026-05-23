import Card from "../cards/card";
import { Skeleton } from "../ui/skeleton";

const AdditionalSkeleton = () => (
    <Card
        title="Additional Weather Info"
        childrenClassName="flex flex-col gap-8"
    >
        {Array.from({ length: 6 }).map((_, i) => (
            <div className="flex justify-between" key={i}>
                <div className="flex gap-4">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="size-8 rounded-full" />
                </div>

                <Skeleton className="size-8" />
            </div>
        ))}
    </Card>
);

export default AdditionalSkeleton;
