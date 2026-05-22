import { clsx } from "clsx";

interface Props {
    srcLink: string;
    className?: string;
}

const WeatherIcon = ({ srcLink, className }: Props) => (
    <img
        className={clsx("size-8", className)}
        src={`https://openweathermap.org/img/wn/${srcLink}@2x.png`}
        alt="Weather icon"
    />
);

export default WeatherIcon;
