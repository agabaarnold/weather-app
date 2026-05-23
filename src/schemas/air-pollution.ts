import { z } from "zod";

// AQI is 1–5 only — use a union to enforce that strictly
export const AqiSchema = z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
]);

export type Aqi = z.infer<typeof AqiSchema>;

// Human-readable AQI labels — useful for UI display
export const AQI_LABELS: Record<Aqi, string> = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
};

export const AQI_COLORS: Record<Aqi, string> = {
    1: "#00e400",
    2: "#ffff00",
    3: "#ff7e00",
    4: "#ff0000",
    5: "#8f3f97",
};

// All pollutant concentrations are in μg/m³ except CO which is in μg/m³ too
// (OWM returns CO in μg/m³, not the more common mg/m³)
export const AirComponentsSchema = z.object({
    co: z.number(),
    nh3: z.number(),
    no: z.number(),
    no2: z.number(),
    o3: z.number(),
    pm10: z.number(),
    pm2_5: z.number(),
    so2: z.number(),
});

export const AirPollutionItemSchema = z.object({
    components: AirComponentsSchema,
    dt: z.number(),
    main: z.object({ aqi: AqiSchema }),
});

// All three endpoints (current, forecast, history) share the same response shape
export const AirPollutionResponseSchema = z.object({
    coord: z.object({ lat: z.number(), lon: z.number() }),
    list: z.array(AirPollutionItemSchema),
});

// Inferred types
export type AirComponents = z.infer<typeof AirComponentsSchema>;
export type AirPollutionItem = z.infer<typeof AirPollutionItemSchema>;
export type AirPollutionResponse = z.infer<typeof AirPollutionResponseSchema>;
