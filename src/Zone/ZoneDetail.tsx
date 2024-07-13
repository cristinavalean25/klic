// src/components/ZoneDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ZoneDetail.css";
import zonesData from "./zonesData";
import MapComponent from "../Maps/MapComponent";

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
        <div className="zone-info">
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              paddingBottom: 20,
            }}
          >
            <div className="line-zone"></div>
            <h6>GHID ZONE</h6>
          </div>
          <div className="zone-header">
            <h1 className="zone-title">{zone.title}</h1>
            <p className="zone-description">{zone.description}</p>
          </div>
        </div>
        <div className="zone-image-container">
          <img src={zone.imageUrl} alt={zone.title} className="zone-image" />
        </div>
      </div>

      <div className="zone-details-population">
        <div className="container-empty"></div>

        <div className="zone-stats">
          <div className="stat-item">
            <p className="stat-value">{zone.population}</p>
            <p className="stat-label">Populatie</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">{zone.area}</p>
            <p className="stat-label">Suprafata</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">Inchirieri</p>
            <p className="stat-label">Vanzari</p>
          </div>
        </div>
      </div>

      <div className="zone-long-description">
        <div className="container-gol-zone">
          <img
            src={zone.secondaryImageUrl}
            alt={`${zone.title} secondary`}
            className="zone-image-secondary"
          />
        </div>
        <div className="title-zone-description">
          <h3>{zone.titleDescription}</h3>
          <p className="long-description-zone">{zone.longDescription}</p>
        </div>
      </div>

      <MapComponent address={zone.address ?? ""} radius={700} />

      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default ZoneDetail;
