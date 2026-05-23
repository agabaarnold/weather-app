import type { Dispatch, SetStateAction } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Props {
    location: string;
    setLocation: Dispatch<SetStateAction<string>>;
}

const LocationDropdown = ({ location, setLocation }: Props) => (
    <Select onValueChange={(value) => setLocation(value ?? "custom")} value={location}>
        <SelectTrigger className="w-45">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>

        <SelectContent>
            {location === "custom" && (
                <SelectItem value="custom">Custom</SelectItem>
            )}
            
            {popularCities.map((city) => (
                <SelectItem key={city} value={city}>
                    {city}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const popularCities = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Dubai",
    "Amsterdam",
    "Barcelona",
    "Rome",
    "Chicago",
    "Miami",
    "Lisbon",
    "Athens",
    "Stockholm",
    "Copenhagen",
    "Helsinki",
    "Oslo",
    "Kampala",
];

export default LocationDropdown;
