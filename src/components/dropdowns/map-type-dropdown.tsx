import type { Dispatch, SetStateAction } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Props {
    mapType: string;
    setMapType: Dispatch<SetStateAction<string>>;
}

const MapTypeDropdown = ({ mapType, setMapType }: Props) => (
    <Select onValueChange={(value) => setMapType(value ?? "clouds_new")} value={mapType}>
        <SelectTrigger className="w-45">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>

        <SelectContent className="z-1001">
            {types.map((city) => (
                <SelectItem className="capitalize" key={city} value={city}>
                    {city.split("_")[0]}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const types = [
    "clouds_new",
    "precipitation_new",
    "pressure_new",
    "temp_new",
    "wind_new",
];

export default MapTypeDropdown;
