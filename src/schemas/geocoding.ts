// oxlint-disable no-inline-comments
import { z } from "zod";

// local_names is a dynamic map of language-code → translated name
// e.g. { en: "London", fr: "Londres", de: "London" }
const LocalNamesSchema = z.record(z.string(), z.string());

// Direct geocoding — city name → coordinates
// Array of up to 5 results
export const DirectGeocodingResultSchema = z.object({
    country: z.string(), // ISO 3166 country code e.g. "GB", "US"
    lat: z.number(),
    local_names: LocalNamesSchema.optional(), // absent for some locations
    lon: z.number(),
    name: z.string(),
    state: z.string().optional(), // only present for some countries
});

export const DirectGeocodingResponseSchema = z.array(
    DirectGeocodingResultSchema
);

// Reverse geocoding — coordinates → name
// Same shape as direct, also returns an array
export const ReverseGeocodingResultSchema = z.object({
    country: z.string(),
    lat: z.number(),
    local_names: LocalNamesSchema.optional(),
    lon: z.number(),
    name: z.string(),
    state: z.string().optional(),
});

export const ReverseGeocodingResponseSchema = z.array(
    ReverseGeocodingResultSchema
);

// Zip code geocoding — zip+country → single result (not an array)
export const ZipGeocodingResponseSchema = z.object({
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    name: z.string(),
    zip: z.string(),
});

// Inferred types
export type DirectGeocodingResult = z.infer<typeof DirectGeocodingResultSchema>;
export type ReverseGeocodingResult = z.infer<
    typeof ReverseGeocodingResultSchema
>;
export type ZipGeocodingResult = z.infer<typeof ZipGeocodingResponseSchema>;
