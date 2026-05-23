// oxlint-disable unicorn/prefer-at
import { mapTypeData } from "#/constants/map-legends.ts";

interface Props {
    mapType: string;
}

const MapLegend = ({ mapType }: Props) => {
    const data = mapTypeData[mapType];

    const maxValue = data.stops[data.stops.length - 1].value;

    const gradientStops = data.stops
        .map((stop) => `${stop.color} ${(stop.value / maxValue) * 100}%`)
        .join(", ");

    return (
        <div className="bg-background/50 border-accent/70 absolute top-4 right-4 z-1000 flex w-96 flex-col gap-3 rounded-xl border p-4 shadow-lg">
            <h3 className="text-foreground text-sm font-semibold">
                {data.title}
            </h3>

            <div
                className="border-accent/70 h-6 w-full rounded-xl border"
                style={{
                    background: `linear-gradient(to right, ${gradientStops})`,
                }}
            />

            <div className="text-foreground flex justify-between text-xs">
                <span>
                    {data.stops[0].value}
                    {data.unit}
                </span>
                <span>
                    {data.stops[data.stops.length - 1].value}
                    {data.unit}
                </span>
            </div>
        </div>
    );
};

export default MapLegend;
