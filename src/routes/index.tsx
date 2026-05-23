import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Suspense, useState } from "react";

import AdditionalInfo from "#/components/cards/additional-info.tsx";
import CurrentWeather from "#/components/cards/current-weather.tsx";
import DailyForecast from "#/components/cards/daily-forecast.tsx";
import HourlyForecast from "#/components/cards/hourly-forecast.tsx";
import LocationDropdown from "#/components/dropdowns/location-dropdown.tsx";
import MapTypeDropdown from "#/components/dropdowns/map-type-dropdown.tsx";
import MapLegend from "#/components/map-legend.tsx";
import Map from "#/components/map.tsx";
import SidePanel from "#/components/side-panel.tsx";
import AdditionalSkeleton from "#/components/skeletons/additional-skeleton.tsx";
import CurrentSkeleton from "#/components/skeletons/current-skeleton.tsx";
import DailySkeleton from "#/components/skeletons/daily-skeleton.tsx";
import HourlySkeleton from "#/components/skeletons/hourly-skeleton.tsx";
import { Button } from "#/components/ui/button.tsx";
import { getGeoCode } from "#/data/api.ts";
import type { Coords } from "#/types.ts";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
    const [coordinates, setCoords] = useState<Coords>({ lat: 1, lon: 32 });
    const [location, setLocation] = useState("Kampala");
    const [mapType, setMapType] = useState("clouds_new");
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const { data: geoCodeData } = useQuery({
        queryFn: () => getGeoCode({ location }),
        queryKey: ["geocode", location],
    });

    const onMapClick = (lat: number, lon: number) => {
        setCoords({ lat, lon });
        setLocation("custom");
    };

    const coords =
        location === "custom"
            ? coordinates
            : {
                  lat: geoCodeData?.[0].lat ?? 0,
                  lon: geoCodeData?.[0].lon ?? 0,
              };

    return (
        <>
            <div className="flex w-full flex-col gap-8 p-8 lg:w-[cal(100dvw-var(--sidebar-width))] 2xl:h-screen">
                <div className="flex gap-8">
                    <div className="flex gap-4">
                        <h1 className="text-2xl font-semibold">Location:</h1>
                        <LocationDropdown
                            location={location}
                            setLocation={setLocation}
                        />
                    </div>

                    <div className="flex gap-4">
                        <h1 className="text-2xl font-semibold">Map type:</h1>
                        <MapTypeDropdown
                            mapType={mapType}
                            setMapType={setMapType}
                        />
                    </div>

                    <Button
                        className={`${isSidePanelOpen && "hidden"}`}
                        onClick={() => setIsSidePanelOpen(true)}
                        variant="outline"
                    >
                        <Menu className="size-4" />
                    </Button>
                </div>

                <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-rows-4">
                    <div className="relative order-1 col-span-1 h-120 md:col-span-2 2xl:col-span-4 2xl:row-span-2 2xl:h-auto">
                        <Map
                            coords={coords}
                            onMapClick={onMapClick}
                            mapType={mapType}
                        />
                        <MapLegend mapType={mapType} />
                    </div>

                    <div className="order-2 col-span-1 2xl:row-span-2">
                        <Suspense fallback={<CurrentSkeleton />}>
                            <CurrentWeather coords={coords} />
                        </Suspense>
                    </div>

                    <div className="order-3 col-span-1 2xl:order-4 2xl:row-span-2">
                        <Suspense fallback={<DailySkeleton />}>
                            <DailyForecast coords={coords} />
                        </Suspense>
                    </div>

                    <div className="order-4 col-span-1 md:col-span-2 2xl:order-3 2xl:row-span-1">
                        <Suspense fallback={<HourlySkeleton />}>
                            <HourlyForecast coords={coords} />
                        </Suspense>
                    </div>

                    <div className="order-5 col-span-1 md:col-span-2 2xl:row-span-1">
                        <Suspense fallback={<AdditionalSkeleton />}>
                            <AdditionalInfo coords={coords} />
                        </Suspense>
                    </div>
                </div>
            </div>

            <SidePanel
                coords={coords}
                isSidePanelOpen={isSidePanelOpen}
                setIsSidePanelOpen={setIsSidePanelOpen}
            />
        </>
    );
}
