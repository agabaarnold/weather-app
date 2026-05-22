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
export async function getGeoCode(location: string, limit = 1) {
    const res = await geoApi.get("/direct", {
        params: { limit, q: location },
    });
    return DirectGeocodingResponseSchema.parse(res.data);
}
