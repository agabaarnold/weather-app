import { useSuspenseQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { ChevronLeft, Info } from "lucide-react";
import { Suspense } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
    airQualityRanges,
    pollutantNameMapping,
} from "#/constants/api-breakpoints.ts";
import type { Pollutant } from "#/constants/api-breakpoints.ts";
import { getAirPollution } from "#/data/api.ts";
import type { Coords } from "#/types.ts";

import Card from "./cards/card";
import SidePanelSkeleton from "./skeletons/side-panel-skeleton";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
    coords: Coords;
    isSidePanelOpen: boolean;
    setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}

const SidePanel = (props: Props) => {
    const { isSidePanelOpen, setIsSidePanelOpen } = props;

    return (
        <div
            className={clsx(
                "bg-sidebar fixed top-0 right-0 z-10001 h-screen w-(--sidebar-width) overflow-y-scroll px-4 py-8 shadow-md transition-transform duration-300 ease-in-out 2xl:translate-x-0!",
                isSidePanelOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            <Button
                className="2xl:hidden"
                onClick={() => setIsSidePanelOpen(false)}
                variant="outline"
            >
                <ChevronLeft className="size-4" />
            </Button>

            <Suspense fallback={<SidePanelSkeleton />}>
                <AirPollution {...props} />
            </Suspense>
        </div>
    );
};

function AirPollution({ coords }: Props) {
    const { data } = useSuspenseQuery({
        queryFn: () => getAirPollution({ lat: coords.lat, lon: coords.lon }),
        queryKey: ["air-pollution", coords],
    });

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Air Pollution</h1>
            <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>

            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">AQI</h1>

                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button variant="outline">
                                <Info className="size-4" />
                            </Button>
                        }
                    />

                    <TooltipContent>
                        <p className="max-w-xs">
                            Air Quality Index. Possible values: 1, 2, 3, 4, 5.
                            Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5
                            = Very Poor.
                        </p>
                    </TooltipContent>
                </Tooltip>
            </div>

            {Object.entries(data.list[0].components).map(([key, value]) => {
                const pollutant =
                    airQualityRanges[
                        key.toUpperCase() as keyof typeof airQualityRanges
                    ];
                const max = Math.max(pollutant["Very Poor"].min, value);

                const currentLevel = (() => {
                    for (const [level, range] of Object.entries(pollutant)) {
                        if (
                            value >= range.min &&
                            (range.max === null || value <= range.max)
                        ) {
                            return level;
                        }
                    }

                    return "Very Poor";
                })();

                const qualityColor = (() => {
                    switch (currentLevel) {
                        case "Good": {
                            return "bg-green-500";
                        }
                        case "Fair": {
                            return "bg-yellow-500";
                        }
                        case "Moderate": {
                            return "bg-amber-500";
                        }
                        case "Poor": {
                            return "bg-orange-500";
                        }
                        case "Very Poor": {
                            return "bg-red-500";
                        }
                        default: {
                            return "bg-zinc-500";
                        }
                    }
                })();

                return (
                    <Card
                        childrenClassName="flex flex-col gap-3"
                        className="from-sidebar-accent to-sidebar-accent/60 gap-0! transition-transform duration-300 hover:scale-105"
                        key={key}
                    >
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold capitalize">
                                    {key}
                                </span>

                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <Button variant="outline">
                                                <Info className="size-4" />
                                            </Button>
                                        }
                                    />

                                    <TooltipContent className="z-2000">
                                        <p className="max-w-xs">
                                            Concentration of{" "}
                                            {
                                                pollutantNameMapping[
                                                    key.toUpperCase() as Pollutant
                                                ]
                                            }
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            <span className="text-lg font-semibold">
                                {value}
                            </span>
                        </div>

                        <Slider disabled min={0} max={max} value={[value]} />

                        <div className="flex justify-between text-xs">
                            <p>0</p>
                            <p>{max}</p>
                        </div>

                        <div className="flex justify-between">
                            {Object.keys(pollutant).map((quality) => (
                                <span
                                    key={quality}
                                    className={clsx(
                                        "rounded-md px-2 py-1 text-xs font-medium",
                                        quality === currentLevel
                                            ? qualityColor
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {quality}
                                </span>
                            ))}
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}

export default SidePanel;
