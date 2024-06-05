import React from "react";
import { Link } from "react-router-dom";
import { ZoneData } from "../types/ZoneData";
import "../Zone/Zone.css";

interface ZoneListProps {
  zones: ZoneData[];
}

const ZoneList: React.FC<ZoneListProps> = ({ zones }) => {
  return (
    <div className="zone-list">
      {zones.map((zone) => (
        <div key={zone.id} className="zone-item">
          <Link to={`/zone/${zone.id}`}>
            <img src={zone.imageUrl} alt={zone.title} className="zone-image" />
            <div className="zone-overlay">
              <h2 className="zone-title">{zone.title}</h2>
              <p className="zone-description">{zone.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ZoneList;
