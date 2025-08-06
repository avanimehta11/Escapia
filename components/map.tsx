"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "@/app/generated/prisma";

import L from "leaflet";

// Fix Leaflet's default icon URLs
const RedIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [20, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = RedIcon;

interface MapProps {
  itineraries: Location[];
}

export default function Map({ itineraries }: MapProps) {
  const center: [number, number] =
    itineraries.length > 0 ? [itineraries[0].lat, itineraries[0].lng] : [0, 0];

  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {itineraries.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng] as [number, number]}
        >
          <Popup>
            <strong>{location.locationTitle || "Location"}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
