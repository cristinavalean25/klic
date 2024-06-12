import React, { useEffect, useRef, useState } from "react";
import { getCoordinates } from "./geocode";
import "../Maps/map.css";

interface MapComponentProps {
  zona: string; // Numele zonei pentru geocodare
  radius: number; // Raza în metri pentru a desena zona
}

const MapComponent: React.FC<MapComponentProps> = ({ zona, radius }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords = await getCoordinates(zona);
      setCoordinates(coords);
    };

    fetchCoordinates();
  }, [zona]);

  useEffect(() => {
    if (window.google && mapRef.current && coordinates) {
      const map = new google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 12,
      });

      // Adaugarea unui cerc pentru a reprezenta zona
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: coordinates,
        radius: radius, // Raza este acum setată prin props
      });
    }
  }, [coordinates, radius]);

  return <div ref={mapRef} className="map-container"></div>;
};

export default MapComponent;
