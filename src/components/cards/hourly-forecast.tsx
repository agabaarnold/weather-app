import { useSuspenseQuery } from "@tanstack/react-query";

import { getWeather } from "#/data/api.ts";
import type { Coords } from "#/types.ts";

import WeatherIcon from "../weather-icon";
import Card from "./card";

interface Props {
    coords: Coords;
}

const HourlyForecast = ({ coords }: Props) => {
    const { data } = useSuspenseQuery({
        queryFn: () => getWeather({ ...coords }),
        queryKey: ["weather", coords],
    });

    return (
        <Card
            title="Hourly Forecast (48 hours)"
            childrenClassName="flex gap-6 overflow-x-scroll"
        >
            {data.hourly?.map((hour) => (
                <div
                    key={hour.dt}
                    className="flex flex-col items-center gap-2 p-2"
                >
                    <p className="whitespace-nowrap">
                        {new Date(hour.dt * 1000).toLocaleTimeString(
                            undefined,
                            {
                                hour: "numeric",
                                hour12: false,
                                minute: "numeric",
                            }
                        )}
                    </p>

                    <WeatherIcon srcLink={hour.weather[0].icon} />

                    <p>{Math.round(hour.temp)}°C</p>
                </div>
            ))}
        </Card>
    );
};

export default HourlyForecast;
