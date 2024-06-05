import React from "react";
import { useParams } from "react-router-dom";
import "./ZoneDetail.css";
import Navbar from "../components/Navbar";
import zonesData from "./zonesData";

const ZoneDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const zone = zonesData.find((z) => z.id.toString() === id);

  if (!zone) {
    return <div>Zone not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="zone-detail">
        <h1>{zone.title}</h1>
        <img src={zone.imageUrl} alt={zone.title} className="zone-image" />
        <p>{zone.description}</p>
        <div className="zone-detail-stats">
          <p>
            <strong>Populația:</strong> {zone.population}
          </p>
          <p>
            <strong>Suprafața:</strong> {zone.area}
          </p>
          <p>
            <strong>Preț între:</strong> {zone.priceRange}
          </p>
        </div>
        <div className="zone-map">
          <iframe
            title="zone-map"
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${zone.title}`}
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ZoneDetail;
