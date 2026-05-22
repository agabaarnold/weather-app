import { useSuspenseQuery } from "@tanstack/react-query";

import { getWeather } from "#/data/api.ts";
import type { Coords } from "#/types.ts";

import WeatherIcon from "../weather-icon";
import Card from "./card";

interface Props {
    coords: Coords;
}

const DailyForecast = ({ coords }: Props) => {
    const { data } = useSuspenseQuery({
        queryFn: () => getWeather({ ...coords }),
        queryKey: ["weather", coords],
    });

    return (
        <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
            {data?.daily?.map((day) => (
                <div key={day.dt} className="flex justify-between">
                    <p className="w-9">
                        {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                            weekday: "short",
                        })}
                    </p>

                    <WeatherIcon srcLink={day.weather[0].icon} />

                    <p>{Math.round(day.temp.day)}°C</p>
                    <p className="text-gray-500/75">
                        {Math.round(day.temp.min)}°C
                    </p>
                    <p className="text-gray-500/75">
                        {Math.round(day.temp.max)}°C
                    </p>
                </div>
            ))}
        </Card>
    );
};

export default DailyForecast;
