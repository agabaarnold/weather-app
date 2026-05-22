import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import AdditionalInfo from "#/components/cards/additional-info.tsx";
import CurrentWeather from "#/components/cards/current-weather.tsx";
import DailyForecast from "#/components/cards/daily-forecast.tsx";
import HourlyForecast from "#/components/cards/hourly-forecast.tsx";
import LocationDropdown from "#/components/dropdowns/location-dropdown.tsx";
import Map from "#/components/map.tsx";
import { getGeoCode } from "#/data/api.ts";
import type { Coords } from "#/types.ts";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
    const [coordinates, setCoords] = useState<Coords>({ lat: 1, lon: 32 });
    const [location, setLocation] = useState("Kampala");

    const { data } = useQuery({
        queryFn: () => getGeoCode(location),
        queryKey: ["geocode", location],
    });

    const onMapClick = (lat: number, lon: number) => {
        setCoords({ lat, lon });
        setLocation("custom");
    };

    const coords =
        location === "custom"
            ? coordinates
            : { lat: data?.[0].lat ?? 0, lon: data?.[0].lon ?? 0 };

    return (
        <div className="flex flex-col gap-8">
            <LocationDropdown />
            <Map coords={coords} onMapClick={onMapClick} />
            <CurrentWeather coords={coords} />
            <HourlyForecast coords={coords} />
            <DailyForecast coords={coords} />
            <AdditionalInfo coords={coords} />
        </div>
    );
}
