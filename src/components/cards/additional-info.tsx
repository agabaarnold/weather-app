import { useSuspenseQuery } from "@tanstack/react-query";
import {
    CircleGaugeIcon,
    CloudyIcon,
    RadiationIcon,
    SunriseIcon,
    SunsetIcon,
    WindIcon,
} from "lucide-react";

import { getWeather } from "#/data/api.ts";
import type { Coords } from "#/types.ts";

import Card from "./card";
import { Format } from "./format";

interface Props {
    coords: Coords;
}

const AdditionalInfo = ({ coords }: Props) => {
    const { data } = useSuspenseQuery({
        queryFn: () => getWeather({ ...coords }),
        queryKey: ["weather", coords],
    });

    return (
        <Card
            title="Additional Weather Info"
            childrenClassName="flex flex-col gap-8"
        >
            {rows.map(({ label, value, Icon }) => (
                <div className="flex justify-between" key={value}>
                    <div className="flex gap-4">
                        <span className="text-gray-500">{label}</span>
                        <Icon className="size-8" />
                    </div>

                    <Format value={value} number={data.current[value]} />
                </div>
            ))}
        </Card>
    );
};

const rows = [
    { Icon: CloudyIcon, label: "Cloudiness (%)", value: "clouds" },
    { Icon: RadiationIcon, label: "UV Index", value: "uvi" },
    { Icon: WindIcon, label: "Wind Direction", value: "wind_deg" },
    { Icon: CircleGaugeIcon, label: "Pressure", value: "pressure" },
    { Icon: SunriseIcon, label: "Sunrise", value: "sunrise" },
    { Icon: SunsetIcon, label: "Sunset", value: "sunset" },
] as const;

export default AdditionalInfo;
