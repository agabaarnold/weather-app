type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
    min: number;
    max: number | null;
}

export type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

export type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

export const airQualityRanges: AirQualityRanges = {
    CO: {
        Fair: { max: 9400, min: 4400 },
        Good: { max: 4400, min: 0 },
        Moderate: { max: 12_400, min: 9400 },
        Poor: { max: 15_400, min: 12_400 },
        "Very Poor": { max: null, min: 15_400 },
    },
    NH3: {
        Fair: { max: 70, min: 40 },
        Good: { max: 40, min: 0 },
        Moderate: { max: 150, min: 70 },
        Poor: { max: 200, min: 150 },
        "Very Poor": { max: null, min: 200 },
    },
    NO: {
        Fair: { max: 40, min: 20 },
        Good: { max: 20, min: 0 },
        Moderate: { max: 60, min: 40 },
        Poor: { max: 80, min: 60 },
        "Very Poor": { max: null, min: 80 },
    },
    NO2: {
        Fair: { max: 70, min: 40 },
        Good: { max: 40, min: 0 },
        Moderate: { max: 150, min: 70 },
        Poor: { max: 200, min: 150 },
        "Very Poor": { max: null, min: 200 },
    },
    O3: {
        Fair: { max: 100, min: 60 },
        Good: { max: 60, min: 0 },
        Moderate: { max: 140, min: 100 },
        Poor: { max: 180, min: 140 },
        "Very Poor": { max: null, min: 180 },
    },
    PM10: {
        Fair: { max: 50, min: 20 },
        Good: { max: 20, min: 0 },
        Moderate: { max: 100, min: 50 },
        Poor: { max: 200, min: 100 },
        "Very Poor": { max: null, min: 200 },
    },
    PM2_5: {
        Fair: { max: 25, min: 10 },
        Good: { max: 10, min: 0 },
        Moderate: { max: 50, min: 25 },
        Poor: { max: 75, min: 50 },
        "Very Poor": { max: null, min: 75 },
    },
    SO2: {
        Fair: { max: 80, min: 20 },
        Good: { max: 20, min: 0 },
        Moderate: { max: 250, min: 80 },
        Poor: { max: 350, min: 250 },
        "Very Poor": { max: null, min: 350 },
    },
};

export const pollutantNameMapping: Record<Pollutant, string> = {
    CO: "Carbon monoxide",
    NH3: "Ammonia",
    NO: "Nitrogen monoxide",
    NO2: "Nitrogen dioxide",
    O3: "Ozone",
    PM10: "Particulate matter 10",
    PM2_5: "Fine particles matter",
    SO2: "Sulfur dioxide",
};
