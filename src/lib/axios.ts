import { create } from "axios";

const weatherApi = create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
    params: {
        appid: import.meta.env.VITE_API_KEY,
        lang: "en",
        units: "metric",
    },
    timeout: 10_000,
});

const geoApi = create({
    baseURL: import.meta.env.VITE_GEO_API_URL,
    headers: { "Content-Type": "application/json" },
    params: {
        appid: import.meta.env.VITE_GEO_API_KEY,
    },
    timeout: 10_000,
});

export { geoApi, weatherApi };
