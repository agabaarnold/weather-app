import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Props {}

const LocationDropdown = ({}: Props) => (
    <Select>
        <SelectTrigger className="w-45">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>

        <SelectContent className="z-1001">
            {popularCities.map((city) => (
                <SelectItem key={city}>{city}</SelectItem>
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
