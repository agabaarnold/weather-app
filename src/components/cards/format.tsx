import { MoveUpIcon } from "lucide-react";

interface Props {
    value: string;
    number: number;
}

export const Format = ({ number, value }: Props) => {
    if (value === "sunrise" || value === "sunset") {
        return new Date(number * 1000).toLocaleTimeString(undefined, {
            hour: "numeric",
            hour12: false,
            minute: "numeric",
        });
    }

    if (value === "wind_deg") {
        return (
            <MoveUpIcon
                className="size-8"
                style={{ transform: `rotate(${number}deg)` }}
            />
        );
    }

    return number;
};

export default Format;
