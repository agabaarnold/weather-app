import { useSuspenseQuery } from "@tanstack/react-query";

import { getWeather } from "#/data/api.ts";
import type { Coords } from "#/types.ts";

import WeatherIcon from "../weather-icon";
import Card from "./card";

interface Props {
    coords: Coords;
}

const CurrentWeather = ({ coords }: Props) => {
    const { data } = useSuspenseQuery({
        queryFn: () => getWeather({ ...coords }),
        queryKey: ["weather", coords],
    });

    return (
        <Card
            title="Current Weather"
            childrenClassName="flex flex-col items-center gap-6"
        >
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-center text-6xl font-semibold">
                    {Math.round(data.current.temp)}°C
                </h2>

                <WeatherIcon
                    className="size-14"
                    srcLink={data.current.weather[0].icon}
                />

                <h3 className="text-xl capitalize">
                    {data.current.weather[0].description}
                </h3>
            </div>

            <div className="flex flex-col items-center gap-2">
                <p className="text-xl">Local Time:</p>

                <h3 className="text-4xl font-semibold">
                    {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        hour12: false,
                        minute: "numeric",
                        timeZone: data.timezone,
                    }).format(new Date(data.current.dt * 1000))}
                </h3>
            </div>

            <div className="flex w-full justify-between">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Feels like:</p>

                    <h3>{Math.round(data.current.feels_like)}°C</h3>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Humidity:</p>

                    <h3>{Math.round(data.current.humidity)}%</h3>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Wind:</p>

                    <h3>{Math.round(data.current.wind_speed)} km/h</h3>
                </div>
            </div>
        </Card>
    );
};

export default CurrentWeather;
