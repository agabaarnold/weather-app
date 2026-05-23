import { geoApi, weatherApi } from "#/lib/axios.ts";
import { DirectGeocodingResponseSchema } from "#/schemas/geocoding.ts";
import { OneCallResponseSchema } from "#/schemas/weather.ts";

export interface GetWeatherParams {
    lat: number;
    lon: number;
    exclude?: ("current" | "minutely" | "hourly" | "daily" | "alerts")[];
}

export async function getWeather({
    lat,
    lon,
    exclude = ["alerts", "minutely"],
}: GetWeatherParams) {
    const res = await weatherApi.get("/onecall", {
        params: { exclude: exclude.join(","), lat, lon },
    });
    return OneCallResponseSchema.parse(res.data);
}

interface GetGeoCodeParams {
    location: string;
    limit?: number;
}

export async function getGeoCode({ location, limit = 1 }: GetGeoCodeParams) {
    const res = await geoApi.get("/direct", {
        params: { limit, q: location },
    });
    return DirectGeocodingResponseSchema.parse(res.data);
}
