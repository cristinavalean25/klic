import React, { useEffect, useRef, useState } from "react";
import { getCoordinates } from "./geocode";
import "../Maps/map.css";

interface MapComponentProps {
  address: string; // Adresa completă pentru geocodare
  radius: number; // Raza în metri pentru a desena zona
}

const MapComponent: React.FC<MapComponentProps> = ({ address, radius }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      let fullAddress = address;
      if (!address.includes("Romania")) {
        fullAddress = `${address}, Romania`;
      }
      console.log(`Fetching coordinates for address: ${fullAddress}`);
      const coords = await getCoordinates(fullAddress);
      if (coords) {
        setCoordinates(coords);
      } else {
        console.error(
          `Failed to fetch coordinates for address: ${fullAddress}`
        );
      }
    };

    fetchCoordinates();
  }, [address]);

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
