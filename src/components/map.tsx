import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import type { Coords } from "#/types.ts";

const API_KEY = import.meta.env.VITE_API_KEY;

interface Props {
    coords: Coords;
    onMapClick: (lat: number, lon: number) => void;
    mapType: string;
}

const Map = ({ coords, onMapClick, mapType }: Props) => {
    const { lat, lon } = coords;

    return (
        <MapContainer
            center={[lat, lon]}
            key={`map-${coords.lat}-${coords.lon}`}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
        >
            <MapTileLayer />
            <TileLayer
                opacity={0.7}
                url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />
            <MapClick onMapClick={onMapClick} coords={coords} />
            <Marker position={[lat, lon]}>
                <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
            </Marker>
        </MapContainer>
    );
};

function MapClick({
    coords,
    onMapClick,
}: {
    coords: Coords;
    onMapClick: (lat: number, lon: number) => void;
}) {
    const map = useMap();
    map.panTo([coords.lat, coords.lon]);

    map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
    });

    return null;
}

const MAP_TILER_API_KEY = import.meta.env.VITE_MAP_TILER_API_KEY;

function MapTileLayer() {
    const map = useMap();

    useEffect(() => {
        const tileLayer = new MaptilerLayer({
            apiKey: MAP_TILER_API_KEY,
            style: "basic-dark",
        });
        tileLayer.addTo(map);

        return () => {
            map.removeLayer(tileLayer);
        };
    }, [map]);

    return null;
}

export default Map;
