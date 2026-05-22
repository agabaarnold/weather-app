import { z } from "zod";

// Reusable building blocks
const WeatherConditionSchema = z.object({
    description: z.string(),
    icon: z.string(),
    id: z.number(),
    main: z.string(),
});

const TempSchema = z.object({
    day: z.number(),
    eve: z.number(),
    max: z.number(),
    min: z.number(),
    morn: z.number(),
    night: z.number(),
});

const FeelsLikeSchema = z.object({
    day: z.number(),
    eve: z.number(),
    morn: z.number(),
    night: z.number(),
});

// Current weather
export const CurrentWeatherSchema = z.object({
    clouds: z.number(),
    dew_point: z.number(),
    dt: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    rain: z.object({ "1h": z.number() }).optional(),
    snow: z.object({ "1h": z.number() }).optional(),
    sunrise: z.number(),
    sunset: z.number(),
    temp: z.number(),
    uvi: z.number(),
    visibility: z.number(),
    weather: z.array(WeatherConditionSchema),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    wind_speed: z.number(),
});

// Hourly
export const HourlyWeatherSchema = z.object({
    clouds: z.number(),
    dew_point: z.number(),
    dt: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
    /** probability of precipitation */
    pop: z.number(), 
    pressure: z.number(),
    rain: z.object({ "1h": z.number() }).optional(),
    snow: z.object({ "1h": z.number() }).optional(),
    temp: z.number(),
    uvi: z.number(),
    visibility: z.number(),
    weather: z.array(WeatherConditionSchema),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    wind_speed: z.number(),
});

// Daily
export const DailyWeatherSchema = z.object({
    clouds: z.number(),
    dew_point: z.number(),
    dt: z.number(),
    feels_like: FeelsLikeSchema,
    humidity: z.number(),
    moon_phase: z.number(),
    moonrise: z.number(),
    moonset: z.number(),
    pop: z.number(),
    pressure: z.number(),
    rain: z.number().optional(),
    snow: z.number().optional(),
    summary: z.string().optional(),
    sunrise: z.number(),
    sunset: z.number(),
    temp: TempSchema,
    uvi: z.number(),
    weather: z.array(WeatherConditionSchema),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    wind_speed: z.number(),
});

// Minutely (if not excluded)
export const MinutelySchema = z.object({
    dt: z.number(),
    precipitation: z.number(),
});

// Alerts (if not excluded)
export const AlertSchema = z.object({
    description: z.string(),
    end: z.number(),
    event: z.string(),
    sender_name: z.string(),
    start: z.number(),
    tags: z.array(z.string()),
});

// Full One Call 3.0 response
export const OneCallResponseSchema = z.object({
    alerts: z.array(AlertSchema).optional(),
    current: CurrentWeatherSchema,
    daily: z.array(DailyWeatherSchema).optional(),
    hourly: z.array(HourlyWeatherSchema).optional(),
    lat: z.number(),
    lon: z.number(),
    minutely: z.array(MinutelySchema).optional(),
    timezone: z.string(),
    timezone_offset: z.number(),
});

// Inferred types — use these throughout your app
export type OneCallResponse = z.infer<typeof OneCallResponseSchema>;
export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type DailyWeather = z.infer<typeof DailyWeatherSchema>;
export type HourlyWeather = z.infer<typeof HourlyWeatherSchema>;
export type WeatherAlert = z.infer<typeof AlertSchema>;
