import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import type { Coords } from "#/types.ts";

import "leaflet/dist/leaflet.css";

interface Props {
    coords: Coords;
    onMapClick: (lat: number, lon: number) => void;
}

const Map = ({ coords, onMapClick }: Props) => {
    const { lat, lon } = coords;

    return (
        <MapContainer
            center={[lat, lon]}
            zoom={5}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClick onMapClick={onMapClick} />

            <Marker position={[lat, lon]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

function MapClick({
    onMapClick,
}: {
    onMapClick: (lat: number, lon: number) => void;
}) {
    const map = useMap();

    map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        map.panTo([lat, lng]);
        onMapClick(lat, lng);
    });

    return null;
}

export default Map;
